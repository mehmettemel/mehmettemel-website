'use client'

import { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Shuffle, X, ArrowUpRight } from 'lucide-react'
import { nodes as rawNodes, links as rawLinks } from '@/data/food-notes'
import { GraphEngine } from './graph-engine'

/* 3B not bulutu — three.js motoru koordinat ve çizimi üstlenir,
   React yalnızca kromu yönetir: başlık, etiket süzgeçleri, arama,
   not paneli. Sahne, ana bileşenin verdiği kutuyu tamamen doldurur.
   Detay: graph-engine.js */

const MIN_TAG_COUNT = 3 // bundan az kullanılan etiketler çip olmaz
const MAX_RESULTS = 8

const lower = (s) => s.toLocaleLowerCase('tr')

export function NoteGraph({ title, subtitle }) {
  const hostRef = useRef(null)
  const engineRef = useRef(null)
  const searchRef = useRef(null)
  const [active, setActive] = useState(null)
  const [tag, setTag] = useState(null)
  const [query, setQuery] = useState('')
  const [searchFocus, setSearchFocus] = useState(false)

  const graph = useMemo(() => {
    const nodes = rawNodes.map((n) => ({ ...n }))
    const byId = new Map(nodes.map((n) => [n.id, n]))
    const links = rawLinks.filter(
      (l) => byId.has(l.source) && byId.has(l.target),
    )
    // derece (bağlantı sayısı) → küre yarıçapı
    const degree = new Map(nodes.map((n) => [n.id, 0]))
    links.forEach((l) => {
      degree.set(l.source, degree.get(l.source) + 1)
      degree.set(l.target, degree.get(l.target) + 1)
    })
    nodes.forEach((n) => {
      n.r = 0.34 + Math.min(degree.get(n.id), 5) * 0.11
    })
    const neighbors = new Map(nodes.map((n) => [n.id, new Set([n.id])]))
    links.forEach((l) => {
      neighbors.get(l.source).add(l.target)
      neighbors.get(l.target).add(l.source)
    })
    // etiket sayımı → süzgeç çipleri
    const tagCount = new Map()
    nodes.forEach((n) =>
      n.tags?.forEach((t) => tagCount.set(t, (tagCount.get(t) ?? 0) + 1)),
    )
    const tags = [...tagCount.entries()]
      .filter(([, c]) => c >= MIN_TAG_COUNT)
      .sort((a, b) => b[1] - a[1])
    return { nodes, links, neighbors, byId, tags }
  }, [])

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    const engine = new GraphEngine(host, graph, {
      onClick: (id) => setActive(id ? graph.byId.get(id) : null),
    })
    engineRef.current = engine
    return () => {
      engine.dispose()
      engineRef.current = null
    }
  }, [graph])

  useEffect(() => {
    engineRef.current?.setActive(active?.id ?? null)
  }, [active])

  // etiket süzgeci → motorda silikleştirme
  useEffect(() => {
    const ids = tag
      ? graph.nodes.filter((n) => n.tags?.includes(tag)).map((n) => n.id)
      : null
    engineRef.current?.setFilter(ids)
  }, [tag, graph])

  // Esc: önce arama, sonra panel, sonra süzgeç kapanır
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      if (query) setQuery('')
      else if (active) setActive(null)
      else if (tag) setTag(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [query, active, tag])

  const openNode = useCallback((node) => {
    setActive(node)
    engineRef.current?.flyTo(node.id)
  }, [])

  const shuffle = useCallback(() => {
    engineRef.current?.shuffle()
    setActive(null)
  }, [])

  const results = useMemo(() => {
    const q = lower(query.trim())
    if (q.length < 2) return []
    const hits = []
    for (const n of graph.nodes) {
      const inTitle = lower(n.title).includes(q)
      const inBody = !inTitle && lower(n.body).includes(q)
      if (inTitle || inBody) hits.push({ node: n, score: inTitle ? 0 : 1 })
      if (hits.length >= MAX_RESULTS * 3) break
    }
    return hits
      .sort((a, b) => a.score - b.score)
      .slice(0, MAX_RESULTS)
      .map((h) => h.node)
  }, [query, graph])

  const showResults = searchFocus && query.trim().length >= 2
  const filteredCount = tag
    ? graph.nodes.filter((n) => n.tags?.includes(tag)).length
    : graph.nodes.length

  return (
    <div className="relative h-full w-full">
      {/* sahne: three.js tuvali ve etiket katmanı buraya takılır.
          Mobilde başlık bloğunun altından başlar; geniş ekranda tam kutu. */}
      <div
        ref={hostRef}
        className="absolute inset-x-0 bottom-0 top-32 cursor-grab overflow-hidden sm:inset-0"
      />

      {/* sol üst: başlık, sayaç, etiket süzgeçleri */}
      <div className="pointer-events-none absolute left-4 top-4 z-20 max-w-[min(560px,calc(100%-2rem))] pr-28 sm:left-6 sm:top-6 sm:pr-0">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h1>
        <p className="mt-1 hidden text-sm text-muted-foreground sm:block">
          {subtitle}
        </p>
        <div className="mt-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
          {tag ? `${filteredCount} / ${graph.nodes.length}` : graph.nodes.length}{' '}
          not · {graph.links.length} bağ
        </div>

        <div className="pointer-events-auto mt-4 flex max-w-full gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] sm:flex-wrap sm:overflow-visible [&::-webkit-scrollbar]:hidden">
          <Chip active={tag === null} onClick={() => setTag(null)}>
            tümü
          </Chip>
          {graph.tags.map(([t, c]) => (
            <Chip
              key={t}
              active={tag === t}
              onClick={() => setTag(tag === t ? null : t)}
            >
              {t}
              <span className="ml-1 opacity-60">{c}</span>
            </Chip>
          ))}
        </div>
      </div>

      {/* sağ üst: arama + karıştır */}
      {/* z-50: arama sonuçları panelin (z-40) üstüne açılır */}
      <div className="absolute right-4 top-4 z-50 flex items-start gap-2 sm:right-6 sm:top-6">
        <div className="relative">
          <div className="flex h-9 items-center gap-2 rounded-full border border-border bg-card/80 pl-3 pr-2 backdrop-blur transition-colors focus-within:border-foreground/30">
            <Search className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setSearchFocus(true)}
              onBlur={() => setTimeout(() => setSearchFocus(false), 120)}
              placeholder="Not ara…"
              aria-label="Notlarda ara"
              className="w-28 bg-transparent text-xs text-foreground placeholder:text-muted-foreground/70 focus:outline-none sm:w-44 md:w-56"
            />
            {query && (
              <button
                onClick={() => {
                  setQuery('')
                  searchRef.current?.focus()
                }}
                aria-label="Aramayı temizle"
                className="rounded-full p-0.5 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          <AnimatePresence>
            {showResults && (
              <motion.ul
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-11 w-72 overflow-hidden rounded-xl border border-border bg-card shadow-xl"
              >
                {results.length === 0 && (
                  <li className="px-3 py-2.5 text-xs text-muted-foreground">
                    Sonuç yok
                  </li>
                )}
                {results.map((n) => (
                  <li key={n.id}>
                    <button
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        openNode(n)
                        setQuery('')
                        searchRef.current?.blur()
                      }}
                      className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-xs text-foreground transition-colors hover:bg-secondary"
                    >
                      <span className="truncate">{n.title}</span>
                      <span className="shrink-0 text-[10px] uppercase tracking-wide text-muted-foreground">
                        {n.tags?.[0]}
                      </span>
                    </button>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={shuffle}
          title="Noktaları karıştır"
          aria-label="Noktaları karıştır"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/80 text-muted-foreground backdrop-blur transition-colors hover:border-foreground/25 hover:text-foreground"
        >
          <Shuffle className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* sağ alt: kullanım ipucu (sol alt köşede site widget'ı var) */}
      <div className="pointer-events-none absolute bottom-4 right-4 z-20 hidden text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 sm:right-6 sm:block">
        sürükle döndür · kaydır yakınlaştır · noktaya tıkla
      </div>

      {/* not paneli: masaüstünde sağdan yan panel, mobilde alttan kart */}
      <AnimatePresence>
        {active && (
          <motion.aside
            key={active.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            className="absolute inset-x-3 bottom-3 z-40 flex max-h-[62%] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl md:inset-x-auto md:bottom-6 md:right-6 md:top-[4.5rem] md:max-h-none md:w-[400px]"
          >
            <div className="flex items-start justify-between gap-3 border-b border-border/60 px-5 py-4">
              <div className="min-w-0">
                <h2 className="text-lg font-semibold leading-snug text-foreground">
                  {active.title}
                </h2>
                {active.tags?.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {active.tags.map((t) => (
                      <button
                        key={t}
                        onClick={() => setTag(tag === t ? null : t)}
                        className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wide transition-colors ${
                          tag === t
                            ? 'bg-foreground text-background'
                            : 'bg-secondary text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={() => setActive(null)}
                className="-mr-1.5 -mt-1 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                aria-label="Kapat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
              <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/85">
                {active.body}
              </p>
              <GraphLinks node={active} graph={graph} onOpen={openNode} />
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  )
}

function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] leading-none transition-colors ${
        active
          ? 'border-foreground bg-foreground text-background'
          : 'border-border bg-card/70 text-muted-foreground backdrop-blur hover:border-foreground/30 hover:text-foreground'
      }`}
    >
      {children}
    </button>
  )
}

function GraphLinks({ node, graph, onOpen }) {
  const related = [...graph.neighbors.get(node.id)]
    .filter((id) => id !== node.id)
    .map((id) => graph.byId.get(id))
    .filter(Boolean)
  if (related.length === 0) return null
  return (
    <div className="mt-5 border-t border-border/60 pt-4">
      <div className="mb-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        Bağlantılı · {related.length}
      </div>
      <ul className="space-y-1">
        {related.map((r) => (
          <li key={r.id}>
            <button
              onClick={() => onOpen(r)}
              className="group flex w-full items-center justify-between gap-2 rounded-lg border border-border px-3 py-2 text-left text-xs text-foreground transition-colors hover:border-primary/50 hover:bg-secondary"
            >
              <span className="truncate">{r.title}</span>
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

'use client'

import { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, ArrowUpRight } from 'lucide-react'
import { GraphEngine } from './graph-engine'

/* 3B not bulutu — three.js motoru koordinat ve çizimi üstlenir,
   React yalnızca kromu yönetir: başlık, etiket süzgeçleri, arama,
   not paneli. Sahne, ana bileşenin verdiği kutuyu tamamen doldurur.
   Detay: graph-engine.js */

const MIN_TAG_COUNT = 3 // bundan az kullanılan etiketler çip olmaz
const MAX_RESULTS = 8

const lower = (s) => s.toLocaleLowerCase('tr')

export function NoteGraph({ title, subtitle, nodes: rawNodes, links: rawLinks }) {
  const hostRef = useRef(null)
  const engineRef = useRef(null)
  const searchRef = useRef(null)
  const [active, setActive] = useState(null)
  const [tag, setTag] = useState(null)
  const [query, setQuery] = useState('')
  const [searchFocus, setSearchFocus] = useState(false)
  const [cursor, setCursor] = useState(0) // klavyeyle seçili arama sonucu

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
  }, [rawNodes, rawLinks])

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

  // "/" veya ⌘K: aramaya odaklan (bir alana yazarken devreye girmez)
  useEffect(() => {
    const onKey = (e) => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)
      const cmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k'
      if (cmdK || (e.key === '/' && !typing)) {
        e.preventDefault()
        searchRef.current?.focus()
        searchRef.current?.select()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

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

  useEffect(() => setCursor(0), [query])

  const pickResult = (n) => {
    openNode(n)
    setQuery('')
    searchRef.current?.blur()
  }

  const onSearchKey = (e) => {
    if (!results.length) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setCursor((c) => (c + 1) % results.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setCursor((c) => (c - 1 + results.length) % results.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      pickResult(results[cursor] ?? results[0])
    }
  }

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
        <div className="mt-2 text-xs uppercase tabular-nums tracking-[0.16em] text-muted-foreground/70">
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
              <span className="ml-1.5 tabular-nums opacity-60">{c}</span>
            </Chip>
          ))}
        </div>
      </div>

      {/* sağ üst: arama */}
      {/* z-50: arama sonuçları panelin (z-40) üstüne açılır */}
      <div className="absolute right-4 top-4 z-50 sm:right-6 sm:top-6">
        <div className="relative">
          <div className="flex h-9 items-center gap-2 rounded-full border border-border bg-card/80 pl-3 pr-2 shadow-sm backdrop-blur transition-colors focus-within:border-foreground/30 focus-within:bg-card">
            <Search className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setSearchFocus(true)}
              onBlur={() => setTimeout(() => setSearchFocus(false), 120)}
              onKeyDown={onSearchKey}
              placeholder="Not ara…"
              aria-label="Notlarda ara"
              role="combobox"
              aria-expanded={showResults}
              aria-controls="note-search-results"
              className="w-28 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none sm:w-44 md:w-56"
            />
            {!query && !searchFocus && (
              <kbd className="hidden h-5 items-center rounded border border-border bg-secondary px-1.5 font-mono text-xs text-muted-foreground sm:inline-flex">
                /
              </kbd>
            )}
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
                id="note-search-results"
                role="listbox"
                className="absolute right-0 top-11 w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-border bg-card p-1 shadow-xl"
              >
                {results.length === 0 && (
                  <li className="px-3 py-2.5 text-sm text-muted-foreground">
                    Sonuç yok
                  </li>
                )}
                {results.map((n, i) => (
                  <li key={n.id} role="option" aria-selected={i === cursor}>
                    <button
                      onMouseDown={(e) => e.preventDefault()}
                      onMouseEnter={() => setCursor(i)}
                      onClick={() => pickResult(n)}
                      title={n.title}
                      className={`flex w-full flex-col gap-0.5 rounded-lg px-3 py-2 text-left transition-colors ${
                        i === cursor ? 'bg-secondary' : ''
                      }`}
                    >
                      <span className="flex w-full min-w-0 items-center justify-between gap-2">
                        <span className="truncate text-sm text-foreground">
                          <Highlight text={n.title} query={query} />
                        </span>
                        {n.tags?.[0] && (
                          <span className="shrink-0 text-xs text-muted-foreground">
                            {n.tags[0]}
                          </span>
                        )}
                      </span>
                      {!lower(n.title).includes(lower(query.trim())) && (
                        <span className="line-clamp-1 text-xs text-muted-foreground">
                          <Highlight text={snippet(n.body, query)} query={query} />
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* sağ alt: kullanım ipucu (sol alt köşede site widget'ı var);
          panel açıkken panelin altına taşmasın diye gizlenir */}
      {!active && (
        <div className="pointer-events-none absolute bottom-4 right-4 z-20 hidden text-xs text-muted-foreground/60 sm:right-6 sm:block">
          sürükle döndür · kaydır yakınlaştır · noktaya tıkla · / ara
        </div>
      )}

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
                        className={`rounded-full px-2.5 py-0.5 text-xs transition-colors ${
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
              <p className="whitespace-pre-line text-[15px] leading-relaxed text-foreground/85">
                <RichText text={active.body} />
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
      className={`shrink-0 rounded-full border px-3 py-1.5 text-xs leading-none transition-colors ${
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
      <div className="mb-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">
        Bağlantılı · {related.length}
      </div>
      <ul className="space-y-1">
        {related.map((r) => (
          <li key={r.id}>
            <button
              onClick={() => onOpen(r)}
              title={r.title}
              className="group flex w-full items-center justify-between gap-2 rounded-lg border border-border px-3 py-2 text-left text-sm text-foreground transition-colors hover:border-foreground/25 hover:bg-secondary"
            >
              <span className="min-w-0 truncate">{r.title}</span>
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

// **kalın** işaretli kısımları <strong> yapar; geri kalan metin olduğu gibi
function RichText({ text }) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i} className="font-semibold text-foreground">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  )
}

// aranan ifadeyi metin içinde vurgular (büyük/küçük harf duyarsız, tr)
function Highlight({ text, query }) {
  const q = query.trim()
  if (q.length < 2) return text
  const at = lower(text).indexOf(lower(q))
  if (at < 0) return text
  return (
    <>
      {text.slice(0, at)}
      <mark className="rounded-sm bg-primary/20 text-foreground">
        {text.slice(at, at + q.length)}
      </mark>
      {text.slice(at + q.length)}
    </>
  )
}

// gövdede eşleşmenin çevresinden kısa bir kesit
function snippet(body, query) {
  const plain = body.replace(/\*\*/g, '').replace(/\s+/g, ' ')
  const at = lower(plain).indexOf(lower(query.trim()))
  if (at < 0) return plain.slice(0, 90)
  const start = Math.max(0, at - 30)
  return (start > 0 ? '…' : '') + plain.slice(start, start + 110)
}

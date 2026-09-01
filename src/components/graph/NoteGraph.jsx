'use client'

import { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shuffle } from 'lucide-react'
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  forceCollide,
} from 'd3-force'
import { nodes as rawNodes, links as rawLinks } from '@/data/food-notes'

/* Obsidian-tarzı kuvvet-yönlü not grafiği.
   - d3-force yalnızca koordinat hesaplar; render React/SVG.
   - Tek renk, minimal. Bağlantı derecesi noktanın boyutunu belirler.
   - Hover: komşuları vurgula. Tık: yan panelde notu aç.
   - Simülasyon hiç durmaz: noktalar çerçeve içinde sürekli süzülür. */

// simülasyonun boşta koruduğu enerji — 0 olsaydı hareket donardı
const IDLE_ALPHA = 0.05

export function NoteGraph({ heightClass = 'h-[70vh]' }) {
  const wrapRef = useRef(null)
  const simRef = useRef(null)
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [, force] = useState(0) // simülasyon her tick'te yeniden çizdirir
  const [active, setActive] = useState(null)
  const [hover, setHover] = useState(null)
  const dragRef = useRef(null)

  // d3 nesnelerini bir kez klonla (mutasyona uğrarlar)
  const graph = useMemo(() => {
    const nodes = rawNodes.map((n) => ({ ...n }))
    const byId = new Map(nodes.map((n) => [n.id, n]))
    const links = rawLinks
      .filter((l) => byId.has(l.source) && byId.has(l.target))
      .map((l) => ({ source: l.source, target: l.target }))
    // derece (bağlantı sayısı) → nokta yarıçapı
    const degree = new Map(nodes.map((n) => [n.id, 0]))
    links.forEach((l) => {
      degree.set(l.source, degree.get(l.source) + 1)
      degree.set(l.target, degree.get(l.target) + 1)
    })
    nodes.forEach((n) => {
      n.r = 5 + Math.min(degree.get(n.id), 5) * 1.6
    })
    // hızlı komşuluk sorgusu
    const neighbors = new Map(nodes.map((n) => [n.id, new Set([n.id])]))
    links.forEach((l) => {
      neighbors.get(l.source).add(l.target)
      neighbors.get(l.target).add(l.source)
    })
    return { nodes, links, neighbors }
  }, [])

  // konteyner ölçüsü
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const ro = new ResizeObserver(() => {
      setSize({ w: el.clientWidth, h: el.clientHeight })
    })
    ro.observe(el)
    setSize({ w: el.clientWidth, h: el.clientHeight })
    return () => ro.disconnect()
  }, [])

  // simülasyonu kur / boyut değişince yeniden merkezle
  useEffect(() => {
    if (!size.w || !size.h) return

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    // her noktaya sabit bir salınım fazı ver → hepsi farklı yöne süzülür
    graph.nodes.forEach((n) => {
      if (n._phaseX === undefined) {
        n._phaseX = Math.random() * Math.PI * 2
        n._phaseY = Math.random() * Math.PI * 2
        n._speed = 0.006 + Math.random() * 0.006
      }
    })

    // sürekli süzülme + çerçeve içinde tutma
    const padBase = 52 // etiketler de çerçeve içinde kalsın

    // entegrasyon sonrası sert kırpma — hız ne olursa olsun taşma olmaz
    const clampAll = () => {
      for (const n of graph.nodes) {
        const pad = n.r + padBase
        const maxX = Math.max(pad, size.w - pad)
        const maxY = Math.max(pad, size.h - pad)
        if (n.x < pad) { n.x = pad; if (n.vx < 0) n.vx = -n.vx * 0.6 }
        else if (n.x > maxX) { n.x = maxX; if (n.vx > 0) n.vx = -n.vx * 0.6 }
        if (n.y < pad) { n.y = pad; if (n.vy < 0) n.vy = -n.vy * 0.6 }
        else if (n.y > maxY) { n.y = maxY; if (n.vy > 0) n.vy = -n.vy * 0.6 }
      }
    }

    let tick = 0
    const drift = () => {
      tick += 1
      for (const n of graph.nodes) {
        if (n.fx != null) continue // sürüklenen nokta serbest kalsın
        if (!reduceMotion) {
          n.vx += Math.cos(tick * n._speed + n._phaseX) * 0.05
          n.vy += Math.sin(tick * n._speed + n._phaseY) * 0.05
        }
      }
    }

    const sim = forceSimulation(graph.nodes)
      .force(
        'link',
        forceLink(graph.links)
          .id((d) => d.id)
          .distance(95)
          .strength(0.25),
      )
      .force('charge', forceManyBody().strength(-260).distanceMax(600))
      .force('center', forceCenter(size.w / 2, size.h / 2))
      .force('collide', forceCollide().radius((d) => d.r + 16))
      .force('drift', drift)
      .alpha(0.9)
      .alphaDecay(0.028)
      .alphaTarget(reduceMotion ? 0 : IDLE_ALPHA)
      .velocityDecay(0.45)
      .on('tick', () => {
        clampAll()
        force((n) => n + 1)
      })

    simRef.current = sim
    return () => sim.stop()
  }, [graph, size.w, size.h])

  // karıştır: noktaları çerçeve içinde rastgele dağıt ve simülasyonu ısıt
  const shuffle = useCallback(() => {
    const sim = simRef.current
    if (!sim || !size.w || !size.h) return
    graph.nodes.forEach((n) => {
      const pad = n.r + 30
      n.fx = null
      n.fy = null
      n.x = pad + Math.random() * Math.max(1, size.w - pad * 2)
      n.y = pad + Math.random() * Math.max(1, size.h - pad * 2)
      n.vx = 0
      n.vy = 0
    })
    setActive(null)
    setHover(null)
    sim.alpha(0.9).restart()
  }, [graph, size.w, size.h])

  // sürükleme
  const onPointerDown = useCallback((e, node) => {
    e.stopPropagation()
    const svg = wrapRef.current.querySelector('svg')
    const pt = svg.getBoundingClientRect()
    dragRef.current = { node, px: pt.left, py: pt.top }
    node.fx = node.x
    node.fy = node.y
    simRef.current?.alphaTarget(0.3).restart()
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
  }, [])

  const onPointerMove = useCallback((e) => {
    const d = dragRef.current
    if (!d) return
    d.node.fx = e.clientX - d.px
    d.node.fy = e.clientY - d.py
  }, [])

  const onPointerUp = useCallback(() => {
    const d = dragRef.current
    if (d) {
      d.node.fx = null
      d.node.fy = null
    }
    dragRef.current = null
    simRef.current?.alphaTarget(IDLE_ALPHA)
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerup', onPointerUp)
  }, [onPointerMove])

  const focusId = hover || active?.id || null
  const near = focusId ? graph.neighbors.get(focusId) : null
  const isDim = (id) => (near ? !near.has(id) : false)

  return (
    <div className="relative">
      <div
        ref={wrapRef}
        className={`relative ${heightClass} min-h-[440px] w-full overflow-hidden`}
      >
        <button
          onClick={shuffle}
          title="Noktaları karıştır"
          className="absolute right-2 top-2 z-30 inline-flex items-center gap-1.5 rounded-full border border-border bg-card/80 px-3 py-1.5 text-[11px] font-medium text-muted-foreground backdrop-blur transition-colors hover:border-foreground/25 hover:text-foreground"
        >
          <Shuffle className="h-3.5 w-3.5" />
          Karıştır
        </button>

        <svg width={size.w} height={size.h} className="block select-none">
          {/* bağlantılar */}
          <g>
            {graph.links.map((l, i) => {
              const s = l.source
              const t = l.target
              if (typeof s !== 'object' || typeof t !== 'object') return null
              const touches = focusId && (s.id === focusId || t.id === focusId)
              return (
                <line
                  key={i}
                  x1={s.x}
                  y1={s.y}
                  x2={t.x}
                  y2={t.y}
                  stroke="currentColor"
                  className={
                    touches
                      ? 'text-primary/60'
                      : focusId
                        ? 'text-border/30'
                        : 'text-border/50'
                  }
                  strokeWidth={touches ? 1.4 : 1}
                />
              )
            })}
          </g>
          {/* noktalar */}
          <g>
            {graph.nodes.map((n) => {
              const dim = isDim(n.id)
              const isActive = active?.id === n.id
              return (
                <g
                  key={n.id}
                  transform={`translate(${n.x ?? 0},${n.y ?? 0})`}
                  className="cursor-pointer"
                  onPointerDown={(e) => onPointerDown(e, n)}
                  onMouseEnter={() => setHover(n.id)}
                  onMouseLeave={() => setHover(null)}
                  onClick={(e) => {
                    e.stopPropagation()
                    setActive(n)
                  }}
                  style={{ opacity: dim ? 0.28 : 1, transition: 'opacity 0.2s' }}
                >
                  <circle
                    r={n.r}
                    className={
                      isActive
                        ? 'fill-primary'
                        : focusId === n.id
                          ? 'fill-primary'
                          : 'fill-foreground'
                    }
                  />
                  {isActive && (
                    <circle
                      r={n.r + 4}
                      fill="none"
                      className="stroke-primary/50"
                      strokeWidth={1.5}
                    />
                  )}
                  <text
                    y={n.r + 13}
                    textAnchor="middle"
                    className="pointer-events-none fill-muted-foreground text-[10px]"
                    style={{ opacity: focusId && focusId !== n.id && dim ? 0.4 : 1 }}
                  >
                    {n.title}
                  </text>
                </g>
              )
            })}
          </g>
        </svg>

        {/* boş alana tık: paneli kapat */}
        {active && (
          <button
            aria-label="Kapat"
            className="absolute inset-0 z-0 cursor-default"
            onClick={() => setActive(null)}
          />
        )}
      </div>

      {/* açılan not paneli — sonner toast gibi alt-ortadan yay ile çıkar */}
      <AnimatePresence>
        {active && (
          <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 sm:bottom-6">
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 28, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              className="pointer-events-auto max-h-[55vh] w-full max-w-md overflow-y-auto rounded-2xl border border-border bg-card p-5 shadow-2xl"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold text-foreground">
                  {active.title}
                </h3>
                <button
                  onClick={() => setActive(null)}
                  className="-mr-1 rounded-md px-2 py-0.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  aria-label="Kapat"
                >
                  ✕
                </button>
              </div>
              {active.tags?.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {active.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-secondary px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
              <p className="text-sm leading-relaxed text-foreground/85">
                {active.body}
              </p>

              {/* bağlantılı notlar */}
              <GraphLinks node={active} graph={graph} onOpen={setActive} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

function GraphLinks({ node, graph, onOpen }) {
  const related = [...graph.neighbors.get(node.id)]
    .filter((id) => id !== node.id)
    .map((id) => graph.nodes.find((n) => n.id === id))
    .filter(Boolean)
  if (related.length === 0) return null
  return (
    <div className="mt-4 border-t border-border/60 pt-3">
      <div className="mb-2 text-[10px] uppercase tracking-widest text-muted-foreground">
        Bağlantılı
      </div>
      <div className="flex flex-wrap gap-1.5">
        {related.map((r) => (
          <button
            key={r.id}
            onClick={() => onOpen(r)}
            className="rounded-md border border-border px-2 py-1 text-xs text-foreground transition-colors hover:border-primary/50 hover:bg-secondary"
          >
            {r.title}
          </button>
        ))}
      </div>
    </div>
  )
}

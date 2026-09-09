'use client'

import { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shuffle } from 'lucide-react'
import { nodes as rawNodes, links as rawLinks } from '@/data/food-notes'
import { GraphEngine } from './graph-engine'

/* 3B not bulutu — three.js motoru koordinat ve çizimi üstlenir,
   React yalnızca paneli ve düğmeleri yönetir. Detay: graph-engine.js */

export function NoteGraph({ heightClass = 'h-[70vh]' }) {
  const hostRef = useRef(null)
  const engineRef = useRef(null)
  const [active, setActive] = useState(null)

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
    return { nodes, links, neighbors, byId }
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

  const shuffle = useCallback(() => {
    engineRef.current?.shuffle()
    setActive(null)
  }, [])

  return (
    <div className="relative">
      <div
        ref={hostRef}
        className={`relative ${heightClass} min-h-[480px] w-full cursor-grab overflow-hidden`}
      >
        <button
          onClick={shuffle}
          title="Noktaları karıştır"
          className="absolute right-4 top-2 z-30 inline-flex items-center gap-1.5 rounded-full border border-border bg-card/80 px-3 py-1.5 text-[11px] font-medium text-muted-foreground backdrop-blur transition-colors hover:border-foreground/25 hover:text-foreground"
        >
          <Shuffle className="h-3.5 w-3.5" />
          Karıştır
        </button>
        <div className="pointer-events-none absolute bottom-2 right-4 z-30 hidden text-[10px] uppercase tracking-widest text-muted-foreground/70 sm:block">
          sürükle · döndür &nbsp; kaydır · yakınlaştır
        </div>
      </div>

      {/* açılan not paneli — alt-ortadan yay ile çıkar */}
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
              <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/85">
                {active.body}
              </p>

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
    .map((id) => graph.byId.get(id))
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

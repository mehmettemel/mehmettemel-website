'use client'

import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { Info, X, ChevronRight } from 'lucide-react'

const STORAGE_KEY = 'roadmap-checked'

function loadChecked(key) {
  if (typeof window === 'undefined') return {}
  try {
    return JSON.parse(localStorage.getItem(key) || '{}')
  } catch {
    return {}
  }
}

function saveChecked(key, checked) {
  try {
    localStorage.setItem(key, JSON.stringify(checked))
  } catch {
    // kota dolu ya da depolama kapalı — işaretler bu oturumda yine çalışır
  }
}

/** Bir düğümün altındaki tüm yaprak (alt maddesi olmayan) id'leri. */
function leafIds(node) {
  if (!node.children?.length) return [node.id]
  return node.children.flatMap(leafIds)
}

/** Düğümün kendisi dahil tüm alt id'leri. */
function subtreeIds(node) {
  const out = []
  const walk = (n) => {
    out.push(n.id)
    n.children?.forEach(walk)
  }
  walk(node)
  return out
}

function InfoTooltip({ info }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  return (
    <span ref={ref} className="relative ml-auto shrink-0">
      <button
        onClick={(e) => {
          e.stopPropagation()
          setOpen(!open)
        }}
        aria-label="Açıklama"
        className="flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground/50 transition-colors hover:bg-secondary hover:text-muted-foreground"
      >
        <Info className="h-3.5 w-3.5" />
      </button>
      {open && (
        <div className="absolute right-0 top-8 z-50 w-72 rounded-xl border border-border bg-card p-4 shadow-lg sm:w-80">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setOpen(false)
            }}
            aria-label="Kapat"
            className="absolute right-2 top-2 rounded-full p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
          <div className="whitespace-pre-line pr-4 text-xs leading-relaxed text-muted-foreground">
            {info}
          </div>
        </div>
      )}
    </span>
  )
}

/** Üç durumlu kutu: boş / yarım / dolu */
function Box({ state, size = 'sm' }) {
  const dim = size === 'lg' ? 'h-[18px] w-[18px]' : 'h-4 w-4'
  return (
    <span
      className={`flex ${dim} shrink-0 items-center justify-center rounded border-[1.5px] transition-all ${
        state === 'none'
          ? 'border-muted-foreground/30'
          : 'border-primary bg-primary text-primary-foreground'
      }`}
    >
      {state === 'all' && (
        <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      )}
      {state === 'some' && <span className="h-0.5 w-2 rounded-full bg-current" />}
    </span>
  )
}

function Node({ node, checked, setNode, depth }) {
  const [open, setOpen] = useState(true)
  const hasChildren = node.children?.length > 0

  // durum yapraklardan türetilir — üst maddeler ayrıca saklanmaz
  const leaves = useMemo(() => leafIds(node), [node])
  const doneCount = leaves.filter((id) => checked[id]).length
  const state = doneCount === 0 ? 'none' : doneCount === leaves.length ? 'all' : 'some'

  return (
    <div>
      <div
        className="group flex items-center gap-1 rounded-lg px-2 py-2 transition-colors hover:bg-secondary/30"
        style={{ paddingLeft: `${depth * 18 + 8}px` }}
      >
        {hasChildren ? (
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Kapat' : 'Aç'}
            className="-ml-1 flex h-4 w-4 shrink-0 items-center justify-center rounded text-muted-foreground/50 transition-colors hover:text-foreground"
          >
            <ChevronRight
              className={`h-3 w-3 transition-transform duration-150 ${open ? 'rotate-90' : ''}`}
            />
          </button>
        ) : (
          <span className="w-3 shrink-0" />
        )}

        <button
          onClick={() => setNode(node, state !== 'all')}
          className="flex flex-1 items-center gap-2.5 text-left"
        >
          <Box state={state} />
          <span
            className={`text-sm leading-relaxed ${
              state === 'all' ? 'text-muted-foreground line-through' : 'text-foreground'
            }`}
          >
            {node.label}
          </span>
          {hasChildren && (
            <span className="shrink-0 text-[10px] tabular-nums text-muted-foreground/70">
              {doneCount}/{leaves.length}
            </span>
          )}
        </button>

        {node.info && <InfoTooltip info={node.info} />}
      </div>

      {hasChildren && open && (
        <div>
          {node.children.map((child) => (
            <Node
              key={child.id}
              node={child}
              checked={checked}
              setNode={setNode}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function RoadmapContent({ roadmap, title, subtitle }) {
  const [checked, setChecked] = useState({})

  useEffect(() => {
    setChecked(loadChecked(STORAGE_KEY))
  }, [])

  // bir düğümü (ve tüm altını) işaretle / kaldır
  const setNode = useCallback((node, value) => {
    setChecked((prev) => {
      const next = { ...prev }
      subtreeIds(node).forEach((id) => {
        if (value) next[id] = true
        else delete next[id]
      })
      saveChecked(STORAGE_KEY, next)
      return next
    })
  }, [])

  const allLeaves = useMemo(() => roadmap.flatMap(leafIds), [roadmap])
  const doneCount = allLeaves.filter((id) => checked[id]).length
  const pct = allLeaves.length ? (doneCount / allLeaves.length) * 100 : 0

  const reset = useCallback(() => {
    setChecked({})
    saveChecked(STORAGE_KEY, {})
  }, [])

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-1 text-center">
        <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>

      {/* ilerleme */}
      <div className="mb-5 mt-5 flex items-center justify-between gap-3 rounded-lg bg-secondary/40 px-4 py-2.5">
        <span className="text-xs font-medium text-muted-foreground">
          {doneCount} / {allLeaves.length} tamamlandı
        </span>
        <div className="flex items-center gap-3">
          <div className="h-1.5 w-24 overflow-hidden rounded-full bg-secondary sm:w-32">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>
          {doneCount > 0 && (
            <button
              onClick={reset}
              className="text-[11px] text-muted-foreground transition-colors hover:text-foreground"
            >
              Sıfırla
            </button>
          )}
        </div>
      </div>

      {/* kartlar */}
      <div className="space-y-3">
        {roadmap.map((group) => (
          <div
            key={group.id}
            className="overflow-hidden rounded-xl border border-border bg-card py-1"
          >
            <Node node={group} checked={checked} setNode={setNode} depth={0} />
          </div>
        ))}
      </div>
    </div>
  )
}

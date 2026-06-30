'use client'

import { useState, useEffect } from 'react'
import { ExternalLink, X, Trash2, Copy, Check } from 'lucide-react'

const STORAGE_KEY = 'resources-to-delete'

export function ResourcesClient({ resources }) {
  const [toDelete, setToDelete] = useState([])
  const [copied, setCopied] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      setToDelete(stored)
    } catch {
      setToDelete([])
    }
  }, [])

  const toggle = (url) => {
    setToDelete((prev) => {
      const next = prev.includes(url) ? prev.filter((u) => u !== url) : [...prev, url]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }

  const clearAll = () => {
    localStorage.setItem(STORAGE_KEY, '[]')
    setToDelete([])
  }

  const copyList = async () => {
    const text = toDelete.join('\n')
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (resources.length === 0) {
    return <p className="text-center text-sm text-muted-foreground">No resources yet.</p>
  }

  return (
    <>
      <div className="space-y-10">
        {resources.map((group) => (
          <section key={group.category}>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {group.emoji} {group.category}
            </h2>
            <ul className="space-y-0.5">
              {group.items.map((item, i) => {
                const marked = mounted && toDelete.includes(item.url)
                return (
                  <li key={i} className="flex items-center gap-1">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex flex-1 items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-secondary/50 ${marked ? 'opacity-40' : ''}`}
                    >
                      <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
                      <span className={`font-medium ${marked ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                        {item.title}
                      </span>
                      {item.note && (
                        <span className="ml-1 text-xs text-muted-foreground">{item.note}</span>
                      )}
                    </a>
                    <button
                      onClick={() => toggle(item.url)}
                      className={`rounded p-1 transition-colors ${
                        marked
                          ? 'text-destructive hover:bg-destructive/10'
                          : 'text-muted-foreground/40 hover:text-muted-foreground hover:bg-secondary/50'
                      }`}
                      title={marked ? 'Unmark' : 'Mark for deletion'}
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </div>

      {/* Pending deletions panel */}
      {mounted && toDelete.length > 0 && (
        <div className="mt-12 rounded-lg border border-destructive/30 bg-destructive/5 p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trash2 className="h-4 w-4 text-destructive" />
              <span className="text-sm font-medium text-foreground">
                Marked for deletion
                <span className="ml-2 rounded-full bg-destructive/20 px-2 py-0.5 text-xs text-destructive">
                  {toDelete.length}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={copyList}
                className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? 'Copied' : 'Copy list'}
              </button>
              <button
                onClick={clearAll}
                className="rounded-md px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                Clear
              </button>
            </div>
          </div>
          <ul className="space-y-1">
            {toDelete.map((url) => (
              <li key={url} className="flex items-center justify-between gap-2">
                <span className="truncate text-xs text-muted-foreground">{url}</span>
                <button
                  onClick={() => toggle(url)}
                  className="shrink-0 rounded p-0.5 text-muted-foreground/50 transition-colors hover:text-muted-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

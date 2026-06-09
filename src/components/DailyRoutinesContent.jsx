'use client'

import { useState, useEffect, useCallback } from 'react'

function loadChecked(key) {
  if (typeof window === 'undefined') return {}
  try {
    return JSON.parse(localStorage.getItem(key) || '{}')
  } catch {
    return {}
  }
}

function saveChecked(key, checked) {
  localStorage.setItem(key, JSON.stringify(checked))
}

function TodoChecklist({ items, storageKey = 'daily-routines-checked' }) {
  const [checked, setChecked] = useState({})

  useEffect(() => {
    setChecked(loadChecked(storageKey))
  }, [storageKey])

  const toggle = useCallback((id) => {
    setChecked((prev) => {
      const next = { ...prev, [id]: !prev[id] }
      saveChecked(storageKey, next)
      return next
    })
  }, [storageKey])

  const toggleParent = useCallback((item) => {
    setChecked((prev) => {
      const allChildrenChecked = item.children.every((c) => prev[c.id])
      const next = { ...prev }
      next[item.id] = !allChildrenChecked
      item.children.forEach((c) => {
        next[c.id] = !allChildrenChecked
      })
      saveChecked(storageKey, next)
      return next
    })
  }, [storageKey])

  const totalItems = items.reduce((sum, g) => sum + g.children.length, 0)
  const checkedCount = items.reduce(
    (sum, g) => sum + g.children.filter((c) => checked[c.id]).length,
    0,
  )

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-5 flex items-center justify-between rounded-lg bg-secondary/40 px-4 py-2.5">
        <span className="text-xs font-medium text-muted-foreground">
          {checkedCount} / {totalItems} completed
        </span>
        <div className="h-1.5 w-32 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: totalItems ? `${(checkedCount / totalItems) * 100}%` : '0%' }}
          />
        </div>
      </div>

      <div className="space-y-4">
        {items.map((group) => {
          const groupCheckedCount = group.children.filter((c) => checked[c.id]).length
          const allChecked = group.children.length > 0 && groupCheckedCount === group.children.length
          const someChecked = groupCheckedCount > 0 && !allChecked

          return (
            <div key={group.id} className="rounded-xl border border-border/50 bg-card">
              <button
                onClick={() => toggleParent(group)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-secondary/30"
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-all ${
                    allChecked
                      ? 'border-primary bg-primary text-primary-foreground'
                      : someChecked
                        ? 'border-primary/60 bg-primary/20'
                        : 'border-muted-foreground/30'
                  }`}
                >
                  {allChecked && (
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {someChecked && (
                    <span className="h-0.5 w-2.5 rounded bg-primary" />
                  )}
                </span>
                <span className={`text-sm font-semibold tracking-wide ${allChecked ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                  {group.label}
                </span>
                <span className="ml-auto text-[10px] font-medium text-muted-foreground">
                  {groupCheckedCount}/{group.children.length}
                </span>
              </button>

              <div className="border-t border-border/30 px-4 py-1.5">
                {group.children.map((child) => (
                  <button
                    key={child.id}
                    onClick={() => toggle(child.id)}
                    className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left transition-colors hover:bg-secondary/30"
                  >
                    <span
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border-[1.5px] transition-all ${
                        checked[child.id]
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-muted-foreground/30'
                      }`}
                    >
                      {checked[child.id] && (
                        <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </span>
                    <span className={`text-sm leading-relaxed ${checked[child.id] ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                      {child.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function DailyRoutinesContent({ routineList, title }) {
  return (
    <div>
      <h1 className="mb-6 text-center text-xl font-bold tracking-tight text-foreground sm:text-2xl">
        {title}
      </h1>
      <TodoChecklist items={routineList} storageKey="daily-routines-checked" />
    </div>
  )
}

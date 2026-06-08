'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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

function TodoChecklist({ items, storageKey = 'travel-todo-checked' }) {
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
  }, [])

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
  }, [])

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

function SubCategoryPills({ categories, selected, onSelect }) {
  const scrollRef = useRef(null)
  const [showLeft, setShowLeft] = useState(false)
  const [showRight, setShowRight] = useState(false)

  const updateArrows = () => {
    const el = scrollRef.current
    if (!el) return
    setShowLeft(el.scrollLeft > 0)
    setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1)
  }

  useEffect(() => {
    updateArrows()
    window.addEventListener('resize', updateArrows)
    return () => window.removeEventListener('resize', updateArrows)
  }, [])

  const scroll = (dir) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir * 150, behavior: 'smooth' })
    setTimeout(updateArrows, 300)
  }

  const keys = Object.keys(categories)
  if (keys.length <= 1) return null

  return (
    <div className="relative mb-5">
      {showLeft && (
        <button
          onClick={() => scroll(-1)}
          className="absolute left-0 top-0 z-10 flex h-full items-center bg-gradient-to-r from-background to-transparent pr-4"
        >
          <ChevronLeft className="h-4 w-4 text-muted-foreground" />
        </button>
      )}
      <div
        ref={scrollRef}
        onScroll={updateArrows}
        className="flex gap-2 overflow-x-auto scrollbar-none px-1 py-1"
      >
        {keys.map((key) => (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className={`shrink-0 rounded-full px-3 py-1 text-xs transition-all ${
              selected === key
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary/50 text-muted-foreground hover:text-foreground'
            }`}
          >
            {categories[key].label}
          </button>
        ))}
      </div>
      {showRight && (
        <button
          onClick={() => scroll(1)}
          className="absolute right-0 top-0 z-10 flex h-full items-center bg-gradient-to-l from-background to-transparent pl-4"
        >
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>
      )}
    </div>
  )
}

function NotesList({ categories, selectedCategory }) {
  const cat = categories[selectedCategory]
  const items = cat ? cat.items : []

  if (items.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-sm text-muted-foreground">No notes in this category</p>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      {items.map((item, index) => (
        <div
          key={index}
          className="border-b border-border/50 py-3.5 last:border-0"
        >
          <p className="text-sm leading-relaxed text-foreground">{item}</p>
        </div>
      ))}
    </div>
  )
}

function NotesTabContent({ categories }) {
  const [selected, setSelected] = useState(Object.keys(categories)[0])

  return (
    <div>
      <SubCategoryPills
        categories={categories}
        selected={selected}
        onSelect={setSelected}
      />
      <NotesList categories={categories} selectedCategory={selected} />
    </div>
  )
}

function TabBar({ tabs: allTabs, activeTab, onTabChange }) {
  const scrollRef = useRef(null)
  const [showLeft, setShowLeft] = useState(false)
  const [showRight, setShowRight] = useState(false)

  const updateArrows = () => {
    const el = scrollRef.current
    if (!el) return
    setShowLeft(el.scrollLeft > 0)
    setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1)
  }

  useEffect(() => {
    updateArrows()
    window.addEventListener('resize', updateArrows)
    return () => window.removeEventListener('resize', updateArrows)
  }, [])

  const scroll = (dir) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir * 120, behavior: 'smooth' })
    setTimeout(updateArrows, 300)
  }

  return (
    <div className="relative mb-6">
      {showLeft && (
        <button
          onClick={() => scroll(-1)}
          className="absolute left-0 top-0 z-10 flex h-full items-center bg-gradient-to-r from-background via-background/80 to-transparent pr-3"
        >
          <ChevronLeft className="h-4 w-4 text-muted-foreground" />
        </button>
      )}
      <div
        ref={scrollRef}
        onScroll={updateArrows}
        className="flex gap-1 overflow-x-auto border-b border-border/40 scrollbar-none"
      >
        {allTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onTabChange(tab.value)}
            className={`relative shrink-0 px-3 pb-2.5 pt-1.5 text-xs font-medium transition-colors ${
              activeTab === tab.value
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground/70'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <span>{tab.emoji}</span>
              <span>{tab.label}</span>
            </span>
            {activeTab === tab.value && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-foreground" />
            )}
          </button>
        ))}
      </div>
      {showRight && (
        <button
          onClick={() => scroll(1)}
          className="absolute right-0 top-0 z-10 flex h-full items-center bg-gradient-to-l from-background via-background/80 to-transparent pl-3"
        >
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>
      )}
    </div>
  )
}

function VisaContent({ visaList }) {
  const visaKeys = Object.keys(visaList)
  const [activeVisa, setActiveVisa] = useState(visaKeys[0])
  const visa = visaList[activeVisa]

  return (
    <div>
      {visaKeys.length > 1 && (
        <div className="mb-5 flex gap-2 overflow-x-auto scrollbar-none px-1 py-1">
          {visaKeys.map((key) => (
            <button
              key={key}
              onClick={() => setActiveVisa(key)}
              className={`shrink-0 rounded-full px-3 py-1 text-xs transition-all ${
                activeVisa === key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary/50 text-muted-foreground hover:text-foreground'
              }`}
            >
              {visaList[key].label}
            </button>
          ))}
        </div>
      )}

      {visa && (
        <div>
          <TodoChecklist items={visa.checklist} storageKey={`travel-visa-${activeVisa}-checked`} />

          {visa.notes?.length > 0 && (
            <div className="mx-auto mt-8 w-full max-w-2xl">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Notes & Tips
              </h3>
              <div className="rounded-xl border border-border/50 bg-card">
                {visa.notes.map((note, i) => (
                  <div
                    key={i}
                    className="border-b border-border/30 px-4 py-3.5 last:border-0"
                  >
                    <p className="text-sm leading-relaxed text-foreground">{note}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export function TravelInformationsContent({ tabs, todoList, packingList, visaList, title }) {
  const [activeTab, setActiveTab] = useState('todolist')

  const allTabs = [
    { value: 'todolist', label: 'Todo List', emoji: '✅' },
    { value: 'packing', label: 'Packing', emoji: '🧳' },
    ...Object.keys(tabs).map((key) => ({
      value: key,
      label: tabs[key].label,
      emoji: tabs[key].emoji,
    })),
  ]

  return (
    <div>
      <h1 className="mb-6 text-center text-xl font-bold tracking-tight text-foreground sm:text-2xl">
        {title}
      </h1>

      <TabBar tabs={allTabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'todolist' && (
        <TodoChecklist items={todoList} storageKey="travel-todo-checked" />
      )}

      {activeTab === 'packing' && (
        <TodoChecklist items={packingList} storageKey="travel-packing-checked" />
      )}

      {activeTab === 'visa' && visaList && (
        <VisaContent visaList={visaList} />
      )}

      {Object.keys(tabs).map((key) =>
        activeTab === key && key !== 'visa' ? (
          <NotesTabContent key={key} categories={tabs[key].categories} />
        ) : null,
      )}
    </div>
  )
}

'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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
        <button
          onClick={() => onSelect('all')}
          className={`shrink-0 rounded-full px-3 py-1 text-xs transition-all ${
            selected === 'all'
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary/50 text-muted-foreground hover:text-foreground'
          }`}
        >
          Tümü
        </button>
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
  const notes = []

  if (selectedCategory === 'all') {
    Object.entries(categories).forEach(([, cat]) => {
      cat.items.forEach((item) => {
        notes.push({ category: cat.label, content: item })
      })
    })
  } else {
    const cat = categories[selectedCategory]
    if (cat) {
      cat.items.forEach((item) => {
        notes.push({ category: cat.label, content: item })
      })
    }
  }

  if (notes.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-sm text-muted-foreground">Bu kategoride not yok</p>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      {notes.map((note, index) => (
        <div
          key={index}
          className="border-b border-border/50 py-3.5 last:border-0"
        >
          {selectedCategory === 'all' && (
            <span className="mb-1 inline-block rounded-full bg-secondary/60 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              {note.category}
            </span>
          )}
          {typeof note.content === 'string' ? (
            <p className="text-sm leading-relaxed text-foreground">
              {note.content}
            </p>
          ) : (
            <div>
              <p className="text-sm leading-relaxed text-foreground">
                {note.content.text}
              </p>
              {note.content.subItems?.length > 0 && (
                <ul className="mt-1.5 ml-4 space-y-0.5">
                  {note.content.subItems.map((sub, i) => (
                    <li key={i} className="text-xs leading-relaxed text-muted-foreground">
                      • {sub}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function TabContent({ categories }) {
  const [selected, setSelected] = useState('all')

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

export function LifeTipsContent({ tabs, title }) {
  const tabKeys = Object.keys(tabs)
  const [activeTab, setActiveTab] = useState(tabKeys[0])

  const allTabs = tabKeys.map((key) => ({
    value: key,
    label: tabs[key].label,
    emoji: tabs[key].emoji,
  }))

  return (
    <div>
      <h1 className="mb-6 text-center text-xl font-bold tracking-tight text-foreground sm:text-2xl">
        {title}
      </h1>

      <TabBar tabs={allTabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {tabKeys.map((key) =>
        activeTab === key ? (
          <TabContent key={key} categories={tabs[key].categories} />
        ) : null,
      )}
    </div>
  )
}

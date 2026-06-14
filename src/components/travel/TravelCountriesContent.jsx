'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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

function NoteList({ notes }) {
  return (
    <ul className="space-y-2">
      {notes.map((note, i) => (
        <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-foreground">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/40" />
          <span>{note}</span>
        </li>
      ))}
    </ul>
  )
}

function CountryCard({ country }) {
  const sections = country.sections || null
  const flatNotes = country.notes || []
  const totalCount = sections
    ? sections.reduce((sum, s) => sum + s.notes.length, 0)
    : flatNotes.length

  return (
    <div className="rounded-xl border border-border/50 bg-card">
      <div className="flex items-center gap-2.5 px-4 py-3">
        <span className="text-lg">{country.flag}</span>
        <h3 className="text-sm font-semibold text-foreground">{country.name}</h3>
        <span className="ml-auto text-[10px] font-medium text-muted-foreground">
          {totalCount} not
        </span>
      </div>
      {sections ? (
        <div className="divide-y divide-border/30 border-t border-border/30">
          {sections.map((section) => (
            <div key={section.title} className="px-4 py-2.5">
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {section.title}
              </h4>
              <NoteList notes={section.notes} />
            </div>
          ))}
        </div>
      ) : (
        <div className="border-t border-border/30 px-4 py-2.5">
          <NoteList notes={flatNotes} />
        </div>
      )}
    </div>
  )
}

export function TravelCountriesContent({ tabs, title }) {
  const tabKeys = Object.keys(tabs)
  const [activeTab, setActiveTab] = useState(tabKeys[0])

  const allTabs = tabKeys.map((key) => ({
    value: key,
    label: tabs[key].label,
    emoji: tabs[key].emoji,
  }))

  const currentTab = tabs[activeTab]
  const countries = currentTab?.countries || []
  const generalNotes = currentTab?.generalNotes || []

  return (
    <div>
      <h1 className="mb-6 text-center text-xl font-bold tracking-tight text-foreground sm:text-2xl">
        {title}
      </h1>

      <TabBar tabs={allTabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {countries.length === 0 && generalNotes.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-sm text-muted-foreground">Henüz not eklenmemiş</p>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-2xl space-y-4">
          {generalNotes.length > 0 && (
            <div className="rounded-xl border border-border/50 bg-card">
              <div className="flex items-center gap-2.5 px-4 py-3">
                <span className="text-lg">📝</span>
                <h3 className="text-sm font-semibold text-foreground">Genel Notlar</h3>
                <span className="ml-auto text-[10px] font-medium text-muted-foreground">
                  {generalNotes.length} not
                </span>
              </div>
              <div className="border-t border-border/30 px-4 py-2.5">
                <ul className="space-y-2">
                  {generalNotes.map((note, i) => (
                    <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/40" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {countries.map((country) => (
            <CountryCard key={country.name} country={country} />
          ))}
        </div>
      )}
    </div>
  )
}

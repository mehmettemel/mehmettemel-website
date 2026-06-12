'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { PersonalContent } from './PersonalContent'

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

export function PersonalTabs({ tabs, title }) {
  const tabKeys = Object.keys(tabs)
  const [activeTab, setActiveTab] = useState(tabKeys[0])

  const allTabs = tabKeys.map((key) => ({
    value: key,
    label: tabs[key].label,
    emoji: tabs[key].emoji,
  }))

  return (
    <div>
      <h1 className="mb-6 text-center text-xl font-bold tracking-tight text-foreground">
        {title}
      </h1>

      <TabBar tabs={allTabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {tabKeys.map((key) =>
        activeTab === key ? (
          <PersonalContent
            key={key}
            categories={tabs[key].categories}
            title={tabs[key].label}
            hideHeading
          />
        ) : null,
      )}
    </div>
  )
}

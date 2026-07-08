'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { KeyRound, ChevronLeft, ChevronRight } from 'lucide-react'
import { LoginDialog } from '../auth/LoginDialog'
import { categories as quotesData } from '@/data/personal/quotes'
import { categories as kisiselGelisimData } from '@/data/personal/kisisel-gelisim'
import { categories as iliskilerData } from '@/data/personal/iliskiler'
import { categories as toplumData } from '@/data/personal/toplum'
import { categories as saglikData } from '@/data/personal/saglik'
import { categories as moneyData } from '@/data/personal/money'
import { categories as triviaData } from '@/data/personal/trivia'
import { getAllEnglishWords } from '@/data/english-words'

const ALL_SOURCES = [
  { id: 'saglik', label: 'Sağlık', data: saglikData },
  { id: 'kisisel', label: 'Kişisel Gelişim', data: kisiselGelisimData },
  { id: 'life', label: 'Life', data: moneyData },
  { id: 'kadinlar', label: 'Kadınlar', data: iliskilerData },
  { id: 'toplum', label: 'Toplum', data: toplumData },
  { id: 'quotes', label: 'Quotes', data: quotesData },
  { id: 'trivia', label: 'Trivia', data: triviaData },
  { id: 'ingilizce', label: 'İngilizce', data: null },
]

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildItems(sources) {
  const items = []
  for (const src of sources) {
    if (!src.data) continue
    for (const [cat, val] of Object.entries(src.data)) {
      val.items.forEach((item) => {
        if (typeof item === 'string') {
          items.push({ text: item, subItems: null, source: src.label, category: cat })
        } else {
          items.push({ text: item.text, subItems: item.subItems, source: src.label, category: cat })
        }
      })
    }
  }
  return items
}

export function MobileHome() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [checking, setChecking] = useState(true)
  const [activeTab, setActiveTab] = useState('all')
  const [currentNote, setCurrentNote] = useState(null)
  const [englishWord, setEnglishWord] = useState(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(false)
  const scrollRef = useRef(null)

  const SOURCES = useMemo(() => shuffle(ALL_SOURCES), [])
  const allItems = useMemo(() => buildItems(SOURCES), [SOURCES])
  const allEnglishWords = useMemo(() => getAllEnglishWords(), [])

  useEffect(() => {
    fetch('/api/auth/session')
      .then((res) => res.json())
      .then((data) => setIsAuthenticated(data.authenticated))
      .catch(() => setIsAuthenticated(false))
      .finally(() => setChecking(false))
  }, [])

  const updateArrows = () => {
    const el = scrollRef.current
    if (!el) return
    setShowLeftArrow(el.scrollLeft > 0)
    setShowRightArrow(el.scrollLeft < el.scrollWidth - el.clientWidth - 1)
  }

  useEffect(() => {
    updateArrows()
    window.addEventListener('resize', updateArrows)
    return () => window.removeEventListener('resize', updateArrows)
  }, [isAuthenticated])

  const scroll = (dir) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir * 150, behavior: 'smooth' })
    setTimeout(updateArrows, 300)
  }

  const getItemsForTab = (tabId) => {
    if (tabId === 'all') return allItems
    const src = SOURCES.find((s) => s.id === tabId)
    if (!src || !src.data) return []
    return buildItems([src])
  }

  const handleRandom = () => {
    if (activeTab === 'ingilizce') {
      getRandomEnglish()
      return
    }
    const items = getItemsForTab(activeTab)
    if (items.length > 0) {
      const idx = Math.floor(Math.random() * items.length)
      setCurrentNote(items[idx])
    }
    setEnglishWord(null)
  }

  const getRandomEnglish = () => {
    setCurrentNote(null)
    const idx = Math.floor(Math.random() * allEnglishWords.length)
    setEnglishWord(allEnglishWords[idx])
  }

  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
    setCurrentNote(null)
    setEnglishWord(null)
  }

  if (checking) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-2 pt-4 md:hidden">
        <div className="space-y-3 w-full max-w-xs">
          <div className="mx-auto h-5 w-32 animate-pulse rounded bg-muted" />
          <div className="mx-auto h-3 w-24 animate-pulse rounded bg-muted" />
          <div className="mt-6 h-10 w-full animate-pulse rounded-full bg-muted" />
        </div>
      </div>
    )
  }

  const visibleTabs = isAuthenticated
    ? SOURCES
    : SOURCES.filter((s) => s.id === 'ingilizce')

  const showPersonalNote = activeTab !== 'ingilizce'
  const hasContent = currentNote || englishWord

  const randomButton = typeof document !== 'undefined' && createPortal(
    <div
      className="md:hidden"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        padding: '12px 16px',
        paddingBottom: 'max(20px, env(safe-area-inset-bottom))',
        background: 'hsl(var(--background) / 0.8)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <button
        onClick={handleRandom}
        className="w-full rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground shadow-md transition-all active:scale-95"
      >
        Rastgele
      </button>
    </div>,
    document.body,
  )

  return (
    <>
      <div className="px-2 pb-24 pt-4 md:hidden">
        {/* Header */}
        <div className="mb-3 flex items-center justify-center gap-2">
          <h1 className="text-lg font-bold tracking-tight text-foreground">
            Mehmet Temel
          </h1>
          {!isAuthenticated && (
            <button
              onClick={() => setShowLogin(true)}
              className="flex items-center text-muted-foreground transition-all hover:text-foreground"
              aria-label="Giriş yap"
            >
              <KeyRound className="h-3.5 w-3.5 animate-pulse" />
            </button>
          )}
        </div>

        {/* Sticky tabs only */}
        <div className="sticky top-[49px] z-40 bg-background pb-3 -mx-2 px-2">
          <div className="relative">
            {showLeftArrow && (
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
              {isAuthenticated && (
                <button
                  onClick={() => handleTabChange('all')}
                  className={`shrink-0 rounded-full px-3 py-1 text-xs transition-all ${
                    activeTab === 'all'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary/50 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Tümü
                </button>
              )}
              {visibleTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`shrink-0 rounded-full px-3 py-1 text-xs transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary/50 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            {showRightArrow && (
              <button
                onClick={() => scroll(1)}
                className="absolute right-0 top-0 z-10 flex h-full items-center bg-gradient-to-l from-background to-transparent pl-4"
              >
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="mt-4">
          <div className="rounded-lg border border-border bg-card p-6 min-h-[200px]">
            {/* Personal note */}
            {showPersonalNote && currentNote && (
              <>
                <div className="mb-3 text-xs text-muted-foreground">
                  {currentNote.source} — {currentNote.category}
                </div>
                <p className="text-sm leading-relaxed text-foreground">
                  {currentNote.text}
                </p>
                {currentNote.subItems?.length > 0 && (
                  <ul className="mt-2 ml-4 space-y-1">
                    {currentNote.subItems.map((sub, i) => (
                      <li key={i} className="text-xs leading-relaxed text-muted-foreground">• {sub}</li>
                    ))}
                  </ul>
                )}
              </>
            )}

            {/* English */}
            {activeTab === 'ingilizce' && englishWord && (
              <>
                <div className="mb-3">
                  <h2 className="text-xl font-bold text-foreground">
                    {englishWord.english}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {englishWord.turkish}
                  </p>
                </div>
                <div className="space-y-2 border-t border-border pt-3">
                  <p className="text-sm leading-relaxed text-foreground">
                    {englishWord.example}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {englishWord.example_turkish}
                  </p>
                </div>
              </>
            )}

            {/* Empty state */}
            {!hasContent && (
              <div className="flex h-40 items-center justify-center">
                <p className="text-sm text-muted-foreground">
                  Butona bas, rastgele gelsin
                </p>
              </div>
            )}
          </div>
        </div>

        <LoginDialog open={showLogin} onOpenChange={setShowLogin} />
      </div>

      {randomButton}
    </>
  )
}

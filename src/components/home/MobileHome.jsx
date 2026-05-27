'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { KeyRound } from 'lucide-react'
import { LoginDialog } from '../auth/LoginDialog'
import { categories as quotesData } from '@/data/personal/quotes'
import { categories as kisiselGelisimData } from '@/data/personal/kisisel-gelisim'
import { categories as iliskilerData } from '@/data/personal/iliskiler'
import { categories as toplumData } from '@/data/personal/toplum'
import { categories as saglikData } from '@/data/personal/saglik'
import { categories as moneyData } from '@/data/personal/money'
import { categories as triviaData } from '@/data/personal/trivia'
import { getAllEnglishWords } from '@/data/english-words'

function getAllPersonalItems() {
  const items = []
  const addItems = (data, source) => {
    for (const [cat, val] of Object.entries(data)) {
      val.items.forEach((item) => {
        if (typeof item === 'string') {
          items.push({ text: item, subItems: null, source, category: cat })
        } else {
          items.push({ text: item.text, subItems: item.subItems, source, category: cat })
        }
      })
    }
  }
  addItems(quotesData, 'Quotes')
  addItems(kisiselGelisimData, 'Kişisel Gelişim')
  addItems(iliskilerData, 'İlişkiler')
  addItems(toplumData, 'Toplum')
  addItems(saglikData, 'Sağlık')
  addItems(moneyData, 'Money')
  addItems(triviaData, 'Trivia')
  return items
}

export function MobileHome() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [checking, setChecking] = useState(true)
  const [currentNote, setCurrentNote] = useState(null)
  const [incelemeItem, setIncelemeItem] = useState(null)
  const [englishWord, setEnglishWord] = useState(null)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('personal')

  const allPersonalItems = useMemo(() => getAllPersonalItems(), [])
  const allEnglishWords = useMemo(() => getAllEnglishWords(), [])

  useEffect(() => {
    fetch('/api/auth/session')
      .then((res) => res.json())
      .then((data) => setIsAuthenticated(data.authenticated))
      .catch(() => setIsAuthenticated(false))
      .finally(() => setChecking(false))
  }, [])

  const getRandomPersonal = () => {
    const idx = Math.floor(Math.random() * allPersonalItems.length)
    setCurrentNote(allPersonalItems[idx])
  }

  const getRandomInceleme = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/rastgele')
      if (res.ok) {
        const data = await res.json()
        setIncelemeItem(data.item)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const getRandomEnglish = () => {
    const idx = Math.floor(Math.random() * allEnglishWords.length)
    setEnglishWord(allEnglishWords[idx])
  }

  const handleRandom = () => {
    if (activeTab === 'personal') getRandomPersonal()
    else if (activeTab === 'incelemeler') getRandomInceleme()
    else if (activeTab === 'ingilizce') getRandomEnglish()
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

  const TABS = isAuthenticated
    ? [
        { id: 'personal', color: 'bg-amber-500' },
        { id: 'incelemeler', color: 'bg-blue-500' },
        { id: 'ingilizce', color: 'bg-emerald-500' },
      ]
    : [
        { id: 'incelemeler', color: 'bg-blue-500' },
        { id: 'ingilizce', color: 'bg-emerald-500' },
      ]

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col px-2 pb-20 pt-4 md:hidden">
      {/* Sticky top */}
      <div className="sticky top-0 z-40 bg-background pb-3">
        <div className="mb-3 text-center">
          <h1 className="text-lg font-bold tracking-tight text-foreground">
            Mehmet Temel
          </h1>
          <p className="text-xs text-muted-foreground">dijital koleksiyonum</p>
        </div>

        {/* Tabs */}
        <div className="mb-3 flex items-center justify-center gap-6">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`h-5 w-5 rounded-full transition-all ${tab.color} ${
                activeTab === tab.id
                  ? 'scale-110 ring-2 ring-offset-3 ring-offset-background ring-current'
                  : 'opacity-35'
              }`}
              aria-label={tab.id}
            />
          ))}
          {!isAuthenticated && (
            <button
              onClick={() => setShowLogin(true)}
              className="flex items-center gap-1 text-muted-foreground transition-all hover:text-foreground"
              aria-label="Giriş yap"
            >
              <KeyRound className="h-4 w-4 animate-pulse" />
            </button>
          )}
        </div>

      </div>

      {/* Content */}
      <div className="mt-4 flex-1">
        <div className="rounded-lg border border-border bg-card p-6 min-h-[200px]">
          {/* Personal */}
          {activeTab === 'personal' && currentNote && (
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

          {/* Incelemeler */}
          {activeTab === 'incelemeler' && loading && (
            <div className="animate-pulse space-y-3">
              <div className="h-3 w-24 rounded bg-muted"></div>
              <div className="h-5 w-3/4 rounded bg-muted"></div>
              <div className="h-4 w-full rounded bg-muted"></div>
              <div className="h-4 w-5/6 rounded bg-muted"></div>
            </div>
          )}

          {activeTab === 'incelemeler' && !loading && incelemeItem && (
            <>
              <div className="mb-1 text-xs text-muted-foreground">
                {incelemeItem.author}
              </div>
              <Link
                href={`/incelemeler/${incelemeItem.slug}`}
                className="mb-3 block text-base font-semibold text-foreground hover:opacity-70"
              >
                {incelemeItem.bookTitle}
              </Link>
              <h3 className="mb-2 text-sm font-medium text-foreground">
                {incelemeItem.noteTitle}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {incelemeItem.noteContent}
              </p>
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

          {/* Empty states */}
          {activeTab === 'personal' && !currentNote && (
            <div className="flex h-40 items-center justify-center">
              <p className="text-sm text-muted-foreground">
                Butona bas, rastgele bir not gelsin
              </p>
            </div>
          )}
          {activeTab === 'incelemeler' && !loading && !incelemeItem && (
            <div className="flex h-40 items-center justify-center">
              <p className="text-sm text-muted-foreground">
                Butona bas, rastgele bir inceleme gelsin
              </p>
            </div>
          )}
          {activeTab === 'ingilizce' && !englishWord && (
            <div className="flex h-40 items-center justify-center">
              <p className="text-sm text-muted-foreground">
                Butona bas, rastgele bir kelime gelsin
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Fixed bottom random button */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/80 px-4 pb-5 pt-3 backdrop-blur-md md:hidden">
        <button
          onClick={handleRandom}
          disabled={loading}
          className="w-full rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground shadow-md transition-all active:scale-95 disabled:opacity-50"
        >
          {loading ? '...' : 'Rastgele'}
        </button>
      </div>

      <LoginDialog open={showLogin} onOpenChange={setShowLogin} />
    </div>
  )
}

'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { getAllEnglishWords } from '@/data/english-words'

const TABS = [
  { id: 'alintilar', color: 'bg-amber-500' },
  { id: 'incelemeler', color: 'bg-blue-500' },
  { id: 'ingilizce', color: 'bg-emerald-500' },
]

export function MobileHome({ allNotes: propNotes, noteCategories: propCategories }) {
  const [activeTab, setActiveTab] = useState('alintilar')
  const [currentNote, setCurrentNote] = useState(null)
  const [incelemeItem, setIncelemeItem] = useState(null)
  const [englishWord, setEnglishWord] = useState(null)
  const [loading, setLoading] = useState(false)

  const allNotes = useMemo(() => propNotes || [], [propNotes])
  const allEnglishWords = useMemo(() => getAllEnglishWords(), [])

  const getRandomNote = () => {
    const randomIndex = Math.floor(Math.random() * allNotes.length)
    setCurrentNote(allNotes[randomIndex])
  }

  const getRandomInceleme = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/rastgele')
      if (response.ok) {
        const data = await response.json()
        setIncelemeItem(data.item)
      }
    } catch (err) {
      console.error('Error fetching inceleme:', err)
    } finally {
      setLoading(false)
    }
  }

  const getRandomEnglish = () => {
    const randomIndex = Math.floor(Math.random() * allEnglishWords.length)
    setEnglishWord(allEnglishWords[randomIndex])
  }

  const handleRandom = () => {
    if (activeTab === 'alintilar') getRandomNote()
    else if (activeTab === 'incelemeler') getRandomInceleme()
    else if (activeTab === 'ingilizce') getRandomEnglish()
  }

  const getCategoryName = (id) => {
    const cat = (propCategories || []).find((c) => c.id === id)
    return cat ? `${cat.icon} ${cat.name}` : id
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col px-2 pb-20 pt-4 md:hidden">
      {/* Minimal hero */}
      <div className="mb-4 text-center">
        <h1 className="text-lg font-bold tracking-tight text-foreground">
          Mehmet Temel
        </h1>
        <p className="text-xs text-muted-foreground">dijital koleksiyonum</p>
      </div>

      {/* Tabs - colored circles */}
      <div className="mb-4 flex items-center justify-center gap-6">
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
      </div>

      {/* Content Area */}
      <div className="mb-4 flex-1">
        {/* Alintilar */}
        {activeTab === 'alintilar' && currentNote && (
          <div className="rounded-lg border border-border bg-card p-5">
            <div className="mb-2 text-xs text-muted-foreground">
              {getCategoryName(currentNote.category)}
            </div>
            <p className="text-sm leading-relaxed text-foreground">
              {currentNote.text}
            </p>
            {currentNote.author && (
              <p className="mt-3 text-xs text-muted-foreground">
                — {currentNote.author}
              </p>
            )}
          </div>
        )}

        {/* Incelemeler */}
        {activeTab === 'incelemeler' && loading && (
          <div className="rounded-lg border border-border bg-card p-5">
            <div className="animate-pulse space-y-3">
              <div className="h-3 w-24 rounded bg-muted"></div>
              <div className="h-5 w-3/4 rounded bg-muted"></div>
              <div className="h-4 w-full rounded bg-muted"></div>
              <div className="h-4 w-5/6 rounded bg-muted"></div>
            </div>
          </div>
        )}

        {activeTab === 'incelemeler' && !loading && incelemeItem && (
          <div className="rounded-lg border border-border bg-card p-5">
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
          </div>
        )}

        {/* English */}
        {activeTab === 'ingilizce' && englishWord && (
          <div className="rounded-lg border border-border bg-card p-5">
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
          </div>
        )}

        {/* Empty states */}
        {!currentNote && activeTab === 'alintilar' && (
          <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-border">
            <p className="text-sm text-muted-foreground">
              Butona bas, rastgele bir alıntı gelsin
            </p>
          </div>
        )}
        {!incelemeItem && !loading && activeTab === 'incelemeler' && (
          <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-border">
            <p className="text-sm text-muted-foreground">
              Butona bas, rastgele bir inceleme gelsin
            </p>
          </div>
        )}
        {!englishWord && activeTab === 'ingilizce' && (
          <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-border">
            <p className="text-sm text-muted-foreground">
              Butona bas, rastgele bir kelime gelsin
            </p>
          </div>
        )}
      </div>

      {/* Sticky minimal random button */}
      <div className="fixed bottom-6 left-0 right-0 z-40 flex justify-center md:hidden">
        <button
          onClick={handleRandom}
          disabled={loading}
          className="rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow-md transition-all active:scale-95 disabled:opacity-50"
        >
          {loading ? '...' : 'Rastgele'}
        </button>
      </div>
    </div>
  )
}

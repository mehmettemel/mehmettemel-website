'use client'

import { Container } from '@/components/Container'
import { useState, useMemo } from 'react'
import { getAllNotes, noteCategories } from '@/data/notes'
import Link from 'next/link'

const TABS = [
  { id: 'alintilar', label: 'Alintiler' },
  { id: 'incelemeler', label: 'Incelemeler' },
]

export default function RastgelePage() {
  const [activeTab, setActiveTab] = useState('alintilar')
  const [currentNote, setCurrentNote] = useState(null)
  const [incelemeItem, setIncelemeItem] = useState(null)
  const [loading, setLoading] = useState(false)

  const allNotes = useMemo(() => getAllNotes(), [])

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

  const handleRandom = () => {
    if (activeTab === 'alintilar') {
      getRandomNote()
    } else {
      getRandomInceleme()
    }
  }

  const getCategoryName = (id) => {
    const cat = noteCategories.find((c) => c.id === id)
    return cat ? `${cat.icon} ${cat.name}` : id
  }

  return (
    <Container>
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md flex-col px-2 py-6">
        {/* Tabs */}
        <div className="mb-6 flex rounded-lg border border-border bg-card p-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 rounded-md px-4 py-2.5 text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="mb-6 flex-1">
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

          {/* Empty state */}
          {!currentNote && activeTab === 'alintilar' && (
            <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-border">
              <p className="text-sm text-muted-foreground">
                Butona bas, rastgele bir alinti gelsin
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
        </div>

        {/* Big Random Button */}
        <button
          onClick={handleRandom}
          disabled={loading}
          className="w-full rounded-xl bg-primary py-5 text-lg font-bold text-primary-foreground shadow-lg transition-all active:scale-[0.97] disabled:opacity-50"
        >
          {loading ? '...' : 'Rastgele'}
        </button>
      </div>
    </Container>
  )
}

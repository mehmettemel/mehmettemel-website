'use client'

import { Container } from '@/components/Container'
import { useState, useMemo } from 'react'
import { categories as quotesData } from '@/data/personal/quotes'
import { getAllEnglishWords } from '@/data/english-words'

const TABS = [
  { id: 'quotes', label: 'Quotes' },
  { id: 'ingilizce', label: 'English' },
]

export default function RastgelePage() {
  const [activeTab, setActiveTab] = useState('quotes')
  const [currentNote, setCurrentNote] = useState(null)
  const [englishWord, setEnglishWord] = useState(null)

  const allQuotes = useMemo(() => quotesData['Quotes'].items, [])
  const allEnglishWords = useMemo(() => getAllEnglishWords(), [])

  const getRandomNote = () => {
    const randomIndex = Math.floor(Math.random() * allQuotes.length)
    setCurrentNote(allQuotes[randomIndex])
  }

  const getRandomEnglish = () => {
    const randomIndex = Math.floor(Math.random() * allEnglishWords.length)
    setEnglishWord(allEnglishWords[randomIndex])
  }

  const handleRandom = () => {
    if (activeTab === 'quotes') getRandomNote()
    else if (activeTab === 'ingilizce') getRandomEnglish()
  }

  return (
    <Container>
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md flex-col px-2 py-6">
        {/* Tabs */}
        <div className="mb-6 grid grid-cols-2 rounded-lg border border-border bg-card p-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-md px-2 py-2.5 text-xs font-medium transition-all ${
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
          {activeTab === 'quotes' && currentNote && (
            <div className="rounded-lg border border-border bg-card p-5">
              <p className="text-sm leading-relaxed text-foreground">
                {currentNote}
              </p>
            </div>
          )}

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

          {!currentNote && activeTab === 'quotes' && (
            <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-border">
              <p className="text-sm text-muted-foreground">
                Butona bas, rastgele bir alinti gelsin
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

        <button
          onClick={handleRandom}
          className="w-full rounded-xl bg-primary py-5 text-lg font-bold text-primary-foreground shadow-lg transition-all active:scale-[0.97]"
        >
          Rastgele
        </button>
      </div>
    </Container>
  )
}

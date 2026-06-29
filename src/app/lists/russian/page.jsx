'use client'

import { useState } from 'react'
import { Container } from '@/components/Container'
import { RussianCard } from '@/components/russian/RussianCard'
import { ConversationCard } from '@/components/russian/ConversationCard'
import { russianTabs, getRussianByTab, russianConversations } from '@/data/russian'

export default function RussianPage() {
  const [activeTab, setActiveTab] = useState(russianTabs[0].id)

  const isConversations = activeTab === 'konusma'
  const phrases = isConversations ? [] : getRussianByTab(activeTab)

  return (
    <Container>
      <div className="mx-auto max-w-7xl py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-2 flex items-center justify-center gap-3">
            <span className="text-4xl" role="img" aria-label="Russian">🇷🇺</span>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Rusça
            </h1>
          </div>
          <p className="text-base text-muted-foreground">
            Günlük hayatta kullanılabilecek Rusça kelime ve cümleler
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {russianTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground'
              }`}
            >
              <span>{tab.emoji}</span>
              <span>{tab.label}</span>
              <span className="ml-0.5 text-xs opacity-60">
                ({tab.id === 'konusma' ? russianConversations.length : getRussianByTab(tab.id).length})
              </span>
            </button>
          ))}
        </div>

        {/* Conversations */}
        {isConversations && (
          <div className="grid gap-4 sm:grid-cols-2">
            {russianConversations.map((conv) => (
              <ConversationCard key={conv.id} conversation={conv} />
            ))}
          </div>
        )}

        {/* Phrase Cards Grid */}
        {!isConversations && (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {phrases.map((phrase) => (
              <RussianCard key={phrase.id} phrase={phrase} />
            ))}
          </div>
        )}
      </div>
    </Container>
  )
}

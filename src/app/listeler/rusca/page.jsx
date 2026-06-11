'use client'

import { useState, useEffect, useCallback } from 'react'
import { Container } from '@/components/Container'
import { RussianCard } from '@/components/russian/RussianCard'
import { RandomCircleButton } from '@/components/ui/random-circle-button'
import { russianPhrases } from '@/data/russian'

export default function RussianPage() {
  const [currentPhrase, setCurrentPhrase] = useState(null)

  const getRandomPhrase = useCallback(() => {
    if (russianPhrases.length > 0) {
      const randomIndex = Math.floor(Math.random() * russianPhrases.length)
      setCurrentPhrase(russianPhrases[randomIndex])
    }
  }, [])

  // Set initial phrase
  useEffect(() => {
    getRandomPhrase()
  }, [getRandomPhrase])

  // Auto-rotate every 10 seconds
  useEffect(() => {
    const interval = setInterval(getRandomPhrase, 10000)
    return () => clearInterval(interval)
  }, [getRandomPhrase])

  return (
    <Container>
      <div className="mx-auto max-w-7xl py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-2 flex items-center justify-center gap-3">
            <span className="text-4xl" role="img" aria-label="Russian">
              🇷🇺
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Rusça
            </h1>
          </div>
          <p className="text-base text-muted-foreground">
            Günlük hayatta kullanılabilecek Rusça kelime ve cümleler
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Toplam {russianPhrases.length} kelime/cümle
          </p>
        </div>

        {/* Random Button */}
        <div className="mb-8 flex justify-center">
          <RandomCircleButton onClick={getRandomPhrase} />
        </div>

        {/* Single Card Display */}
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            {currentPhrase && <RussianCard phrase={currentPhrase} />}
          </div>
        </div>
      </div>
    </Container>
  )
}

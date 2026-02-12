'use client'

import { useState, useMemo } from 'react'
import { EnglishCard } from '@/components/english/EnglishCard'
import { RandomCircleButton } from '@/components/ui/random-circle-button'
import { getRandomEnglishWord } from '@/data/english'

export function EnglishPageClient({ words }) {
  const [currentWord, setCurrentWord] = useState(null)

  // Set initial word when component mounts
  useMemo(() => {
    if (words.length > 0) {
      setCurrentWord(getRandomEnglishWord(words))
    }
  }, [words])

  // Get random word
  const getRandomWord = () => {
    if (words.length > 0) {
      setCurrentWord(getRandomEnglishWord(words))
    }
  }

  // If no words yet
  if (words.length === 0) {
    return (
      <div className="flex justify-center">
        <div className="w-full max-w-2xl">
          <EnglishCard word={null} />
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Random Button */}
      <div className="mb-8 flex justify-center">
        <RandomCircleButton onClick={getRandomWord} />
      </div>

      {/* Single Card Display */}
      <div className="flex justify-center">
        <div className="w-full max-w-2xl">
          {currentWord && <EnglishCard word={currentWord} />}
        </div>
      </div>
    </>
  )
}

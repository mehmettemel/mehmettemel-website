'use client'

import { useState, useEffect } from 'react'
import { englishWords } from '@/data/english-words'

/**
 * Hook to manage English words for the floating widget
 */
export function useEnglishWords() {
  const [currentWord, setCurrentWord] = useState(null)

  // Set initial random word on mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * englishWords.length)
    setCurrentWord(englishWords[randomIndex])
  }, [])

  // Rotate word every 20 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * englishWords.length)
      setCurrentWord(englishWords[randomIndex])
    }, 20000)

    return () => clearInterval(interval)
  }, [])

  return { currentWord, loading: false }
}

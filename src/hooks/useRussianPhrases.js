'use client'

import { useState, useEffect } from 'react'
import { russianPhrases } from '@/data/russian'

/**
 * Hook to manage Russian phrases for the floating widget
 */
export function useRussianPhrases() {
  const [currentPhrase, setCurrentPhrase] = useState(null)

  // Set initial random phrase
  useEffect(() => {
    if (russianPhrases.length > 0) {
      const randomIndex = Math.floor(Math.random() * russianPhrases.length)
      setCurrentPhrase(russianPhrases[randomIndex])
    }
  }, [])

  // Rotate phrase every 20 seconds
  useEffect(() => {
    if (russianPhrases.length === 0) return

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * russianPhrases.length)
      setCurrentPhrase(russianPhrases[randomIndex])
    }, 20000) // 20 seconds

    return () => clearInterval(interval)
  }, [])

  return { currentPhrase }
}

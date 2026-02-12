'use client'

import { useState, useEffect } from 'react'

/**
 * Hook to fetch and manage English words for the floating widget
 */
export function useEnglishWords() {
  const [words, setWords] = useState([])
  const [currentWord, setCurrentWord] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fetch words on mount
  useEffect(() => {
    async function fetchWords() {
      try {
        const response = await fetch('/api/english-words')
        const data = await response.json()
        if (data.words && data.words.length > 0) {
          setWords(data.words)
          // Set initial random word
          const randomIndex = Math.floor(Math.random() * data.words.length)
          setCurrentWord(data.words[randomIndex])
        }
      } catch (error) {
        console.error('Failed to fetch English words:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchWords()
  }, [])

  // Rotate word every 20 seconds
  useEffect(() => {
    if (words.length === 0) return

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * words.length)
      setCurrentWord(words[randomIndex])
    }, 20000) // 20 seconds

    return () => clearInterval(interval)
  }, [words])

  return { currentWord, loading }
}

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '../auth/AuthProvider'

function getDisplayText(note) {
  if (note.text) {
    return `"${note.text}"`
  }
  return 'Not'
}

export function RecentDiscoveries({ notes }) {
  const { isAuthenticated, loading } = useAuth()
  const [randomNotes, setRandomNotes] = useState([])

  useEffect(() => {
    if (notes && notes.length > 0) {
      const shuffled = [...notes].sort(() => Math.random() - 0.5)
      setRandomNotes(shuffled.slice(0, 5))
    }
  }, [notes])

  if (loading || !isAuthenticated || !randomNotes || randomNotes.length === 0) return null

  return (
    <section>
      <div className="mb-6 text-center">
        <h2 className="text-xs font-normal text-muted-foreground">
          Quotes
        </h2>
      </div>

      <div className="mx-auto w-full max-w-md space-y-3">
        {randomNotes.map((note) => (
          <div key={note.id} className="w-full text-center">
            <Link
              href="/lists/personal/quotes"
              className="block w-full text-xs font-normal text-foreground transition-opacity hover:opacity-60"
            >
              {getDisplayText(note)}
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/lists/personal/quotes"
          className="text-xs text-muted-foreground transition-opacity hover:opacity-60"
        >
          Tümünü Gör →
        </Link>
      </div>
    </section>
  )
}

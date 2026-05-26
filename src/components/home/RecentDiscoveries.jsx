'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { KeyRound } from 'lucide-react'
import { LoginDialog } from '../auth/LoginDialog'

function getDisplayText(note) {
  if (note.text) {
    const truncated =
      note.text.length > 60 ? note.text.substring(0, 60) + '...' : note.text
    return `"${truncated}"`
  }
  return 'Not'
}

export function RecentDiscoveries({ notes }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    fetch('/api/auth/session')
      .then((res) => res.json())
      .then((data) => setIsAuthenticated(data.authenticated))
      .catch(() => setIsAuthenticated(false))
  }, [])

  if (!mounted) return null

  if (!isAuthenticated) {
    return (
      <>
        <section>
          <button
            onClick={() => setShowLogin(true)}
            className="group mx-auto flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <KeyRound className="h-3.5 w-3.5 transition-transform group-hover:rotate-12 group-hover:scale-110" />
            <span>Kişisel notlarına erişmek için giriş yap</span>
          </button>
        </section>
        <LoginDialog open={showLogin} onOpenChange={setShowLogin} />
      </>
    )
  }

  if (!notes || notes.length === 0) return null

  return (
    <section>
      <div className="mb-6 text-center">
        <h2 className="text-xs font-normal text-muted-foreground">
          Sevdiğim Sözler
        </h2>
      </div>

      <div className="mx-auto w-full max-w-md space-y-3">
        {notes.slice(0, 5).map((note) => (
          <div key={note.id} className="w-full text-center">
            <Link
              href="/listeler/personal/sozler"
              className="block w-full text-xs font-normal text-foreground transition-opacity hover:opacity-60"
            >
              {getDisplayText(note)}
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/listeler/personal/sozler"
          className="text-xs text-muted-foreground transition-opacity hover:opacity-60"
        >
          Tümünü Gör →
        </Link>
      </div>
    </section>
  )
}

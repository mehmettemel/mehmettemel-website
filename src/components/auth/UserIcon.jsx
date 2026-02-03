'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { LoginDialog } from './LoginDialog'
import { cn } from '@/lib/utils'
import { ShieldCheck } from 'lucide-react'

export function UserIcon({ className }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    checkSession()

    // Check if login is required from URL params
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const loginParam = urlParams.get('login')
      if (loginParam === 'required' || loginParam === 'expired') {
        setShowLogin(true)
        // Remove the query param from URL
        urlParams.delete('login')
        const newUrl = window.location.pathname + (urlParams.toString() ? '?' + urlParams.toString() : '')
        window.history.replaceState({}, '', newUrl)
      }
    }
  }, [])

  const checkSession = async () => {
    try {
      const res = await fetch('/api/auth/session')
      const data = await res.json()
      setIsAuthenticated(data.authenticated)
    } catch (error) {
      console.error('Session check error:', error)
      setIsAuthenticated(false)
    }
  }

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <button
        className={cn(
          'inline-flex h-9 items-center justify-center rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
          className,
        )}
        disabled
        aria-label="Admin"
      >
        <ShieldCheck className="h-5 w-5 opacity-0" />
      </button>
    )
  }

  const handleClick = () => {
    if (isAuthenticated) {
      router.push('/listeler/personal')
    } else {
      setShowLogin(true)
    }
  }

  return (
    <>
      <button
        onClick={handleClick}
        className={cn(
          'inline-flex h-9 items-center justify-center rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
          'text-muted-foreground hover:bg-secondary/50 hover:text-foreground',
          className,
        )}
        aria-label={isAuthenticated ? 'Go to admin' : 'Login'}
      >
        <ShieldCheck className="h-5 w-5" />
      </button>
      <LoginDialog open={showLogin} onOpenChange={setShowLogin} />
    </>
  )
}

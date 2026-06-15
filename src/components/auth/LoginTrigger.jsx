'use client'

import { useState, useEffect } from 'react'
import { LoginDialog } from './LoginDialog'

export function LoginTrigger() {
  const [showLogin, setShowLogin] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const urlParams = new URLSearchParams(window.location.search)
    const loginParam = urlParams.get('login')
    if (loginParam === 'required' || loginParam === 'expired') {
      setShowLogin(true)
      urlParams.delete('login')
      const newUrl =
        window.location.pathname +
        (urlParams.toString() ? '?' + urlParams.toString() : '')
      window.history.replaceState({}, '', newUrl)
    }
  }, [])

  return <LoginDialog open={showLogin} onOpenChange={setShowLogin} />
}

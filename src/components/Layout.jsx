'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Navbar } from './Navbar'
import { EnglishFloatingWidget } from './language-widgets/EnglishFloatingWidget'
import { RussianFloatingWidget } from './language-widgets/RussianFloatingWidget'

export function Layout({ children }) {
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Gazete sayfası kendi başına bir dünya — site kromu gizlenir
  const isStandalone = pathname === '/gazete'

  useEffect(() => {
    fetch('/api/auth/session')
      .then((res) => res.json())
      .then((data) => setIsAuthenticated(data.authenticated))
      .catch(() => setIsAuthenticated(false))
  }, [])

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      {!isStandalone && <Navbar />}
      <main className="flex-auto">
        <div key={pathname} className="min-h-full">
          {children}
        </div>
      </main>

      {/* Language Learning Floating Widgets */}
      {!isStandalone && isAuthenticated && <EnglishFloatingWidget />}
      {!isStandalone && isAuthenticated && <RussianFloatingWidget />}
    </div>
  )
}

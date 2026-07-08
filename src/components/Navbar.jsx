'use client'

import { Menu, KeyRound } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion'
import { AnimatedThemeToggle } from './ui/animated-theme-toggle'
import { SkillsIcon } from './auth/SkillsIcon'
import { QuickNotes } from './QuickNotes'
import { LoginDialog } from './auth/LoginDialog'
import { Container } from './Container'
import { useAuth } from './auth/AuthProvider'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu'

const listsItems = [
  { href: '/lists/entrepreneurship', label: 'Entrepreneur', emoji: '💼' },
  { href: '/lists/life-tips', label: 'Life Tips', emoji: '💡' },
  { href: '/lists/w2b', label: 'W2B', emoji: '🛒' },
  { href: '/lists/travel', label: 'Travel', emoji: '✈️' },
  { href: '/lists/recipes', label: 'Recipes', emoji: '🍳' },
  { href: '/lists/english', label: 'English', emoji: '🇬🇧' },
  { href: '/lists/russian', label: 'Russian', emoji: '🇷🇺' },
  { href: '/lists/questions', label: 'Questions', emoji: '❓' },
  { href: '/lists/claude', label: 'Claude', emoji: '🤖' },
]

function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="inline-flex h-9 items-center justify-center rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-95"
    >
      {children}
    </Link>
  )
}

function AuthButton() {
  const { isAuthenticated, loading, refresh } = useAuth()
  const [showLogin, setShowLogin] = useState(false)

  // Handle ?login=required / ?login=expired params
  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const loginParam = params.get('login')
    if (loginParam === 'required' || loginParam === 'expired') {
      setShowLogin(true)
      params.delete('login')
      const newUrl = window.location.pathname + (params.toString() ? '?' + params.toString() : '')
      window.history.replaceState({}, '', newUrl)
    }
  }, [])

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    await refresh()
  }

  if (loading) {
    return (
      <button
        className="inline-flex h-9 items-center justify-center rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground opacity-0"
        disabled
        aria-label="Auth"
      >
        <KeyRound className="h-4 w-4" />
      </button>
    )
  }

  return (
    <>
      <button
        onClick={isAuthenticated ? handleLogout : () => setShowLogin(true)}
        className={`inline-flex h-9 items-center justify-center rounded-md px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
          isAuthenticated
            ? 'text-foreground hover:bg-secondary/50'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        aria-label={isAuthenticated ? 'Logout' : 'Login'}
        title={isAuthenticated ? 'Logout' : 'Login'}
      >
        <KeyRound className="h-4 w-4" />
      </button>
      <LoginDialog open={showLogin} onOpenChange={setShowLogin} />
    </>
  )
}

function DesktopNav() {
  const { isAuthenticated } = useAuth()

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {isAuthenticated && (
          <NavigationMenuItem>
            <NavLink href="/lists/personal">Personal</NavLink>
          </NavigationMenuItem>
        )}

        {isAuthenticated && (
          <NavigationMenuItem>
            <NavLink href="/lists/daily-routines">Daily Routines</NavLink>
          </NavigationMenuItem>
        )}

        {isAuthenticated && (
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-transparent hover:text-foreground focus:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-foreground">
              Lists
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[220px] gap-1 p-2">
                {listsItems.map((item) => (
                  <li key={item.href}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.href}
                        className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset active:bg-secondary/80"
                      >
                        <span>{item.emoji}</span>
                        <span>{item.label}</span>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}

        <NavigationMenuItem>
          <NavLink href="/food">Food</NavLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavLink href="/contact">Contact</NavLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const mobileNavLinkClass =
  'touch-manipulation flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/50 hover:text-foreground active:bg-secondary'

function MobileNav() {
  const { isAuthenticated } = useAuth()
  const [open, setOpen] = useState(false)

  const closeSheet = () => setOpen(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="-m-2 rounded-lg p-2 text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:hidden">
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle menu</span>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-80 flex flex-col">
        {/* Fixed top shortcuts — only when authenticated */}
        {isAuthenticated && (
          <div className="mt-4 flex items-center gap-2 border-b border-border pb-4 px-1">
            <Link
              href="/lists/recipes"
              onClick={closeSheet}
              className="flex-1 touch-manipulation rounded-lg bg-secondary/50 px-3 py-2.5 text-center text-sm font-semibold text-foreground transition-colors hover:bg-secondary active:bg-secondary/80"
            >
              🍳 Recipes
            </Link>
            <Link
              href="/lists/english"
              onClick={closeSheet}
              className="flex-1 touch-manipulation rounded-lg bg-secondary/50 px-3 py-2.5 text-center text-sm font-semibold text-foreground transition-colors hover:bg-secondary active:bg-secondary/80"
            >
              🇬🇧 English
            </Link>
          </div>
        )}

        {/* Accordion navigation */}
        <nav className="flex-1 overflow-y-auto py-2">
          <Accordion type="multiple" className="w-full">
            {/* Pages */}
            <AccordionItem value="sayfalar" className="border-b-0">
              <AccordionTrigger className="px-4 py-3 text-sm font-semibold text-foreground hover:no-underline hover:bg-secondary/30 rounded-lg">
                Pages
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-0.5 pl-2">
                  <Link href="/" onClick={closeSheet} className={mobileNavLinkClass}>
                    Home
                  </Link>
                  {isAuthenticated && (
                    <Link href="/lists/personal" onClick={closeSheet} className={mobileNavLinkClass}>
                      Personal
                    </Link>
                  )}
                  {isAuthenticated && (
                    <Link href="/lists/daily-routines" onClick={closeSheet} className={mobileNavLinkClass}>
                      Daily Routines
                    </Link>
                  )}
                  <Link href="/food" onClick={closeSheet} className={mobileNavLinkClass}>
                    <span>🍎</span> Food
                  </Link>
                  <Link href="/contact" onClick={closeSheet} className={mobileNavLinkClass}>
                    Contact
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Lists — only when authenticated */}
            {isAuthenticated && (
              <AccordionItem value="listeler" className="border-b-0">
                <AccordionTrigger className="px-4 py-3 text-sm font-semibold text-foreground hover:no-underline hover:bg-secondary/30 rounded-lg">
                  Lists
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-0.5 pl-2">
                    <Link href="/lists/entrepreneurship" onClick={closeSheet} className={mobileNavLinkClass}>
                      <span>💼</span> Entrepreneur
                    </Link>
                    <Link href="/lists/life-tips" onClick={closeSheet} className={mobileNavLinkClass}>
                      <span>💡</span> Life Tips
                    </Link>
                    <Link href="/lists/w2b" onClick={closeSheet} className={mobileNavLinkClass}>
                      <span>🛒</span> W2B
                    </Link>
                    <Link href="/lists/russian" onClick={closeSheet} className={mobileNavLinkClass}>
                      <span>🇷🇺</span> Russian
                    </Link>
                    <Link href="/lists/claude" onClick={closeSheet} className={mobileNavLinkClass}>
                      <span>🤖</span> Claude
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        </nav>

        {/* Footer - Theme toggle */}
        <div className="border-t border-border px-4 py-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Theme</span>
            <AnimatedThemeToggle />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export function Navbar() {
  const { isAuthenticated } = useAuth()

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="relative mx-auto flex max-w-7xl items-center justify-between py-3 md:justify-center">
          <div className="flex items-center">
            <NavLink href="/">Home</NavLink>
            <DesktopNav />
          </div>

          <div className="hidden md:absolute md:right-0 md:flex md:items-center md:gap-2">
            {isAuthenticated && <SkillsIcon />}
            {isAuthenticated && <QuickNotes />}
            <AuthButton />
            <AnimatedThemeToggle />
          </div>

          <MobileNav />
        </div>
      </Container>
    </header>
  )
}

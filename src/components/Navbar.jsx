'use client'

import { Menu } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { AnimatedThemeToggle } from './ui/animated-theme-toggle'
import { Container } from './Container'

function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
    >
      {children}
    </Link>
  )
}

function DesktopNav() {
  return (
    <nav className="hidden items-center md:flex">
      <NavLink href="/incelemeler">İncelemeler</NavLink>
      <NavLink href="/kesifler">Keşifler</NavLink>
      <NavLink href="/bu-hafta">Bu Hafta</NavLink>
      <NavLink href="/iletisim">İletişim</NavLink>
    </nav>
  )
}

function MobileNav() {
  const [open, setOpen] = useState(false)

  const closeSheet = () => setOpen(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="-m-2 rounded-lg p-2 text-muted-foreground transition hover:text-foreground md:hidden">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </SheetTrigger>
      <SheetContent side="right" className="w-56">
        <nav className="mt-8 flex flex-col gap-1">
          <Link
            href="/"
            onClick={closeSheet}
            className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/50 hover:text-foreground"
          >
            Ana Sayfa
          </Link>
          <Link
            href="/incelemeler"
            onClick={closeSheet}
            className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/50 hover:text-foreground"
          >
            İncelemeler
          </Link>
          <Link
            href="/kesifler"
            onClick={closeSheet}
            className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/50 hover:text-foreground"
          >
            Keşifler
          </Link>
          <Link
            href="/bu-hafta"
            onClick={closeSheet}
            className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/50 hover:text-foreground"
          >
            Bu Hafta
          </Link>
          <Link
            href="/iletisim"
            onClick={closeSheet}
            className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/50 hover:text-foreground"
          >
            İletişim
          </Link>
          <div className="mt-6 border-t border-border pt-6">
            <div className="flex items-center justify-between px-3">
              <span className="text-sm font-medium text-muted-foreground">
                Tema
              </span>
              <AnimatedThemeToggle />
            </div>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export function Navbar() {
  return (
    <header className="sticky top-0 z-50">
      <Container>
        <div className="mx-auto flex max-w-7xl items-center justify-between py-3 md:justify-center">
          <div className="flex items-center">
            <NavLink href="/">Ana Sayfa</NavLink>
            <DesktopNav />
            <div className="hidden md:block">
              <AnimatedThemeToggle />
            </div>
          </div>
          <MobileNav />
        </div>
      </Container>
    </header>
  )
}

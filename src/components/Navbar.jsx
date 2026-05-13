'use client'

import { Menu } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { AnimatedThemeToggle } from './ui/animated-theme-toggle'
import { UserIcon } from './auth/UserIcon'
import { Container } from './Container'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu'

const listelerItems = [
  { href: '/listeler/tarif', label: 'Tarifler', emoji: '🍳' },
  { href: '/listeler/ingilizce', label: 'İngilizce', emoji: '🇬🇧' },
  { href: '/listeler/rusca', label: 'Rusça', emoji: '🇷🇺' },
  { href: '/kesifler/rusca-test', label: 'Rusça Test', emoji: '📝' },
  { href: '/listeler/personal', label: 'Personal', emoji: '🔒' },
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

function DesktopNav() {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavLink href="/incelemeler">İncelemeler</NavLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavLink href="/kesifler/alintilar">Alıntılar</NavLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-transparent hover:text-foreground focus:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-foreground">
            Listeler
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[220px] gap-1 p-2">
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    href="/listeler"
                    className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset active:bg-secondary/80"
                  >
                    <span>📋</span>
                    <span>Tümü</span>
                  </Link>
                </NavigationMenuLink>
              </li>
              {listelerItems.map((item) => (
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

        <NavigationMenuItem>
          <NavLink href="/iletisim">İletişim</NavLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function MobileNav() {
  const [open, setOpen] = useState(false)

  const closeSheet = () => setOpen(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="-m-2 rounded-lg p-2 text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:hidden">
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle menu</span>
      </SheetTrigger>
      <SheetContent side="right" className="w-72 sm:w-80">
        <nav className="mt-6 flex flex-col gap-0.5">
          <Link
            href="/"
            onClick={closeSheet}
            className="touch-manipulation rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset active:bg-secondary"
          >
            Ana Sayfa
          </Link>
          <Link
            href="/incelemeler"
            onClick={closeSheet}
            className="touch-manipulation rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset active:bg-secondary"
          >
            İncelemeler
          </Link>

          <Link
            href="/kesifler/alintilar"
            onClick={closeSheet}
            className="touch-manipulation rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset active:bg-secondary"
          >
            Alıntılar
          </Link>

          {/* Listeler Section */}
          <div className="mt-4 mb-1 border-t border-border pt-4 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
            Listeler
          </div>
          <Link
            href="/listeler"
            onClick={closeSheet}
            className="touch-manipulation flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset active:bg-secondary"
          >
            <span>📋</span>
            <span>Tümü</span>
          </Link>
          {listelerItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeSheet}
              className="touch-manipulation flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset active:bg-secondary"
            >
              <span className="text-base">{item.emoji}</span>
              <span>{item.label}</span>
            </Link>
          ))}

          <Link
            href="/iletisim"
            onClick={closeSheet}
            className="touch-manipulation rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset active:bg-secondary"
          >
            İletişim
          </Link>

          <div className="mt-6 space-y-3 border-t border-border pt-6">
            <div className="flex items-center justify-between rounded-lg px-4 py-3 hover:bg-secondary/30">
              <span className="text-sm font-medium text-muted-foreground">
                Admin
              </span>
              <UserIcon />
            </div>
            <div className="flex items-center justify-between rounded-lg px-4 py-3 hover:bg-secondary/30">
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
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="relative mx-auto flex max-w-7xl items-center justify-between py-3 md:justify-center">
          <div className="flex items-center">
            <NavLink href="/">Ana Sayfa</NavLink>
            <DesktopNav />
          </div>

          <div className="hidden md:absolute md:right-0 md:flex md:items-center md:gap-2">
            <UserIcon />
            <AnimatedThemeToggle />
          </div>

          <MobileNav />
        </div>
      </Container>
    </header>
  )
}

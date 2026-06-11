'use client'

import { Menu } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion'
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
  { href: '/listeler/life-tips', label: 'Life Tips', emoji: '💡' },
  { href: '/listeler/travel', label: 'Travel', emoji: '✈️' },
  { href: '/listeler/tarif', label: 'Tarifler', emoji: '🍳' },
  { href: '/listeler/ingilizce', label: 'İngilizce', emoji: '🇬🇧' },
  { href: '/listeler/rusca', label: 'Rusça', emoji: '🇷🇺' },
  { href: '/incelemeler', label: 'İncelemeler', emoji: '🔬' },
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
          <NavLink href="/listeler/personal">Personal</NavLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavLink href="/listeler/daily-routines">Daily Routines</NavLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-transparent hover:text-foreground focus:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-foreground">
            Listeler
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[220px] gap-1 p-2">
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

const mobileNavLinkClass =
  'touch-manipulation flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/50 hover:text-foreground active:bg-secondary'

function MobileNav() {
  const [open, setOpen] = useState(false)

  const closeSheet = () => setOpen(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="-m-2 rounded-lg p-2 text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:hidden">
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle menu</span>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-80 flex flex-col">
        {/* Fixed top shortcuts */}
        <div className="mt-4 flex items-center gap-2 border-b border-border pb-4 px-1">
          <Link
            href="/listeler/tarif"
            onClick={closeSheet}
            className="flex-1 touch-manipulation rounded-lg bg-secondary/50 px-3 py-2.5 text-center text-sm font-semibold text-foreground transition-colors hover:bg-secondary active:bg-secondary/80"
          >
            🍳 Tarifler
          </Link>
          <Link
            href="/listeler/ingilizce"
            onClick={closeSheet}
            className="flex-1 touch-manipulation rounded-lg bg-secondary/50 px-3 py-2.5 text-center text-sm font-semibold text-foreground transition-colors hover:bg-secondary active:bg-secondary/80"
          >
            🇬🇧 İngilizce
          </Link>
          <div className="flex-shrink-0" onClick={closeSheet}>
            <UserIcon className="h-10 w-10 rounded-lg bg-secondary/50 px-2.5 hover:bg-secondary" />
          </div>
        </div>

        {/* Accordion navigation */}
        <nav className="flex-1 overflow-y-auto py-2">
          <Accordion type="multiple" className="w-full">
            {/* Sayfalar */}
            <AccordionItem value="sayfalar" className="border-b-0">
              <AccordionTrigger className="px-4 py-3 text-sm font-semibold text-foreground hover:no-underline hover:bg-secondary/30 rounded-lg">
                Sayfalar
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-0.5 pl-2">
                  <Link href="/" onClick={closeSheet} className={mobileNavLinkClass}>
                    Ana Sayfa
                  </Link>
                  <Link href="/listeler/personal" onClick={closeSheet} className={mobileNavLinkClass}>
                    Personal
                  </Link>
                  <Link href="/listeler/daily-routines" onClick={closeSheet} className={mobileNavLinkClass}>
                    Daily Routines
                  </Link>
                  <Link href="/iletisim" onClick={closeSheet} className={mobileNavLinkClass}>
                    İletişim
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Listeler */}
            <AccordionItem value="listeler" className="border-b-0">
              <AccordionTrigger className="px-4 py-3 text-sm font-semibold text-foreground hover:no-underline hover:bg-secondary/30 rounded-lg">
                Listeler
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-0.5 pl-2">
                  <Link href="/listeler/life-tips" onClick={closeSheet} className={mobileNavLinkClass}>
                    <span>💡</span> Life Tips
                  </Link>
                  <Link href="/listeler/rusca" onClick={closeSheet} className={mobileNavLinkClass}>
                    <span>🇷🇺</span> Rusça
                  </Link>
                  <Link href="/incelemeler" onClick={closeSheet} className={mobileNavLinkClass}>
                    <span>🔬</span> İncelemeler
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </nav>

        {/* Footer - Theme toggle */}
        <div className="border-t border-border px-4 py-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Tema</span>
            <AnimatedThemeToggle />
          </div>
        </div>
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

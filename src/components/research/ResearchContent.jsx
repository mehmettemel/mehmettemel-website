'use client'

import { useState, useEffect } from 'react'

export function ResearchContent({ headings }) {
  const [active, setActive] = useState('')

  useEffect(() => {
    if (!headings?.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-10% 0% -80% 0%' },
    )

    headings.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  if (!headings?.length) return null

  return (
    <aside className="hidden lg:block w-52 shrink-0">
      <div className="sticky top-24">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          İçindekiler
        </p>
        <nav className="space-y-1.5">
          {headings.map(({ id, text }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`block text-xs leading-snug transition-colors ${
                active === id
                  ? 'text-foreground font-medium'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {text}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  )
}

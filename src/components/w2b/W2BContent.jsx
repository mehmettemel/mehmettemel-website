'use client'

import { useState, useMemo } from 'react'
import { Search, X } from 'lucide-react'

function brandName(b) {
  return typeof b === 'string' ? b : b.name
}

function BrandChip({ brand }) {
  const name = brandName(brand)
  const href = typeof brand === 'string' ? null : brand.href
  const className =
    'inline-flex items-center rounded-full bg-secondary/60 px-2.5 py-1 text-[11px] font-medium text-foreground'
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${className} underline decoration-dotted underline-offset-2 hover:bg-secondary`}
      >
        {name}
      </a>
    )
  }
  return <span className={className}>{name}</span>
}

function Row({ item }) {
  return (
    <div className="flex flex-col gap-1.5 border-b border-border/50 py-3.5 last:border-0 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
      <div className="sm:min-w-0 sm:flex-1">
        <p className="text-sm font-medium text-foreground">{item.product}</p>
        {item.note && (
          <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{item.note}</p>
        )}
      </div>
      {item.brands.length > 0 && (
        <div className="flex flex-wrap gap-1.5 sm:max-w-[55%] sm:justify-end">
          {item.brands.map((b, i) => (
            <BrandChip key={i} brand={b} />
          ))}
        </div>
      )}
    </div>
  )
}

export function W2BContent({ categories, title, subtitle }) {
  const [query, setQuery] = useState('')
  const [activeCat, setActiveCat] = useState('all')

  const q = query.trim().toLocaleLowerCase('tr')

  const matches = (item) => {
    if (!q) return true
    const haystack = [
      item.product,
      item.note || '',
      ...item.brands.map(brandName),
    ]
      .join(' ')
      .toLocaleLowerCase('tr')
    return haystack.includes(q)
  }

  const visible = useMemo(() => {
    return categories
      .map((cat) => ({ ...cat, items: cat.items.filter(matches) }))
      .filter(
        (cat) =>
          cat.items.length > 0 && (activeCat === 'all' || cat.label === activeCat),
      )
  }, [categories, activeCat, q])

  const totalShown = visible.reduce((n, c) => n + c.items.length, 0)

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">{title}</h1>
        {subtitle && <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>}
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ürün veya marka ara…"
          className="w-full rounded-full border border-border bg-card py-2 pl-9 pr-9 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground/30"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Temizle"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Category filter pills */}
      <div className="mb-5 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCat('all')}
          className={`rounded-full px-3 py-1 text-xs transition-all ${
            activeCat === 'all'
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary/50 text-muted-foreground hover:text-foreground'
          }`}
        >
          Tümü
        </button>
        {categories.map((cat) => (
          <button
            key={cat.label}
            onClick={() => setActiveCat(cat.label)}
            className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs transition-all ${
              activeCat === cat.label
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary/50 text-muted-foreground hover:text-foreground'
            }`}
          >
            <span>{cat.emoji}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Results */}
      {totalShown === 0 ? (
        <div className="py-16 text-center">
          <p className="text-sm text-muted-foreground">Sonuç bulunamadı</p>
        </div>
      ) : (
        <div className="space-y-7">
          {visible.map((cat) => (
            <section key={cat.label}>
              <div className="mb-1 flex items-center gap-1.5">
                <span className="text-sm">{cat.emoji}</span>
                <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {cat.label}
                </h2>
              </div>
              <div>
                {cat.items.map((item, i) => (
                  <Row key={i} item={item} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}

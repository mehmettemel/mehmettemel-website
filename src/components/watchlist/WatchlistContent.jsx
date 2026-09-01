'use client'

import { useMemo, useState } from 'react'
import { Film, Tv, Star, Search, ArrowDownWideNarrow } from 'lucide-react'

const FILTERS = [
  { key: 'all', label: 'Tümü' },
  { key: 'film', label: 'Film', icon: Film },
  { key: 'dizi', label: 'Dizi', icon: Tv },
  { key: 'favorite', label: 'Favoriler', icon: Star },
]

const SORTS = [
  { key: 'rating', label: 'Puana göre' },
  { key: 'year', label: 'Yıla göre' },
  { key: 'title', label: 'İsme göre' },
]

// '2002-2008' gibi aralıklarda sıralama için başlangıç yılını al
function startYear(year) {
  const n = parseInt(String(year ?? '').slice(0, 4), 10)
  return Number.isNaN(n) ? 0 : n
}

export function WatchlistContent({ entries, stats }) {
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('rating')
  const [query, setQuery] = useState('')

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = entries.filter((e) => {
      if (filter === 'favorite' && !e.favorite) return false
      if ((filter === 'film' || filter === 'dizi') && e.type !== filter) return false
      if (!q) return true
      return (
        e.title.toLowerCase().includes(q) ||
        String(e.year ?? '').includes(q) ||
        (e.genres || []).some((g) => g.toLowerCase().includes(q)) ||
        (e.note || '').toLowerCase().includes(q)
      )
    })

    return [...list].sort((a, b) => {
      if (sort === 'rating') return (b.rating ?? 0) - (a.rating ?? 0)
      if (sort === 'year') return startYear(b.year) - startYear(a.year)
      return a.title.localeCompare(b.title, 'tr')
    })
  }, [entries, filter, sort, query])

  return (
    <>
      {/* Özet */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <Stat value={stats.total} label="yapım" />
        <Stat value={stats.films} label="film" icon={Film} />
        <Stat value={stats.series} label="dizi" icon={Tv} />
      </div>

      {/* Filtre + arama + sıralama */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {FILTERS.map(({ key, label, icon: Icon }) => {
            const on = filter === key
            return (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                  on
                    ? 'border-primary/40 bg-primary/10 text-primary'
                    : 'border-border text-muted-foreground hover:border-foreground/25 hover:text-foreground'
                }`}
              >
                {Icon && <Icon className="h-3.5 w-3.5" />}
                {label}
              </button>
            )
          })}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-52 sm:flex-none">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ara..."
              aria-label="Watchlist içinde ara"
              className="w-full rounded-full border border-border bg-card py-1.5 pl-8 pr-3 text-xs text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/40"
            />
          </div>

          <div className="relative">
            <ArrowDownWideNarrow className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sıralama"
              className="appearance-none rounded-full border border-border bg-card py-1.5 pl-8 pr-3 text-xs text-foreground outline-none transition-colors focus:border-primary/40"
            >
              {SORTS.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Kartlar */}
      {visible.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border py-16 text-center">
          <p className="text-sm text-muted-foreground">Eşleşen yapım yok</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((e) => (
            <Card key={`${e.title}-${e.year}`} entry={e} />
          ))}
        </div>
      )}
    </>
  )
}

function Stat({ value, label, icon: Icon }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/60 px-3 py-1 text-xs text-muted-foreground">
      {Icon && <Icon className="h-3.5 w-3.5" />}
      <strong className="font-semibold text-foreground">{value}</strong>
      {label}
    </span>
  )
}

function Card({ entry }) {
  const isFilm = entry.type === 'film'
  const TypeIcon = isFilm ? Film : Tv

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-xl border bg-card p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
        entry.favorite
          ? 'border-primary/35 hover:border-primary/60'
          : 'border-border hover:border-foreground/25'
      }`}
    >
      {/* favori kartlarda üstte ince vurgu şeridi */}
      {entry.favorite && (
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-primary/70 to-transparent"
        />
      )}

      <div className="mb-2 flex items-start justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/70 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
          <TypeIcon className="h-3 w-3" />
          {isFilm ? 'Film' : 'Dizi'}
        </span>

        {entry.rating != null && (
          <span
            className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary"
            title={`${entry.rating}/10`}
          >
            <Star className="h-3 w-3 fill-current" />
            {entry.rating}
          </span>
        )}
      </div>

      <h3 className="text-base font-semibold leading-snug text-foreground">
        {entry.title}
      </h3>

      {entry.year != null && (
        <div className="mt-0.5 text-xs text-muted-foreground">{entry.year}</div>
      )}

      {entry.genres?.length > 0 && (
        <div className="mt-2.5 flex flex-wrap gap-1">
          {entry.genres.map((g) => (
            <span
              key={g}
              className="rounded-md border border-border/70 px-1.5 py-0.5 text-[10px] text-muted-foreground"
            >
              {g}
            </span>
          ))}
        </div>
      )}

      {entry.note && (
        <p className="mt-3 border-t border-border/50 pt-3 text-xs leading-relaxed text-foreground/75">
          {entry.note}
        </p>
      )}
    </article>
  )
}

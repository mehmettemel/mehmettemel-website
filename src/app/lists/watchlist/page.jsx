import { Container } from '@/components/Container'
import { WatchlistContent } from '@/components/watchlist/WatchlistContent'
import { entries, getStats, title, subtitle } from '@/data/watchlist'
import { getListCategory } from '@/data/list'

export const metadata = {
  title: 'Watchlist | Mehmet Temel',
  description: 'Favorite movies and series.',
  alternates: {
    canonical: 'https://mehmettemel.com/lists/watchlist',
  },
  openGraph: {
    title: 'Watchlist | Mehmet Temel',
    description: 'Favorite movies and series.',
    url: 'https://mehmettemel.com/lists/watchlist',
    type: 'website',
  },
}

export default function WatchlistPage() {
  const category = getListCategory('watchlist')
  const stats = getStats()

  return (
    <Container>
      <div className="mx-auto max-w-7xl py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-3">
            <span className="text-3xl" role="img" aria-label={title}>
              {category?.emoji ?? '🎬'}
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {title}
            </h1>
          </div>
          <p className="text-base text-muted-foreground">{subtitle}</p>
        </div>

        <WatchlistContent entries={entries} stats={stats} />
      </div>
    </Container>
  )
}

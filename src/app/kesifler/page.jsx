import Link from 'next/link'
import { Container } from '@/components/Container'
import { getNotesStats } from '@/lib/db'

export const revalidate = 60

export const metadata = {
  title: 'Keşifler | Mehmet Temel',
  description:
    'İnternette bulduğum faydalı kaynaklar, alıntılar, video ve kitap notları.',
}

const discoveryTypes = [
  {
    title: 'Linkler',
    emoji: '🔗',
    description: 'İnternette bulduğum faydalı kaynaklar.',
    href: '/kesifler/linkler',
    type: 'link',
  },
  {
    title: 'Alıntılar',
    emoji: '💭',
    description: 'İlham veren alıntılar ve notlar.',
    href: '/kesifler/alintilar',
    type: 'quote',
  },
  {
    title: 'Videolar',
    emoji: '🎬',
    description: 'Video notları ve öğrendiklerim.',
    href: '/kesifler/videolar',
    type: 'video',
  },
  {
    title: 'Kitaplar',
    emoji: '📖',
    description: 'Kitaplardan aldığım notlar.',
    href: '/kesifler/kitaplar',
    type: 'book',
  },
  {
    title: 'Rusça Test',
    emoji: '📝',
    description: 'Rusça bilginizi test edin.',
    href: '/kesifler/rusca-test',
    type: 'russian-test',
    staticCount: '96 kelime',
  },
]

export default async function Kesifler() {
  const stats = await getNotesStats().catch(() => ({
    total: 0,
    byType: {},
  }))

  return (
    <Container>
      <div className="mx-auto max-w-7xl py-8 sm:py-12">
        <div className="mb-8 sm:mb-10">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Keşifler
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            İnternette bulduğum değerli kaynaklar, alıntılar ve notlar.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {discoveryTypes.map((item) => {
            const count = stats.byType[item.type] || 0
            const displayText = item.staticCount || `${count} not`

            return (
              <Link
                key={item.type}
                href={item.href}
                className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:border-primary/50 hover:shadow-lg"
              >
                <div className="flex flex-col items-start gap-3">
                  <span className="text-4xl transition-transform group-hover:scale-110">
                    {item.emoji}
                  </span>
                  <div>
                    <h2 className="text-lg font-semibold text-foreground group-hover:text-primary">
                      {item.title}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="rounded-full bg-primary/10 px-2 py-1 font-medium text-primary">
                      {displayText}
                    </span>
                  </div>
                </div>

                {/* Arrow indicator */}
                <div className="absolute bottom-4 right-4 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary">
                  →
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </Container>
  )
}

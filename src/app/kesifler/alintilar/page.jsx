import { Container } from '@/components/Container'
import { QuotesContent } from '@/components/kesifler/QuotesContent'
import { categories } from '@/data/personal/sozler'
import Link from 'next/link'

export const metadata = {
  title: 'Alıntılar - Keşifler | Mehmet Temel',
  description: 'İlham veren alıntılar ve notlar.',
}

function ArrowLeftIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function QuotesPage() {
  const quotes = categories['Sevdiğim Sözler'].items.map((text, i) => ({
    id: i,
    text,
  }))

  return (
    <Container>
      <div className="py-8 sm:py-12">
        <Link
          href="/kesifler"
          aria-label="Go back to kesifler"
          className="group mb-6 inline-flex items-center gap-1.5 text-sm text-muted transition-all hover:gap-2 hover:text-foreground"
        >
          <ArrowLeftIcon className="h-3.5 w-3.5 stroke-current transition-transform group-hover:-translate-x-0.5" />
          <span>Geri Dön</span>
        </Link>

        <div className="mx-auto max-w-7xl">
          {quotes.length === 0 ? (
            <div className="py-12 text-center">
              <div className="mb-4 text-6xl">💭</div>
              <p className="text-base text-muted-foreground">
                Henüz alıntı eklenmedi. Yakında ilham verici notlar eklenecek!
              </p>
            </div>
          ) : (
            <QuotesContent quotes={quotes} />
          )}
        </div>
      </div>
    </Container>
  )
}

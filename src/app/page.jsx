import Link from 'next/link'
import { Container } from '../components/Container'
import { getAllPosts } from '../lib/blog'
import { format } from 'date-fns'

// SEO metadata for the home page
export const metadata = {
  title: 'Mehmet Temel - Food Decoded | Gıda Mühendisi × Frontend Developer',
  description:
    'İnternetin derinliklerinden beslenme ve insan biyolojisi hakkında az bilinen değerli kaynakları çıkarıyor, anlaşılır hale getiriyorum.',
  openGraph: {
    title: 'Mehmet Temel - Food Decoded',
    description:
      'İnternetin derinliklerinden beslenme ve insan biyolojisi hakkında az bilinen değerli kaynakları çıkarıyor, anlaşılır hale getiriyorum.',
    url: 'https://mehmettemel.com',
    siteName: 'Mehmet Temel',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mehmet Temel - Food Decoded',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@temelbusiness',
    creator: '@temelbusiness',
    title: 'Mehmet Temel - Food Decoded',
    description:
      'Beslenme ve insan biyolojisi hakkında değerli kaynakları küratörlük yapıyorum.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://mehmettemel.com',
  },
}

export default function Home() {
  const allPosts = getAllPosts()
  const recentPosts = allPosts.slice(0, 12)

  return (
    <Container>
      <div className="mx-auto max-w-5xl py-12 sm:py-16 lg:py-20">
        {/* Hero Section */}
        <div className="mb-12 sm:mb-16">
          <h1 className="mb-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            Merhaba, Ben Mehmet Temel
          </h1>

          <p className="mb-4 text-xl sm:text-2xl font-semibold text-foreground/90">
            Gıda Mühendisi × Frontend Developer
          </p>

          <p className="max-w-3xl text-base sm:text-lg lg:text-xl leading-relaxed text-muted-foreground">
            İnternetin derinliklerinden beslenme ve insan biyolojisi hakkında az
            bilinen değerli kaynakları çıkarıyor, anlaşılır hale getiriyorum.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-3 sm:gap-4 mb-16 sm:mb-20">
          <Link
            href="https://x.com/temelbusiness"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm sm:text-base font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-md active:scale-95"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Twitter'da Takip Et
          </Link>
          <Link
            href="/bu-hafta"
            className="inline-flex items-center gap-2 rounded-lg bg-secondary px-5 py-2.5 text-sm sm:text-base font-medium text-foreground transition-all hover:bg-secondary/80 hover:shadow-md active:scale-95"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="2" fill="currentColor" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.5 8.5a5 5 0 0 1 7 7M5.5 5.5a9 9 0 0 1 13 13"
              />
            </svg>
            Bu Hafta'ya Abone Ol
          </Link>
        </div>

        {/* Researches Section */}
        <section className="max-w-4xl">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Son Araştırmalar
            </h2>
            <Link
              href="/incelemeler"
              className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-muted transition-all hover:text-primary hover:gap-3"
            >
              Tümünü Gör
              <svg
                className="h-4 w-4 sm:h-5 sm:w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          {recentPosts.length > 0 ? (
            <div className="space-y-0 rounded-xl border border-border overflow-hidden bg-card">
              {recentPosts.slice(0, 3).map((post) => (
                <Link
                  key={post.slug}
                  href={`/incelemeler/${post.slug}`}
                  className="group flex items-center justify-between border-b border-border px-5 py-5 sm:px-6 sm:py-6 transition-all last:border-b-0 hover:bg-secondary/30 active:bg-secondary/40"
                >
                  <span className="flex-1 pr-4 text-base sm:text-lg text-foreground transition-colors group-hover:text-primary line-clamp-2 font-medium">
                    {post.title}
                  </span>
                  <span className="text-sm whitespace-nowrap text-muted flex-shrink-0">
                    {format(new Date(post.date), 'MMM d, yyyy')}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-border bg-secondary/20 p-8 text-center">
              <p className="text-sm sm:text-base text-muted-foreground">
                Henüz yazı yok. Yakında ilk araştırmalar yayınlanacak!
              </p>
            </div>
          )}
        </section>
      </div>
    </Container>
  )
}

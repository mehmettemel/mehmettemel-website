import { Container } from '../components/Container'
import { getAllPosts } from '../lib/blog'
import { getAllNotes } from '../data/notes'
import { HomeHero } from '../components/home/HomeHero'
import { HomeResearches } from '../components/home/HomeResearches'
import { RecentDiscoveries } from '../components/home/RecentDiscoveries'
import { MobileHome } from '../components/home/MobileHome'

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
  const recentPosts = allPosts.slice(0, 3)

  // Get recent notes from static data
  const allNotes = getAllNotes()
  const recentNotes = allNotes.slice(0, 8)

  return (
    <Container>
      {/* Mobile: Rastgele-style random content viewer */}
      <MobileHome />

      {/* Desktop: Original layout */}
      <div className="mx-auto hidden max-w-7xl py-8 md:block sm:py-12">
        <HomeHero />
        <div className="space-y-12 sm:space-y-16">
          <HomeResearches posts={recentPosts} />
          <RecentDiscoveries notes={recentNotes} />
        </div>
      </div>
    </Container>
  )
}

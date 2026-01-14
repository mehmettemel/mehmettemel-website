import { Container } from '../components/Container'
import { getAllPosts } from '../lib/blog'
import { getRecentNotes } from '../lib/db'
import { HomeHero } from '../components/home/HomeHero'
import { HomeResearches } from '../components/home/HomeResearches'
import { RecentDiscoveries } from '../components/home/RecentDiscoveries'

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

export default async function Home() {
  const allPosts = getAllPosts()
  const recentPosts = allPosts.slice(0, 3)

  // Fetch recent notes from database
  let recentNotes = []
  try {
    recentNotes = await getRecentNotes(8)
  } catch (error) {
    console.error('Failed to fetch recent notes:', error)
  }

  return (
    <Container>
      <div className="mx-auto max-w-7xl py-8 sm:py-12">
        {/* Hero Section - Centered */}
        <HomeHero />

        <div className="space-y-12 sm:space-y-16">
          {/* Researches Section */}
          <HomeResearches posts={recentPosts} />

          {/* Recent Discoveries Section */}
          <RecentDiscoveries notes={recentNotes} />
        </div>
      </div>
    </Container>
  )
}

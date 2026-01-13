import Link from 'next/link'
import { Container } from '../components/Container'
import { getAllPosts } from '../lib/blog'
import { usefulLinks } from '../data/kesifler'
import { format } from 'date-fns'
import { HomeHero } from '../components/home/HomeHero'

import { HomeResearches } from '../components/home/HomeResearches'
import { HomeGems } from '../components/home/HomeGems'

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
  const recentGems = usefulLinks.slice(0, 6)

  return (
    <Container>
      <div className="mx-auto max-w-7xl py-8 sm:py-12">
        {/* Hero Section - Centered */}
        <HomeHero />

        <div className="space-y-12 sm:space-y-16">
          {/* Researches Section */}
          <HomeResearches posts={recentPosts} />

          {/* Gems Section */}
          <HomeGems gems={recentGems} />
        </div>
      </div>
    </Container>
  )
}

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'
import { siteConfig, generateStructuredData } from '@/lib/seo'

import '@/styles/tailwind.css'

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    template: `%s - ${siteConfig.name}`,
    default: siteConfig.title,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author.name }],
  creator: siteConfig.author.name,
  publisher: siteConfig.author.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteConfig.url,
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.author.twitter,
    creator: siteConfig.author.twitter,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              generateStructuredData({
                type: 'Person',
                data: {
                  name: siteConfig.author.name,
                  jobTitle: siteConfig.author.jobTitle,
                  url: siteConfig.url,
                  sameAs: [
                    siteConfig.links.twitter,
                    siteConfig.links.github,
                    siteConfig.links.linkedin,
                  ],
                  knowsAbout: [
                    'Front End Development',
                    'React',
                    'Vue.js',
                    'E-commerce Development',
                    'Travel',
                    'Food',
                  ],
                  address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Adana',
                    addressCountry: 'TR',
                  },
                  description: siteConfig.description,
                  email: siteConfig.author.email,
                },
              }),
            ),
          }}
        />
      </head>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}

export const siteConfig = {
  name: 'Mehmet Temel',
  title: 'Mehmet Temel - Front End Engineer & Travel Enthusiast',
  description:
    'Front End Engineer specializing in React, Vue.js, and e-commerce development. Based in Adana, Turkey, but always traveling. Sharing insights on travel, food, and frontend development.',
  url: 'https://mehmettemel.com',
  ogImage: '/og-image.jpg',
  links: {
    twitter: 'https://x.com/temelbusiness',
    github: 'https://github.com/mehmettemel',
    linkedin: 'https://linkedin.com/in/mehmettemel',
    instagram: 'https://instagram.com/mehmettemel',
  },
  keywords: [
    'Mehmet Temel',
    'Front End Engineer',
    'React Developer',
    'Vue.js Developer',
    'E-commerce Developer',
    'Travel Blogger',
    'Food Blogger',
    'Adana',
    'Turkey',
    'Frontend Development',
    'Web Development',
    'JavaScript',
    'TypeScript',
    'Next.js',
    'Travel',
    'Food',
    'Digital Nomad',
  ],
  author: {
    name: 'Mehmet Temel',
    jobTitle: 'Front End Engineer',
    location: 'Adana, Turkey',
    email: 'mehmet@mehmettemel.com',
    twitter: '@temelbusiness',
  },
}

export function generateMetadata({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  authors = [siteConfig.author.name],
  section,
  tags = [],
}) {
  const metadata = {
    title: title ? `${title} - ${siteConfig.name}` : siteConfig.title,
    description: description || siteConfig.description,
    keywords: [...siteConfig.keywords, ...keywords],
    authors: authors.map((author) => ({ name: author })),
    creator: siteConfig.author.name,
    publisher: siteConfig.author.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url ? `${siteConfig.url}${url}` : siteConfig.url,
    },
    openGraph: {
      type,
      locale: 'en_US',
      url: url ? `${siteConfig.url}${url}` : siteConfig.url,
      siteName: siteConfig.name,
      title: title || siteConfig.title,
      description: description || siteConfig.description,
      images: [
        {
          url: image || siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: title || siteConfig.title,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(authors.length > 0 && { authors }),
      ...(section && { section }),
      ...(tags.length > 0 && { tags }),
    },
    twitter: {
      card: 'summary_large_image',
      site: siteConfig.author.twitter,
      creator: siteConfig.author.twitter,
      title: title || siteConfig.title,
      description: description || siteConfig.description,
      images: [image || siteConfig.ogImage],
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

  return metadata
}

export function generateStructuredData({ type, data }) {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': type,
  }

  switch (type) {
    case 'Person':
      return {
        ...baseData,
        name: data.name,
        jobTitle: data.jobTitle,
        url: data.url,
        sameAs: data.sameAs || [],
        knowsAbout: data.knowsAbout || [],
        address: data.address,
        description: data.description,
        email: data.email,
      }

    case 'Article':
      return {
        ...baseData,
        headline: data.title,
        description: data.description,
        author: {
          '@type': 'Person',
          name: data.author,
        },
        publisher: {
          '@type': 'Organization',
          name: data.publisher,
        },
        datePublished: data.datePublished,
        dateModified: data.dateModified,
        image: data.image,
        url: data.url,
        ...(data.keywords && { keywords: data.keywords.join(', ') }),
        ...(data.section && { articleSection: data.section }),
      }

    case 'WebSite':
      return {
        ...baseData,
        name: data.name,
        url: data.url,
        description: data.description,
        publisher: {
          '@type': 'Person',
          name: data.publisher,
        },
      }

    case 'BreadcrumbList':
      return {
        ...baseData,
        itemListElement: data.items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }

    default:
      return baseData
  }
}

export function generateBreadcrumbs(items) {
  return generateStructuredData({
    type: 'BreadcrumbList',
    data: { items },
  })
}

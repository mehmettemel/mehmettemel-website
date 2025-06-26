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

    default:
      return baseData
  }
}

export function generateBreadcrumbData({ items }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function SEOHead({
  title,
  description,
  keywords = [],
  image = '/og-image.jpg',
  url,
  type = 'website',
  structuredData,
  breadcrumbs,
}) {
  return (
    <>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Mehmet Temel" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@temelbusiness" />
      <meta name="twitter:creator" content="@temelbusiness" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical URL */}
      {url && <link rel="canonical" href={url} />}

      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}

      {/* Breadcrumbs */}
      {breadcrumbs && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              generateBreadcrumbData({ items: breadcrumbs }),
            ),
          }}
        />
      )}
    </>
  )
}

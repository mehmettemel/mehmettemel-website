import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Container } from '../../../components/Container'
import { getPostBySlug, getAllPostSlugs } from '../../../lib/blog'
import { ResearchContent } from '../../../components/research/ResearchContent'

export async function generateStaticParams() {
  const posts = getAllPostSlugs()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  }
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

// Parse HTML content into sections with paragraphs
function parseContentToSections(htmlContent, headings) {
  if (!htmlContent || !headings || headings.length === 0) {
    // If no headings, treat entire content as one section
    const paragraphs = extractParagraphsFromHTML(htmlContent)
    return [{
      id: 'content',
      heading: 'İçerik',
      paragraphs: paragraphs
    }]
  }

  const sections = []
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlContent, 'text/html')

  headings.forEach((heading, index) => {
    const headingElement = doc.getElementById(heading.id)
    if (!headingElement) return

    const paragraphs = []
    let currentElement = headingElement.nextElementSibling

    // Get the next heading to know where to stop
    const nextHeading = headings[index + 1]
    const nextHeadingElement = nextHeading ? doc.getElementById(nextHeading.id) : null

    // Collect all content until next heading
    while (currentElement && currentElement !== nextHeadingElement) {
      if (currentElement.tagName === 'P') {
        const text = currentElement.textContent.trim()
        if (text && text.length > 20) {
          paragraphs.push(text)
        }
      } else if (currentElement.tagName === 'UL' || currentElement.tagName === 'OL') {
        const listItems = currentElement.querySelectorAll('li')
        listItems.forEach(li => {
          const text = li.textContent.trim()
          if (text && text.length > 20) {
            paragraphs.push(text)
          }
        })
      }
      currentElement = currentElement.nextElementSibling
    }

    if (paragraphs.length > 0) {
      sections.push({
        id: heading.id,
        heading: heading.text,
        paragraphs: paragraphs
      })
    }
  })

  return sections
}

// Fallback: Extract paragraphs from HTML if DOMParser fails
function extractParagraphsFromHTML(htmlContent) {
  if (!htmlContent) return []

  // Remove HTML tags and get clean text
  const withoutTags = htmlContent
    .replace(/<h[1-6][^>]*>.*?<\/h[1-6]>/gi, '') // Remove headings
    .replace(/<[^>]*>/g, ' ') // Remove all HTML tags
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim()

  // Split by periods followed by space and capital letter or newline
  const sentences = withoutTags.split(/\.\s+/)

  const paragraphs = []
  sentences.forEach(sentence => {
    const cleaned = sentence.trim()
    if (cleaned.length > 50) {
      paragraphs.push(cleaned.endsWith('.') ? cleaned : cleaned + '.')
    }
  })

  return paragraphs
}

export default async function BlogPost({ params }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  // Server-side parsing is not possible with DOMParser (browser API)
  // So we'll extract paragraphs differently
  const sections = post.headings && post.headings.length > 0
    ? post.headings.map(heading => ({
        id: heading.id,
        heading: heading.text,
        paragraphs: [] // Will be populated client-side
      }))
    : []

  // Extract all paragraphs from content
  const allParagraphs = extractParagraphsFromHTML(post.content)

  // If we have headings, distribute paragraphs across sections
  // Otherwise create a single section
  let finalSections
  if (sections.length > 0) {
    // Distribute paragraphs evenly across sections
    const paragraphsPerSection = Math.ceil(allParagraphs.length / sections.length)
    finalSections = sections.map((section, index) => ({
      ...section,
      paragraphs: allParagraphs.slice(
        index * paragraphsPerSection,
        (index + 1) * paragraphsPerSection
      )
    })).filter(section => section.paragraphs.length > 0)
  } else {
    finalSections = [{
      id: 'content',
      heading: 'İçerik',
      paragraphs: allParagraphs
    }]
  }

  return (
    <Container>
      <div className="py-8 sm:py-12">
        <Link
          href="/incelemeler"
          aria-label="Go back to incelemeler"
          className="group mb-6 inline-flex items-center gap-1.5 text-sm text-muted transition-all hover:gap-2 hover:text-foreground"
        >
          <ArrowLeftIcon className="h-3.5 w-3.5 stroke-current transition-transform group-hover:-translate-x-0.5" />
          <span>Geri Dön</span>
        </Link>

        <div className="mx-auto max-w-7xl">
          <ResearchContent
            sections={finalSections}
            title={post.title}
            author={post.author}
          />
        </div>
      </div>
    </Container>
  )
}

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

// Extract paragraphs and list items from an HTML fragment
function extractParagraphsFromSection(html) {
  if (!html) return []
  const paragraphs = []

  const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi
  let match
  while ((match = pRegex.exec(html)) !== null) {
    const text = match[1].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
    if (text && text.length > 10) paragraphs.push(text)
  }

  const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi
  while ((match = liRegex.exec(html)) !== null) {
    const text = match[1].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
    if (text && text.length > 10) paragraphs.push(text)
  }

  return paragraphs
}

// Server-safe section parser: associates content with its h2 heading via regex
function extractSectionsFromHTML(htmlContent, headings) {
  if (!htmlContent) return []

  if (!headings || headings.length === 0) {
    return [{ id: 'content', heading: 'İçerik', paragraphs: extractParagraphsFromSection(htmlContent) }]
  }

  const sections = []

  for (let i = 0; i < headings.length; i++) {
    const heading = headings[i]
    const nextHeading = headings[i + 1]

    const escapedText = heading.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const headingPattern = new RegExp(`<h2[^>]*>${escapedText}</h2>`, 'i')
    const headingMatch = headingPattern.exec(htmlContent)
    if (!headingMatch) continue

    const sectionStart = headingMatch.index + headingMatch[0].length
    let sectionEnd = htmlContent.length

    if (nextHeading) {
      const escapedNext = nextHeading.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const nextPattern = new RegExp(`<h2[^>]*>${escapedNext}</h2>`, 'i')
      const nextMatch = nextPattern.exec(htmlContent.substring(sectionStart))
      if (nextMatch) sectionEnd = sectionStart + nextMatch.index
    }

    const sectionContent = htmlContent.substring(sectionStart, sectionEnd)
    const paragraphs = extractParagraphsFromSection(sectionContent)

    if (paragraphs.length > 0) {
      sections.push({ id: heading.id, heading: heading.text, paragraphs })
    }
  }

  return sections
}

export default async function BlogPost({ params }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const finalSections = extractSectionsFromHTML(post.content, post.headings)

  // Kişisel category: render as blog article, not note cards
  if (post.category === 'kisisel') {
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

          <article className="mx-auto max-w-2xl">
            <div className="mb-8 text-center">
              <h1 className="text-xl font-bold tracking-tight text-foreground">
                {post.title}
              </h1>
              {post.author && (
                <p className="mt-2 text-xs text-muted-foreground">{post.author}</p>
              )}
              {post.date && (
                <p className="mt-1 text-xs text-muted-foreground">
                  {new Date(post.date).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              )}
            </div>
            <div
              className="prose prose-sm dark:prose-invert max-w-none text-foreground leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </div>
      </Container>
    )
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

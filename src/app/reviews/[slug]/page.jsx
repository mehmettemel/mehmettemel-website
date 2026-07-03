import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Container } from '../../../components/Container'
import { getPostBySlug, getAllPostSlugs } from '../../../lib/blog'
import { ResearchContent } from '../../../components/research/ResearchContent'
import { getRichReview, richReviews } from '@/data/reviews'
import { ReviewArticle } from '@/components/review-blocks/ReviewArticle'

export async function generateStaticParams() {
  const posts = getAllPostSlugs()
  return [
    ...richReviews.map((r) => ({ slug: r.slug })),
    ...posts.map((post) => ({ slug: post.slug })),
  ]
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const rich = getRichReview(slug)
  if (rich) {
    return {
      title: rich.title,
      description: rich.subtitle,
      openGraph: {
        title: rich.title,
        description: rich.subtitle,
        type: 'article',
        publishedTime: rich.date,
      },
    }
  }
  const post = await getPostBySlug(slug)
  if (!post) return {}
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

export default async function BlogPost({ params }) {
  const { slug } = await params

  // Zengin (blok tabanlı) analiz yazısı mı?
  const rich = getRichReview(slug)
  if (rich) {
    return (
      <Container>
        <div className="py-8 sm:py-12">
          <Link
            href="/reviews"
            aria-label="Go back to reviews"
            className="group mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-all hover:gap-2 hover:text-foreground"
          >
            <ArrowLeftIcon className="h-3.5 w-3.5 stroke-current transition-transform group-hover:-translate-x-0.5" />
            <span>Back</span>
          </Link>
          <ReviewArticle review={rich} />
        </div>
      </Container>
    )
  }

  const post = await getPostBySlug(slug)

  if (!post) notFound()

  return (
    <Container>
      <div className="py-8 sm:py-12">
        <Link
          href="/reviews"
          aria-label="Go back to reviews"
          className="group mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-all hover:gap-2 hover:text-foreground"
        >
          <ArrowLeftIcon className="h-3.5 w-3.5 stroke-current transition-transform group-hover:-translate-x-0.5" />
          <span>Back</span>
        </Link>

        <div className="mx-auto max-w-5xl">
          <div className="flex gap-16">
            {/* Main Article */}
            <article className="min-w-0 flex-1">
              {/* Header */}
              <header className="mb-10 border-b border-border pb-8">
                <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {post.title}
                </h1>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  {post.author && post.author !== 'Mehmet Temel' && (
                    <span>{post.author}</span>
                  )}
                  {post.source && (
                    <span className="text-muted-foreground/60">· {post.source}</span>
                  )}
                  {post.date && (
                    <span className="text-muted-foreground/60">
                      ·{' '}
                      {new Date(post.date).toLocaleDateString('tr-TR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  )}
                  {post.readingTime && (
                    <span className="text-muted-foreground/60">· {post.readingTime}</span>
                  )}
                </div>
              </header>

              {/* Content */}
              <div
                className="prose prose-sm dark:prose-invert max-w-none
                  prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-foreground
                  prose-h2:text-lg prose-h2:mt-10 prose-h2:mb-4
                  prose-p:text-foreground/90 prose-p:leading-relaxed prose-p:mb-4
                  prose-strong:text-foreground prose-strong:font-semibold
                  prose-em:text-foreground/80
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                  prose-blockquote:border-l-2 prose-blockquote:border-primary/40 prose-blockquote:pl-4 prose-blockquote:text-muted-foreground prose-blockquote:not-italic
                  prose-ul:my-4 prose-li:my-1 prose-li:text-foreground/90
                  prose-code:text-primary prose-code:bg-secondary/60 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-xs
                  prose-hr:border-border"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </article>

            {/* Sticky ToC */}
            <ResearchContent headings={post.headings} />
          </div>
        </div>
      </div>
    </Container>
  )
}

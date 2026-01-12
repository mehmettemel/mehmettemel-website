import { notFound } from 'next/navigation'
import Link from 'next/link'
import { format } from 'date-fns'
import { Container } from '../../../components/Container'
import { getPostBySlug, getAllPostSlugs } from '../../../lib/blog'

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
    title: `${post.title} | Mehmet Temel`,
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
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <Container>
      <div className="mx-auto max-w-4xl py-12 sm:py-16 lg:py-20">
        <Link
          href="/incelemeler"
          aria-label="Go back to incelemeler"
          className="group mb-10 inline-flex items-center gap-2 text-base sm:text-lg text-muted transition-all hover:text-foreground hover:gap-3"
        >
          <ArrowLeftIcon className="h-4 w-4 sm:h-5 sm:w-5 stroke-current transition-transform group-hover:-translate-x-1" />
          <span>Geri Dön</span>
        </Link>
        <article>
          <header className="mb-12 sm:mb-16 flex flex-col">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-tight font-bold tracking-tight text-foreground mb-8">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-base sm:text-lg text-muted">
              <time dateTime={post.date}>
                {format(new Date(post.date), 'd MMMM yyyy', { locale: require('date-fns/locale/tr') })}
              </time>
              {post.readingTime && (
                <>
                  <span className="text-muted-foreground/50">•</span>
                  <span>{post.readingTime}</span>
                </>
              )}
            </div>
            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg bg-secondary px-4 py-2 text-sm sm:text-base font-medium text-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>
          <div
            className="prose prose-lg sm:prose-xl max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </Container>
  )
}

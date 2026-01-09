import Link from 'next/link'
import { format } from 'date-fns'
import { Container } from '../../components/Container'
import { getAllPosts } from '../../lib/blog'

export const metadata = {
  title: 'Blog - Travel & Food Stories | Mehmet Temel',
  description:
    'Read authentic travel stories, food guides, restaurant reviews, and travel tips from around the world. Discover hidden gems and local experiences.',
}

function Article({ post }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <div className="md:col-span-3 group relative flex flex-col items-start">
        <h2 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
          <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl dark:bg-zinc-800/50" />
          <Link href={`/blog/${post.slug}`}>
            <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
            <span className="relative z-10">{post.title}</span>
          </Link>
        </h2>
        <time
          className="md:hidden relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 pl-3.5 dark:text-zinc-500"
          dateTime={post.date}
        >
          <span className="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
            <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
          </span>
          {format(new Date(post.date), 'MMMM d, yyyy')}
        </time>
        <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          {post.description}
        </p>
        <div
          aria-hidden="true"
          className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500"
        >
          Read article
          <svg
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            className="ml-1 h-4 w-4 stroke-current"
          >
            <path
              d="M6.75 5.75 9.25 8l-2.5 2.25"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {post.readingTime && (
          <span className="relative z-10 mt-2 text-xs text-zinc-400 dark:text-zinc-500">
            {post.readingTime}
          </span>
        )}
      </div>
      <time
        className="mt-1 hidden md:block relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500"
        dateTime={post.date}
      >
        {format(new Date(post.date), 'MMMM d, yyyy')}
      </time>
    </article>
  )
}

export default function BlogIndex() {
  const posts = getAllPosts()

  return (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          Travel Stories & Food Adventures
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          Discover authentic travel experiences, hidden food gems, and honest restaurant
          reviews from my adventures around the world. From street food to fine dining,
          local culture to travel tips—join me on this culinary journey.
        </p>
      </header>
      <div className="mt-16 sm:mt-20">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-zinc-600 dark:text-zinc-400">
              No blog posts yet. Check back soon for exciting travel and food stories!
            </p>
          </div>
        ) : (
          <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
            <div className="flex max-w-3xl flex-col space-y-16">
              {posts.map((post) => (
                <Article key={post.slug} post={post} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Container>
  )
}

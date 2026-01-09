import Link from 'next/link'
import { format } from 'date-fns'

import { Button } from '../components/Button'
import { Container } from '../components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from '../components/SocialIcons'
import { getAllPosts } from '../lib/blog'

// SEO metadata for the home page
export const metadata = {
  title: 'Mehmet Temel - Travel & Food Blogger | Best Food Spots & Travel Tips',
  description:
    'Discover authentic travel experiences and hidden food gems around the world. Travel and food blogger sharing restaurant reviews, local cuisine guides, and travel tips from Turkey and beyond. Find the best food spots, authentic local dishes, and travel recommendations.',
  keywords: [
    'travel blog',
    'food blog',
    'restaurant reviews',
    'travel tips',
    'local cuisine',
    'authentic food',
    'food photography',
    'travel photography',
    'Adana food',
    'Turkish cuisine',
    'Turkey travel',
    'Mediterranean food',
    'street food',
    'local food spots',
    'food guide',
    'travel guide',
    'best restaurants',
    'hidden gems',
    'culinary travel',
    'food culture',
    'travel experiences',
    'solo travel',
    'budget travel',
    'digital nomad',
    'backpacking',
    'city guides',
    'Mehmet Temel',
  ],
  openGraph: {
    title:
      'Mehmet Temel - Travel & Food Blogger | Best Food Spots & Travel Tips',
    description:
      'Discover authentic travel experiences and hidden food gems around the world. Restaurant reviews, local cuisine guides, and travel tips from Turkey and beyond.',
    url: 'https://mehmettemel.com',
    siteName: 'Mehmet Temel Travel & Food Blog',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mehmet Temel - Travel & Food Blogger',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@temelbusiness',
    creator: '@temelbusiness',
    title: 'Mehmet Temel - Travel & Food Blogger',
    description:
      'Discover authentic travel experiences and hidden food gems around the world. Restaurant reviews and travel tips.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://mehmettemel.com',
  },
}

function SocialLink({ icon: Icon, ...props }) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  )
}

function Article({ post }) {
  return (
    <article className="group relative flex flex-col items-start">
      <h2 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
        <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl dark:bg-zinc-800/50" />
        <Link href={`/blog/${post.slug}`}>
          <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
          <span className="relative z-10">{post.title}</span>
        </Link>
      </h2>
      <time
        className="relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 pl-3.5 dark:text-zinc-500"
        dateTime={post.date}
      >
        <span
          className="absolute inset-y-0 left-0 flex items-center"
          aria-hidden="true"
        >
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
    </article>
  )
}

export default function Home() {
  const posts = getAllPosts().slice(0, 3)

  return (
    <>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            Travel & Food Blogger
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            I'm Mehmet Temel, a passionate traveler and food enthusiast
            who's been exploring the world one dish at a time. Based in
            Adana, Turkey, but always on the move, I share authentic travel
            experiences, hidden food gems, and honest restaurant reviews from my
            adventures around the globe.
          </p>
          <div className="mt-6 flex gap-6">
            <SocialLink
              href="https://x.com/temelbusiness"
              aria-label="Follow on X"
              icon={XIcon}
            />
            <SocialLink
              href="https://www.instagram.com/mehmettemelim"
              aria-label="Follow on Instagram"
              icon={InstagramIcon}
            />
            <SocialLink
              href="https://github.com/mehmettemel"
              aria-label="Follow on GitHub"
              icon={GitHubIcon}
            />
            <SocialLink
              href="https://www.linkedin.com/in/mehmettemelim"
              aria-label="Follow on LinkedIn"
              icon={LinkedInIcon}
            />
          </div>
        </div>
      </Container>
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto max-w-2xl">
          <div className="flex flex-col gap-16">
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
                  Latest Posts
                </h2>
                {posts.length > 0 && (
                  <Button href="/blog" variant="secondary">
                    View all
                  </Button>
                )}
              </div>
              {posts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-zinc-600 dark:text-zinc-400">
                    No blog posts yet. Check back soon for exciting travel and food
                    stories!
                  </p>
                </div>
              ) : (
                <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
                  <div className="flex flex-col space-y-16">
                    {posts.map((post) => (
                      <Article key={post.slug} post={post} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

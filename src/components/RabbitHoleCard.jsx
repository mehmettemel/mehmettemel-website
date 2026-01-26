'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'

// Animation variants for individual cards
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

// Category icons and colors
const categoryConfig = {
  gidalar: { icon: '🍎', color: 'text-green-600 dark:text-green-400' },
  besinler: { icon: '💊', color: 'text-blue-600 dark:text-blue-400' },
  mekanizmalar: { icon: '🧬', color: 'text-purple-600 dark:text-purple-400' },
  kitaplar: { icon: '📚', color: 'text-orange-600 dark:text-orange-400' },
}

export function RabbitHoleCard({ post, index }) {
  const categoryInfo = categoryConfig[post.category] || {
    icon: '📄',
    color: 'text-muted-foreground',
  }

  return (
    <motion.article
      variants={itemVariants}
      className="group relative"
      style={{ zIndex: index }}
    >
      <Link
        href={`/incelemeler/${post.slug}`}
        className="block rounded-lg border border-border bg-background p-4 transition-all hover:border-foreground/20 hover:shadow-md sm:p-5"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            {/* Title */}
            <h3 className="mb-1.5 text-base font-semibold tracking-tight text-foreground transition-colors group-hover:text-foreground/80 sm:text-lg">
              {post.title}
            </h3>

            {/* Description */}
            {post.description && (
              <p className="mb-3 line-clamp-2 text-xs text-muted-foreground sm:text-sm">
                {post.description}
              </p>
            )}

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              {/* Category badge */}
              <span
                className={`inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 font-medium ${categoryInfo.color}`}
              >
                <span className="text-sm">{categoryInfo.icon}</span>
                <span className="capitalize">{post.category}</span>
              </span>

              {/* Date */}
              {post.date && (
                <>
                  <span className="text-muted-foreground/40">•</span>
                  <time dateTime={post.date}>
                    {format(new Date(post.date), 'd MMM yyyy', { locale: tr })}
                  </time>
                </>
              )}

              {/* Reading time */}
              {post.readingTime && (
                <>
                  <span className="text-muted-foreground/40">•</span>
                  <span>{post.readingTime}</span>
                </>
              )}
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {post.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-secondary/50 px-2 py-0.5 text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
                {post.tags.length > 4 && (
                  <span className="rounded-md bg-secondary/50 px-2 py-0.5 text-xs text-muted-foreground">
                    +{post.tags.length - 4}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Arrow indicator */}
          <div className="flex-shrink-0 pt-1">
            <div className="flex h-6 w-6 items-center justify-center rounded-full border border-border bg-secondary transition-all group-hover:border-foreground/40 group-hover:bg-foreground group-hover:text-background">
              <svg
                className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Featured badge */}
        {post.featured && (
          <div className="absolute -right-1 -top-1 rounded-full bg-yellow-500 px-2 py-0.5 text-xs font-medium text-white shadow-sm">
            ⭐
          </div>
        )}
      </Link>
    </motion.article>
  )
}

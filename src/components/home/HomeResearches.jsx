'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { format } from 'date-fns'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.4,
    },
  },
}

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
}

export function HomeResearches({ posts }) {
  if (!posts || posts.length === 0) {
    return null
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground sm:text-2xl">
          Son Araştırmalar
        </h2>
        <Link
          href="/incelemeler"
          className="group inline-flex items-center gap-2 text-sm font-medium text-muted transition-all hover:gap-3 hover:text-primary"
        >
          Tümünü Gör
          <motion.svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </motion.svg>
        </Link>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-0 overflow-hidden rounded-xl border border-border bg-card shadow-lg"
      >
        {posts.map((post, index) => (
          <motion.div key={post.slug} variants={item}>
            <Link
              href={`/incelemeler/${post.slug}`}
              className="group flex items-center justify-between border-b border-border px-4 py-4 transition-all last:border-b-0 hover:bg-secondary/30 active:bg-secondary/40 sm:px-5 sm:py-5"
            >
              <span className="line-clamp-2 flex-1 pr-4 text-sm font-medium text-foreground transition-colors group-hover:text-primary sm:text-base">
                {post.title}
              </span>
              <motion.span
                className="flex-shrink-0 text-xs whitespace-nowrap text-muted"
                whileHover={{ scale: 1.05 }}
              >
                {format(new Date(post.date), 'MMM d, yyyy')}
              </motion.span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}

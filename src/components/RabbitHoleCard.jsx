'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

// Animation variants for individual items
const itemVariants = {
  hidden: { opacity: 0, y: 5 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

export function RabbitHoleCard({ post, index }) {
  return (
    <motion.article
      variants={itemVariants}
      className="group w-full"
      style={{ zIndex: index }}
    >
      <Link
        href={`/incelemeler/${post.slug}`}
        className="block w-full text-center transition-opacity hover:opacity-60"
      >
        <h3 className="text-xs font-normal">
          <span className="text-foreground">{post.title}</span>
          {post.author && (
            <>
              <span className="text-muted-foreground"> - </span>
              <span className="text-muted-foreground">{post.author}</span>
            </>
          )}
        </h3>
      </Link>
    </motion.article>
  )
}

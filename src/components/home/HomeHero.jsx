'use client'

import { motion } from 'framer-motion'

export function HomeHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mb-12 text-center"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
      >
        Mehmet Temel
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg"
      >
        <p className="text-center leading-relaxed">
          Kişisel dijital koleksiyonum. Ayrıca
          <motion.a
            href="https://x.com/temelbusiness"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-1.5 align-middle text-foreground transition-colors hover:text-foreground/80"
            whileHover={{ scale: 1.2, y: -2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <span className="sr-only">X (formerly Twitter)</span>
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-4 w-4 fill-current"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </motion.a>
          platformunda düşüncelerimi yazıyorum.
        </p>
      </motion.div>
    </motion.div>
  )
}

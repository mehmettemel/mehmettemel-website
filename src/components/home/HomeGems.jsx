'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

const typeConfig = {
  teknik: {
    label: 'Teknik',
    icon: '🚀',
    color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  },
  icerik: {
    label: 'İçerik',
    icon: '📖',
    color: 'bg-green-500/10 text-green-600 dark:text-green-400',
  },
  diger: {
    label: 'Diğer',
    icon: '🌍',
    color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  },
}

export function HomeGems({ gems }) {
  if (!gems || gems.length === 0) {
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
          Son Keşifler
        </h2>
        <Link
          href="/kesifler"
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

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {gems.map((gem, index) => {
          const config = typeConfig[gem.type] || typeConfig.teknik
          return (
            <motion.a
              key={gem.id}
              href={gem.url}
              target="_blank"
              rel="noopener noreferrer"
              initial="initial"
              whileHover="hover"
              className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card p-4 shadow-md transition-all hover:z-10 hover:shadow-lg"
            >
              {/* Animated Drawing Border */}
              <div className="pointer-events-none absolute inset-0">
                <svg
                  className="h-full w-full text-primary"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <motion.rect
                    x="1.5"
                    y="1.5"
                    style={{
                      width: 'calc(100% - 3px)',
                      height: 'calc(100% - 3px)',
                    }}
                    rx="6.5"
                    ry="6.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    variants={{
                      initial: { pathLength: 0, opacity: 0 },
                      hover: {
                        pathLength: 1,
                        opacity: 1,
                        transition: {
                          pathLength: { duration: 0.6, ease: 'easeInOut' },
                          opacity: { duration: 0.2 },
                        },
                      },
                    }}
                  />
                </svg>
              </div>

              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
                initial={false}
              />

              <div className="relative mb-3 flex items-center gap-2">
                <span className="text-lg" role="img" aria-label={config.label}>
                  {config.icon}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${config.color}`}
                >
                  {config.label}
                </span>
              </div>

              <h3 className="relative mb-2 line-clamp-2 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                {gem.title}
              </h3>

              {gem.author && (
                <p className="relative mt-auto text-[10px] text-muted-foreground">
                  {gem.author}
                </p>
              )}

              <div className="absolute top-3 right-3 text-muted-foreground/40 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary">
                <ExternalLink className="h-3.5 w-3.5" />
              </div>
            </motion.a>
          )
        })}
      </div>
    </motion.section>
  )
}

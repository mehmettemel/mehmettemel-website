'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useMemo } from 'react'
import { ExternalLink } from 'lucide-react'

// Helper function to shuffle array
const shuffleArray = (array) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Get creative color palettes based on type
const getTypeColor = (type, isDark) => {
  switch (type) {
    case 'book':
      // Warm amber/orange - knowledge & learning
      return {
        bg: isDark ? 'hsl(35, 45%, 35%)' : 'hsl(35, 70%, 75%)',
        hoverBg: isDark ? 'hsl(35, 50%, 42%)' : 'hsl(35, 75%, 68%)',
        borderColor: isDark ? 'hsl(35, 40%, 45%)' : 'hsl(35, 50%, 65%)'
      }
    case 'video':
      // Purple/magenta - dynamic & creative
      return {
        bg: isDark ? 'hsl(280, 40%, 38%)' : 'hsl(280, 55%, 72%)',
        hoverBg: isDark ? 'hsl(280, 45%, 45%)' : 'hsl(280, 60%, 65%)',
        borderColor: isDark ? 'hsl(280, 35%, 48%)' : 'hsl(280, 45%, 62%)'
      }
    case 'article':
      // Teal/cyan - professional & analytical
      return {
        bg: isDark ? 'hsl(180, 40%, 35%)' : 'hsl(180, 60%, 70%)',
        hoverBg: isDark ? 'hsl(180, 45%, 42%)' : 'hsl(180, 65%, 63%)',
        borderColor: isDark ? 'hsl(180, 35%, 45%)' : 'hsl(180, 50%, 60%)'
      }
    default:
      // Slate gray - neutral
      return {
        bg: isDark ? 'hsl(220, 15%, 32%)' : 'hsl(220, 20%, 78%)',
        hoverBg: isDark ? 'hsl(220, 18%, 38%)' : 'hsl(220, 25%, 70%)',
        borderColor: isDark ? 'hsl(220, 12%, 42%)' : 'hsl(220, 18%, 68%)'
      }
  }
}

export function GridGems({ gems, onGemClick }) {
  const [hoveredGem, setHoveredGem] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isDark, setIsDark] = useState(false)

  // Shuffle gems once on mount
  const shuffledGems = useMemo(() => shuffleArray(gems), [gems])

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    checkDarkMode()

    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => observer.disconnect()
  }, [])

  // Calculate circles per row based on screen size
  const circlesPerRow = isMobile ? 5 : 7
  const rows = isMobile ? 8 : 10
  const totalCircles = Math.min(circlesPerRow * rows, shuffledGems.length)
  const displayedGems = shuffledGems.slice(0, totalCircles)

  return (
    <div className="relative w-full h-full flex items-center justify-center px-4 overflow-hidden">
      <div className="w-full max-w-[620px] h-full flex items-center justify-center">
        <div
          className="grid gap-3 md:gap-3.5 w-full"
          style={{
            gridTemplateColumns: `repeat(${circlesPerRow}, 1fr)`,
          }}
        >
          {displayedGems.map((gem, index) => {
            const colorConfig = getTypeColor(gem.type, isDark)
            const isHovered = hoveredGem === index
            const row = Math.floor(index / circlesPerRow)
            const col = index % circlesPerRow

            return (
              <motion.div
                key={gem.id}
                className="relative aspect-square"
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: (row * 0.08) + (col * 0.03),
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                onHoverStart={() => setHoveredGem(index)}
                onHoverEnd={() => setHoveredGem(null)}
              >
                <motion.button
                  onClick={() => onGemClick(index)}
                  className={`w-full h-full rounded-full relative overflow-hidden transition-all duration-300`}
                  whileTap={{ scale: 0.9 }}
                  animate={{
                    backgroundColor: isHovered ? colorConfig.hoverBg : colorConfig.bg,
                  }}
                  transition={{ duration: 0.2 }}
                  style={{
                    border: `1px solid ${colorConfig.borderColor}`,
                    boxShadow: isHovered
                      ? `0 4px 16px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06)`
                      : `0 1px 3px rgba(0,0,0,0.08)`
                  }}
                >
                  {/* Shine effect on hover */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: isDark
                            ? `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15) 0%, transparent 70%)`
                            : `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 70%)`
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Ripple effect on hover */}
                  {isHovered && (
                    <motion.div
                      className="absolute inset-0 rounded-full border"
                      style={{
                        borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'
                      }}
                      initial={{ scale: 0.8, opacity: 0.6 }}
                      animate={{
                        scale: 1.3,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeOut',
                      }}
                    />
                  )}
                </motion.button>

                {/* Hover tooltip */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full z-50 pointer-events-none"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{
                        duration: 0.25,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                    >
                      <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg shadow-xl px-3 py-2 min-w-[180px] max-w-[240px]">
                        <div className="text-[11px] font-semibold text-foreground mb-1 line-clamp-1">
                          {gem.title}
                        </div>
                        <div className="text-[9px] text-muted-foreground line-clamp-1 mb-1.5">
                          {gem.description}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] px-2 py-0.5 rounded-full bg-secondary/80 text-muted capitalize">
                            {gem.type}
                          </span>
                          <span className="text-[9px] text-primary font-medium">Click to view</span>
                        </div>
                        {/* Arrow pointer */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                          <div className="w-2 h-2 rotate-45 bg-background/95 border-r border-b border-border" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export function GemDetailsPanel({ gem, onClose, onVisit }) {
  if (!gem) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-8 left-1/2 z-[9999] w-full max-w-sm md:max-w-md -translate-x-1/2 px-4"
      >
        <div className="overflow-hidden rounded-xl border border-border bg-background shadow-2xl backdrop-blur-lg">
          {/* Header with close button */}
          <div className="relative border-b border-border p-4">
            <h3 className="text-lg font-bold text-foreground pr-8">
              {gem.title}
            </h3>
            <button
              onClick={onClose}
              className="absolute right-3 top-3 rounded-lg p-1.5 text-muted hover:bg-secondary hover:text-foreground transition"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-4">
            <p className="mb-4 text-sm text-muted-foreground">
              {gem.description}
            </p>

            {/* Meta info */}
            <div className="mb-4 flex flex-wrap gap-2">
              {gem.author && (
                <span className="rounded-full bg-secondary px-3 py-1 text-xs text-muted">
                  {gem.author}
                </span>
              )}
              <span className="rounded-full bg-secondary px-3 py-1 text-xs capitalize text-muted">
                {gem.type}
              </span>
            </div>

            {/* Visit button */}
            {gem.url && (
              <button
                onClick={onVisit}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                <span>Visit Resource</span>
                <ExternalLink className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

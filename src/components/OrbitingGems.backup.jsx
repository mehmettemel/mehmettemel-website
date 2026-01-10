'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ExternalLink } from 'lucide-react'

export function OrbitingGems({ gems, currentGemIndex, onGemClick }) {
  const [hoveredGem, setHoveredGem] = useState(null)
  const [hoveredGemPosition, setHoveredGemPosition] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleMouseEnter = (index, event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setHoveredGemPosition({
      x: rect.left + rect.width / 2,
      y: rect.top
    })
    setHoveredGem(index)
  }

  const handleMouseLeave = () => {
    setHoveredGem(null)
    setHoveredGemPosition(null)
  }

  // Multiple orbits configuration
  const gemsPerOrbit = 5
  const numberOfOrbits = Math.ceil(gems.length / gemsPerOrbit)
  const baseRadius = isMobile ? 60 : 90
  const radiusIncrement = isMobile ? 28 : 40

  return (
    <div className="relative flex h-full w-full items-center justify-center" style={{ zIndex: 1 }}>
      {Array.from({ length: numberOfOrbits }).map((_, orbitIndex) => {
        const radius = baseRadius + (orbitIndex * radiusIncrement)
        const duration = 30 + (orbitIndex * 5) // Each orbit has different speed
        const startAngle = orbitIndex * 45 // Each orbit starts from different angle
        const direction = orbitIndex % 2 === 0 ? 1 : -1 // Alternate directions
        const gemsInThisOrbit = gems.slice(
          orbitIndex * gemsPerOrbit,
          (orbitIndex + 1) * gemsPerOrbit
        )

        return (
          <motion.div
            key={`orbit-${orbitIndex}`}
            className="absolute pointer-events-none rounded-full border border-border/20"
            style={{
              width: radius * 2,
              height: radius * 2,
              rotate: `${startAngle}deg`,
            }}
            animate={{
              rotate: `${startAngle + (direction * 360)}deg`
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {gemsInThisOrbit.map((gem, indexInOrbit) => {
              const globalIndex = orbitIndex * gemsPerOrbit + indexInOrbit
              const isActive = globalIndex === currentGemIndex
              const isHovered = hoveredGem === globalIndex
              // Distribute circles evenly with unique offset per orbit to prevent overlap
              const baseAngle = (360 / gemsInThisOrbit.length) * indexInOrbit
              const orbitOffset = (orbitIndex * 37) % 72 // Unique offset per orbit (less than 72 degrees)
              const angle = baseAngle + orbitOffset

              return (
                <motion.div
                  key={gem.id}
                  className="absolute left-1/2 top-0 -translate-x-1/2 pointer-events-auto"
                  style={{
                    marginTop: isMobile ? -5 : -7,
                    rotate: `${angle}deg`,
                  }}
                  initial={{
                    opacity: 0,
                    scale: 0
                  }}
                  animate={{
                    rotate: `-${angle + (direction * 360)}deg`,
                    opacity: 1,
                    scale: 1
                  }}
                  transition={{
                    rotate: {
                      duration: duration,
                      repeat: Infinity,
                      ease: 'linear',
                    },
                    opacity: { duration: 0.5, delay: globalIndex * 0.02 },
                    scale: { duration: 0.5, delay: globalIndex * 0.02, ease: 'backOut' }
                  }}
                >
                  <div
                    onMouseEnter={(e) => handleMouseEnter(globalIndex, e)}
                    onMouseLeave={handleMouseLeave}
                    className="relative"
                    style={{ zIndex: isHovered ? 10000 : 1 }}
                  >
                    <button
                      onClick={() => onGemClick(globalIndex)}
                      className="relative flex items-center justify-center rounded-full transition-all duration-300"
                      style={{
                        width: isMobile ? '10px' : '14px',
                        height: isMobile ? '10px' : '14px',
                        backgroundColor: gem.color,
                        boxShadow: isActive ? `0 0 16px ${gem.color}` : `0 0 8px ${gem.color}99`,
                        border: isActive ? `2px solid white` : 'none',
                      }}
                    >
                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          className="absolute -inset-1.5 rounded-full"
                          style={{
                            border: `2px solid ${gem.color}`,
                            opacity: 0.5
                          }}
                          animate={{
                            scale: [1, 1.4, 1],
                            opacity: [0.5, 0.2, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        />
                      )}
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        )
      })}

      {/* Info card - fixed position outside of orbit containers */}
      <AnimatePresence>
        {hoveredGem !== null && hoveredGemPosition && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed w-48 md:w-56 p-3 rounded-lg bg-background border border-border shadow-xl pointer-events-none"
            style={{
              left: `${hoveredGemPosition.x}px`,
              top: `${hoveredGemPosition.y - 16}px`,
              transform: 'translate(-50%, -100%)',
              zIndex: 10001,
            }}
          >
            <div className="text-xs font-semibold text-foreground mb-1 line-clamp-2">
              {gems[hoveredGem].title}
            </div>
            <div className="text-[10px] text-muted-foreground line-clamp-2 mb-2">
              {gems[hoveredGem].description}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted capitalize">
                {gems[hoveredGem].type}
              </span>
              <span className="text-[10px] text-primary">Click to view</span>
            </div>
            {/* Arrow pointer */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
              <div className="w-2 h-2 rotate-45 bg-background border-r border-b border-border" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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

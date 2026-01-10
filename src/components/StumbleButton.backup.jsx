'use client'

import { motion } from 'framer-motion'

export function CenterCircle({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative flex h-20 w-20 md:h-24 md:w-24 items-center justify-center cursor-pointer group"
    >
      {/* Sun glow effect - static for performance */}
      <div className="absolute inset-0 rounded-full bg-yellow-500/20 blur-sm" />

      {/* Main sun circle */}
      <motion.div
        className="relative h-full w-full rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 shadow-lg shadow-yellow-500/50 transition-transform"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          opacity: { duration: 0.5, delay: 0.3 },
          scale: { duration: 0.6, delay: 0.3, ease: 'backOut' },
        }}
      />
    </button>
  )
}

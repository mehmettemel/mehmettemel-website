'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export function HomeButtons() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="mb-16 flex flex-wrap justify-center gap-3 sm:gap-4"
    >
      <motion.div
        className="relative"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Link
          href="https://x.com/temelbusiness"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary via-primary to-primary/80 shadow-xl transition-shadow hover:shadow-2xl"
        >
          {/* Animated background rings */}
          <motion.div
            className="absolute inset-0 rounded-full"
            initial={{ scale: 1, opacity: 0 }}
            whileHover={{ scale: [1, 1.4, 1.6], opacity: [0, 0.2, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            style={{ border: '2px solid currentColor' }}
          />
          <motion.div
            className="absolute inset-0 rounded-full"
            initial={{ scale: 1, opacity: 0 }}
            whileHover={{ scale: [1, 1.3, 1.5], opacity: [0, 0.3, 0] }}
            transition={{ duration: 0.8, delay: 0.2, repeat: Infinity }}
            style={{ border: '2px solid currentColor' }}
          />

          {/* Rotating gradient overlay */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />

          {/* X Logo with advanced animations */}
          <svg
            className="relative z-10 h-6 w-6 text-primary-foreground"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            {/* Actual X/Twitter logo path */}
            <motion.path
              d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231z"
              fill="currentColor"
              stroke="none"
              initial={{ scale: 1, rotateY: 0 }}
              whileHover={{
                scale: [1, 0.8, 1.1, 1],
                rotateY: [0, 180, 360],
                rotateZ: [0, -10, 10, 0],
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />

            {/* Glitch effect layers */}
            <motion.path
              d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231z"
              fill="currentColor"
              stroke="none"
              initial={{ opacity: 0, x: 0, y: 0 }}
              whileHover={{
                opacity: [0, 0.5, 0, 0.3, 0],
                x: [0, -2, 2, -1, 0],
                y: [0, 1, -1, 1, 0],
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              style={{ mixBlendMode: 'screen' }}
            />

            {/* Neon trail effect */}
            <motion.path
              d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              whileHover={{
                pathLength: [0, 1, 1],
                opacity: [0, 1, 0],
                strokeWidth: [0, 2, 0],
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              style={{ filter: 'blur(1px)' }}
            />
          </svg>

          {/* Particle burst on hover */}
          {[...Array(8)].map((_, i) => {
            const angle = (i * 360) / 8
            const x = Math.cos((angle * Math.PI) / 180) * 20
            const y = Math.sin((angle * Math.PI) / 180) * 20
            return (
              <motion.div
                key={i}
                className="absolute h-1 w-1 rounded-full bg-primary-foreground"
                style={{ left: '50%', top: '50%' }}
                initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                whileHover={{
                  scale: [0, 1, 0],
                  x: [0, x],
                  y: [0, y],
                  opacity: [0, 1, 0],
                }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: "easeOut" }}
              />
            )
          })}
        </Link>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Link
          href="/bu-hafta"
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-secondary px-6 py-3 text-sm font-medium text-foreground shadow-lg transition-shadow hover:shadow-xl sm:text-base"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-secondary/80 to-secondary"
            initial={{ x: '-100%' }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.svg
            className="relative h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <motion.circle
              cx="12"
              cy="12"
              r="2"
              fill="currentColor"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.5 8.5a5 5 0 0 1 7 7"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
            />
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.5 5.5a9 9 0 0 1 13 13"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
            />
          </motion.svg>
          <span className="relative">Bu Hafta'ya Abone Ol</span>
        </Link>
      </motion.div>
    </motion.div>
  )
}

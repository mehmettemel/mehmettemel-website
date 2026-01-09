'use client'

import { motion, AnimatePresence } from 'framer-motion'

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
  },
}

const pageTransition = {
  type: 'tween',
  ease: [0.22, 1, 0.36, 1], // Custom easing for smoother animation
  duration: 0.5,
}

export default function Template({ children }) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  )
}

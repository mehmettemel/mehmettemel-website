'use client'

import { motion } from 'framer-motion'
import { cn } from '../lib/utils'

// Animation variants for smooth category buttons
const buttonVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.03,
      duration: 0.25,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
}

const mobileButtonVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.03,
      duration: 0.25,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
}

export function ResearchCategorySidebar({
  categories,
  selectedCategory,
  onCategoryChange,
}) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
        <div className="w-56">
          <h3 className="mb-4 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
            Kategoriler
          </h3>
          <nav className="space-y-1">
            {categories.map((category, index) => {
              const isActive = selectedCategory === category.id
              return (
                <motion.button
                  key={category.id}
                  custom={index}
                  variants={buttonVariants}
                  initial="hidden"
                  animate="visible"
                  onClick={() => onCategoryChange(category.id)}
                  className={cn(
                    'group relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors duration-150',
                    isActive
                      ? 'bg-primary/10 text-primary shadow-sm'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
                  )}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeResearchCategory"
                      className="absolute top-1/2 left-0 h-8 w-1 -translate-y-1/2 rounded-r-full bg-primary"
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 35,
                      }}
                    />
                  )}

                  {/* Icon */}
                  <span
                    className="text-lg"
                    role="img"
                    aria-label={category.name}
                  >
                    {category.icon}
                  </span>

                  {/* Label & Count */}
                  <span className="flex-1">{category.name}</span>
                  <span
                    className={cn(
                      'rounded-full px-2 py-0.5 text-xs font-medium transition-colors',
                      isActive
                        ? 'bg-primary/20 text-primary'
                        : 'bg-secondary text-muted-foreground group-hover:bg-secondary/80',
                    )}
                  >
                    {category.count}
                  </span>
                </motion.button>
              )
            })}
          </nav>
        </div>
      </aside>

      {/* Mobile Dropdown */}
      <div className="mb-6 lg:hidden">
        <h3 className="mb-3 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
          Kategoriler
        </h3>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {categories.map((category, index) => {
            const isActive = selectedCategory === category.id
            return (
              <motion.button
                key={category.id}
                custom={index}
                variants={mobileButtonVariants}
                initial="hidden"
                animate="visible"
                onClick={() => onCategoryChange(category.id)}
                className={cn(
                  'flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-secondary text-foreground hover:bg-secondary/80',
                )}
              >
                <span className="text-base">{category.icon}</span>
                <span className="truncate">{category.name}</span>
                <span className="text-xs opacity-75">({category.count})</span>
              </motion.button>
            )
          })}
        </div>
      </div>
    </>
  )
}

'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ExternalLink, Info } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

/**
 * Unified Card Component for both Links and Quotes
 * - Consistent design across kesifler section
 * - Smooth framer-motion animations without flickering
 * - Smooth hover interactions
 */
export function UnifiedCard({
  title,
  description,
  icon,
  badge,
  author,
  source,
  url,
  isExternal = false,
  index = 0,
}) {
  const CardWrapper = isExternal ? motion.a : motion.div
  const cardProps = isExternal
    ? {
        href: url,
        target: '_blank',
        rel: 'noopener noreferrer',
      }
    : {}

  return (
    <CardWrapper
      {...cardProps}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: index * 0.04,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="group relative block rounded-xl border border-border bg-card p-6 transition-colors duration-200 hover:border-primary/40 hover:bg-secondary/20 hover:shadow-md sm:p-7"
    >
      {/* Icon Badge */}
      {icon && badge && (
        <div className="mb-4 flex items-center gap-3">
          <span className="text-2xl" role="img" aria-label={badge.label}>
            {icon}
          </span>
          <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${badge.color}`}
          >
            {badge.label}
          </span>
        </div>
      )}

      {/* Title/Text */}
      <div className="mb-4">
        {title ? (
          <h3 className="text-lg leading-snug font-semibold text-foreground transition-colors group-hover:text-primary sm:text-xl">
            {title}
          </h3>
        ) : (
          <blockquote className="text-base leading-[1.7] whitespace-pre-line text-foreground sm:text-lg">
            {description}
          </blockquote>
        )}
      </div>

      {/* Description (for links) */}
      {title && description && (
        <p className="mb-4 text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}

      {/* Info Icon for Author/Source (for quotes without links) */}
      {!isExternal && (author || source) && (
        <TooltipProvider>
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <div className="absolute top-6 right-6 text-muted-foreground/40 cursor-help transition-colors hover:text-muted-foreground">
                <Info className="h-5 w-5" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="left" className="max-w-xs">
              <div className="space-y-1">
                {author && (
                  <p className="text-xs">
                    <span className="font-semibold">Kimden:</span> {author}
                  </p>
                )}
                {source && (
                  <p className="text-xs">
                    <span className="font-semibold">Nereden:</span> {source}
                  </p>
                )}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      {/* External Link Icon */}
      {isExternal && (
        <div className="absolute top-6 right-6 text-muted-foreground/40 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary">
          <ExternalLink className="h-5 w-5" />
        </div>
      )}

      {/* URL Link (for quotes with sources) */}
      {url && !isExternal && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          Kaynağa Git
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      )}
    </CardWrapper>
  )
}

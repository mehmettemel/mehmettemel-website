'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink, BookOpen, Youtube, FileText, Sparkles } from 'lucide-react'

export function BentoCard({ gem, index }) {
  const sizeClasses = {
    small: 'col-span-1 row-span-1',
    medium: 'col-span-1 md:col-span-2 row-span-1',
    large: 'col-span-1 md:col-span-2 row-span-2',
    tall: 'col-span-1 row-span-2',
  }

  const getIcon = (type) => {
    switch (type) {
      case 'book':
        return <BookOpen className="w-5 h-5" />
      case 'video':
        return <Youtube className="w-5 h-5" />
      case 'article':
        return <FileText className="w-5 h-5" />
      default:
        return <Sparkles className="w-5 h-5" />
    }
  }

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`${
        sizeClasses[gem.size]
      } group relative overflow-hidden rounded-2xl bg-gradient-to-br from-secondary/50 to-secondary border border-border hover:border-primary/50 transition-all duration-300`}
    >
      {/* Background Image/Thumbnail if exists */}
      {gem.image && (
        <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
          <Image
            src={gem.image}
            alt={gem.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Color overlay for video/book types */}
      {gem.color && (
        <div
          className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity"
          style={{ backgroundColor: gem.color }}
        />
      )}

      {/* Content */}
      <div className="relative h-full p-6 flex flex-col justify-between">
        {/* Top section */}
        <div>
          {/* Type Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm text-xs font-medium text-foreground mb-4">
            {getIcon(gem.type)}
            <span className="capitalize">{gem.type}</span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {gem.title}
          </h3>

          {/* Description */}
          <p className={`text-sm text-muted-foreground ${
            gem.size === 'small' ? 'line-clamp-2' : 'line-clamp-3'
          }`}>
            {gem.description}
          </p>
        </div>

        {/* Bottom section */}
        <div className="flex items-center justify-between mt-4">
          {gem.author && (
            <span className="text-xs text-muted">{gem.author}</span>
          )}
          <motion.div
            className="text-primary"
            initial={{ x: -5, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </motion.div>
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  )

  if (gem.url) {
    return (
      <Link href={gem.url} target="_blank" rel="noopener noreferrer">
        {content}
      </Link>
    )
  }

  return content
}

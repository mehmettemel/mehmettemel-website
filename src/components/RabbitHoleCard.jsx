'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
const getCategoryName = (category) => {
  const names = { gidalar: 'Gidalar', besinler: 'Besinler', mekanizmalar: 'Mekanizmalar' }
  return names[category] || category
}
export function RabbitHoleCard({ post, index }) {
  const getCategoryConfig = (category) => {
    switch (category) {
      case 'gidalar':
        return { gradient: 'from-primary/5 to-primary/10', borderColor: 'border-primary/20 hover:border-primary/40', bgPattern: 'bg-primary/5', badgeBg: 'bg-primary/10', badgeText: 'text-primary' }
      case 'besinler':
        return { gradient: 'from-secondary/5 to-secondary/10', borderColor: 'border-secondary/20 hover:border-secondary/40', bgPattern: 'bg-secondary/5', badgeBg: 'bg-secondary/10', badgeText: 'text-secondary-foreground' }
      case 'mekanizmalar':
        return { gradient: 'from-accent/5 to-accent/10', borderColor: 'border-accent/20 hover:border-accent/40', bgPattern: 'bg-accent/5', badgeBg: 'bg-accent/10', badgeText: 'text-accent-foreground' }
      default:
        return { gradient: 'from-foreground/5 to-foreground/10', borderColor: 'border-border hover:border-primary/40', bgPattern: 'bg-secondary/50', badgeBg: 'bg-secondary', badgeText: 'text-secondary-foreground' }
    }
  }
  const config = getCategoryConfig(post.category)
  const categoryName = getCategoryName(post.category)
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.05 }}>
      <Link href={'/researches/' + post.slug} className={'group flex items-center justify-between relative overflow-hidden rounded-lg border ' + config.borderColor + ' bg-gradient-to-r ' + config.gradient + ' p-4 transition-all duration-300 hover:shadow-md'}>
        <div className={'absolute inset-0 ' + config.bgPattern + ' opacity-0 group-hover:opacity-100 transition-opacity'} />
        <div className="relative flex items-center gap-4 flex-1 min-w-0">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center text-sm font-semibold">{post.category.charAt(0).toUpperCase()}</div>
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors truncate">{post.title}</h2>
            <div className="flex items-center gap-3 mt-1">
              <span className={'text-xs px-2 py-0.5 rounded-full ' + config.badgeBg + ' ' + config.badgeText + ' font-medium'}>{categoryName}</span>
              <span className="text-xs text-muted-foreground">{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              {post.readingTime && <span className="text-xs text-muted-foreground">{post.readingTime}</span>}
            </div>
          </div>
        </div>
        <div className="flex-shrink-0 ml-3 text-muted-foreground opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </div>
      </Link>
    </motion.div>
  )
}

'use client'

import { useState, useMemo } from 'react'
import { CacheItem } from './CacheItem'

/**
 * CacheList Component
 * Displays cache items grouped by status (pending/completed)
 */
export function CacheList({ items: initialItems = [] }) {
  // Manage items in state for dynamic updates
  const [items, setItems] = useState(initialItems)

  // Callback to update an item when it changes
  const handleItemUpdate = (updatedItem) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      )
    )
  }

  // Group items by completion status
  const { pending, completed } = useMemo(() => {
    const pending = items.filter((item) => !item.is_completed)
    const completed = items.filter((item) => item.is_completed)
    return { pending, completed }
  }, [items])

  const likedCount = useMemo(() => {
    return items.filter((item) => item.is_liked).length
  }, [items])

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-center">
        <div className="rounded-full bg-muted/50 dark:bg-muted/30 p-6 mb-4">
          <span className="text-4xl">📋</span>
        </div>
        <p className="text-base sm:text-lg font-medium text-foreground dark:text-foreground mb-2">
          Henüz hiçbir item eklenmemiş
        </p>
        <p className="text-sm sm:text-base text-muted-foreground dark:text-muted-foreground/80 max-w-md">
          Telegram bot ile item ekleyebilirsiniz
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Stats */}
      <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
        <span className="inline-flex items-center rounded-full bg-primary/10 dark:bg-primary/20 px-3 py-1.5 font-medium text-primary dark:text-primary transition-colors">
          📊 Toplam: {items.length}
        </span>
        <span className="inline-flex items-center rounded-full bg-muted dark:bg-muted/50 px-3 py-1.5 font-medium text-muted-foreground dark:text-muted-foreground/90 transition-colors">
          ⏳ Bekliyor: {pending.length}
        </span>
        <span className="inline-flex items-center rounded-full bg-secondary dark:bg-secondary/50 px-3 py-1.5 font-medium text-foreground dark:text-foreground transition-colors">
          ✓ Tamamlandı: {completed.length}
        </span>
        {likedCount > 0 && (
          <span className="inline-flex items-center rounded-full bg-red-50 dark:bg-red-950/50 px-3 py-1.5 font-medium text-red-600 dark:text-red-400 transition-colors">
            ❤️ Beğenilen: {likedCount}
          </span>
        )}
      </div>

      {/* Pending Items */}
      {pending.length > 0 && (
        <section className="space-y-3 sm:space-y-4">
          <h3 className="text-base sm:text-lg font-semibold text-foreground dark:text-foreground border-b border-border/40 dark:border-border/30 pb-2">
            Bekleyenler <span className="text-muted-foreground dark:text-muted-foreground/70">({pending.length})</span>
          </h3>
          <div className="space-y-2 sm:space-y-2.5">
            {pending.map((item) => (
              <CacheItem key={item.id} item={item} onUpdate={handleItemUpdate} />
            ))}
          </div>
        </section>
      )}

      {/* Completed Items */}
      {completed.length > 0 && (
        <section className="space-y-3 sm:space-y-4">
          <h3 className="text-base sm:text-lg font-semibold text-foreground dark:text-foreground border-b border-border/40 dark:border-border/30 pb-2">
            Tamamlananlar <span className="text-muted-foreground dark:text-muted-foreground/70">({completed.length})</span>
          </h3>
          <div className="space-y-2 sm:space-y-2.5">
            {completed.map((item) => (
              <CacheItem key={item.id} item={item} onUpdate={handleItemUpdate} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Heart } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

/**
 * CacheItem Component
 * Individual cache item row with completed and liked checkboxes
 */
export function CacheItem({ item, onUpdate }) {
  const [isCompleted, setIsCompleted] = useState(item.is_completed)
  const [isLiked, setIsLiked] = useState(item.is_liked)
  const [isUpdating, setIsUpdating] = useState(false)

  const toggleCheckbox = async (field, currentValue) => {
    setIsUpdating(true)

    try {
      const response = await fetch(`/api/cache/${item.id}/toggle`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ field }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to update')
      }

      const data = await response.json()

      // Update state based on response
      setIsCompleted(data.item.is_completed)
      setIsLiked(data.item.is_liked)

      // Notify parent of the update for dynamic stats
      if (onUpdate) {
        onUpdate(data.item)
      }
    } catch (error) {
      console.error('Toggle error:', error)
      // Rollback on error
      if (field === 'is_completed') {
        setIsCompleted(currentValue)
      } else {
        setIsLiked(currentValue)
      }
      alert(error.message || 'Bir hata oluştu')
    } finally {
      setIsUpdating(false)
    }
  }

  const handleCompletedChange = (checked) => {
    setIsCompleted(checked)
    toggleCheckbox('is_completed', !checked)
  }

  const handleLikedChange = (checked) => {
    setIsLiked(checked)
    toggleCheckbox('is_liked', !checked)
  }

  return (
    <div
      className={`
        group relative flex items-center gap-2 sm:gap-3
        rounded-lg border
        bg-card text-card-foreground
        p-3 sm:p-4
        transition-all duration-200
        ${isCompleted
          ? 'border-border/40 bg-muted/30 dark:bg-muted/20'
          : 'border-border/60 hover:border-border hover:shadow-sm dark:border-border/40 dark:hover:border-border/60'
        }
        ${isUpdating ? 'pointer-events-none opacity-50' : ''}
      `}
    >
      {/* Completed Checkbox - Fixed width container */}
      <div
        onClick={() => !isUpdating && handleCompletedChange(!isCompleted)}
        className="flex items-center justify-center shrink-0 w-5 h-5 cursor-pointer"
      >
        <Checkbox
          checked={isCompleted}
          disabled={isUpdating}
          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
        />
      </div>

      {/* Item Name and Author - Flexible width */}
      <div className="flex-1 min-w-0 py-0.5">
        <p
          className={`
            text-sm sm:text-base font-medium
            transition-all duration-200
            break-words
            ${isCompleted
              ? 'line-through text-muted-foreground dark:text-muted-foreground/80'
              : 'text-foreground dark:text-foreground'
            }
          `}
        >
          {item.name}
        </p>
        {item.author && (
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <p className="text-xs sm:text-sm text-muted-foreground dark:text-muted-foreground/70 mt-1 break-words cursor-help">
                  {item.author}
                </p>
              </TooltipTrigger>
              <TooltipContent side="bottom" align="start">
                <p className="font-medium">
                  {item.cache_type === 'kitap' && 'Yazar: '}
                  {item.cache_type === 'film' && 'Yönetmen: '}
                  {item.cache_type === 'urun' && 'Marka: '}
                  {item.author}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      {/* Liked Button - Fixed width container */}
      <button
        onClick={() => !isUpdating && isCompleted && handleLikedChange(!isLiked)}
        disabled={!isCompleted || isUpdating}
        className={`
          flex items-center justify-center shrink-0
          w-9 h-9 sm:w-10 sm:h-10
          rounded-full
          transition-all duration-200
          ${isCompleted
            ? 'cursor-pointer hover:bg-accent/50 dark:hover:bg-accent/30'
            : 'cursor-not-allowed opacity-30'
          }
          ${isLiked
            ? 'text-red-500 dark:text-red-400'
            : 'text-muted-foreground/60 dark:text-muted-foreground/40'
          }
        `}
        aria-label={isLiked ? 'Remove from liked' : 'Add to liked'}
      >
        <Heart
          className={`
            h-5 w-5 sm:h-5 sm:w-5
            transition-all duration-200
            ${isLiked ? 'fill-current scale-110' : 'scale-100'}
          `}
          strokeWidth={2}
        />
      </button>
    </div>
  )
}

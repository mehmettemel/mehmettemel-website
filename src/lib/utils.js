import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * Converts a string to title case (capitalizes first letter of each word)
 * Example: "ballad of buster scruggs" -> "Ballad Of Buster Scruggs"
 */
export function toTitleCase(str) {
  if (!str) return str

  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

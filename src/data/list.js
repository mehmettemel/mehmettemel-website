import { entries as watchlistEntries } from './watchlist'

export const listCategories = [
  {
    id: 'rusca',
    slug: 'russian',
    name: 'Rusça',
    emoji: '🇷🇺',
    icon: '🗣️',
    description: 'Rusça kelime ve cümleler',
    isStatic: true,
  },
  {
    id: 'tarif',
    slug: 'recipes',
    name: 'Tarifler',
    emoji: '🍳',
    icon: '👨‍🍳',
    description: 'Yemek tarifleri ve mutfak notları',
  },
  {
    id: 'watchlist',
    slug: 'watchlist',
    name: 'Watchlist',
    emoji: '🎬',
    icon: '🍿',
    description: 'Beğendiğim filmler ve diziler',
    isStatic: true,
    staticCount: watchlistEntries.length,
    staticUnit: 'yapım',
  },
]

export function getListCategory(id) {
  return listCategories.find((cat) => cat.id === id) || null
}

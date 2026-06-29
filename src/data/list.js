import { olcumler } from './tansiyon'
import { tabs as claudeTabs } from './claude-notes'

function countClaudeNotes() {
  return Object.values(claudeTabs)
    .flatMap((tab) => Object.values(tab.categories))
    .flatMap((cat) => cat.items).length
}

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
    id: 'tansiyon',
    slug: 'blood-pressure',
    name: 'Tansiyon Takip',
    emoji: '🩺',
    icon: '🩺',
    description: 'Günlük tansiyon ölçüm takibi',
    isStatic: true,
    staticCount: olcumler.length,
    staticUnit: 'ölçüm',
  },
  {
    id: 'claude',
    name: 'Claude',
    emoji: '🤖',
    icon: '🤖',
    description: 'Claude ile verimli çalışma notları ve ipuçları',
    isStatic: true,
    staticCount: countClaudeNotes(),
    staticUnit: 'not',
  },
]

export function getListCategory(id) {
  return listCategories.find((cat) => cat.id === id) || null
}

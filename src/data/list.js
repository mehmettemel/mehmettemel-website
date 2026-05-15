/**
 * List Categories Configuration
 * Defines the categories available in the list system
 */

export const listCategories = [
  {
    id: 'ai',
    name: 'Artificial Intelligence',
    emoji: '🤖',
    icon: '🧠',
    description: 'Yapay zeka ile ilgili notlar, araçlar ve stratejiler',
    isStatic: true,
  },
  {
    id: 'rusca',
    name: 'Rusça',
    emoji: '🇷🇺',
    icon: '🗣️',
    description: 'Rusça kelime ve cümleler',
    isStatic: true,
  },
  {
    id: 'tarif',
    name: 'Tarifler',
    emoji: '🍳',
    icon: '👨‍🍳',
    description: 'Yemek tarifleri ve mutfak notları',
  },
]

/**
 * Get category config by ID
 * @param {string} id - Category ID
 * @returns {Object|null} Category config or null
 */
export function getListCategory(id) {
  return listCategories.find((cat) => cat.id === id) || null
}

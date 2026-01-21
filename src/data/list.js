/**
 * List Categories Configuration
 * Defines the categories available in the list system
 */

export const listCategories = [
  {
    id: 'kitap',
    name: 'Kitap',
    emoji: '📚',
    icon: '📖',
    description: 'Okumak istediğim veya okuduğum kitaplar',
  },
  {
    id: 'film',
    name: 'Film & Dizi',
    emoji: '🎬',
    icon: '📺',
    description: 'İzlemek istediğim veya izlediğim filmler ve diziler',
  },
  {
    id: 'urun',
    name: 'Ürünler',
    emoji: '🛍️',
    icon: '📦',
    description: 'Almak istediğim veya aldığım ürünler',
  },
  {
    id: 'rusca',
    name: 'Rusça',
    emoji: '🇷🇺',
    icon: '🗣️',
    description: 'Rusça kelime ve cümleler',
    isStatic: true, // Database'den çekilmiyor
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

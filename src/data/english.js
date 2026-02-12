/**
 * English Language Learning Data
 * İngilizce Kelime Öğrenme Sistemi
 *
 * NOT: Rusça sisteminden farklı olarak, İngilizce kelimeleri database'de saklıyoruz.
 * Bu dosya sadece UI için yardımcı fonksiyonlar içerir.
 * Kelimeler Telegram bot ile dinamik olarak eklenir (.i komutu)
 */

/**
 * Get random English word from database results
 * @param {Array} words - Array of word objects from database
 * @returns {Object|null} Random word object or null
 */
export function getRandomEnglishWord(words) {
  if (!words || words.length === 0) {
    return null
  }
  const randomIndex = Math.floor(Math.random() * words.length)
  return words[randomIndex]
}

/**
 * Format example sentence with highlighted word
 * Example: "I *love* programming" -> Highlights "love" in the UI
 * @param {string} example - Example sentence
 * @param {string} word - Word to highlight
 * @returns {Object} Object with parts array for rendering
 */
export function formatExampleWithHighlight(example, word) {
  if (!example || !word) {
    return { parts: [{ text: example || '', highlighted: false }] }
  }

  // Case insensitive search for the word
  const regex = new RegExp(`\\b${word}\\b`, 'gi')
  const parts = []
  let lastIndex = 0
  let match

  while ((match = regex.exec(example)) !== null) {
    // Add text before match
    if (match.index > lastIndex) {
      parts.push({
        text: example.substring(lastIndex, match.index),
        highlighted: false,
      })
    }
    // Add matched word (highlighted)
    parts.push({
      text: match[0],
      highlighted: true,
    })
    lastIndex = match.index + match[0].length
  }

  // Add remaining text
  if (lastIndex < example.length) {
    parts.push({
      text: example.substring(lastIndex),
      highlighted: false,
    })
  }

  // If no matches found, return the whole text
  if (parts.length === 0) {
    parts.push({ text: example, highlighted: false })
  }

  return { parts }
}

/**
 * Get word statistics
 * @param {Array} words - Array of word objects
 * @returns {Object} Statistics
 */
export function getEnglishStats(words) {
  return {
    total: words.length,
  }
}

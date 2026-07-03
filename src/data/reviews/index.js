// Zengin (blok tabanlı) analiz yazıları kaydı.
// /analiz skill'i yeni yazı üretince buraya import edip listeye ekler.
import { review as konserveBalik } from './konserve-balik'

export const richReviews = [konserveBalik]

export function getRichReview(slug) {
  return richReviews.find((r) => r.slug === slug) || null
}

// /reviews liste sayfasının beklediği post şekline eşler
export function richReviewsAsPosts() {
  return richReviews.map((r) => ({
    slug: r.slug,
    title: r.title,
    description: r.subtitle,
    category: r.category,
    date: r.date,
    author: r.readingHint || '',
    tags: r.tags,
  }))
}

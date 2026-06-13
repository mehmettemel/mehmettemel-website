// W2B — "Where to Buy"
// Hangi ürün hangi markadan / nereden alınır listesi.
// Veri w2b.json'da tutulur (UI'daki silme ikonu o dosyayı düzenler).
// Her item: { product, brands: [string | { name, href }], note? }

import data from './w2b.json'

export const title = data.title
export const subtitle = data.subtitle
export const categories = data.categories

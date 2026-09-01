/**
 * Watchlist — beğendiğim filmler ve diziler.
 *
 * Yeni kayıt eklemek için `entries` dizisine bir obje ekle:
 *   type   : 'film' | 'dizi'            (zorunlu)
 *   title  : Yapımın adı                 (zorunlu)
 *   year   : Yıl ya da '2016-2022' gibi aralık
 *   rating : 1-10 arası kendi puanın (opsiyonel)
 *   genres : Tür etiketleri, dizi (opsiyonel)
 *   note   : Neden beğendin, kısa yorum (opsiyonel)
 *   favorite: true ise kart öne çıkar (opsiyonel)
 */

export const title = 'Watchlist'
export const subtitle = 'Beğendiğim filmler ve diziler'

export const entries = [
  {
    type: 'film',
    title: 'The Ballad of Buster Scruggs',
    year: 2018,
    genres: ['Western', 'Antoloji', 'Kara Komedi'],
  },
]

export function getStats() {
  const films = entries.filter((e) => e.type === 'film').length
  const series = entries.filter((e) => e.type === 'dizi').length
  return { total: entries.length, films, series }
}

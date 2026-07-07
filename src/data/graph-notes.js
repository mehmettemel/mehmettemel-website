// Obsidian-tarzı bağlantılı not grafiği.
// Her not bir "dot"; links ile birbirine bağlanır.
// Yeni not eklemek: nodes'a { id, title, body } ekle,
// istersen links'e { source, target } ilişkisi koy.

export const graphTitle = 'Graph'
export const graphSubtitle = 'Bağlantılı notlar. Bir noktaya dokun, açılsın.'

export const nodes = [
  {
    id: 'antifragile',
    title: 'Antifragile',
    tags: ['fikir'],
    body: 'Kırılganın tersi sağlamlık değil, antifragility. Bir şey sarsıntıdan zarar görmüyorsa sağlamdır; sarsıntıdan güçleniyorsa antifragile. Kas, sinir sistemi, bağışıklık; hepsi küçük stresörlerle güçlenir.',
  },
  {
    id: 'hormesis',
    title: 'Hormesis',
    tags: ['sağlık'],
    body: 'Az dozda zararlı olan şeyin bedeni güçlendirmesi. Soğuk, açlık, egzersiz, acı biber. Antifragility kavramının biyolojik motoru.',
  },
  {
    id: 'via-negativa',
    title: 'Via Negativa',
    tags: ['fikir'],
    body: 'Bir şeyi iyileştirmenin en sağlam yolu, ona bir şey eklemek değil, zararlı olanı çıkarmaktır. Sağlıkta önce şekeri kes, sonra takviye düşün.',
  },
  {
    id: 'omega-3',
    title: 'Omega-3',
    tags: ['beslenme'],
    body: 'Sardalya, uskumru, somon. Ton balığı yağlı balık sayılmaz, omega-3 açısından zayıftır. Isıya ve ışığa duyarlı; şişe balık yağı raf ömründe okside olabilir.',
  },
  {
    id: 'konserve-balik',
    title: 'Konserve Balık',
    tags: ['beslenme'],
    body: 'Kutunun içinde pişer, kılçık yumuşar, kalsiyum orada kalır. Tazeden besince geri kalmaz. Detaylı analiz Reviews altında.',
  },
  {
    id: 'uyku',
    title: 'Uyku',
    tags: ['sağlık'],
    body: 'Uyanış saati melatonini düzenler, yatış saati değil. Sabahın ilk saatinde güneş ışığı almak kortizol ritmini sıfırlar.',
  },
  {
    id: 'skin-in-the-game',
    title: 'Skin in the Game',
    tags: ['fikir'],
    body: 'Tavsiye verenin riski kendi cebinde olmalı. Bedelini ödemeyenin fikrine güvenme. Antifragility ve sorumluluk aynı madalyonun iki yüzü.',
  },
]

export const links = [
  { source: 'antifragile', target: 'hormesis' },
  { source: 'antifragile', target: 'via-negativa' },
  { source: 'antifragile', target: 'skin-in-the-game' },
  { source: 'hormesis', target: 'uyku' },
  { source: 'omega-3', target: 'konserve-balik' },
  { source: 'via-negativa', target: 'omega-3' },
  { source: 'hormesis', target: 'omega-3' },
]

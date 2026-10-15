// Future: gelecek, yapay zeka ve teknoloji üzerine notlarım, Obsidian-tarzı bağlantılı grafik.
// Her not bir "dot"; links ile birbirine bağlanır.
// Not eklemek /f skill'i ile yapılır: skill notu analiz eder,
// nodes'a { id, title, tags, body } ekler ve mevcut notlarla
// anlamsal ilişki kurup links'e { source, target } koyar.

export const graphTitle = 'Future'
export const graphSubtitle = 'Gelecek üzerine notlarım. Bir noktaya dokun, açılsın.'

export const nodes = [
  {
    id: 'nufus-azalmasi-emlak',
    title: 'Nüfus Azalması ve Emlak',
    tags: ['demografi', 'emlak', 'türkiye'],
    body: 'Nüfus azalıyor Türkiye\'de evlilikler azalıyor vb. emlak sekterü giderek küçülecek ha sen para kazanırsın ömrünce ömrün kaç yıl ki zaten ama hep gerileme hissedersin.',
  },
  {
    id: 'renovasyon-patlayacak',
    title: 'Renovasyon Patlayacak',
    tags: ['renovasyon', 'emlak', 'türkiye'],
    body: 'Türkiye\'de patlayacak sektör renevasyon anadan-dededen kalan evleri düzgün renevasyon yapan firmalar ya da yıkıp yeniden yapanlar bunlar kazanır.',
  },
]

export const links = [
  { source: 'renovasyon-patlayacak', target: 'nufus-azalmasi-emlak' },
]

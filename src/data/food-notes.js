// Food — kendi gıda notlarım, Obsidian-tarzı bağlantılı grafik.
// Her not bir "dot"; links ile birbirine bağlanır.
// Not eklemek /food skill'i ile yapılır: skill notu analiz eder,
// nodes'a { id, title, tags, body } ekler ve mevcut notlarla
// anlamsal ilişki kurup links'e { source, target } koyar.

export const graphTitle = 'Food'
export const graphSubtitle = 'Kendi gıda notlarım. Bir noktaya dokun, açılsın.'

export const nodes = [
  {
    id: 'ultra-islenmis-ekmek',
    title: 'Ultra-işlenmiş Ekmek',
    tags: ['ekmek', 'market', 'ultra-işlenmiş'],
    body: 'Marketten paketli ve ultra-işlenmiş olmayan bir ekmek almak isterseniz tek seçenek Wasa gevrek ekmek. Zincir marketlerde satılan standart paketli ekmeklerin neredeyse tamamı, raf ömrünü uzatmak ve hacim kazandırmak için kullanılan kalsiyum propiyonat, emülgatörler, endüstriyel mayalar ve asitlik düzenleyiciler nedeniyle "ultra-işlenmiş" kategorisine girer.',
  },
]

export const links = []

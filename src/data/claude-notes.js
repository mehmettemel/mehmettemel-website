export const title = 'Claude Notları'

export const tabs = {
  genel: {
    label: 'Genel',
    emoji: '⚡',
    categories: {
      'Web & Araçlar': {
        label: 'Web & Araçlar',
        items: [
          'If you notice Claude struggles to fetch the content from a page, you can use the Obsidian Web Clipper to copy the page content as Markdown.',
        ],
      },
      'Promptlama': {
        label: 'Promptlama',
        items: [
          {
            title: '🔄 Handoff Dökümanı (uzun oturumlarda)',
            items: [
              'Context dolmaya başladığında veya konuyu değiştireceğinde şunu kullan: "Şimdiye kadar ne yaptık, ne kararlar aldık, bir sonraki adım ne — bunu sıfırdan başlayacak bir Claude okusun diye özetle."',
              'Bunu kaydet, yeni sohbette ilk mesaj olarak yapıştır. Özellikle Claude Code\'da uzun debug/refactor oturumlarında hayat kurtarıyor.',
            ],
          },
          {
            title: '🧠 Socratic Prompting (karmaşık görevler için)',
            items: [
              'Büyük bir şey yapmadan önce şunu dene: "Şunu yapmak istiyorum: [görev] — Başlamadan önce bana sorman gereken soruları sor."',
              'Özellikle araştırma ve mimari kararlar için çok işe yarıyor. Claude\'un sormadığı şeyleri sen de düşünmemişsindir genellikle.',
            ],
          },
        ],
      },
    },
  },
}

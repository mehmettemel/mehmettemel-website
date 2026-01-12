// Faydalı Linkler - Kitaplar, Makaleler, Videolar
export const usefulLinks = [
  {
    id: 1,
    title: 'The Design of Everyday Things',
    description:
      'A classic book about design principles that shape our daily interactions with objects and interfaces.',
    type: 'book',
    author: 'Don Norman',
    color: '#3b82f6',
    url: 'https://www.amazon.com/Design-Everyday-Things-Revised-Expanded/dp/0465050654',
  },
  {
    id: 2,
    title: 'Fireship - Web Dev Tutorials',
    description: 'High-intensity code tutorials and tech news in 100 seconds.',
    type: 'video',
    author: 'Fireship',
    color: '#ef4444',
    url: 'https://www.youtube.com/@Fireship',
  },
  {
    id: 3,
    title: 'Laws of UX',
    description: 'Collection of best practices for designing user interfaces.',
    type: 'article',
    color: '#8b5cf6',
    url: 'https://lawsofux.com/',
  },
  {
    id: 4,
    title: 'Refactoring UI',
    description:
      'Learn how to design beautiful user interfaces by yourself using specific tactics.',
    type: 'book',
    author: 'Adam Wathan & Steve Schoger',
    color: '#10b981',
    url: 'https://www.refactoringui.com/',
  },
  {
    id: 5,
    title: 'Josh Comeau Blog',
    description: 'In-depth articles about CSS, React, and web development.',
    type: 'article',
    color: '#f59e0b',
    url: 'https://www.joshwcomeau.com/',
  },
  // Buraya daha fazla link ekleyebilirsin
]

// Link Kategorileri
export const linkCategories = [
  { id: 'all', name: 'Tümü', icon: '📚' },
  { id: 'book', name: 'Kitap', icon: '📖' },
  { id: 'article', name: 'Makale', icon: '📄' },
  { id: 'video', name: 'Video', icon: '🎥' },
]

// Not Kategorileri
export const quoteCategories = [
  { id: 'all', name: 'Tümü', icon: '📚' },
  { id: 'seyahat', name: 'Seyahat', icon: '✈️' },
  { id: 'gida', name: 'Gıda', icon: '🍎' },
  { id: 'saglik', name: 'Sağlık', icon: '🏥' },
  { id: 'teknoloji', name: 'Teknoloji', icon: '💻' },
  { id: 'motivasyon', name: 'Motivasyon', icon: '💪' },
  { id: 'yazilim', name: 'Yazılım', icon: '⚡' },
  { id: 'tasarim', name: 'Tasarım', icon: '🎨' },
]

// Notlar ve Alıntılar (Kategorilere göre düzenlenmiş)
// text: tek satır söz veya çok satırlı not olabilir
export const inspirationalQuotes = [
  // Motivasyon
  {
    id: 1,
    text: 'The only way to do great work is to love what you do.',
    author: 'Steve Jobs',
    source: 'Stanford Commencement Speech',
    category: 'motivasyon',
    url: 'https://news.stanford.edu/2005/06/12/youve-got-find-love-jobs-says/',
    tags: ['kariyer', 'tutku'],
  },
  {
    id: 9,
    text: 'The only impossible journey is the one you never begin.',
    author: 'Tony Robbins',
    source: null,
    category: 'motivasyon',
    tags: ['başlangıç', 'ilerleme'],
  },
  {
    id: 11,
    text: 'The greatest glory in living lies not in never falling, but in rising every time we fall.',
    author: 'Nelson Mandela',
    source: null,
    category: 'motivasyon',
    tags: ['dayanıklılık', 'başarı'],
  },

  // Yazılım
  {
    id: 5,
    text: "Code is like humor. When you have to explain it, it's bad.",
    author: 'Cory House',
    source: 'Twitter',
    category: 'yazilim',
    tags: ['temiz kod'],
  },
  {
    id: 6,
    text: 'First, solve the problem. Then, write the code.',
    author: 'John Johnson',
    source: null,
    category: 'yazilim',
    tags: ['problem çözme', 'strateji'],
  },
  {
    id: 7,
    text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    author: 'Martin Fowler',
    source: 'Refactoring: Improving the Design of Existing Code',
    category: 'yazilim',
    url: 'https://martinfowler.com/',
    tags: ['temiz kod', 'okunabilirlik'],
  },
  {
    id: 8,
    text: 'Make it work, make it right, make it fast.',
    author: 'Kent Beck',
    source: 'Extreme Programming',
    category: 'yazilim',
    tags: ['optimizasyon', 'süreç'],
  },

  // Tasarım
  {
    id: 2,
    text: 'Design is not just what it looks like and feels like. Design is how it works.',
    author: 'Steve Jobs',
    source: 'New York Times Interview',
    category: 'tasarim',
    tags: ['kullanıcı deneyimi'],
  },
  {
    id: 3,
    text: 'Simplicity is the ultimate sophistication.',
    author: 'Leonardo da Vinci',
    source: null,
    category: 'tasarim',
    tags: ['basitlik'],
  },

  // Teknoloji
  {
    id: 4,
    text: 'The best way to predict the future is to invent it.',
    author: 'Alan Kay',
    source: 'Stanford University',
    category: 'teknoloji',
    tags: ['gelecek', 'inovasyon'],
  },
  {
    id: 12,
    text: 'Innovation distinguishes between a leader and a follower.',
    author: 'Steve Jobs',
    source: null,
    category: 'teknoloji',
    tags: ['inovasyon', 'liderlik', 'yaratıcılık'],
  },

  // Sağlık
  {
    id: 13,
    text: 'Learning never exhausts the mind.',
    author: 'Leonardo da Vinci',
    source: null,
    category: 'saglik',
    tags: ['öğrenme', 'gelişim', 'zihin'],
  },
  {
    id: 14,
    text: `Uyku düzeni, beslenme ve egzersiz - üçü de birlikte çalışır.
Birini ihmal ettiğinde diğer ikisi de etkilenir.
Sağlıklı bir yaşam için hepsine eşit önem vermek gerekir.`,
    author: null,
    source: 'Kişisel Notlar',
    category: 'saglik',
    tags: ['uyku', 'beslenme', 'egzersiz'],
  },

  // Gıda
  {
    id: 15,
    text: `Gerçek gıda bozulur. Uzun süre bozulmayan "gıdalar" aslında gıda değildir.
Doğal yaşam döngüsüne saygı göster.`,
    author: null,
    source: 'Food Decoded',
    category: 'gida',
    tags: ['gerçek gıda', 'doğallık'],
  },
  {
    id: 16,
    text: 'Let food be thy medicine and medicine be thy food.',
    author: 'Hippocrates',
    source: null,
    category: 'gida',
    tags: ['beslenme', 'sağlık'],
  },

  // Seyahat
  {
    id: 17,
    text: `İstanbul Boğazı kıyısında balık ekmek yerken şunu fark ettim:
En iyi yemekler, manzaranın ve anın tadını çıkardığın zamanlardır.
Yemek sadece besin değil, deneyimdir.`,
    author: null,
    source: 'Seyahat Notları - İstanbul',
    category: 'seyahat',
    tags: ['Istanbul', 'deneyim', 'yemek'],
  },
  {
    id: 18,
    text: `Kapadokya'da balon turunda öğrendim:
Hayat da tıpkı balon gibi - rüzgarın götürdüğü yere gidersin,
ama yükseliş ve alçalışı sen kontrol edersin.`,
    author: null,
    source: 'Seyahat Notları - Kapadokya',
    category: 'seyahat',
    tags: ['Kapadokya', 'hayat dersleri'],
  },
  {
    id: 19,
    text: 'Travel is the only thing you buy that makes you richer.',
    author: 'Anonymous',
    source: null,
    category: 'seyahat',
    tags: ['zenginlik', 'deneyim'],
  },

  // Buraya daha fazla not ve alıntı ekleyebilirsin - pagination ile görüntülenecek
]

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
      'Built-in Skill\'ler': {
        label: 'Built-in Skill\'ler',
        items: [
          {
            title: '/review — Doğruluk',
            items: [
              'Değişikliği commit etmeden önce çalıştır. Bug, mantık hatası ve güvenlik açıklarını tarar.',
              'Effort seviyesi seçilebilir: /review → az, /review high → kapsamlı, /review ultra → bulut üzerinde derin çok-ajan tarama.',
            ],
          },
          {
            title: '/simplify — Temizlik',
            items: [
              'Değişen kodu yeniden kullanım, sadeleştirme ve verimlilik açısından gözden geçirir ve düzeltmeleri uygular.',
              'Bug aramaz; kod kalitesine odaklanır. Bug için /review kullan.',
            ],
          },
          {
            title: '/batch — Aynı değişikliği her yere uygula',
            items: [
              'Aynı dönüşümü birden fazla dosyaya paralel olarak uygulamak için kullanılır.',
              'Örnek: "Tüm page.jsx dosyalarına auth guard ekle" gibi tekrarlı görevlerde çok işe yarıyor.',
            ],
          },
          {
            title: '/loop — Arka planda izle',
            items: [
              'Bir komutun belirli aralıklarla tekrarlanmasını sağlar. Örnek: /loop 5m /review',
              'Aralık vermezsen model kendi hızını belirler (self-paced). Deploy, CI veya test çıktısı beklerken kullanışlı.',
            ],
          },
          {
            title: '/debug — Bir şeyler ters giderse',
            items: [
              'Hata durumlarında Claude\'un kök nedeni bulmasına odaklanmasını sağlar.',
              'Direkt hata mesajı veya bağlam ile birlikte çalıştır; Claude önce teşhis eder, sonra düzeltir.',
            ],
          },
          {
            title: '/claude-api — SDK entegrasyonu',
            items: [
              'Claude API / Anthropic SDK referansı: model ID\'leri, fiyatlandırma, streaming, tool use, MCP, caching.',
              'Model seçimi, token limiti veya API parametreleri hakkında soru sormadan önce çalıştır — bilgiyi bellekten değil güncel dokümandan çeker.',
            ],
          },
        ],
      },
      'Promptlama': {
        label: 'Promptlama',
        items: [
          {
            title: '📄 Şişirilmiş CLAUDE.md',
            items: [
              'CLAUDE.md çok uzun olunca Claude önemli kuralları gürültüde kaybeder ve görmezden gelir.',
              'Çözüm: Acımasızca budama yap. Claude onsuz doğru yapıyorsa sil, hook\'a çevir veya skill\'e taşı.',
            ],
          },
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

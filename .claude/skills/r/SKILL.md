---
name: r
description: Resources sayfasına link eklemek için kullanılır. /r komutu ile tetiklenir. Verilen URL'yi analiz edip src/data/resources.js dosyasındaki doğru kategoriye ekler.
---

# Resource Ekle

Kullanıcı `/r` komutu ile bir URL verdiğinde, içeriği analiz edip `src/data/resources.js` dosyasındaki doğru kategoriye ekler.

## Giriş Formatları

```
/r https://example.com
/r https://example.com Başlık
/r https://example.com Başlık — not/açıklama
/r ai https://example.com
```

## Adım 1: URL ve Başlık Ayrıştırma

- **URL**: `https://` ile başlayan kısım
- **Başlık**: URL'den sonra gelen metin (varsa). Yoksa domain'den çıkar (örn. `claude.ai` → `Claude`, `github.com` → `GitHub`).
- **Not**: `—` veya `-` ayracından sonraki kısım (varsa)

## Adım 2: Kategori Tespiti

Önce kullanıcı ipucu varsa kullan, yoksa URL/başlıktan belirle:

### Kullanıcı İpuçları
| İpucu | Kategori |
|---|---|
| `ai`, `yapay zeka` | AI & Tools |
| `dev`, `kod`, `code`, `github` | Development |
| `design`, `tasarım`, `ui`, `ux` | Design |
| `business`, `iş`, `startup` | Business |
| `health`, `sağlık` | Health |
| `learn`, `öğren`, `kurs`, `course` | Learning |
| `news`, `haber`, `media` | News & Media |
| `finance`, `finans`, `yatırım` | Finance |

### Domain'den Otomatik Kategori
| Domain/Pattern | Kategori |
|---|---|
| claude.ai, openai.com, perplexity.ai, gemini.google.com, grok.x.ai, midjourney.com, huggingface.co, replicate.com | AI & Tools |
| github.com, stackoverflow.com, developer.mozilla.org, npmjs.com, vercel.com, nextjs.org, tailwindcss.com | Development |
| figma.com, dribbble.com, behance.net, awwwards.com | Design |
| ycombinator.com, producthunt.com, indiehackers.com | Business |
| pubmed.ncbi.nlm.nih.gov, examine.com | Health |
| coursera.org, udemy.com, khanacademy.org, youtube.com | Learning |
| twitter.com, x.com, reddit.com, hacker news | News & Media |

Hiçbirine uymuyorsa en yakın kategoriyi seç. Çok uzak kalıyorsa yeni bir kategori oluştur.

## Adım 3: Mevcut Veriyi Oku

`src/data/resources.js` dosyasını oku:

```js
export const resources = [
  {
    category: 'Kategori Adı',
    emoji: '🔗',
    items: [
      { url: 'https://...', title: 'Başlık', note: '' }
    ]
  }
]
```

## Adım 4: Duplike Kontrolü

Aynı `url` zaten var mı kontrol et. Varsa ekleme, kullanıcıya bildir.

## Adım 5: Ekleme

### Kategori varsa
İlgili grubun `items` dizisinin sonuna ekle.

### Kategori yoksa
`resources` dizisine yeni bir grup ekle. Emoji seçimi:

| Kategori | Emoji |
|---|---|
| AI & Tools | 🤖 |
| Development | 💻 |
| Design | 🎨 |
| Business | 💼 |
| Health | 🌿 |
| Learning | 📚 |
| News & Media | 📰 |
| Finance | 💰 |
| Diğer | 🔗 |

### Item formatı
```js
{ url: 'https://...', title: 'Başlık', note: '' }
```
Not yoksa `note: ''` olarak bırak.

## Onay Sorma

Onay sorma; duplike yoksa direkt ekle.

## Onay Formatı

```
Eklendi: resources.js → [kategori] → [başlık]
```

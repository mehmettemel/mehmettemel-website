# Turkce Lokalizasyon Rehberi

## Genel Kural

**Tum site Turkce dilinde, SEO ve metadata da Turkce.**

## Encoding Kurallari

### Turkce Karakterler Kullanimi

**KOD ICINDE (JavaScript, metadata, etc.):**
- ❌ Kullanma: ü, ö, ş, ğ, ı, ç, İ
- ✅ Kullan: u, o, s, g, i, c, I

**UI METINLERINDE (JSX return icinde):**
- ✅ Normal Turkce karakterler kullanabilirsin
- Ancak guvenlik icin ASCII tercih et

### Ornekler

**YANLIS:**
```javascript
export const metadata = {
  title: 'İletişim | Mehmet Temel',
  description: 'İletişim bilgilerim ve sosyal medya hesaplarım.'
}
```

**DOGRU:**
```javascript
export const metadata = {
  title: 'Iletisim | Mehmet Temel',
  description: 'Iletisim bilgilerim ve sosyal medya hesaplarim.'
}
```

**UI'DA (ikisi de calısır ama ASCII tercih et):**
```jsx
// Guvenli (tercih edilen)
<h1>Iletisim</h1>

// Calısır ama encoding sorunu riski var
<h1>İletişim</h1>
```

## Kelime Karsiliklari

### Sayfa Isimleri
| English | Turkce (ASCII) |
|---------|----------------|
| Home | Ana Sayfa |
| Researches | Arastirmalar |
| Gems | Kaynaklar / Degerli Kaynaklar |
| Signals | Signals |
| Contact | Iletisim |
| About | Hakkimda |

### Kategori Isimleri
| English | Turkce (ASCII) |
|---------|----------------|
| All | Tumu |
| Foods | Gidalar |
| Nutrients | Besinler |
| Mechanisms | Mekanizmalar |

### Tip Isimleri
| English | Turkce (ASCII) |
|---------|----------------|
| Articles | Makaleler |
| Books | Kitaplar |
| Videos | Videolar |
| Podcasts | Podcastler |

### UI Elementleri
| English | Turkce (ASCII) |
|---------|----------------|
| Search... | Ara... |
| Theme | Tema |
| No posts yet | Henuz yazi yok |
| No resources found | Kaynak bulunamadi |
| View all | Tumunu Gor |
| Read more | Devamini Oku |
| Loading... | Yukleniyor... |
| Error | Hata |

### Mesajlar
| English | Turkce (ASCII) |
|---------|----------------|
| No posts in this category | Bu kategoride yazi yok |
| No resources yet | Henuz kaynak yok |
| Coming soon | Yakinda |
| Last updated | Son guncelleme |
| Published on | Yayinlanma tarihi |
| Reading time | Okuma suresi |
| minutes read | dakika okuma |

## Metadata Sablonlari

### Ana Sayfa
```javascript
export const metadata = {
  title: 'Mehmet Temel - Gida Muhendisi × Frontend Developer',
  description: 'Beslenme ve insan biyolojisi hakkinda arastirmalar ve degerli kaynaklar.',
  openGraph: {
    title: 'Mehmet Temel - Food Decoded',
    description: 'Beslenme ve insan biyolojisi hakkinda degerli kaynaklari kuratorluk yapiyorum.',
    locale: 'tr_TR',
    type: 'website',
  },
}
```

### Arastirmalar Sayfasi
```javascript
export const metadata = {
  title: 'Arastirmalar | Mehmet Temel',
  description: 'Beslenme, gida ve insan biyolojisi uzerine derinlemesine arastirmalarim.',
}
```

### Kaynaklar Sayfasi
```javascript
export const metadata = {
  title: 'Degerli Kaynaklar | Mehmet Temel',
  description: 'Internette buldigum degerli kaynaklar. Kitaplar, makaleler, videolar.',
}
```

### Signals Sayfasi
```javascript
export const metadata = {
  title: 'Signals - Bu Haftanin Kesifleri | Mehmet Temel',
  description: 'Her hafta internetten buldigum beslenme ve insan biyolojisi hakkinda ilginc kaynaklar.',
}
```

### Iletisim Sayfasi
```javascript
export const metadata = {
  title: 'Iletisim | Mehmet Temel',
  description: 'Iletisim bilgilerim ve sosyal medya hesaplarim.',
}
```

## Komponent Lokalizasyonu

### Navigasyon Menusu
```jsx
// src/components/Navbar.jsx
function DesktopNav() {
  return (
    <nav className="hidden md:flex items-center gap-1">
      <AnimatedNavIcon href="/researches" label="Arastirmalar" icon="decoded" />
      <AnimatedNavIcon href="/gems" label="Kaynaklar" icon="gems" />
      <AnimatedNavIcon href="/signals" label="Signals" icon="signals" />
      <AnimatedNavIcon href="/contact" label="Iletisim" icon="about" />
    </nav>
  )
}
```

### Kategori Filtreleri
```jsx
// src/components/ResearchesList.jsx
const categories = [
  { id: 'all', label: 'Tumu', count: posts.length },
  { id: 'gidalar', label: 'Gidalar', count: posts.filter((p) => p.category === 'gidalar').length },
  { id: 'besinler', label: 'Besinler', count: posts.filter((p) => p.category === 'besinler').length },
  { id: 'mekanizmalar', label: 'Mekanizmalar', count: posts.filter((p) => p.category === 'mekanizmalar').length },
]
```

### Tip Filtreleri
```jsx
// src/components/GemsList.jsx
const types = [
  { id: 'all', label: 'Tumu', count: gems.length },
  { id: 'article', label: 'Makaleler', count: gems.filter((g) => g.type === 'article').length },
  { id: 'book', label: 'Kitaplar', count: gems.filter((g) => g.type === 'book').length },
  { id: 'video', label: 'Videolar', count: gems.filter((g) => g.type === 'video').length },
]
```

### Arama Input
```jsx
<input 
  type="text" 
  placeholder="Ara..." 
  value={searchQuery} 
  onChange={(e) => setSearchQuery(e.target.value)} 
/>
```

### Hata Mesajlari
```jsx
// Icerik yok durumu
{posts.length === 0 ? (
  <p>Henuz yazi yok.</p>
) : (
  // Liste
)}

// Kategori bos durumu
{activeCategory === 'all' ? 'Henuz yazi yok.' : 'Bu kategoride yazi yok.'}

// Arama sonucu yok
{searchQuery ? 'Kaynak bulunamadi.' : 'Henuz kaynak yok.'}
```

## Markdown Icerik

### Frontmatter
```yaml
---
title: "Zeytinyagi: Gercekten Mucize mi?"
description: "Zeytinyaginin vücut uzerindeki etkilerini bilimsel kaynaklarla inceliyorum."
date: "2025-01-13"
category: "gidalar"
tags: ["zeytinyagi", "yaglar", "akdeniz diyeti"]
readingTime: 8
featured: true
---
```

### Icerik Metni
- Markdown icinde normal Turkce karakterler kullanabilirsin
- Ancak frontmatter'da ASCII tercih et (title, description)
- Tag isimleri: ASCII kullan

## SEO Ipuclari

### Title Format
```
[Sayfa Adi] | Mehmet Temel
```

Ornekler:
- `Arastirmalar | Mehmet Temel`
- `Degerli Kaynaklar | Mehmet Temel`
- `Iletisim | Mehmet Temel`

### Description Format
- 150-160 karakter
- Turkce (ASCII)
- Eylem odakli
- Anahtar kelimeler dahil

### Open Graph
```javascript
openGraph: {
  title: 'Sayfa Basligi',
  description: 'Sayfa aciklamasi',
  locale: 'tr_TR', // Onemli!
  type: 'website', // veya 'article'
  siteName: 'Mehmet Temel',
}
```

## Test Checklist

Yeni bir sayfa veya komponent eklerken:

- [ ] Metadata Turkce (ASCII)
- [ ] UI metinleri Turkce (ASCII tercih)
- [ ] Navigation linkleri dogru
- [ ] Kategori/tip isimleri Turkce
- [ ] Hata mesajlari Turkce
- [ ] Placeholder metinler Turkce
- [ ] Button text Turkce
- [ ] Form labels Turkce
- [ ] Locale tr_TR set
- [ ] Build basarili

## Ornek Komponent

Tam Turkce lokalize edilmis komponent ornegi:

```jsx
'use client'
import { useState } from 'react'

export function ExampleList({ items }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  
  const categories = [
    { id: 'all', label: 'Tumu' },
    { id: 'type1', label: 'Tip 1' },
    { id: 'type2', label: 'Tip 2' },
  ]
  
  const filteredItems = items.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })
  
  return (
    <div>
      {/* Arama */}
      <input 
        type="text" 
        placeholder="Ara..." 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      
      {/* Kategori Filtreleri */}
      <div>
        {categories.map((cat) => (
          <button 
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>
      
      {/* Liste veya Hata Mesaji */}
      {filteredItems.length === 0 ? (
        <p>
          {searchQuery 
            ? 'Sonuc bulunamadi.' 
            : 'Henuz icerik yok.'
          }
        </p>
      ) : (
        <div>
          {filteredItems.map((item) => (
            <div key={item.id}>{item.title}</div>
          ))}
        </div>
      )}
    </div>
  )
}
```

## Notlar

1. **Encoding sorunu yasarsan:** ASCII karakterlere gec
2. **Build hatasi alirsan:** Turkce karakterleri kontrol et
3. **SEO icin:** tr_TR locale'i unutma
4. **Tutarlilik:** Ayni terim icin her zaman ayni ceviriyi kullan

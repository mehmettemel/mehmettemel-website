# Researches İçerik Yapısı ve Kategori Tree

Bu dokümanda Researches yazıları için kategori bazlı tree yapısı ve yönetimi anlatılmaktadır.

## 📁 Klasör Yapısı

```
content/researches/
├── gidalar/                    # Gıdalar Kategorisi
│   ├── zeytinyagi-gercekten-mucize-mi.mdx
│   ├── kahve-ve-kortizol.mdx
│   ├── sut-ve-laktozun-gercegi.mdx
│   ├── bal-dogal-seker-mi.mdx
│   └── fermente-gidalar-probiyotik.mdx
│
├── besinler/                   # Besinler Kategorisi
│   ├── protein-ne-kadar-cok.mdx
│   ├── vitamin-d-eksikligi.mdx
│   ├── omega-3-kaynaklar.mdx
│   ├── demir-emilimi.mdx
│   └── kalsiyum-efsaneleri.mdx
│
└── mekanizmalar/               # Mekanizmalar Kategorisi
    ├── inflamasyon-nedir.mdx
    ├── metabolizma-hizi.mdx
    ├── hormonlar-ve-beslenme.mdx
    ├── bagirsak-mikrobiyomu.mdx
    └── oksidatif-stress.mdx
```

## 🏷️ Kategori Tanımları

### 1. Gıdalar (Foods)
**Amaç:** Spesifik yiyecekler hakkında detaylı analizler

**Örnek Konular:**
- Zeytinyağı, kahve, süt, bal, yumurta
- Fermente gıdalar, probiyotikler
- Süper gıda iddiaları (chia, quinoa, etc.)
- Gıda efsaneleri (gluten, laktoz, etc.)

**Yazı Formatı:**
- Gıdanın bileşimi
- Bilimsel araştırmalar
- Sağlık etkileri
- Tüketim önerileri
- Kaynaklar

### 2. Besinler (Nutrients)
**Amaç:** Makro ve mikro besinler, vitaminler, mineraller

**Örnek Konular:**
- Protein, karbonhidrat, yağlar
- Vitaminler (A, B, C, D, E, K)
- Mineraller (demir, kalsiyum, magnezyum, çinko)
- Amino asitler, yağ asitleri
- Besin destekleri (supplement)

**Yazı Formatı:**
- Besinin rolü
- Günlük ihtiyaç
- Kaynakları
- Eksiklik/fazlalık etkileri
- Emilim ve biyoyararlanım
- Kaynaklar

### 3. Mekanizmalar (Mechanisms)
**Amaç:** Vücuttaki biyolojik süreçler ve mekanizmalar

**Örnek Konular:**
- İnflamasyon, oksidatif stres
- Metabolizma, enerji üretimi
- Hormon dengesi (insülin, kortizol, leptin)
- Bağırsak mikrobiyomu
- Sindirimi ve emilim
- Hücresel süreçler

**Yazı Formatı:**
- Mekanizmanın açıklaması
- Nasıl çalışır?
- Neyi etkiler, neden etkilenir?
- Beslenme ile bağlantısı
- Optimizasyon stratejileri
- Kaynaklar

## 📝 Frontmatter Yapısı

Her MDX dosyasının başında şu frontmatter olmalı:

```yaml
---
title: "Zeytinyağı: Gerçekten Mucize mi?"
description: "Zeytinyağının vücut üzerindeki etkilerini bilimsel kaynaklarla inceliyorum. Mucize gıda mı yoksa abartı mı?"
date: "2025-01-13"
category: "gidalar"  # gidalar | besinler | mekanizmalar
tags: ["zeytinyağı", "yağlar", "akdeniz diyeti", "kalp sağlığı"]
featured: true
author: "Mehmet Temel"
image: "/images/researches/zeytinyagi-og.jpg"  # OG image for social sharing
---
```

**Frontmatter Alanları:**
- `title` (required): Yazı başlığı
- `description` (required): Meta description (150-160 karakter)
- `date` (required): Yayın tarihi (YYYY-MM-DD)
- `category` (required): Kategori (gidalar/besinler/mekanizmalar)
- `tags` (optional): Etiketler (array)
- `featured` (optional): Ana sayfada öne çıkar mı? (boolean)
- `author` (optional): Yazar adı (default: "Mehmet Temel")
- `image` (optional): OG image path

## 🔧 Blog.js Güncelleme Gereksinimleri

`src/lib/blog.js` dosyası şu fonksiyonları içermeli:

### 1. Recursive Directory Traversal
```javascript
// Tüm kategorilerdeki yazıları recursive olarak tara
function getAllPostsRecursive(dir) {
  // Gidalar, besinler, mekanizmalar klasörlerini tara
  // Her klasördeki .mdx dosyalarını oku
  // Kategoriyi klasör adından otomatik algıla
}
```

### 2. Category Detection
```javascript
// Yazının kategorisini klasör yapısından algıla
function detectCategory(filePath) {
  // content/researches/gidalar/post.mdx -> category: "gidalar"
  // Frontmatter'da override varsa onu kullan
}
```

### 3. Filter by Category
```javascript
// Kategoriye göre yazıları filtrele
function getPostsByCategory(category) {
  // "gidalar", "besinler", veya "mekanizmalar"
  return allPosts.filter(post => post.category === category)
}
```

### 4. Get Post by Slug with Category
```javascript
// Slug ile yazıyı bul (kategori bilgisi ile birlikte)
async function getPostBySlug(slug, category) {
  // content/researches/{category}/{slug}.mdx
  // Eğer category belirtilmemişse tüm kategorilerde ara
}
```

## 📊 URL Yapısı

**List Pages:**
- `/researches` - Tüm yazılar
- `/researches?category=gidalar` - Gıdalar kategorisi
- `/researches?category=besinler` - Besinler kategorisi
- `/researches?category=mekanizmalar` - Mekanizmalar kategorisi

**Single Post:**
- `/researches/[slug]` - Tekil yazı (kategori bilgisi slug'da yok)
- Örnek: `/researches/zeytinyagi-gercekten-mucize-mi`

**Not:** URL'de kategori göstermeye gerek yok, dosya yapısında yeterli. Bu SEO ve URL cleanliness için daha iyi.

## 🎨 Liste Sayfası Filtreleme

Researches liste sayfasında (`/researches/page.jsx`) kategori filtreleme:

```jsx
<nav className="flex gap-4 mb-8">
  <button className={active === 'all' ? 'active' : ''}>
    Tümü
  </button>
  <button className={active === 'gidalar' ? 'active' : ''}>
    Gıdalar
  </button>
  <button className={active === 'besinler' ? 'active' : ''}>
    Besinler
  </button>
  <button className={active === 'mekanizmalar' ? 'active' : ''}>
    Mekanizmalar
  </button>
</nav>
```

## 📈 Kategori İkonları ve Renkler

Her kategori için visual identity:

**Gıdalar:**
- İkon: 🍎 Apple / Food
- Renk: Primary (Sage in light, Clay in dark)
- Badge: `bg-primary/10 text-primary`

**Besinler:**
- İkon: 💊 Pill / Supplement
- Renk: Secondary
- Badge: `bg-secondary/10 text-secondary-foreground`

**Mekanizmalar:**
- İkon: 🧬 DNA / Science
- Renk: Accent
- Badge: `bg-accent/10 text-accent-foreground`

## 🔄 Migrasyon Adımları

### 1. Klasör Yapısını Oluştur
```bash
mkdir -p content/researches/gidalar
mkdir -p content/researches/besinler
mkdir -p content/researches/mekanizmalar
```

### 2. Mevcut Yazıları Kategorilere Taşı
- Her yazının konusuna göre doğru kategori klasörüne taşı
- Frontmatter'a `category` field'ı ekle (optional, klasörden algılanabilir)

### 3. Blog.js'i Güncelle
- Recursive directory traversal ekle
- Category detection fonksiyonu ekle
- `getPostsByCategory` fonksiyonu ekle
- `getAllPosts` fonksiyonunu tree yapısı için güncelle

### 4. Researches List Page'i Güncelle
- Kategori filtreleme butonları ekle
- Kategori badge'leri ekle
- Kategori ikonları ekle

### 5. Test
- Her kategoriden en az 1 yazı olduğundan emin ol
- Filtrelemenin çalıştığını test et
- URL'lerin doğru çalıştığını kontrol et

## 💡 İçerik Oluşturma Rehberi

### Yeni Yazı Ekleme

1. Doğru kategoriyi belirle
2. Kategorinin klasörüne git
3. Slug-friendly dosya adı oluştur (lowercase, tire ile)
4. Frontmatter'ı doldur
5. İçeriği yaz
6. Test et

**Örnek:**
```bash
# Yeni bir gıda yazısı
touch content/researches/gidalar/fermente-gidalar-probiyotik.mdx

# Frontmatter ve içerik ekle
code content/researches/gidalar/fermente-gidalar-probiyotik.mdx
```

### Kategori Seçim Rehberi

**Ne zaman "Gıdalar"?**
- Spesifik bir yiyecek hakkında yazıyorsanız
- Örnek: zeytinyağı, kahve, süt, fermente gıdalar

**Ne zaman "Besinler"?**
- Bir besin maddesi, vitamin, mineral hakkında yazıyorsanız
- Örnek: protein, vitamin D, omega-3, demir

**Ne zaman "Mekanizmalar"?**
- Vücuttaki bir süreç veya mekanizma hakkında yazıyorsanız
- Örnek: inflamasyon, metabolizma, hormon dengesi, bağırsak sağlığı

**Belirsizlik Durumunda:**
- Yazının ana odağı nedir?
- "Kahve ve Kortizol" -> Gıdalar (ana odak kahve)
- "Kortizol ve Beslenme" -> Mekanizmalar (ana odak hormon)
- Frontmatter'da `category` field'ını manuel override edin

## 🎯 SEO Faydaları

Tree yapısı kullanmanın avantajları:

1. **İçerik Organizasyonu**: İçerikler mantıksal gruplarda
2. **Site Yapısı**: Daha iyi site architecture
3. **Internal Linking**: Aynı kategorideki yazılar arasında link
4. **User Experience**: Kullanıcılar ilgili yazıları kolayca bulur
5. **Sitemap**: Kategorize edilmiş sitemap generation

## 📚 Örnek Sitemap Yapısı

```xml
<urlset>
  <!-- Gıdalar -->
  <url>
    <loc>https://mehmettemel.com/researches/zeytinyagi-gercekten-mucize-mi</loc>
    <category>gidalar</category>
    <priority>0.8</priority>
  </url>

  <!-- Besinler -->
  <url>
    <loc>https://mehmettemel.com/researches/protein-ne-kadar-cok</loc>
    <category>besinler</category>
    <priority>0.8</priority>
  </url>

  <!-- Mekanizmalar -->
  <url>
    <loc>https://mehmettemel.com/researches/inflamasyon-nedir</loc>
    <category>mekanizmalar</category>
    <priority>0.8</priority>
  </url>
</urlset>
```

## ✅ Checklist: Tree Yapısı İmplementasyonu

- [ ] Klasör yapısını oluştur (gidalar, besinler, mekanizmalar)
- [ ] Blog.js'i recursive traversal için güncelle
- [ ] Category detection fonksiyonu ekle
- [ ] getPostsByCategory fonksiyonu ekle
- [ ] Researches list page'e filtreleme ekle
- [ ] Kategori badge'leri ve ikonları ekle
- [ ] Mevcut yazıları kategorilere taşı
- [ ] Her kategoride test yazısı oluştur
- [ ] URL routing'i test et
- [ ] Sitemap'i güncelle (kategori bilgisi ile)

# Proje Guncel Durumu

Son Guncelleme: 2025-01-11

## Tamamlanan Ozellikler

### 1. Site Yapisinin Yeniden Duzenlenmesi
- Blog sayfasi tamamen kaldirildi
- `/decoded` yolu `/researches` olarak yeniden adlandirildi
- `/about` sayfasi kaldirildi, yerine `/contact` sayfasi eklendi
- Tum sayfalar tutarli max-width 620px layout'a sahip

### 2. Turkce Lokalizasyon (TAMAMLANDI)
Tum site Turkce dilinde:

**Sayfa Basliklari:**
- Ana Sayfa: "Merhaba, Ben Mehmet Temel - Gida Muhendisi × Frontend Developer"
- Arastirmalar: "Arastirmalar | Mehmet Temel"
- Kaynaklar: "Degerli Kaynaklar | Mehmet Temel"
- Signals: "Signals - Bu Haftanin Kesifleri | Mehmet Temel"
- Iletisim: "Iletisim | Mehmet Temel"

**Navigasyon:**
- Ana Sayfa, Arastirmalar, Kaynaklar, Signals, Iletisim
- Mobil menu: "Ana Sayfa", "Tema" etiketleri Turkce

**Komponentler:**
- Kategori etiketleri: Tumu, Gidalar, Besinler, Mekanizmalar
- Tip etiketleri: Tumu, Makaleler, Kitaplar, Videolar
- Arama placeholder: "Ara..."
- Hata mesajlari: "Henuz yazi yok", "Kaynak bulunamadi", vb.

### 3. Sayfa Yapilari

#### Ana Sayfa (`/`)
- Hero bolumu: Kisisel tanitim
- CTA butonlari: Twitter takip + Signals abonelik
- Son Arastirmalar: Son 3 arastirma yazisi
- Layout: max-width 620px, ortalanmis

#### Arastirmalar (`/researches`)
- Baslik ve aciklama bolumu
- Kategori filtreleme butonlari (Tumu, Gidalar, Besinler, Mekanizmalar)
- Arastirma kartlari: Kategori bazli renk kodlamasi ile
- Framer Motion animasyonlari
- Layout: max-width 620px

#### Kaynaklar (`/gems`)
- Baslik ve aciklama
- Arama fonksiyonu
- Tip filtreleme (Tumu, Makaleler, Kitaplar, Videolar)
- 40+ curated resource
- Layout: max-width 620px

#### Signals (`/signals`)
- Haftalik guncellenen icerik sayfasi
- Markdown destegi
- Son guncelleme tarihi gosterimi
- Layout: max-width 620px

#### Iletisim (`/contact`)
- Email iletisim karti
- Sosyal medya linkleri (Twitter, Instagram, GitHub, LinkedIn)
- Layout: max-width 620px

### 4. Komponent Yapisi

#### Server Components
- `src/app/page.jsx` - Ana sayfa
- `src/app/researches/page.jsx` - Arastirmalar listesi
- `src/app/gems/page.jsx` - Kaynaklar listesi
- `src/app/signals/page.jsx` - Signals sayfasi
- `src/app/contact/page.jsx` - Iletisim sayfasi

#### Client Components
- `src/components/ResearchesList.jsx` - Arastirma filtreleme ve listesi
- `src/components/GemsList.jsx` - Kaynak arama ve filtreleme
- `src/components/RabbitHoleCard.jsx` - Arastirma kart komponenti
- `src/components/CategoryTree.jsx` - Kategori agac yapisi (kullanilmiyor, gelecek icin hazir)
- `src/components/Navbar.jsx` - Navigasyon menusu

### 5. Kategori ve Renk Sistemi

**Arastirma Kategorileri:**
- `gidalar` - Foods: Primary renk paleti (Sage tones)
- `besinler` - Nutrients: Secondary renk paleti
- `mekanizmalar` - Mechanisms: Accent renk paleti

**Kaynak Tipleri:**
- `article` - Makaleler
- `book` - Kitaplar
- `video` - Videolar

### 6. SEO ve Metadata
- Her sayfa icin Turkce metadata
- Open Graph tags
- Twitter Card desteği
- `tr_TR` locale ayarlanmis
- Canonical URL'ler

### 7. Animasyonlar
- Framer Motion ile sayfa giris animasyonlari
- Stagger animasyon ile liste itemlari
- Hover efektleri ve gecisler

## Mevcut Icerik Yapisi

### Content Folder Organizasyonu
```
content/
├── researches/
│   ├── besinler/
│   ├── gidalar/
│   └── mekanizmalar/
└── signals/
    └── current.md
```

### Markdown Frontmatter Ornegi
```yaml
---
title: "Arastirma Basligi"
description: "Arastirma aciklamasi"
date: "2025-01-11"
category: "gidalar"
tags: ["tag1", "tag2"]
readingTime: "5 min"
---
```

## Teknik Detaylar

### Encoding Sorunlari Cozuldu
- Turk karakterleri (ü, ö, ş, ğ, ı, ç) yerine ASCII karakterler kullanildi
- Emoji kullanimi kaldirildi (encoding hatalari onlendi)
- Tum dosyalar UTF-8 clean

### Server/Client Component Ayrimi
- Sayfa componentleri: Server component (metadata export, data fetching)
- Interaktif componentler: Client component ('use client', useState, animasyonlar)
- Props ile data aktarimi

### Build Durumu
✅ Build basarili
✅ Tum route'lar calisiyor
✅ Static generation calisiyor
✅ Metadata dogru render ediliyor

## Yapilacaklar

### Yuksek Oncelik
- [ ] Dinamik OG image generation
- [ ] RSS feed implementasyonu
- [ ] Markdown/MDX rendering testi
- [ ] SEO optimizasyonlari (JSON-LD)
- [ ] Analytics entegrasyonu

### Orta Oncelik
- [ ] Arastirma icerigi ekleme
- [ ] Signals ilk icerik
- [ ] 404 sayfasi custom tasarimi
- [ ] Loading states

### Dusuk Oncelik
- [ ] Newsletter signup form
- [ ] Yorum sistemi?
- [ ] Search functionality (global)
- [ ] Archive page for signals

## Bilinen Sorunlar

### Encoding
- Turkce karakterler (ü, ö, ş, ğ, ı, ç) kod icinde sorun yaratabilir
- Cozum: ASCII karsiliklar kullan (u, o, s, g, i, c)
- UI'da gosterilecek Turkce textler sorunsuz

### Performance
- Framer Motion bundle size kontrol edilmeli
- Image optimization gerekli olacak (cok icerik eklendiginde)

## Notlar

### Gelistirme Kurallari
1. Sayfa componentleri: Server component olarak baslat
2. Interaktivite gerekirse: Client component'e ayir
3. Turkce text: ASCII kullan kod icinde, UI'da normal Turkce
4. Metadata: Her sayfada export et
5. Layout: max-width 620px kural
6. Animasyon: Framer Motion, delay ile stagger

### Dosya Isimlendirme
- Sayfa: `page.jsx`
- Komponent: PascalCase (ornek: `ResearchesList.jsx`)
- Utility: camelCase (ornek: `blog.js`)
- Markdown: kebab-case (ornek: `zeytinyagi-arastirmasi.md`)

### Git Workflow
- Ana branch: `main`
- Feature branch'ler kullan
- PR olustur onemli degisiklikler icin

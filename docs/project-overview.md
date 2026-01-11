# Project Overview - Research Portfolio

## Site Concept

Gıda mühendisi ve yazılımcı perspektifinden, internetin derinliklerinden beslenme ve insan biyolojisi hakkında değerli kaynakları küratörlük yapan kişisel site.

**Hedef**: X platformundan trafik çekerek kişisel markalaşma, düzenli takip edilebilir içerik sistemi oluşturma.

**İçerik Dili**: Türkçe (ana içerik) + İngilizce URL yapısı (SEO için)

## Core Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: JavaScript (migrating to TypeScript gradually recommended)
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Font**: Geist Sans & Mono
- **Theming**: Dark/Light mode support via `next-themes`
- **Content**: MDX for blog posts and content pages

## Site Structure

### Main Pages

1. **Ana Sayfa (`/`)**
   - Hero section: Gıda mühendisi × frontend developer kimliği
   - En son Signals içeriğinden 2-3 madde
   - Son 2-3 Researches yazısı
   - Son 4-6 Gem

2. **Researches (`/researches`)**
   - Tek bir gıda/besin/konu hakkında derin dalış yazıları
   - Araştırma + kişisel yorum
   - 1500-3000 kelime uzun format içerikler
   - Kategori filtreleme: Gıdalar, Besinler, Mekanizmalar

3. **Signals (`/signals`)**
   - Her hafta güncellenen (Pazartesi), o hafta bulunan 3-5 ilginç kaynak/bilgi
   - Arşivlenmiyor, tek dosya üzerine yazılıyor
   - Kısa açıklamalar + kaynak linkleri

4. **Gems (`/gems`)**
   - İnternette bulunan değerli web siteleri, araçlar, makaleler
   - Küratörlük listesi, kısa açıklamalarla
   - Filtreleme: Araçlar, Makaleler, Videolar, Podcastler, Siteler
   - Arama fonksiyonu

5. **İletişim (`/contact`)**
   - İletişim bilgileri ve sosyal medya linkleri

## Content Strategy

### Content Types

1. **Researches (Research Posts)**
   - Yayın sıklığı: 2 haftada 1 yazı
   - Format: Uzun format (1500-3000 kelime)
   - Yapı: TL;DR özet + ana içerik + kaynaklar + ilgili yazılar

2. **Signals (Weekly Updates)**
   - Yayın sıklığı: Her Pazartesi
   - Format: 3-5 kısa item (2-3 cümle + kaynak link)
   - Özellik: Üzerine yazılır, arşiv yok

3. **Gems (Curated Resources)**
   - Ekleme sıklığı: Haftada 2-3 gem
   - Format: Başlık + 1-2 cümle açıklama (max 280 karakter)
   - Kategoriler: Tool, Article, Video, Podcast, Site, Thread

## Architecture

### File Structure

- `src/app`: App Router pages and layouts
  - `/` - Ana sayfa
  - `/researches` - Research posts
  - `/signals` - Haftalık güncellemeler
  - `/gems` - Küratörlük listesi
  - `/contact` - İletişim
- `src/components`: UI components (shadcn/ui and custom)
- `src/lib`: Utilities and helper functions
- `src/styles`: Global styles (Tailwind CSS configuration)
- `content`: Markdown/MDX içerik dosyaları
  - `/researches` - Research post MDX dosyaları (category-based tree structure)
    - `/gidalar` - Foods category
    - `/besinler` - Nutrients category
    - `/mekanizmalar` - Mechanisms category
  - `/gems` - Gems JSON veya MDX koleksiyonu
  - `/signals` - current.mdx (tek dosya)
- `docs`: Documentation files

### Content Management

**Researches yazısı frontmatter:**
```yaml
---
title: "Zeytinyağı: Gerçekten Mucize mi?"
description: "Zeytinyağının vücut üzerindeki etkilerini bilimsel kaynaklarla inceliyorum."
date: "2025-01-13"
category: "gidalar"
tags: ["zeytinyağı", "yağlar", "akdeniz diyeti"]
readingTime: 8
featured: true
---
```

**Gem veri yapısı:**
```typescript
interface Gem {
  title: string;
  url: string;
  type: 'tool' | 'article' | 'video' | 'podcast' | 'site' | 'thread';
  description: string; // Max 280 karakter
  dateAdded: string;
  category: string[];
  language: 'tr' | 'en';
}
```

### Styling & Theming

- **Tailwind v4**: Configuration is handled entirely in `src/styles/tailwind.css` using the `@theme` directive.
- **Dark Mode**: Implemented with CSS variables (`--background`, `--foreground`, etc.) in `src/styles/tailwind.css`. `next-themes` in `src/app/providers.jsx` toggles the `dark` class on the `<html>` element.
- **Color Scheme**: Earth-tone palette perfect for food/health content:
  - **Light Mode**: Linen (Keten) tones - warm, natural beige (#F4F1EA)
  - **Dark Mode**: Olive tones - deep, peaceful green (#1A1C1A)
  - **Accent Colors**: Sage (#A3B18A) for light mode, Clay (#D4A373) for dark mode
  - See `docs/COLOR_SCHEME.md` for complete color documentation
- **Colors**: Semantic color names (e.g., `primary`, `secondary`, `muted`) are used to ensure automatic dark mode compatibility. Always use these semantic classes (e.g., `bg-primary`, `text-primary-foreground`) instead of hardcoded colors.

## Key Guidelines

1. **Performance**: Use `Geist` font variables. Avoid heavy client-side libraries. Static site generation (SSG) for all pages.
2. **SEO**:
   - Dynamic OG Images for each page
   - Twitter Card support (summary_large_image)
   - JSON-LD structured data
   - RSS feed for Researches and Signals
3. **Components**: Use `shadcn/ui` components from `src/components/ui`
4. **Content**:
   - Türkçe içerik, İngilizce URL'ler
   - Basit, okunabilir dil
   - Bilimsel kaynakları kaynak bölümünde belirt

## Navigation Structure

```
[Logo: MT] | Researches | Gems | Signals | İletişim
```

**Mobil:** Hamburger menü ile aynı sıralama

## Footer

```
Mehmet Temel
Gıda Mühendisi × Frontend Developer

[Twitter] [Instagram] [GitHub] [RSS]

Her Pazartesi yeni Signals yayınlanır.
© 2025
```

## Recent Changes

- Renamed `/decoded` to `/researches`
- Removed `/blog` section entirely
- Added `/signals` page structure
- Added `/gems` page structure
- Updated homepage hero section
- Implemented custom earth-tone color scheme (Linen/Olive/Sage/Clay)
- Updated all components to use semantic color tokens
- Category-based color coding for research boxes

## Implementation Phases

See `docs/priorities.md` for detailed implementation roadmap.

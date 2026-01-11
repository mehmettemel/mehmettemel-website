# SEO Setup Guide - Food Decoded

This document outlines the comprehensive SEO implementation for the Food Decoded website.

## 🎯 SEO Strategy for Food Decoded

**Target Audience:**
- Türkiye'de beslenme ve sağlıkla ilgilenen okuyucular
- X (Twitter) kullanıcıları
- Gıda ve beslenme bilimi meraklıları
- Bilimsel kaynaklara ulaşmak isteyen kişiler

**Primary Traffic Source:** X (Twitter) → Organic search growth over time

**Content Focus:**
- Gıda bilimi (food science)
- Beslenme (nutrition)
- İnsan biyolojisi (human biology)
- Bilimsel kaynak küratörlüğü

## 🚀 What's Been Implemented

### 1. **Core SEO Configuration**

- ✅ Centralized SEO configuration in `src/lib/seo.js`
- ✅ Proper metadata for all pages
- ✅ Open Graph and Twitter Card tags
- ✅ Structured data (JSON-LD) for better search results
- ✅ Canonical URLs
- ✅ Robots.txt and sitemap.xml generation

### 2. **Technical SEO**

- ✅ Next.js App Router metadata API
- ✅ Image optimization with WebP/AVIF support
- ✅ Security headers
- ✅ PWA manifest
- ✅ Breadcrumb structured data
- ✅ Person schema markup

### 3. **Content Optimization**

- ✅ Updated content to reflect your information
- ✅ Travel and food focus in descriptions
- ✅ Proper keyword targeting
- ✅ Social media integration

## 📁 Files Created/Modified

### New Files:

- `src/lib/seo.js` - Centralized SEO configuration
- `src/components/SEO.jsx` - Reusable SEO component
- `src/app/sitemap.js` - Dynamic sitemap generation
- `src/app/robots.js` - Robots.txt generation
- `public/site.webmanifest` - PWA manifest
- `SEO_SETUP.md` - This guide

### Modified Files:

- `src/app/layout.jsx` - Updated with comprehensive metadata
- `src/app/page.jsx` - Added page-specific SEO
- `src/app/about/page.jsx` - Updated content and SEO
- `next.config.mjs` - Added image optimization and security headers

## 🔧 Next Steps

### 1. **Create Required Images**

You need to create these images for optimal SEO:

```bash
public/
├── og-image.jpg          # 1200x630px - Main social sharing image (Food Decoded branding)
├── og-image-decoded.jpg  # 1200x630px - Template for Decoded posts (dynamic)
├── og-image-signals.jpg  # 1200x630px - Signals page specific
├── og-image-gems.jpg     # 1200x630px - Gems page specific
├── apple-touch-icon.png  # 180x180px - iOS home screen icon
├── favicon-32x32.png     # 32x32px - Standard favicon
├── favicon-16x16.png     # 16x16px - Small favicon
├── android-chrome-192x192.png  # 192x192px - Android icon
└── android-chrome-512x512.png  # 512x512px - Large Android icon
```

**Image Design Guidelines:**
- Use earth-tone color palette (Linen/Olive/Sage/Clay)
- Include "Food Decoded" branding
- For Decoded posts: Dynamic title overlay
- For Signals: "Bu Hafta" emphasis
- For Gems: "Değerli Kaynaklar" text

### 2. **Add Analytics (Optional)**

Add Google Analytics or other tracking:

```javascript
// In src/app/layout.jsx, add to the head section:
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
/>
<script
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'GA_MEASUREMENT_ID');
    `,
  }}
/>
```

### 3. **Search Console Verification**

Add verification codes to `src/app/layout.jsx`:

```javascript
verification: {
  google: 'your-google-verification-code',
  yandex: 'your-yandex-verification-code',
  yahoo: 'your-yahoo-verification-code',
},
```

### 4. **Update Social Links**

Update the social media links in `src/lib/seo.js`:

```javascript
links: {
  twitter: 'https://x.com/temelbusiness',
  github: 'https://github.com/mehmettemel',      // Add your GitHub
  linkedin: 'https://linkedin.com/in/mehmettemel', // Add your LinkedIn
  instagram: 'https://instagram.com/mehmettemelim',  // Add your Instagram
},
```

## 🎯 SEO Best Practices Implemented

### 1. **Page Speed**

- Image optimization with Next.js
- WebP/AVIF format support
- Efficient loading strategies

### 2. **Mobile Optimization**

- Responsive design
- PWA manifest
- Touch-friendly interface

### 3. **Content Strategy**

- Focus on travel and food content
- E-commerce development expertise
- Local SEO (Adana, Turkey)

### 4. **Technical SEO**

- Clean URL structure
- Proper heading hierarchy
- Alt text for images
- Semantic HTML

## 📊 Monitoring & Analytics

### 1. **Google Search Console**

- Submit your sitemap: `https://mehmettemel.com/sitemap.xml`
- Monitor search performance
- Check for indexing issues

### 2. **Google Analytics**

- Track user behavior
- Monitor traffic sources
- Analyze content performance

### 3. **Social Media Analytics**

- Monitor social sharing
- Track engagement on X/Twitter
- Analyze Instagram performance

## 🔍 Keywords to Target

### Primary Keywords:

- "Mehmet Temel"
- "Food Decoded"
- "Gıda mühendisi blog"
- "Beslenme bilimi"
- "Gıda bilimi Türkçe"

### Secondary Keywords:

- "Zeytinyağı faydaları"
- "Beslenme araştırmaları"
- "Gıda ve sağlık"
- "Bilimsel beslenme kaynakları"
- "Gıda mühendisi yazıları"

### Long-tail Keywords:

- "Gıda mühendisi yazılımcı"
- "Beslenme bilimi Türkçe kaynak"
- "Gıda araştırmaları blog"
- "Bilimsel gıda analizi"
- "Beslenme ve insan biyolojisi"

### Content-Specific Keywords:

**Decoded Posts:**
- [Specific food name] + "bilimsel analiz"
- [Nutrient name] + "vücutta ne yapar"
- "Gıda efsaneleri gerçek mi"

**Signals:**
- "Haftalık beslenme bulguları"
- "Yeni gıda araştırmaları"

**Gems:**
- "Beslenme kaynakları"
- "Gıda bilimi araçları"
- "Nutrition research tools"

## 🚀 Performance Optimization

The site is optimized for:

- ✅ Core Web Vitals
- ✅ Mobile-first indexing
- ✅ Fast loading times
- ✅ SEO-friendly structure

## 📝 Content SEO Best Practices

### Decoded Posts (Blog):

**Title Structure:**
- Format: "[Gıda/Besin]: [Soru veya İddia]"
- Examples:
  - "Zeytinyağı: Gerçekten Mucize mi?"
  - "Protein: Ne Kadar Çok, O Kadar İyi mi?"
  - "Kahve ve Kortizol: Bilimsel Gerçek"

**Meta Description:**
- 150-160 karakter
- Soru veya merak uyandıran ifade
- "Bilimsel kaynaklarla açıklıyorum" vurgusu

**URL Structure:**
- `/decoded/[slug]`
- Slug: Kısa, Türkçe karaktersiz
- Example: `/decoded/zeytinyagi-gercekten-mucize-mi`

### Signals Page:

**Title:** "Signals - Bu Hafta | Food Decoded"
**Meta Description:** "Bu hafta dikkatimi çeken beslenme ve gıda bilimi kaynakları. Her Pazartesi güncellenir."
**URL:** `/signals`

### Gems Page:

**Title:** "Gems - Değerli Kaynaklar | Food Decoded"
**Meta Description:** "İnternetin derinliklerinden bulduğum beslenme, gıda bilimi ve sağlık hakkında değerli kaynaklar."
**URL:** `/gems`

## 🚀 Food Decoded Specific SEO Implementation

### Decoded Posts (Blog):

**Per-Post Metadata:**
```javascript
export const metadata = {
  title: '[Post Title] | Decoded',
  description: '[Post description - 150-160 characters]',
  openGraph: {
    title: '[Post Title]',
    description: '[Post description]',
    type: 'article',
    publishedTime: '[ISO date]',
    authors: ['Mehmet Temel'],
    tags: ['tag1', 'tag2'],
    images: [{
      url: '/og-images/[slug].jpg', // Dynamic OG image
      width: 1200,
      height: 630,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '[Post Title]',
    description: '[Post description]',
  },
}
```

**Structured Data (JSON-LD):**
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[Post Title]",
  "description": "[Post description]",
  "author": {
    "@type": "Person",
    "name": "Mehmet Temel",
    "jobTitle": "Gıda Mühendisi × Frontend Developer"
  },
  "datePublished": "[ISO date]",
  "dateModified": "[ISO date]",
  "mainEntityOfPage": "[Post URL]",
  "image": "[OG image URL]"
}
```

### RSS Feeds:

**Decoded Feed (`/feed.xml`):**
- Include all published Decoded posts
- Title: "Food Decoded - Decoded Posts"
- Description: "Gıda ve beslenme hakkında derin dalış yazıları"

**Signals Feed (`/signals.xml`):** (Optional)
- Weekly update notifications
- Title: "Food Decoded - Signals"
- Description: "Haftalık beslenme ve gıda bilimi bulguları"

### Sitemap Updates:

**Include:**
- All Decoded posts with priority: 0.8
- Signals page with changefreq: weekly
- Gems page with priority: 0.7
- Homepage with priority: 1.0
- About page with priority: 0.6

## 🎯 X (Twitter) Optimization

**Twitter Card Best Practices:**
- Always use `summary_large_image` card type
- OG images should be 1200x630px
- Include engaging visuals with key takeaways
- Use catchy titles (questions, surprising facts)

**Content Sharing Strategy:**
- Share Decoded posts on publish day
- Share Signals every Monday
- Share interesting Gems throughout the week
- Use relevant hashtags: #beslenme #gıdabilimi #sağlık

## 📊 Monitoring & Optimization

### Weekly Tasks:
- [ ] Update Signals content (Monday)
- [ ] Check Search Console for new queries
- [ ] Monitor X referral traffic

### Monthly Tasks:
- [ ] Review top performing Decoded posts
- [ ] Optimize low-performing content
- [ ] Update meta descriptions based on CTR
- [ ] Add new internal links between related posts

### Quarterly Tasks:
- [ ] Comprehensive SEO audit
- [ ] Update old content with new research
- [ ] Review and improve site structure
- [ ] Analyze competitor content

## 🎉 SEO Checklist

Your Food Decoded site should have:

- ✅ Search engine friendly URL structure
- ✅ Social media optimized (especially X/Twitter)
- ✅ Fast and responsive (SSG for all pages)
- ✅ Mobile-optimized
- ✅ Structured data rich (Article, Person, WebSite)
- ✅ RSS feeds for content syndication
- ✅ Dynamic OG images for sharing
- ✅ Turkish content with proper locale tags
- ✅ Category and tag structure for Decoded
- ✅ Internal linking strategy

Remember to:

1. Create Food Decoded branded OG images
2. Update siteConfig with new description
3. Submit sitemap with all new pages (/decoded, /signals, /gems)
4. Monitor X referral traffic
5. Publish consistently (Signals every Monday, Decoded every 2 weeks)
6. Build internal links between related Decoded posts

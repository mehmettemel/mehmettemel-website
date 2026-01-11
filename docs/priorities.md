# Development Priorities - Food Decoded

This document outlines the core priorities and implementation roadmap for the "Food Decoded" site transformation.

## Core Priorities

### 1. Performance

- **Site Speed**: The website must be extremely fast.
- **Optimization**: Use techniques like code splitting, image optimization, and efficient bundling.
- **SSG**: Static Site Generation for all pages (Decoded posts, Gems, Signals).
- **Lighthouse Score**: Aim for 100/100 on Performance.

### 2. SEO (Search Engine Optimization)

- **Structure**: Semantic HTML (proper use of `<header>`, `<main>`, `<footer>`, `<h1>`, etc.).
- **Metadata**: Dynamic metadata for all pages (OG images, Twitter Cards).
- **Indexing**: Correct `robots.txt` and `sitemap.xml` configuration.
- **RSS Feeds**: Feed for Decoded posts (`/feed.xml`) and optionally Signals (`/signals.xml`).
- **Structured Data**: JSON-LD for Article, WebSite, Person schemas.

### 3. Design & UI

- **Font**: Use **Geist** (`GeistSans` & `GeistMono`) for modern, high-performance typography.
- **Framework**: Use **shadcn/ui** for the component library.
- **Styling**: Tailwind CSS v4 for utility-first styling.
- **Color Scheme**: Custom earth-tone palette perfect for food/health content:
  - **Light Mode**: Linen (Keten) background (#F4F1EA) with Sage accents (#A3B18A)
  - **Dark Mode**: Olive background (#1A1C1A) with Clay accents (#D4A373)
  - See `docs/COLOR_SCHEME.md` for complete guidelines
- **Theme**: **Full Dark/Light Mode Support**. All text and background colors must use semantic variables (e.g., `bg-background`, `text-foreground`, `text-primary`) to adapt automatically.
- **Color Usage**: NEVER use hardcoded colors (e.g., `bg-blue-500`, `text-teal-400`). Always use semantic tokens (e.g., `bg-primary`, `text-muted-foreground`).

### 4. Content Strategy

- **Content Language**: Turkish content with English URL structure
- **Content Types**:
  - **Decoded**: Deep-dive articles (1500-3000 words), published every 2 weeks
  - **Signals**: Weekly updates (every Monday), 3-5 short items
  - **Gems**: Curated resources, 2-3 additions per week
- **Source Attribution**: Always include sources section in Decoded posts

### 5. Development Workflow

- **Dev Server**: DO NOT start/restart dev server automatically. User will manually run `npm run dev` when needed.
- **Manual Control**: User prefers full control over when the development server runs.

---

## Implementation Roadmap

### Phase 1: Core Structure (Week 1-2)

**Priority: HIGH**

- [ ] Update navigation menu (Home | Decoded | Gems | Signals | Hakkımda)
- [ ] Rename `/blog` → `/decoded` (both routes and content folder)
  - [ ] Update `src/app/blog/` → `src/app/decoded/`
  - [ ] Update `content/blog/` → `content/decoded/`
  - [ ] Create category subfolders: `gidalar/`, `besinler/`, `mekanizmalar/`
  - [ ] Update `src/lib/blog.js` → `src/lib/decoded.js`
  - [ ] Add recursive directory traversal for tree structure
  - [ ] Add category detection from folder path
  - [ ] Update all imports and references
- [ ] Create `/signals` page structure
  - [ ] Create `src/app/signals/page.jsx`
  - [ ] Create `content/signals/current.mdx`
  - [ ] Create `src/lib/signals.js` utilities
- [ ] Create `/gems` page structure
  - [ ] Create `src/app/gems/page.jsx`
  - [ ] Create `content/gems/gems.json`
  - [ ] Create `src/lib/gems.js` utilities
- [ ] Update homepage hero section with "Food Decoded" identity
  - [ ] New tagline: "Gıda Mühendisi × Frontend Developer"
  - [ ] Update description
  - [ ] Add Twitter and Signals CTA buttons

**Deliverables:**
- Navigation updated
- All routes functional
- Basic page structures in place

---

### Phase 2: Content System (Week 3)

**Priority: HIGH**

- [ ] Implement Decoded (blog) enhancements
  - [ ] Add category filtering (Gıdalar, Besinler, Mekanizmalar)
  - [ ] Category filter buttons with icons
  - [ ] Category badges on post cards
  - [ ] Update frontmatter structure
  - [ ] Organize existing posts into category folders
  - [ ] Add "Related Posts" section (same category)
  - [ ] Add "Sources" section styling
  - [ ] Add TL;DR section component
- [ ] Implement Gems functionality
  - [ ] Category filtering (Araçlar, Makaleler, Videolar, etc.)
  - [ ] Search functionality
  - [ ] Gem card component with type icons
  - [ ] External link handling
- [ ] Implement Signals functionality
  - [ ] Weekly content display
  - [ ] Last update date
  - [ ] Item component with source links
- [ ] Update homepage sections
  - [ ] Latest Signals preview (2-3 items)
  - [ ] Recent Decoded posts (2-3 cards)
  - [ ] Featured Gems (4-6 items)

**Deliverables:**
- Full content system functional
- Filtering and search working
- Homepage showing all sections

---

### Phase 3: Features & Polish (Week 4)

**Priority: MEDIUM**

- [ ] SEO Implementation
  - [ ] Dynamic OG image generation
  - [ ] Twitter Card meta tags
  - [ ] Updated sitemap including all new pages
  - [ ] JSON-LD structured data for all content types
- [ ] RSS Feeds
  - [ ] Create `/feed.xml` for Decoded posts
  - [ ] Create `/signals.xml` for Signals (optional)
  - [ ] Add RSS links to footer
- [ ] Analytics
  - [ ] Verify Google Analytics setup
  - [ ] Add event tracking for:
    - Decoded post views
    - Gem clicks (external links)
    - Category filter usage
    - Search queries
- [ ] Performance Optimization
  - [ ] Image optimization (next/image)
  - [ ] Code splitting review
  - [ ] Lighthouse audit and fixes

**Deliverables:**
- Full SEO implementation
- RSS feeds functional
- Analytics tracking
- Performance optimized

---

### Phase 4: Content & Launch (Week 5-6)

**Priority: MEDIUM**

- [ ] Initial Content Creation
  - [ ] Write 1-2 Decoded posts
  - [ ] Add 10-15 initial Gems
  - [ ] Create first Signals update
- [ ] Testing
  - [ ] Cross-browser testing
  - [ ] Mobile responsiveness
  - [ ] Dark/light mode verification
  - [ ] RSS feed validation
- [ ] Documentation
  - [ ] Content creation guide
  - [ ] Signals update workflow
  - [ ] Gems addition workflow

**Deliverables:**
- Initial content published
- Site fully tested
- Documentation complete

---

### Phase 5: Ongoing Improvements (Continuous)

**Priority: LOW**

- [ ] Component Enhancements
  - [ ] Smooth theme transition animations
  - [ ] Loading states for search/filter
  - [ ] Toast notifications for actions
- [ ] Content Features
  - [ ] Reading progress indicator for Decoded posts
  - [ ] Estimated reading time display
  - [ ] Social share buttons
- [ ] Advanced Features
  - [ ] Newsletter subscription (optional)
  - [ ] Comment system (optional)
  - [ ] Related content algorithm improvements

---

## Content Publishing Schedule

### Week 1-4 (Setup Phase)
- Focus on development and structure

### Week 5+ (Content Phase)
**Weekly Schedule:**
- **Monday**: Publish new Signals update (3-5 items)
- **Every 2 weeks**: Publish new Decoded post (1500-3000 words)
- **Throughout week**: Add 2-3 new Gems

**Monthly Goals:**
- 2 Decoded posts
- 4 Signals updates
- 8-12 new Gems

---

## Success Metrics

### Traffic
- X (Twitter) referral traffic
- Organic search traffic growth
- Return visitor rate

### Engagement
- Average time on Decoded posts
- Gem click-through rate
- Signals page views (weekly)

### Content
- Decoded posts published per month: 2
- Gems added per month: 8-12
- Signals updates: 4 (every Monday)

---

## Technical Debt & Future Considerations

- Migrate to TypeScript (low priority)
- Add i18n support for English content (future)
- Consider CMS integration (Contentlayer, Sanity) if content scales
- A/B testing for homepage layout
- Dark mode preference persistence improvements

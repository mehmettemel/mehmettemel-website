# Project File Structure

Complete guide to all files and their purposes in this Next.js portfolio project.

## Root Configuration Files

### `package.json`
**Purpose:** Project dependencies and npm scripts
**Key Dependencies:** Next.js 16, React 19, Tailwind CSS 4, Geist font, MDX support

### `next.config.mjs`
**Purpose:** Next.js configuration
**Key Features:** MDX support, page extensions configuration

### `tailwind.config.js`
**Purpose:** Tailwind CSS v3/v4 hybrid configuration
**Contains:** Container settings, color themes, animations, plugins

### `postcss.config.js`
**Purpose:** PostCSS configuration for Tailwind CSS processing

### `tsconfig.json`
**Purpose:** TypeScript configuration
**Note:** Project uses JSX but has TypeScript support for tooling

### `jsconfig.json`
**Purpose:** JavaScript configuration for IDE support
**Features:** Path aliases (@/ for src/)

### `.eslintrc.json`
**Purpose:** ESLint configuration for code quality

### `prettier.config.js`
**Purpose:** Code formatting configuration
**Plugins:** Tailwind CSS class sorting

### `components.json`
**Purpose:** shadcn/ui components configuration
**Note:** Used for UI component generation

### `mdx-components.jsx`
**Purpose:** Custom MDX component mappings for blog posts

### `typography.js`
**Purpose:** Typography plugin configuration for blog content styling

## Environment Files

### `.env.local`
**Purpose:** Local environment variables (not committed to git)
**Contains:** API keys, site URL, Google Analytics ID

### `.env.example` / `env.example`
**Purpose:** Example environment variables template
**Note:** `env.example` is duplicate, should be removed

## Source Files (`src/`)

### App Directory (`src/app/`)

#### `layout.jsx`
**Purpose:** Root layout for entire application
**Key Features:**
- Metadata configuration (SEO, Open Graph, Twitter Cards)
- Geist Mono font setup
- Google Analytics integration
- Structured data (Schema.org)
- Theme provider wrapper

#### `page.jsx`
**Purpose:** Homepage
**Content:**
- Hero section identity (Gıda Mühendisi × Frontend Developer)
- Latest Signals items (2-3)
- Recent Researches posts (2-3)
- Featured Gems (4-6)

#### `researches/`
**Purpose:** Deep-dive research articles about food, nutrition, and biology
**Files:**
- `page.jsx` - List page with filtering (Tümü, Gıdalar, Besinler, Mekanizmalar)
- `[slug]/page.jsx` - Individual research post page

#### `signals/`
**Purpose:** Weekly updated content page
**Files:**
- `page.jsx` - Shows current week's findings (updated every Monday)

#### `gems/`
**Purpose:** Curated resources list
**Files:**
- `page.jsx` - Grid/list view with filtering and search

#### `contact/`
**Purpose:** Contact page with communication channels
**Content:** Email and social media links

#### `template.jsx`
**Purpose:** Page transition animations
**Feature:** Framer Motion layout transitions

#### `providers.jsx`
**Purpose:** React context providers wrapper
**Includes:** Theme provider for dark mode

#### `not-found.jsx`
**Purpose:** Custom 404 error page

#### `sitemap.js`
**Purpose:** Dynamic XML sitemap generation for SEO
**Includes:** All researches posts, gems, signals, and static pages

#### `robots.js`
**Purpose:** Dynamic robots.txt generation for SEO

#### `feed.xml/` (to be created)
**Purpose:** RSS feed for Researches posts

#### `signals.xml/` (optional, to be created)
**Purpose:** RSS feed for Signals updates

### Components (`src/components/`)

#### `Layout.jsx`
**Purpose:** Main layout wrapper with header and footer

#### `Header.jsx`
**Purpose:** Navigation header with mobile menu and theme toggle

#### `Footer.jsx`
**Purpose:** Site footer with navigation links and copyright

#### `Container.jsx`
**Purpose:** Responsive container components (OuterContainer, InnerContainer)

#### `Section.jsx`
**Purpose:** Reusable section wrapper component

#### `Button.jsx`
**Purpose:** Reusable button component

#### `SocialIcons.jsx`
**Purpose:** Social media icon components (Twitter, Instagram, GitHub, LinkedIn)

#### `SEO.jsx`
**Purpose:** SEO component for meta tags (may be deprecated in favor of Next.js metadata)

### Library (`src/lib/`)

#### `seo.js`
**Purpose:** SEO configuration and utilities
**Contains:**
- Site configuration (metadata, social links)
- Structured data generators
- Business information for local SEO

#### `blog.js`
**Purpose:** Research post utilities
**Functions:**
- Get all posts (recursive directory traversal)
- Get post by slug (with category detection)
- Get posts by category
- Markdown processing
- Category filtering
- Auto-detect category from folder structure

#### `gems.js` (to be created)
**Purpose:** Gems management utilities
**Functions:** Get all gems, filter by category/type, search gems

#### `signals.js` (to be created)
**Purpose:** Signals content utilities
**Functions:** Get current signals content, get last update date

#### `utils.js`
**Purpose:** Utility functions
**Contains:** `cn()` function for className merging

### Styles (`src/styles/`)

#### `tailwind.css`
**Purpose:** Main CSS file
**Contains:**
- Tailwind directives
- @theme configuration (Tailwind v4)
- CSS custom properties for theming
- Dark mode styles
- Custom earth-tone color palette (Linen, Olive, Sage, Clay)
- HSL color values for light and dark modes

#### `prism.css`
**Purpose:** Syntax highlighting styles for code blocks in blog posts

### Images (`src/images/`)

#### `avatar2.jpg`
**Purpose:** Profile picture for about page and hero section

## Content (`content/`)

### `content/researches/`
**Purpose:** Research post markdown/MDX files (deep-dive articles about food, nutrition, and biology)
**Format:** MDX with frontmatter
**Structure:** Category-based tree structure

**Tree Structure:**
```
content/researches/
├── gidalar/                    # Foods category
│   ├── zeytinyagi-gercekten-mucize-mi.mdx
│   ├── kahve-ve-kortizol.mdx
│   └── sut-ve-laktozun-gercegi.mdx
├── besinler/                   # Nutrients category
│   ├── protein-ne-kadar-cok.mdx
│   ├── vitamin-d-eksikligi.mdx
│   └── omega-3-kaynaklar.mdx
└── mekanizmalar/               # Mechanisms category
    ├── inflamasyon-nedir.mdx
    ├── metabolizma-hizi.mdx
    └── hormonlar-ve-beslenme.mdx
```

**Categories:**
- `gidalar` - Specific foods (olive oil, coffee, milk, etc.)
- `besinler` - Nutrients (protein, vitamins, minerals, etc.)
- `mekanizmalar` - Biological mechanisms (inflammation, metabolism, hormones, etc.)

**Frontmatter:**
```yaml
title: "Post title"
description: "Post description"
date: "2025-01-13"
category: "gidalar" # Auto-detected from folder, or manual override
tags: ["tag1", "tag2"]
readingTime: 8  # Auto-calculated
featured: true
```

### `content/signals/`
**Purpose:** Weekly updated content with interesting finds
**Format:** Single MDX file that gets updated weekly (no archive)
**File:** `current.mdx`
**Update Schedule:** Every Monday
**Content:** 3-5 short items with sources (2-3 sentences + link)

### `content/gems/`
**Purpose:** Curated list of valuable resources from the internet
**Format:** JSON or individual MDX files
**Example:** `gems.json` or individual `.mdx` files
**Data Structure:**
```typescript
{
  title: string,
  url: string,
  type: 'tool' | 'article' | 'video' | 'podcast' | 'site' | 'thread',
  description: string, // Max 280 characters
  dateAdded: string,
  category: string[],
  language: 'tr' | 'en'
}
```

## Public Assets (`public/`)

### Favicons
- `favicon.ico` - Main favicon
- `favicon-16x16.png` - 16x16 favicon
- `favicon-32x32.png` - 32x32 favicon
- `apple-icon-180x180.png` - Apple touch icon
- `android-icon-192x192.png` - Android PWA icon

### `site.webmanifest`
**Purpose:** PWA manifest for mobile app-like experience

### `og-image.jpg`
**Purpose:** Default Open Graph image for social media sharing

## Documentation (`docs/`)

### `COLOR_SCHEME.md`
**Purpose:** Complete color palette documentation
**Contains:** Light/dark mode colors, usage examples, accessibility guidelines, design philosophy

### `FONT_SETUP.md`
**Purpose:** Geist Mono font setup and troubleshooting guide

### `SEO_SETUP.md`
**Purpose:** SEO configuration and best practices

### `ANALYTICS_SETUP.md`
**Purpose:** Google Analytics setup guide

### `project-overview.md`
**Purpose:** High-level project overview and architecture

### `structure.md`
**Purpose:** Project structure overview (may overlap with this file)

### `priorities.md`
**Purpose:** Development priorities and task tracking

### `FILE_STRUCTURE.md` (this file)
**Purpose:** Complete file structure documentation

## Other Files

### `README.md`
**Purpose:** Project overview and setup instructions

### `LICENSE.md`
**Purpose:** Project license information

### `next-env.d.ts`
**Purpose:** Next.js TypeScript declarations (auto-generated)

## Files to Remove (Duplicates/Unused)

- `env.example` (duplicate of `.env.example`)
- Possibly `src/components/SEO.jsx` (if using Next.js metadata API)
- `docs/structure.md` (overlaps with this file)

## Completed Implementation

### Content Management
- `content/researches/` - Research posts organized by category
  - Category subfolders: `gidalar/`, `besinler/`, `mekanizmalar/`
- `content/signals/current.mdx` - Weekly signals content
- `content/gems/gems.json` - Curated resources list

### App Pages
- `src/app/researches/` - Research posts section
- `src/app/signals/` - Weekly updates page
- `src/app/gems/` - Curated resources page
- `src/app/feed.xml/route.js` - RSS feed for Researches posts (to be created)
- `src/app/signals.xml/route.js` - RSS feed for Signals (optional)

### Utilities
- `src/lib/blog.js` - Research post management functions
- `src/lib/gems.js` - Gems management functions (to be created)
- `src/lib/signals.js` - Signals content functions (to be created)

### Components (if needed)
- `src/components/GemCard.jsx` - Card component for gems
- `src/components/SignalItem.jsx` - Item component for signals
- `src/components/CategoryFilter.jsx` - Category filtering component
- `src/components/SearchBar.jsx` - Search functionality for gems

## Generated/Cache Directories (not committed)

- `.next/` - Next.js build output
- `node_modules/` - NPM dependencies
- `.git/` - Git repository data

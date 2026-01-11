# Geist Font Setup - Food Decoded

This document explains how Geist fonts are configured across the entire site.

## Overview

The site uses **Geist Sans** and **Geist Mono** fonts from Vercel's official `geist` package with Next.js optimization.

**Font Usage:**
- **Geist Sans**: Body text, headings, UI elements (primary font)
- **Geist Mono**: Code blocks, technical content, inline code

**Why Geist for Food Decoded:**
- Clean, modern, highly readable
- Perfect for long-form content (Decoded posts)
- Excellent code rendering (when sharing nutrition data/research)
- Optimized for web performance

## Installation

### Prerequisites
- Node.js v22 (managed via nvm)

### Steps

1. **Install the geist package:**
```bash
npm install geist
```

2. **Import GeistMono in `src/app/layout.jsx`:**
```jsx
import { GeistMono } from 'geist/font/mono'
```

3. **Apply the font to the body element:**
```jsx
<body className={cn('min-h-screen bg-background text-foreground antialiased', GeistMono.className)}>
```

## Configuration Files

### `src/app/layout.jsx`
- Imports `GeistMono` from `geist/font/mono`
- Applies `GeistMono.className` directly to the body element
- This automatically injects the font-family CSS

### `tailwind.config.js`
- No font configuration needed (removed to avoid conflicts)
- Font is applied directly via className

### `src/styles/tailwind.css`
- No @theme font configuration needed (removed to avoid conflicts)
- Font is handled by the geist package

## How It Works

1. **Automatic Optimization:**
   - Next.js automatically optimizes the font loading
   - Font files are self-hosted (no external requests)
   - Uses `font-display: swap` for better performance

2. **CSS Output:**
   - The package generates a unique class like: `.geistmono_157ca88a-module__iaM1Ya__className`
   - This class sets: `font-family: GeistMono, ui-monospace, ...`

3. **SEO Benefits:**
   - Zero layout shift (CLS optimization)
   - No external font requests (privacy & performance)
   - Proper font fallback chain

## Testing

Test the font in browser console:
```js
getComputedStyle(document.body).fontFamily
// Expected output: "GeistMono, ui-monospace, SFMono-Regular, ..."
```

## Troubleshooting

If the font doesn't load:

1. **Clear Next.js cache:**
```bash
rm -rf .next
```

2. **Hard refresh browser:**
   - Mac: `Cmd + Shift + R`
   - Windows/Linux: `Ctrl + Shift + F5`

3. **Check for conflicting font configurations:**
   - Make sure `tailwind.config.js` doesn't have `fontFamily` in `extend`
   - Make sure `tailwind.css` doesn't have `--font-sans` or `--font-mono` in `@theme`

## Typography Best Practices for Food Decoded

### Decoded Posts (Blog):
- **Body Text**: 16-18px, line-height 1.7-1.8
- **Headings**: Use semantic hierarchy (H1 → H6)
- **Reading Width**: Max 65-75 characters per line
- **Paragraph Spacing**: 1.5-2rem between paragraphs

### Signals:
- **List Items**: Clear, scannable formatting
- **Source Links**: Distinct styling with underline
- **Update Date**: Muted color with smaller font size

### Gems:
- **Card Titles**: Bold, 16-18px
- **Descriptions**: 14-16px, line-height 1.6
- **Category Tags**: Small, uppercase or all-caps tracking

## Typography Hierarchy

```
H1 (Page Title):     32-40px, font-weight: 700
H2 (Section):        24-28px, font-weight: 600
H3 (Subsection):     20-24px, font-weight: 600
Body:                16-18px, font-weight: 400
Small/Meta:          14px,    font-weight: 400
Code:                14-16px, Geist Mono
```

## References

- [Vercel Geist Font GitHub](https://github.com/vercel/geist-font)
- [Next.js Font Optimization](https://nextjs.org/docs/app/getting-started/fonts)
- [Geist Font Official Site](https://vercel.com/font)
- [Butterick's Practical Typography](https://practicaltypography.com/) - Excellent resource for long-form content

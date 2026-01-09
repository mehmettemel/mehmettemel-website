# Project Structure & SEO Documentation

## Overview

This project has been refactored to a simplified single-page portfolio/blog structure. All previous multi-page routes (About, Articles, Projects, etc.) have been removed to focus on the homepage.

## Directory Structure

```
src/
├── app/
│   ├── layout.jsx      # Root layout with SEO and global providers
│   ├── page.jsx        # Homepage component
│   ├── robots.js       # Robots.txt configuration
│   └── sitemap.js      # Sitemap configuration (Homepage only)
├── components/         # Shared UI components
│   ├── Button.jsx
│   ├── Container.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── Layout.jsx
│   └── SocialIcons.jsx
├── lib/
│   └── seo.js          # SEO configuration and structured data helpers
└── styles/
    └── tailwind.css    # Global styles
```

## SEO Implementation

The project uses Next.js 14+ Metadata API.

- **Metadata**: Defined in `layout.jsx` and `page.jsx` using the `metadata` object.
- **Sitemap**: Generated dynamically by `src/app/sitemap.js`.
- **Robots**: Configured in `src/app/robots.js`.
- **Structured Data**: JSON-LD schemas (Person, WebSite, LocalBusiness, Blog) are injected in `src/app/layout.jsx` using `generateStructuredData` helper.

## Dependency Updates

All packages have been updated to their latest versions as of Jan 2026.

> **Note**: These updates may require Node.js 18+ or 20+. Please ensure your environment is up to date.

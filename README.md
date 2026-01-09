# Mehmet Temel - Travel & Food Blog

A modern, SEO-optimized blog built with Next.js 16, focused on travel stories and food adventures.

## 🚀 Tech Stack

- **Framework**: Next.js 16.1.1 (App Router)
- **React**: 19.2.3
- **Styling**: Tailwind CSS 4.1.18
- **Content**: Markdown with gray-matter
- **Typography**: @tailwindcss/typography
- **Theme**: next-themes (Dark/Light mode)
- **Animations**: Framer Motion

## 📦 Blog Features

- **Markdown Support**: Write blog posts in Markdown format
- **Reading Time**: Automatic reading time calculation
- **SEO Optimized**: Full metadata, Open Graph, and structured data
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: System preference detection with manual toggle
- **Fast Performance**: Optimized images and static generation

## 📝 Writing Blog Posts

Create new blog posts in the `content/blog` directory with `.md` extension.

### Example Post

Create a file `content/blog/my-first-post.md`:

```markdown
---
title: "My First Food Adventure in Istanbul"
date: "2026-01-09"
description: "Exploring the hidden gems of Istanbul's street food scene"
tags: ["Turkey", "Street Food", "Istanbul"]
author: "Mehmet Temel"
---

# My First Food Adventure in Istanbul

Your content here...
```

### Frontmatter Fields

- `title` (required): Post title
- `date` (required): Publication date (YYYY-MM-DD)
- `description` (required): Brief description for previews
- `tags` (optional): Array of tags
- `author` (optional): Author name (defaults to "Mehmet Temel")

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
├── content/
│   └── blog/           # Markdown blog posts
├── public/             # Static assets
├── src/
│   ├── app/            # Next.js App Router
│   │   ├── blog/       # Blog pages
│   │   │   ├── page.jsx          # Blog list
│   │   │   └── [slug]/page.jsx   # Blog post detail
│   │   ├── about/      # About page
│   │   ├── layout.jsx  # Root layout
│   │   └── page.jsx    # Homepage
│   ├── components/     # Reusable components
│   ├── images/         # Image assets
│   ├── lib/
│   │   ├── blog.js     # Blog utilities
│   │   └── seo.js      # SEO utilities
│   └── styles/         # Global styles
├── next.config.mjs
├── package.json
└── tailwind.config.js
```

## 🎨 Customization

### Colors

Edit `src/styles/tailwind.css` to customize the color palette.

### Navigation

Update navigation links in:
- `src/components/Header.jsx`
- `src/components/Footer.jsx`

### SEO

Configure SEO settings in:
- `src/lib/seo.js` (Global SEO config)
- `src/app/layout.jsx` (Root metadata)

## 🌐 Deployment

This project is optimized for deployment on Vercel:

```bash
# Deploy to Vercel
vercel

# Or push to your git repository
git push origin main
```

## 📄 Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SITE_URL=https://mehmettemel.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## 📝 License

MIT License - See LICENSE.md for details

## 👤 Author

**Mehmet Temel**

- Website: [mehmettemel.com](https://mehmettemel.com)
- Twitter: [@temelbusiness](https://x.com/temelbusiness)
- Instagram: [@mehmettemelim](https://instagram.com/mehmettemelim)
- GitHub: [@mehmettemel](https://github.com/mehmettemel)
- LinkedIn: [mehmettemelim](https://linkedin.com/in/mehmettemelim)

---

Built with ❤️ using Next.js

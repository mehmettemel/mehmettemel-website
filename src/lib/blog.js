import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm'
import readingTime from 'reading-time'

const postsDirectory = path.join(process.cwd(), 'content/researches')

// Valid categories
const CATEGORIES = ['gidalar', 'besinler', 'mekanizmalar']

/**
 * Recursively get all post files from category folders
 */
function getAllPostFiles(dir) {
  const entries = []

  // Check if directory exists
  if (!fs.existsSync(dir)) {
    return entries
  }

  const items = fs.readdirSync(dir)

  for (const item of items) {
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory() && CATEGORIES.includes(item)) {
      // This is a category folder
      const categoryFiles = fs.readdirSync(fullPath)
      for (const file of categoryFiles) {
        if (file.endsWith('.md') || file.endsWith('.mdx')) {
          entries.push({
            file,
            category: item,
            fullPath: path.join(fullPath, file),
          })
        }
      }
    } else if (item.endsWith('.md') || item.endsWith('.mdx')) {
      // File in root (no category)
      entries.push({
        file: item,
        category: null,
        fullPath,
      })
    }
  }

  return entries
}

/**
 * Get all posts with category information
 */
export function getAllPosts() {
  const postFiles = getAllPostFiles(postsDirectory)

  const allPostsData = postFiles.map(({ file, category, fullPath }) => {
    const slug = file.replace(/\.mdx?$/, '')
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    const readingStats = readingTime(content)

    return {
      slug,
      title: data.title || slug,
      date: data.date || new Date().toISOString(),
      description: data.description || '',
      category: data.category || category || 'uncategorized',
      tags: data.tags || [],
      author: data.author || 'Mehmet Temel',
      readingTime: readingStats.text,
      featured: data.featured || false,
      ...data,
    }
  })

  return allPostsData.sort((a, b) => {
    if (new Date(a.date) < new Date(b.date)) {
      return 1
    } else {
      return -1
    }
  })
}

/**
 * Get posts filtered by category
 */
export function getPostsByCategory(category) {
  const allPosts = getAllPosts()
  if (!category || category === 'all') {
    return allPosts
  }
  return allPosts.filter((post) => post.category === category)
}

/**
 * Get a single post by slug (searches all categories)
 */
export async function getPostBySlug(slug) {
  // Try to find the post in category folders first
  for (const category of CATEGORIES) {
    const categoryPath = path.join(postsDirectory, category)
    if (fs.existsSync(categoryPath)) {
      for (const ext of ['.md', '.mdx']) {
        const fullPath = path.join(categoryPath, `${slug}${ext}`)
        if (fs.existsSync(fullPath)) {
          return await readPost(fullPath, slug, category)
        }
      }
    }
  }

  // Try root directory
  for (const ext of ['.md', '.mdx']) {
    const fullPath = path.join(postsDirectory, `${slug}${ext}`)
    if (fs.existsSync(fullPath)) {
      return await readPost(fullPath, slug, null)
    }
  }

  return null
}

/**
 * Read and process a post file
 */
async function readPost(fullPath, slug, category) {
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const processedContent = await remark()
    .use(html, { sanitize: false })
    .use(remarkGfm)
    .process(content)

  const contentHtml = processedContent.toString()
  const readingStats = readingTime(content)

  return {
    slug,
    content: contentHtml,
    title: data.title || slug,
    date: data.date || new Date().toISOString(),
    description: data.description || '',
    category: data.category || category || 'uncategorized',
    tags: data.tags || [],
    author: data.author || 'Mehmet Temel',
    readingTime: readingStats.text,
    featured: data.featured || false,
    ...data,
  }
}

/**
 * Get all post slugs for static generation
 */
export function getAllPostSlugs() {
  const postFiles = getAllPostFiles(postsDirectory)
  return postFiles.map(({ file }) => ({
    slug: file.replace(/\.mdx?$/, ''),
  }))
}

/**
 * Get category display name in Turkish
 */
export function getCategoryName(category) {
  const names = {
    gidalar: 'Gıdalar',
    besinler: 'Besinler',
    mekanizmalar: 'Mekanizmalar',
  }
  return names[category] || category
}

/**
 * Get category icon emoji
 */
export function getCategoryIcon(category) {
  const icons = {
    gidalar: '🍎',
    besinler: '💊',
    mekanizmalar: '🧬',
  }
  return icons[category] || '📄'
}

/**
 * Get all available categories
 */
export function getAllCategories() {
  return CATEGORIES
}

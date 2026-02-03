import { NextResponse } from 'next/server'
import { getAllPosts } from '@/lib/blog'
import { readFileSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'

function parsePersonalNotes(content) {
  // Split by H2 headers (##)
  const sections = content.split(/^## /m).filter(Boolean)
  const categories = []

  sections.forEach(section => {
    const lines = section.trim().split('\n')
    const categoryName = lines[0].trim()
    const noteItems = lines.slice(1)
      .map(line => line.trim())
      .filter(line => line && line.startsWith('-'))
      .map(line => line.replace(/^-\s*/, ''))

    if (noteItems.length > 0) {
      categories.push({
        category: categoryName,
        items: noteItems
      })
    }
  })

  return categories
}

function parseIncelemeNotes(content) {
  // Split by H2 headers (##)
  const sections = content.split(/^## /m).filter(Boolean)
  const notes = []

  sections.forEach(section => {
    const lines = section.trim().split('\n')
    const noteName = lines[0].trim()

    // Get all content under this header until next header
    let noteContent = []
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim()
      // Skip H3 headers (###) but include everything else
      if (line && !line.startsWith('###')) {
        noteContent.push(line)
      }
    }

    // Join content and filter out empty ones
    const content = noteContent.join(' ').trim()
    if (content && content !== '---') {
      notes.push({
        title: noteName,
        content: content
      })
    }
  })

  return notes
}

export async function GET() {
  try {
    // Check authentication
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('session')

    if (!sessionCookie) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const payload = await verifyToken(sessionCookie.value)
    if (!payload) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Collect all items
    const allItems = []

    // 1. Get all posts from incelemeler (all content/ files) and parse notes
    const allPosts = getAllPosts()

    allPosts.forEach(post => {
      try {
        // Read markdown file for this post
        const contentPath = join(process.cwd(), 'content', `${post.slug}.md`)
        const fileContent = readFileSync(contentPath, 'utf-8')
        const { content } = matter(fileContent)

        // Parse notes from content
        const notes = parseIncelemeNotes(content)

        // Add each note as a separate item
        notes.forEach(note => {
          allItems.push({
            type: 'inceleme_note',
            category: post.category,
            bookTitle: post.title,
            author: post.author,
            slug: post.slug,
            noteTitle: note.title,
            noteContent: note.content
          })
        })
      } catch (error) {
        console.error(`Error reading inceleme ${post.slug}:`, error)
      }
    })

    // 2. Get personal notes (kendime-notlar and conversation-skills)
    const personalFiles = ['kendime-notlar.md', 'conversation-skills.md']

    for (const filename of personalFiles) {
      try {
        const filePath = join(process.cwd(), 'data', 'personal', filename)
        const fileContent = readFileSync(filePath, 'utf-8')
        const { content } = matter(fileContent)
        const categories = parsePersonalNotes(content)

        categories.forEach(category => {
          allItems.push({
            type: 'personal_note',
            source: filename.replace('.md', ''),
            category: category.category,
            items: category.items
          })
        })
      } catch (error) {
        console.error(`Error reading ${filename}:`, error)
      }
    }

    // Select random item
    if (allItems.length === 0) {
      return NextResponse.json(
        { error: 'No items found' },
        { status: 404 }
      )
    }

    const randomIndex = Math.floor(Math.random() * allItems.length)
    const randomItem = allItems[randomIndex]

    return NextResponse.json({
      item: randomItem,
      total: allItems.length
    })

  } catch (error) {
    console.error('Error in random API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

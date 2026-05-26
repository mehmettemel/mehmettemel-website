import { NextResponse } from 'next/server'
import { getAllPosts } from '@/lib/blog'
import { readFileSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'
import { categories as kisiselGelisimCategories } from '@/data/personal/kisisel-gelisim'
import { categories as iliskilerCategories } from '@/data/personal/iliskiler'
import { categories as toplumCategories } from '@/data/personal/toplum'
import { categories as sozlerCategories } from '@/data/personal/sozler'

function parseIncelemeNotes(content) {
  const sections = content.split(/^## /m).filter(Boolean)
  const notes = []

  sections.forEach(section => {
    const lines = section.trim().split('\n')
    const noteName = lines[0].trim()

    let noteContent = []
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (line && !line.startsWith('###')) {
        noteContent.push(line)
      }
    }

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
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('session')

    if (!sessionCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = await verifyToken(sessionCookie.value)
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const allItems = []

    // 1. Get all posts from incelemeler
    const allPosts = getAllPosts()

    allPosts.forEach(post => {
      try {
        const contentPath = join(process.cwd(), 'content', `${post.slug}.md`)
        const fileContent = readFileSync(contentPath, 'utf-8')
        const { content } = matter(fileContent)
        const notes = parseIncelemeNotes(content)

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

    // 2. Get personal notes from JS data
    const personalData = [
      { source: 'kisisel-gelisim', data: kisiselGelisimCategories },
      { source: 'iliskiler', data: iliskilerCategories },
      { source: 'toplum', data: toplumCategories },
      { source: 'sozler', data: sozlerCategories },
    ]

    for (const { source, data } of personalData) {
      for (const [categoryName, categoryData] of Object.entries(data)) {
        if (categoryData.items.length > 0) {
          allItems.push({
            type: 'personal_note',
            source,
            category: categoryName,
            items: categoryData.items
          })
        }
      }
    }

    if (allItems.length === 0) {
      return NextResponse.json({ error: 'No items found' }, { status: 404 })
    }

    const randomIndex = Math.floor(Math.random() * allItems.length)
    const randomItem = allItems[randomIndex]

    return NextResponse.json({
      item: randomItem,
      total: allItems.length
    })

  } catch (error) {
    console.error('Error in random API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

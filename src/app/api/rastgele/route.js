import { NextResponse } from 'next/server'
import { getAllPosts } from '@/lib/blog'
import { readFileSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

function parseIncelemeNotes(content) {
  const sections = content.split(/^## /m).filter(Boolean)
  const notes = []

  sections.forEach((section) => {
    const lines = section.trim().split('\n')
    const noteName = lines[0].trim()

    let noteContent = []
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (line && !line.startsWith('###')) {
        noteContent.push(line)
      }
    }

    const joined = noteContent.join(' ').trim()
    if (joined && joined !== '---') {
      notes.push({ title: noteName, content: joined })
    }
  })

  return notes
}

export async function GET() {
  try {
    const allItems = []
    const allPosts = getAllPosts()

    allPosts.forEach((post) => {
      try {
        const contentPath = join(process.cwd(), 'content', `${post.slug}.md`)
        const fileContent = readFileSync(contentPath, 'utf-8')
        const { content } = matter(fileContent)
        const notes = parseIncelemeNotes(content)

        notes.forEach((note) => {
          allItems.push({
            bookTitle: post.title,
            author: post.author,
            slug: post.slug,
            noteTitle: note.title,
            noteContent: note.content,
          })
        })
      } catch (error) {
        console.error(`Error reading inceleme ${post.slug}:`, error)
      }
    })

    if (allItems.length === 0) {
      return NextResponse.json({ error: 'No items found' }, { status: 404 })
    }

    const randomIndex = Math.floor(Math.random() * allItems.length)

    return NextResponse.json({
      item: allItems[randomIndex],
      total: allItems.length,
    })
  } catch (error) {
    console.error('Error in random API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

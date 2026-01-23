import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not defined')
}

const sql = neon(process.env.DATABASE_URL)

/**
 * GET /api/notes/random?type=quote&category=gida
 * Get a random note
 * Optionally filter by note_type (quote, video, book, link) and/or category (gida, saglik, kisisel, genel)
 * @param {string} type - Optional note_type filter
 * @param {string} category - Optional category filter
 * @returns {Promise<Object>} Random note
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const noteType = searchParams.get('type')
    const category = searchParams.get('category')

    let result

    // Filter by both note_type and category
    if (noteType && noteType !== 'all' && category && category !== 'all') {
      result = await sql`
        SELECT * FROM notes
        WHERE note_type = ${noteType}
        AND category = ${category}
        ORDER BY RANDOM()
        LIMIT 1
      `
    }
    // Filter by note_type only
    else if (noteType && noteType !== 'all') {
      result = await sql`
        SELECT * FROM notes
        WHERE note_type = ${noteType}
        ORDER BY RANDOM()
        LIMIT 1
      `
    }
    // Filter by category only
    else if (category && category !== 'all') {
      result = await sql`
        SELECT * FROM notes
        WHERE note_type IN ('quote', 'video', 'book', 'link')
        AND category = ${category}
        ORDER BY RANDOM()
        LIMIT 1
      `
    }
    // No filters - all notes
    else {
      result = await sql`
        SELECT * FROM notes
        WHERE note_type IN ('quote', 'video', 'book', 'link')
        ORDER BY RANDOM()
        LIMIT 1
      `
    }

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'No notes found' },
        { status: 404 }
      )
    }

    return NextResponse.json(result[0])
  } catch (error) {
    console.error('Database error in random note:', error)
    return NextResponse.json(
      { error: 'Failed to fetch random note' },
      { status: 500 }
    )
  }
}

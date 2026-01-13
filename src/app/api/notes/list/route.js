import { NextResponse } from 'next/server'
import { getNotes } from '@/lib/db'

/**
 * GET /api/notes/list
 * List notes with filtering and pagination
 *
 * Query params:
 * - type: 'link' | 'quote' | 'video' | 'book' (required)
 * - category: category id or 'all' (optional, default: 'all')
 * - page: page number (optional, default: 1)
 * - limit: items per page (optional, default: 12)
 *
 * Example: /api/notes/list?type=link&category=teknik&page=1&limit=12
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)

    // Get query parameters
    const type = searchParams.get('type')
    const category = searchParams.get('category') || 'all'
    const page = parseInt(searchParams.get('page')) || 1
    const limit = parseInt(searchParams.get('limit')) || 12

    // Validate type parameter
    if (!type) {
      return NextResponse.json(
        { error: 'Type parameter is required' },
        { status: 400 },
      )
    }

    const validTypes = ['link', 'quote', 'video', 'book']
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { error: `Invalid type. Must be one of: ${validTypes.join(', ')}` },
        { status: 400 },
      )
    }

    // Validate pagination parameters
    if (page < 1) {
      return NextResponse.json(
        { error: 'Page must be >= 1' },
        { status: 400 },
      )
    }

    if (limit < 1 || limit > 100) {
      return NextResponse.json(
        { error: 'Limit must be between 1 and 100' },
        { status: 400 },
      )
    }

    // Get notes from database
    const result = await getNotes({ type, category, page, limit })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Notes list API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch notes', details: error.message },
      { status: 500 },
    )
  }
}

// ISR: Revalidate every 60 seconds
export const revalidate = 60

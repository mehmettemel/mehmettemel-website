import { NextResponse } from 'next/server'
import { getEnglishWords } from '@/lib/db'

/**
 * GET /api/english-words
 * Returns all English words for client-side usage
 */
export async function GET() {
  try {
    const words = await getEnglishWords()
    return NextResponse.json({ words })
  } catch (error) {
    console.error('Error fetching English words:', error)
    return NextResponse.json(
      { error: 'Failed to fetch English words' },
      { status: 500 },
    )
  }
}

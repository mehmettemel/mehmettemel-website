import { NextResponse } from 'next/server'
import { createNote, updateNoteGithubPath } from '@/lib/db'
import { createMarkdownFile } from '@/lib/github'
import { handleLink, handleNote, isURL } from '@/lib/gemini'

/**
 * POST /api/kesifler/add
 * Add a new note (link or quote) to the system
 *
 * This endpoint is used by the Google Apps Script Telegram bot
 * Flow: Telegram → Google Apps Script → This API → Neon DB + GitHub
 *
 * Body: { text: string }
 * Response: { success: boolean, type: string, data: object, message: string }
 */
export async function POST(request) {
  try {
    // Parse request body
    const { text } = await request.json()

    if (!text) {
      return NextResponse.json(
        { error: 'Mesaj metni gerekli' },
        { status: 400 },
      )
    }

    console.log(`📩 New request: ${text.substring(0, 50)}...`)

    // Detect if it's a link or note
    const isLink = isURL(text)
    let categorizedData

    if (isLink) {
      // Handle link with Gemini AI
      categorizedData = await handleLink(text)
      console.log(`🔗 Detected as link: ${categorizedData.title}`)
    } else {
      // Handle note/quote with Gemini AI
      categorizedData = await handleNote(text)
      console.log(`💭 Detected as quote/note: ${categorizedData.category}`)
    }

    // Save to Neon database
    const note = await createNote(categorizedData)
    console.log(`✅ Saved to DB: note #${note.id}`)

    // Create markdown file in GitHub
    const github = await createMarkdownFile(note)
    console.log(`📁 Created GitHub file: ${github.path}`)

    // Update note with GitHub info
    await updateNoteGithubPath(note.id, github.path, github.sha)

    // Return success response (compatible with Google Apps Script bot)
    return NextResponse.json({
      success: true,
      type: isLink ? 'link' : 'note',
      data: {
        id: note.id,
        title: categorizedData.title || null,
        text: categorizedData.text,
        type: categorizedData.category, // For backward compatibility
        category: categorizedData.category,
        url: categorizedData.url || null,
        author: categorizedData.author || null,
        source: categorizedData.source || null,
        tags: categorizedData.tags || [],
        github_path: github.path,
      },
      message: `${isLink ? 'Link' : 'Not'} başarıyla eklendi! (DB + GitHub)`,
    })
  } catch (error) {
    console.error('❌ API Error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 },
    )
  }
}

/**
 * Migration Script: kesifler.js → Neon DB + GitHub
 *
 * This script migrates existing data from src/data/kesifler.js
 * to the Neon PostgreSQL database and creates markdown files in GitHub.
 *
 * Usage:
 *   node scripts/migrate-kesifler.js
 *
 * Prerequisites:
 *   - DATABASE_URL environment variable must be set
 *   - GITHUB_TOKEN environment variable must be set
 *   - Database schema must be initialized (run scripts/init-db.sql first)
 */

import { createNote, updateNoteGithubPath } from '../src/lib/db.js'
import { createMarkdownFile } from '../src/lib/github.js'

// Import existing data from kesifler.js
// Note: Need to use dynamic import or adjust based on your export format
async function importKesiflerData() {
  try {
    // Use dynamic import for ESM compatibility
    const kesifler = await import('../src/data/kesifler.js')
    return {
      links: kesifler.usefulLinks || [],
      quotes: kesifler.quotes || kesifler.inspirationalQuotes || [],
      videos: kesifler.videoNotes || [],
      books: kesifler.bookNotes || [],
    }
  } catch (error) {
    console.error('Failed to import kesifler.js:', error)
    throw error
  }
}

/**
 * Migrate links to database and GitHub
 */
async function migrateLinks(links) {
  console.log(`\n📎 Migrating ${links.length} links...`)

  for (const link of links) {
    try {
      // Create note in database
      const note = await createNote({
        type: 'link',
        category: link.type, // 'teknik', 'icerik', 'diger'
        title: link.title,
        text: link.description,
        url: link.url,
        author: link.author || null,
        source: null,
        tags: link.tags || [],
        is_migrated: true,
      })

      console.log(`  ✓ Created note #${note.id}: ${link.title}`)

      // Create markdown file in GitHub
      const github = await createMarkdownFile(note)
      await updateNoteGithubPath(note.id, github.path, github.sha)

      console.log(`    → GitHub: ${github.path}`)
    } catch (error) {
      console.error(`  ✗ Failed to migrate link "${link.title}":`, error.message)
    }
  }
}

/**
 * Migrate quotes to database and GitHub
 */
async function migrateQuotes(quotes) {
  console.log(`\n💭 Migrating ${quotes.length} quotes...`)

  for (const quote of quotes) {
    try {
      // Create note in database
      const note = await createNote({
        type: 'quote',
        category: quote.category, // 'kisisel', 'saglik', 'gida', 'seyahat', 'genel'
        title: null,
        text: quote.text,
        url: quote.url || null,
        author: quote.author || null,
        source: quote.source || null,
        tags: quote.tags || [],
        is_migrated: true,
      })

      const preview = quote.text.substring(0, 50) + '...'
      console.log(`  ✓ Created note #${note.id}: ${preview}`)

      // Create markdown file in GitHub
      const github = await createMarkdownFile(note)
      await updateNoteGithubPath(note.id, github.path, github.sha)

      console.log(`    → GitHub: ${github.path}`)
    } catch (error) {
      console.error(
        `  ✗ Failed to migrate quote "${quote.text.substring(0, 30)}...":`,
        error.message,
      )
    }
  }
}

/**
 * Migrate video notes to database and GitHub
 */
async function migrateVideos(videos) {
  console.log(`\n🎬 Migrating ${videos.length} video notes...`)

  for (const video of videos) {
    try {
      // Create note in database
      const note = await createNote({
        type: 'video',
        category: video.category, // 'youtube', 'documentary', 'course', 'podcast'
        title: null,
        text: video.text,
        url: video.url || null,
        author: video.author || null,
        source: video.source || null,
        tags: video.tags || [],
        is_migrated: true,
      })

      const preview = video.text.substring(0, 50) + '...'
      console.log(`  ✓ Created note #${note.id}: ${preview}`)

      // Create markdown file in GitHub
      const github = await createMarkdownFile(note)
      await updateNoteGithubPath(note.id, github.path, github.sha)

      console.log(`    → GitHub: ${github.path}`)
    } catch (error) {
      console.error(
        `  ✗ Failed to migrate video note "${video.text.substring(0, 30)}...":`,
        error.message,
      )
    }
  }
}

/**
 * Migrate book notes to database and GitHub
 */
async function migrateBooks(books) {
  console.log(`\n📖 Migrating ${books.length} book notes...`)

  for (const book of books) {
    try {
      // Create note in database
      const note = await createNote({
        type: 'book',
        category: book.category, // 'science', 'selfhelp', 'biography', 'fiction', 'health'
        title: null,
        text: book.text,
        url: book.url || null,
        author: book.author || null,
        source: book.source || null,
        tags: book.tags || [],
        is_migrated: true,
      })

      const preview = book.text.substring(0, 50) + '...'
      console.log(`  ✓ Created note #${note.id}: ${preview}`)

      // Create markdown file in GitHub
      const github = await createMarkdownFile(note)
      await updateNoteGithubPath(note.id, github.path, github.sha)

      console.log(`    → GitHub: ${github.path}`)
    } catch (error) {
      console.error(
        `  ✗ Failed to migrate book note "${book.text.substring(0, 30)}...":`,
        error.message,
      )
    }
  }
}

/**
 * Main migration function
 */
async function migrate() {
  console.log('🚀 Starting migration from kesifler.js to Neon DB + GitHub...\n')

  // Check environment variables
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL environment variable is not set')
    process.exit(1)
  }

  if (!process.env.GITHUB_TOKEN) {
    console.error('❌ GITHUB_TOKEN environment variable is not set')
    process.exit(1)
  }

  try {
    // Import data
    console.log('📂 Loading data from kesifler.js...')
    const data = await importKesiflerData()

    console.log(`\n📊 Data summary:`)
    console.log(`   Links: ${data.links.length}`)
    console.log(`   Quotes: ${data.quotes.length}`)
    console.log(`   Videos: ${data.videos.length}`)
    console.log(`   Books: ${data.books.length}`)
    console.log(`   Total: ${data.links.length + data.quotes.length + data.videos.length + data.books.length}`)

    // Migrate each type
    if (data.links.length > 0) {
      await migrateLinks(data.links)
    }

    if (data.quotes.length > 0) {
      await migrateQuotes(data.quotes)
    }

    if (data.videos.length > 0) {
      await migrateVideos(data.videos)
    }

    if (data.books.length > 0) {
      await migrateBooks(data.books)
    }

    console.log('\n✨ Migration complete!')
    console.log('\n📝 Next steps:')
    console.log('   1. Verify data in Neon database')
    console.log('   2. Check markdown files in GitHub (notes/ directory)')
    console.log('   3. Test the frontend at /kesifler')
    console.log('   4. Backup kesifler.js: cp src/data/kesifler.js src/data/kesifler.backup.js')
    console.log('   5. Consider deprecating the old kesifler.js file')
  } catch (error) {
    console.error('\n❌ Migration failed:', error)
    process.exit(1)
  }
}

// Run migration
migrate()

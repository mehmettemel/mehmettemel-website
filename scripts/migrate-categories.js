#!/usr/bin/env node

/**
 * Data Migration Script - Migrate existing notes to new 4-category system
 *
 * Usage:
 *   node scripts/migrate-categories.js --dry-run   # Preview changes
 *   node scripts/migrate-categories.js --execute   # Apply changes
 *   node scripts/migrate-categories.js --verify    # Verify migration
 */

import { neon } from '@neondatabase/serverless'
import 'dotenv/config'

if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL environment variable is not defined')
  process.exit(1)
}

if (!process.env.GEMINI_API_KEY) {
  console.error('❌ GEMINI_API_KEY environment variable is not defined')
  process.exit(1)
}

const sql = neon(process.env.DATABASE_URL)
const GEMINI_KEY = process.env.GEMINI_API_KEY

// Parse command line arguments
const args = process.argv.slice(2)
const isDryRun = args.includes('--dry-run')
const isExecute = args.includes('--execute')
const isVerify = args.includes('--verify')

if (!isDryRun && !isExecute && !isVerify) {
  console.log(`
Usage:
  node scripts/migrate-categories.js --dry-run   # Preview changes
  node scripts/migrate-categories.js --execute   # Apply changes
  node scripts/migrate-categories.js --verify    # Verify migration
`)
  process.exit(1)
}

// Category mapping logic
const DIRECT_MAPPINGS = {
  // Quotes - most stay the same
  quote: {
    gida: 'gida',
    saglik: 'saglik',
    kisisel: 'kisisel',
    genel: 'genel',
    // seyahat needs AI decision → kisisel or genel
  },
  // Books - need AI for most
  book: {
    health: 'saglik',
    selfhelp: 'kisisel',
    // science, biography, fiction → need AI
  },
  // Videos - all need AI (platform → content based)
  video: {},
}

/**
 * Call Gemini AI to categorize a note
 */
async function categorizeWithAI(note, retries = 3) {
  const prompt = `Migrate this note to new category system:

Type: ${note.note_type}
Old Category: ${note.old_category || note.category}
Content: ${note.text || ''}
Author: ${note.author || ''}
Source: ${note.source || ''}

NEW CATEGORIES (4 options):
- gida: Food, nutrition, recipes, diet, cooking
- saglik: Health, fitness, wellness, medicine, mental health, exercise
- kisisel: Personal development, motivation, self-help, habits, productivity
- genel: Everything else that doesn't fit above categories

Analyze the CONTENT (not the old category name) and return ONLY a JSON object:
{ "category": "gida|saglik|kisisel|genel" }

Do not use markdown code blocks, just return raw JSON.`

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      })

      const json = await res.json()

      if (json.error) {
        if (json.error.message.includes('overloaded') || json.error.status === 'RESOURCE_EXHAUSTED') {
          if (attempt < retries) {
            const delay = 2000 * attempt
            console.log(`  ⏳ API overloaded, retry ${attempt}/${retries} (waiting ${delay}ms...)`)
            await new Promise(resolve => setTimeout(resolve, delay))
            continue
          }
        }
        throw new Error('Gemini API Error: ' + json.error.message)
      }

      const responseText = json.candidates[0].content.parts[0].text
      const cleanResponse = responseText.trim().replace(/```json\n?/g, '').replace(/```\n?/g, '')
      const jsonMatch = cleanResponse.match(/\{[\s\S]*\}/)

      if (jsonMatch) {
        const result = JSON.parse(jsonMatch[0])
        return result.category
      }

      throw new Error('Invalid AI response format')
    } catch (error) {
      if (attempt === retries) {
        console.error(`  ❌ AI categorization failed after ${retries} attempts:`, error.message)
        return 'genel' // Fallback
      }
      await new Promise(resolve => setTimeout(resolve, 2000 * attempt))
    }
  }

  return 'genel' // Final fallback
}

/**
 * Determine new category for a note
 */
async function getNewCategory(note) {
  const noteType = note.note_type
  const oldCategory = note.old_category || note.category

  // Links → NULL
  if (noteType === 'link') {
    return null
  }

  // Check direct mapping
  const mapping = DIRECT_MAPPINGS[noteType]?.[oldCategory]
  if (mapping) {
    return mapping
  }

  // Need AI categorization
  console.log(`  🤖 AI categorizing ${noteType}:${oldCategory} (ID: ${note.id})`)
  const newCategory = await categorizeWithAI(note)
  console.log(`     → ${newCategory}`)

  return newCategory
}

/**
 * Main migration function
 */
async function migrate() {
  console.log('\n🚀 Starting category migration...\n')

  // Fetch all notes that need migration
  const notes = await sql`
    SELECT * FROM notes
    WHERE old_category IS NOT NULL
    ORDER BY note_type, id
  `

  console.log(`📊 Found ${notes.length} notes to migrate\n`)

  const changes = []
  const errors = []

  // Group by type for organized output
  const notesByType = notes.reduce((acc, note) => {
    acc[note.note_type] = acc[note.note_type] || []
    acc[note.note_type].push(note)
    return acc
  }, {})

  for (const [noteType, typeNotes] of Object.entries(notesByType)) {
    console.log(`\n📝 Processing ${noteType} notes (${typeNotes.length} items)...`)

    for (let i = 0; i < typeNotes.length; i++) {
      const note = typeNotes[i]
      const oldCategory = note.old_category || note.category

      try {
        const newCategory = await getNewCategory(note)

        changes.push({
          id: note.id,
          note_type: note.note_type,
          old_category: oldCategory,
          new_category: newCategory,
          text_preview: (note.text || '').substring(0, 50),
        })

        // Rate limiting: add delay every 10 notes to avoid API limits
        if ((i + 1) % 10 === 0 && i < typeNotes.length - 1) {
          console.log('  ⏸️  Pausing for rate limiting...')
          await new Promise(resolve => setTimeout(resolve, 3000))
        }
      } catch (error) {
        errors.push({
          id: note.id,
          note_type: note.note_type,
          category: oldCategory,
          error: error.message,
        })
        console.error(`  ❌ Error processing note ${note.id}:`, error.message)
      }
    }
  }

  // Print summary
  console.log('\n\n📊 MIGRATION SUMMARY\n')
  console.log(`Total notes: ${notes.length}`)
  console.log(`Successful: ${changes.length}`)
  console.log(`Errors: ${errors.length}`)

  // Group changes by type and category
  const categoryChanges = changes.reduce((acc, change) => {
    const key = `${change.note_type}: ${change.old_category} → ${change.new_category}`
    acc[key] = (acc[key] || 0) + 1
    return acc
  }, {})

  console.log('\n📈 Category Changes:')
  Object.entries(categoryChanges).forEach(([key, count]) => {
    console.log(`  ${key}: ${count} notes`)
  })

  if (isDryRun) {
    console.log('\n\n⚠️  DRY RUN - No changes applied to database')
    console.log('\nTo apply changes, run: node scripts/migrate-categories.js --execute\n')
    return
  }

  if (isExecute) {
    console.log('\n\n💾 Applying changes to database...')

    for (const change of changes) {
      await sql`
        UPDATE notes
        SET category = ${change.new_category}
        WHERE id = ${change.id}
      `
    }

    console.log('✅ Database updated successfully!')
    console.log('\nTo verify migration, run: node scripts/migrate-categories.js --verify\n')
  }

  // Save logs
  const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0]
  const logContent = {
    timestamp,
    mode: isDryRun ? 'dry-run' : 'execute',
    summary: {
      total: notes.length,
      successful: changes.length,
      errors: errors.length,
    },
    changes,
    errors,
  }

  const fs = await import('fs')
  fs.writeFileSync(
    `migration-log-${timestamp}.json`,
    JSON.stringify(logContent, null, 2)
  )
  console.log(`\n📄 Log saved to: migration-log-${timestamp}.json`)
}

/**
 * Verify migration
 */
async function verify() {
  console.log('\n🔍 Verifying migration...\n')

  const stats = await sql`
    SELECT
      note_type,
      category,
      old_category,
      COUNT(*) as count
    FROM notes
    GROUP BY note_type, category, old_category
    ORDER BY note_type, category
  `

  console.log('📊 Current state:\n')
  stats.forEach(row => {
    console.log(`${row.note_type} | ${row.category || 'NULL'} | (was: ${row.old_category || 'N/A'}) | Count: ${row.count}`)
  })

  // Check for unmigrated notes
  const unmigrated = await sql`
    SELECT COUNT(*) as count
    FROM notes
    WHERE old_category IS NOT NULL
    AND category = old_category
    AND note_type != 'link'
  `

  console.log(`\n⚠️  Unmigrated notes: ${unmigrated[0].count}`)

  // Check links
  const linksWithCategory = await sql`
    SELECT COUNT(*) as count
    FROM notes
    WHERE note_type = 'link' AND category IS NOT NULL
  `

  console.log(`⚠️  Links with category (should be 0): ${linksWithCategory[0].count}`)

  console.log('\n✅ Verification complete\n')
}

// Run the appropriate function
if (isVerify) {
  verify().catch(console.error)
} else {
  migrate().catch(console.error)
}

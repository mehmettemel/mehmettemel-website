/**
 * Drop Travel Tables Script
 *
 * This script removes all travel-related tables from Neon database
 *
 * Usage:
 *   node scripts/drop-travel-tables.js
 *
 * Make sure DATABASE_URL is set in your .env file
 */

import { neon } from '@neondatabase/serverless'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const sql = neon(process.env.DATABASE_URL)

async function dropTravelTables() {
  console.log('🗑️  Starting travel tables cleanup...\n')

  try {
    // Drop tables in reverse order of dependencies
    console.log('Dropping travel_places table...')
    await sql`DROP TABLE IF EXISTS travel_places CASCADE`
    console.log('✅ travel_places dropped')

    console.log('Dropping travel_countries table...')
    await sql`DROP TABLE IF EXISTS travel_countries CASCADE`
    console.log('✅ travel_countries dropped')

    console.log('Dropping travel_continents table...')
    await sql`DROP TABLE IF EXISTS travel_continents CASCADE`
    console.log('✅ travel_continents dropped')

    // Verify cleanup
    console.log('\nVerifying cleanup...')
    const remainingTables = await sql`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name LIKE 'travel_%'
    `

    if (remainingTables.length === 0) {
      console.log('✅ All travel tables successfully removed!')
      console.log('\n🎉 Cleanup complete!')
    } else {
      console.log('⚠️  Some travel tables still exist:')
      remainingTables.forEach((table) => {
        console.log(`   - ${table.table_name}`)
      })
    }
  } catch (error) {
    console.error('❌ Error dropping tables:', error.message)
    process.exit(1)
  }
}

// Run the script
dropTravelTables()
  .then(() => {
    console.log('\n✨ Script finished successfully')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Script failed:', error)
    process.exit(1)
  })

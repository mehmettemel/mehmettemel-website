import { neon } from '@neondatabase/serverless'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not defined')
}

const sql = neon(process.env.DATABASE_URL)

/**
 * Create a new note in the database
 * @param {Object} data - Note data
 * @param {string} data.type - Note type: 'link', 'quote'
 * @param {string} data.category - Category based on note type
 * @param {string} [data.title] - Title (required for links)
 * @param {string} data.text - Main content
 * @param {string} [data.author] - Author name
 * @param {string} [data.source] - Source
 * @param {string} [data.url] - URL
 * @param {string[]} [data.tags] - Tags array
 * @param {boolean} [data.is_migrated] - Migration flag
 * @returns {Promise<Object>} Created note
 */
export async function createNote(data) {
  try {
    // Links can have NULL category
    const category = data.type === 'link' ? null : (data.category || null)

    const result = await sql`
      INSERT INTO notes (note_type, category, title, text, author, source, url, tags, is_migrated)
      VALUES (
        ${data.type},
        ${category},
        ${data.title || null},
        ${data.text},
        ${data.author || null},
        ${data.source || null},
        ${data.url || null},
        ${data.tags || []},
        ${data.is_migrated || false}
      )
      RETURNING *
    `
    return result[0]
  } catch (error) {
    console.error('Database error in createNote:', error)
    throw new Error(`Failed to create note: ${error.message}`)
  }
}

/**
 * Get notes with filtering and pagination
 * @param {Object} options - Query options
 * @param {string} options.type - Note type to filter
 * @param {string} [options.category] - Category to filter (optional, 'all' for no filter)
 * @param {number} [options.page=1] - Page number
 * @param {number} [options.limit=12] - Items per page
 * @returns {Promise<Object>} Notes data with pagination info
 */
export async function getNotes({ type, category, page = 1, limit = 12 }) {
  try {
    const offset = (page - 1) * limit

    // Get notes with proper SQL template
    let notes
    let countResult

    // Links don't have categories - ignore category filter
    if (type === 'link') {
      notes = await sql`
        SELECT * FROM notes
        WHERE note_type = ${type}
        ORDER BY created_at DESC
        LIMIT ${limit} OFFSET ${offset}
      `

      countResult = await sql`
        SELECT COUNT(*) as count FROM notes
        WHERE note_type = ${type}
      `
    } else if (category && category !== 'all') {
      // Filter by both type and category
      notes = await sql`
        SELECT * FROM notes
        WHERE note_type = ${type} AND category = ${category}
        ORDER BY created_at ASC
        LIMIT ${limit} OFFSET ${offset}
      `

      countResult = await sql`
        SELECT COUNT(*) as count FROM notes
        WHERE note_type = ${type} AND category = ${category}
      `
    } else {
      // Filter by type only
      notes = await sql`
        SELECT * FROM notes
        WHERE note_type = ${type}
        ORDER BY created_at ASC
        LIMIT ${limit} OFFSET ${offset}
      `

      countResult = await sql`
        SELECT COUNT(*) as count FROM notes
        WHERE note_type = ${type}
      `
    }

    const total = parseInt(countResult[0].count)

    return {
      notes,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    }
  } catch (error) {
    console.error('Database error in getNotes:', error)
    throw new Error(`Failed to get notes: ${error.message}`)
  }
}

/**
 * Get a single note by ID
 * @param {number} id - Note ID
 * @returns {Promise<Object|null>} Note data or null
 */
export async function getNoteById(id) {
  try {
    const result = await sql`
      SELECT * FROM notes
      WHERE id = ${id}
    `
    return result[0] || null
  } catch (error) {
    console.error('Database error in getNoteById:', error)
    throw new Error(`Failed to get note: ${error.message}`)
  }
}

/**
 * Get statistics about notes
 * @returns {Promise<Object>} Statistics
 */
export async function getNotesStats() {
  try {
    const stats = await sql`
      SELECT
        note_type,
        COUNT(*) as count
      FROM notes
      GROUP BY note_type
    `

    const total = await sql`
      SELECT COUNT(*) as count FROM notes
    `

    return {
      total: parseInt(total[0].count),
      byType: stats.reduce((acc, row) => {
        acc[row.note_type] = parseInt(row.count)
        return acc
      }, {}),
    }
  } catch (error) {
    console.error('Database error in getNotesStats:', error)
    throw new Error(`Failed to get stats: ${error.message}`)
  }
}

/**
 * Get valid categories for a note type
 * @param {string} noteType - Note type
 * @returns {Promise<Array>} Categories
 */
export async function getValidCategories(noteType) {
  try {
    const categories = await sql`
      SELECT category_id, category_name, icon
      FROM valid_categories
      WHERE note_type = ${noteType}
      ORDER BY id
    `
    return categories
  } catch (error) {
    console.error('Database error in getValidCategories:', error)
    throw new Error(`Failed to get categories: ${error.message}`)
  }
}

/**
 * Get recent notes across all types for homepage display
 * @param {number} limit - Number of notes to fetch (default: 10)
 * @returns {Promise<Array>} Recent notes
 */
export async function getRecentNotes(limit = 10) {
  try {
    const notes = await sql`
      SELECT id, note_type, category, title, text, author, source, url, created_at
      FROM notes
      ORDER BY created_at DESC
      LIMIT ${limit}
    `
    return notes
  } catch (error) {
    console.error('Database error in getRecentNotes:', error)
    throw new Error(`Failed to get recent notes: ${error.message}`)
  }
}

/**
 * Get list items with optional filtering
 * @param {string} type - List type: 'kitap', 'film', or 'urun'
 * @param {string} [status='all'] - Filter by status: 'all', 'completed', 'pending', 'liked'
 * @returns {Promise<Array>} List items
 */
export async function getListItems(type, status = 'all') {
  try {
    let items

    if (status === 'completed') {
      items = await sql`
        SELECT * FROM list_items
        WHERE list_type = ${type} AND is_completed = true
        ORDER BY created_at DESC
      `
    } else if (status === 'pending') {
      items = await sql`
        SELECT * FROM list_items
        WHERE list_type = ${type} AND is_completed = false
        ORDER BY created_at DESC
      `
    } else if (status === 'liked') {
      items = await sql`
        SELECT * FROM list_items
        WHERE list_type = ${type} AND is_liked = true
        ORDER BY created_at DESC
      `
    } else {
      // 'all' - show pending first, then completed
      items = await sql`
        SELECT * FROM list_items
        WHERE list_type = ${type}
        ORDER BY is_completed ASC, created_at DESC
      `
    }

    return items
  } catch (error) {
    console.error('Database error in getListItems:', error)
    throw new Error(`Failed to get list items: ${error.message}`)
  }
}

/**
 * Create a new list item
 * @param {Object} data - List item data
 * @param {string} data.name - Item name
 * @param {string} data.list_type - Type: 'kitap', 'film', or 'urun'
 * @param {string} data.author - Author/Director/Brand name (optional)
 * @param {string} data.description - AI-generated description (optional)
 * @returns {Promise<Object>} Created list item
 */
export async function createListItem(data) {
  try {
    const result = await sql`
      INSERT INTO list_items (name, list_type, author, description)
      VALUES (${data.name}, ${data.list_type}, ${data.author || null}, ${data.description || null})
      RETURNING *
    `
    return result[0]
  } catch (error) {
    console.error('Database error in createListItem:', error)
    throw new Error(`Failed to create list item: ${error.message}`)
  }
}

/**
 * Toggle list item checkbox (completed or liked)
 * @param {number} id - List item ID
 * @param {string} field - Field to toggle: 'is_completed' or 'is_liked'
 * @returns {Promise<Object>} Updated list item
 */
export async function toggleListCheckbox(id, field) {
  try {
    // Validate field
    if (field !== 'is_completed' && field !== 'is_liked') {
      throw new Error('Invalid field. Must be is_completed or is_liked')
    }

    // Get current item state
    const current = await sql`
      SELECT * FROM list_items WHERE id = ${id}
    `

    if (current.length === 0) {
      throw new Error('List item not found')
    }

    const item = current[0]
    const newValue = !item[field]

    // Special handling for toggling completed to false
    if (field === 'is_completed' && !newValue) {
      // If setting completed to false, also set liked to false
      const result = await sql`
        UPDATE list_items
        SET is_completed = false, is_liked = false, updated_at = NOW()
        WHERE id = ${id}
        RETURNING *
      `
      return result[0]
    }

    // Special handling for toggling liked to true
    if (field === 'is_liked' && newValue && !item.is_completed) {
      throw new Error('Cannot like an item that is not completed')
    }

    // Normal toggle
    // Use conditional query based on field (safest approach with Neon's new API)
    let result
    if (field === 'is_completed') {
      result = await sql`
        UPDATE list_items
        SET is_completed = ${newValue}, updated_at = NOW()
        WHERE id = ${id}
        RETURNING *
      `
    } else if (field === 'is_liked') {
      result = await sql`
        UPDATE list_items
        SET is_liked = ${newValue}, updated_at = NOW()
        WHERE id = ${id}
        RETURNING *
      `
    } else {
      throw new Error('Invalid field')
    }

    return result[0]
  } catch (error) {
    console.error('Database error in toggleListCheckbox:', error)
    throw new Error(`Failed to toggle checkbox: ${error.message}`)
  }
}

/**
 * Get list statistics
 * @returns {Promise<Object>} Statistics by type
 */
export async function getListStats() {
  try {
    const stats = await sql`
      SELECT
        list_type,
        COUNT(*) as total,
        SUM(CASE WHEN is_completed THEN 1 ELSE 0 END) as completed,
        SUM(CASE WHEN is_liked THEN 1 ELSE 0 END) as liked
      FROM list_items
      GROUP BY list_type
    `

    return stats.reduce((acc, row) => {
      acc[row.list_type] = {
        total: parseInt(row.total),
        completed: parseInt(row.completed),
        liked: parseInt(row.liked),
      }
      return acc
    }, {})
  } catch (error) {
    console.error('Database error in getListStats:', error)
    throw new Error(`Failed to get list stats: ${error.message}`)
  }
}

/**
 * Create a new recipe
 * @param {Object} data - Recipe data
 * @param {string} data.name - Recipe name
 * @param {string} data.ingredients - Ingredients list
 * @param {string} data.instructions - Cooking instructions
 * @returns {Promise<Object>} Created recipe
 */
export async function createRecipe(data) {
  try {
    const result = await sql`
      INSERT INTO recipes (name, ingredients, instructions)
      VALUES (
        ${data.name},
        ${data.ingredients},
        ${data.instructions}
      )
      RETURNING *
    `
    return result[0]
  } catch (error) {
    console.error('Database error in createRecipe:', error)
    throw new Error(`Failed to create recipe: ${error.message}`)
  }
}

/**
 * Get all recipes
 * @returns {Promise<Array>} Recipes array
 */
export async function getRecipes() {
  try {
    const recipes = await sql`
      SELECT * FROM recipes
      ORDER BY created_at DESC
    `
    return recipes
  } catch (error) {
    console.error('Database error in getRecipes:', error)
    throw new Error(`Failed to get recipes: ${error.message}`)
  }
}

/**
 * Get a single recipe by ID
 * @param {number} id - Recipe ID
 * @returns {Promise<Object|null>} Recipe data or null
 */
export async function getRecipeById(id) {
  try {
    const result = await sql`
      SELECT * FROM recipes WHERE id = ${id}
    `
    return result[0] || null
  } catch (error) {
    console.error('Database error in getRecipeById:', error)
    throw new Error(`Failed to get recipe: ${error.message}`)
  }
}

/**
 * Get recipe statistics
 * @returns {Promise<Object>} Recipe statistics
 */
export async function getRecipeStats() {
  try {
    const totalResult = await sql`
      SELECT COUNT(*) as count FROM recipes
    `

    return {
      total: parseInt(totalResult[0].count),
    }
  } catch (error) {
    console.error('Database error in getRecipeStats:', error)
    throw new Error(`Failed to get recipe stats: ${error.message}`)
  }
}

// ===================================
// UPDATE AND DELETE FUNCTIONS
// ===================================

/**
 * Update a note by ID
 * @param {number} id - Note ID
 * @param {Object} data - Fields to update
 * @returns {Promise<Object>} Updated note
 */
export async function updateNote(id, data) {
  try {
    const result = await sql`
      UPDATE notes
      SET
        title = COALESCE(${data.title !== undefined ? data.title : null}, title),
        text = COALESCE(${data.text !== undefined ? data.text : null}, text),
        author = COALESCE(${data.author !== undefined ? data.author : null}, author),
        source = COALESCE(${data.source !== undefined ? data.source : null}, source),
        url = COALESCE(${data.url !== undefined ? data.url : null}, url),
        category = COALESCE(${data.category !== undefined ? data.category : null}, category),
        tags = COALESCE(${data.tags !== undefined ? data.tags : null}, tags),
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `
    if (result.length === 0) {
      throw new Error('Note not found')
    }
    return result[0]
  } catch (error) {
    console.error('Database error in updateNote:', error)
    throw new Error(`Failed to update note: ${error.message}`)
  }
}

/**
 * Delete a note by ID
 * @param {number} id - Note ID
 * @returns {Promise<Object>} Deleted note
 */
export async function deleteNote(id) {
  try {
    const result = await sql`
      DELETE FROM notes
      WHERE id = ${id}
      RETURNING *
    `
    if (result.length === 0) {
      throw new Error('Note not found')
    }
    return result[0]
  } catch (error) {
    console.error('Database error in deleteNote:', error)
    throw new Error(`Failed to delete note: ${error.message}`)
  }
}

/**
 * Update a list item by ID
 * @param {number} id - List item ID
 * @param {Object} data - Fields to update
 * @returns {Promise<Object>} Updated item
 */
export async function updateListItem(id, data) {
  try {
    const result = await sql`
      UPDATE list_items
      SET
        name = COALESCE(${data.name !== undefined ? data.name : null}, name),
        author = COALESCE(${data.author !== undefined ? data.author : null}, author),
        description = COALESCE(${data.description !== undefined ? data.description : null}, description),
        is_completed = COALESCE(${data.is_completed !== undefined ? data.is_completed : null}, is_completed),
        is_liked = COALESCE(${data.is_liked !== undefined ? data.is_liked : null}, is_liked),
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `
    if (result.length === 0) {
      throw new Error('List item not found')
    }
    return result[0]
  } catch (error) {
    console.error('Database error in updateListItem:', error)
    throw new Error(`Failed to update list item: ${error.message}`)
  }
}

/**
 * Delete a list item by ID
 * @param {number} id - List item ID
 * @returns {Promise<Object>} Deleted item
 */
export async function deleteListItem(id) {
  try {
    const result = await sql`
      DELETE FROM list_items
      WHERE id = ${id}
      RETURNING *
    `
    if (result.length === 0) {
      throw new Error('List item not found')
    }
    return result[0]
  } catch (error) {
    console.error('Database error in deleteListItem:', error)
    throw new Error(`Failed to delete list item: ${error.message}`)
  }
}

/**
 * Update a recipe by ID
 * @param {number} id - Recipe ID
 * @param {Object} data - Fields to update
 * @returns {Promise<Object>} Updated recipe
 */
export async function updateRecipe(id, data) {
  try {
    const result = await sql`
      UPDATE recipes
      SET
        name = COALESCE(${data.name !== undefined ? data.name : null}, name),
        ingredients = COALESCE(${data.ingredients !== undefined ? data.ingredients : null}, ingredients),
        instructions = COALESCE(${data.instructions !== undefined ? data.instructions : null}, instructions),
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `
    if (result.length === 0) {
      throw new Error('Recipe not found')
    }
    return result[0]
  } catch (error) {
    console.error('Database error in updateRecipe:', error)
    throw new Error(`Failed to update recipe: ${error.message}`)
  }
}

/**
 * Delete a recipe by ID
 * @param {number} id - Recipe ID
 * @returns {Promise<Object>} Deleted recipe
 */
export async function deleteRecipe(id) {
  try {
    const result = await sql`
      DELETE FROM recipes
      WHERE id = ${id}
      RETURNING *
    `
    if (result.length === 0) {
      throw new Error('Recipe not found')
    }
    return result[0]
  } catch (error) {
    console.error('Database error in deleteRecipe:', error)
    throw new Error(`Failed to delete recipe: ${error.message}`)
  }
}

// ===================================
// ENGLISH WORDS FUNCTIONS
// ===================================

/**
 * Create a new English word
 * @param {Object} data - Word data
 * @param {string} data.english - English word
 * @param {string} data.turkish - Turkish translation
 * @param {string} data.example - Example sentence in English
 * @param {string} [data.example_turkish] - Example translation in Turkish (optional)
 * @returns {Promise<Object>} Created word
 */
export async function createEnglishWord(data) {
  try {
    const result = await sql`
      INSERT INTO english_words (english, turkish, example, example_turkish)
      VALUES (
        ${data.english},
        ${data.turkish},
        ${data.example},
        ${data.example_turkish || null}
      )
      RETURNING *
    `
    return result[0]
  } catch (error) {
    console.error('Database error in createEnglishWord:', error)
    throw new Error(`Failed to create English word: ${error.message}`)
  }
}

/**
 * Get all English words
 * @returns {Promise<Array>} Array of English words
 */
export async function getEnglishWords() {
  try {
    const words = await sql`
      SELECT * FROM english_words
      ORDER BY created_at DESC
    `
    return words
  } catch (error) {
    console.error('Database error in getEnglishWords:', error)
    throw new Error(`Failed to get English words: ${error.message}`)
  }
}

/**
 * Get English word by ID
 * @param {number} id - Word ID
 * @returns {Promise<Object|null>} Word data or null
 */
export async function getEnglishWordById(id) {
  try {
    const result = await sql`
      SELECT * FROM english_words WHERE id = ${id}
    `
    return result[0] || null
  } catch (error) {
    console.error('Database error in getEnglishWordById:', error)
    throw new Error(`Failed to get English word: ${error.message}`)
  }
}

/**
 * Search English word by English text
 * @param {string} word - English word to search
 * @returns {Promise<Object|null>} Word data or null
 */
export async function searchEnglishWord(word) {
  try {
    const result = await sql`
      SELECT * FROM english_words
      WHERE LOWER(english) = LOWER(${word})
      LIMIT 1
    `
    return result[0] || null
  } catch (error) {
    console.error('Database error in searchEnglishWord:', error)
    throw new Error(`Failed to search English word: ${error.message}`)
  }
}

/**
 * Get English word statistics
 * @returns {Promise<Object>} Statistics
 */
export async function getEnglishWordStats() {
  try {
    const totalResult = await sql`
      SELECT COUNT(*) as count FROM english_words
    `

    return {
      total: parseInt(totalResult[0].count),
    }
  } catch (error) {
    console.error('Database error in getEnglishWordStats:', error)
    throw new Error(`Failed to get English word stats: ${error.message}`)
  }
}

/**
 * Update an English word by ID
 * @param {number} id - Word ID
 * @param {Object} data - Fields to update
 * @returns {Promise<Object>} Updated word
 */
export async function updateEnglishWord(id, data) {
  try {
    const result = await sql`
      UPDATE english_words
      SET
        english = COALESCE(${data.english !== undefined ? data.english : null}, english),
        turkish = COALESCE(${data.turkish !== undefined ? data.turkish : null}, turkish),
        example = COALESCE(${data.example !== undefined ? data.example : null}, example),
        example_turkish = COALESCE(${data.example_turkish !== undefined ? data.example_turkish : null}, example_turkish),
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `
    if (result.length === 0) {
      throw new Error('English word not found')
    }
    return result[0]
  } catch (error) {
    console.error('Database error in updateEnglishWord:', error)
    throw new Error(`Failed to update English word: ${error.message}`)
  }
}

/**
 * Delete an English word by ID
 * @param {number} id - Word ID
 * @returns {Promise<Object>} Deleted word
 */
export async function deleteEnglishWord(id) {
  try {
    const result = await sql`
      DELETE FROM english_words
      WHERE id = ${id}
      RETURNING *
    `
    if (result.length === 0) {
      throw new Error('English word not found')
    }
    return result[0]
  } catch (error) {
    console.error('Database error in deleteEnglishWord:', error)
    throw new Error(`Failed to delete English word: ${error.message}`)
  }
}

// ===================================
// PLACES (MEKANLAR) FUNCTIONS
// ===================================

/**
 * Create a new place
 * @param {Object} data - Place data
 * @param {string} data.name - Place name
 * @param {string} data.city - City
 * @param {string} data.country - Country
 * @param {string} data.category - Category
 * @param {string} [data.address] - Address (optional)
 * @param {string} [data.notes] - Notes (optional)
 * @param {string} [data.url] - URL (optional)
 * @returns {Promise<Object>} Created place
 */
export async function createPlace(data) {
  try {
    const result = await sql`
      INSERT INTO places (name, city, country, category, address, notes, url)
      VALUES (
        ${data.name},
        ${data.city},
        ${data.country},
        ${data.category},
        ${data.address || null},
        ${data.notes || null},
        ${data.url || null}
      )
      RETURNING *
    `
    return result[0]
  } catch (error) {
    console.error('Database error in createPlace:', error)
    throw new Error(`Failed to create place: ${error.message}`)
  }
}

/**
 * Get cities with recently added places, grouped by country
 * Used for main /kesifler/mekanlar page
 * @param {string} country - Filter by country (optional)
 * @param {number} limit - Limit cities per country (default: 100)
 * @returns {Promise<Array>} Cities with place counts
 */
export async function getCitiesWithRecentPlaces(country = null, limit = 100) {
  try {
    let cities

    if (country) {
      cities = await sql`
        SELECT
          city,
          country,
          COUNT(*) as place_count,
          MAX(created_at) as last_added
        FROM places
        WHERE country = ${country}
        GROUP BY city, country
        ORDER BY last_added DESC
        LIMIT ${limit}
      `
    } else {
      // Get all cities, Turkey first
      cities = await sql`
        SELECT
          city,
          country,
          COUNT(*) as place_count,
          MAX(created_at) as last_added
        FROM places
        GROUP BY city, country
        ORDER BY
          CASE WHEN country = 'Türkiye' THEN 0 ELSE 1 END,
          last_added DESC
      `
    }

    return cities
  } catch (error) {
    console.error('Database error in getCitiesWithRecentPlaces:', error)
    throw new Error(`Failed to get cities: ${error.message}`)
  }
}

/**
 * Get all places in a specific city
 * Used for city detail pages
 * @param {string} city - City name
 * @param {string} country - Country name
 * @returns {Promise<Array>} Places in the city
 */
export async function getPlacesByCity(city, country) {
  try {
    const places = await sql`
      SELECT * FROM places
      WHERE city = ${city} AND country = ${country}
      ORDER BY created_at DESC
    `
    return places
  } catch (error) {
    console.error('Database error in getPlacesByCity:', error)
    throw new Error(`Failed to get places: ${error.message}`)
  }
}

/**
 * Get place statistics
 * @returns {Promise<Object>} Place statistics
 */
export async function getPlaceStats() {
  try {
    const totalResult = await sql`
      SELECT COUNT(*) as count FROM places
    `

    const countryStats = await sql`
      SELECT country, COUNT(*) as count
      FROM places
      GROUP BY country
      ORDER BY count DESC
    `

    const categoryStats = await sql`
      SELECT category, COUNT(*) as count
      FROM places
      GROUP BY category
      ORDER BY count DESC
    `

    return {
      total: parseInt(totalResult[0].count),
      byCountry: countryStats.reduce((acc, row) => {
        acc[row.country] = parseInt(row.count)
        return acc
      }, {}),
      byCategory: categoryStats.reduce((acc, row) => {
        acc[row.category] = parseInt(row.count)
        return acc
      }, {}),
    }
  } catch (error) {
    console.error('Database error in getPlaceStats:', error)
    throw new Error(`Failed to get place stats: ${error.message}`)
  }
}


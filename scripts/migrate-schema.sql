-- Database Schema Migration for New Category System
-- Date: 2025-01-21
-- Purpose: Update categories to unified 4-category system (Gıda, Sağlık, Kişisel, Genel)

-- Step 1: Create backup tables
CREATE TABLE IF NOT EXISTS valid_categories_backup AS
SELECT * FROM valid_categories;

-- Step 2: Remove NOT NULL constraint from category column (links need NULL)
ALTER TABLE notes ALTER COLUMN category DROP NOT NULL;

-- Step 3: Add migration tracking column to notes table
ALTER TABLE notes ADD COLUMN IF NOT EXISTS old_category VARCHAR(50);

-- Step 4: Backup old categories before migration
UPDATE notes
SET old_category = category
WHERE old_category IS NULL;

-- Step 5: Clear current valid_categories table
DELETE FROM valid_categories;

-- Step 6: Insert new unified categories
INSERT INTO valid_categories (note_type, category_id, category_name, icon) VALUES
  -- QUOTES: 4 unified categories
  ('quote', 'gida', 'Gıda', '🍎'),
  ('quote', 'saglik', 'Sağlık', '🏥'),
  ('quote', 'kisisel', 'Kişisel', '💭'),
  ('quote', 'genel', 'Genel', '📝'),

  -- BOOKS: 4 unified categories
  ('book', 'gida', 'Gıda', '🍎'),
  ('book', 'saglik', 'Sağlık', '🏥'),
  ('book', 'kisisel', 'Kişisel', '💭'),
  ('book', 'genel', 'Genel', '📝'),

  -- VIDEOS: 4 unified categories
  ('video', 'gida', 'Gıda', '🍎'),
  ('video', 'saglik', 'Sağlık', '🏥'),
  ('video', 'kisisel', 'Kişisel', '💭'),
  ('video', 'genel', 'Genel', '📝');

-- Step 7: Set links category to NULL
UPDATE notes
SET category = NULL
WHERE note_type = 'link';

-- Verification queries
-- SELECT note_type, category_id, category_name FROM valid_categories ORDER BY note_type, category_id;
-- SELECT note_type, category, old_category, COUNT(*) FROM notes GROUP BY note_type, category, old_category;

-- Rollback instructions (if needed):
-- UPDATE notes SET category = old_category WHERE old_category IS NOT NULL;
-- DELETE FROM valid_categories;
-- INSERT INTO valid_categories SELECT * FROM valid_categories_backup;

-- Add description field to cache_items table
-- This field stores AI-generated short descriptions (3-4 lines) about the item

ALTER TABLE cache_items
ADD COLUMN IF NOT EXISTS description TEXT;

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_cache_description ON cache_items(description);

-- Add comment to document the field
COMMENT ON COLUMN cache_items.description IS 'AI-generated short description (3-4 lines) about the book/movie/product';

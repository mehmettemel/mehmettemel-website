-- Add author column to cache_items table
-- This allows storing author/creator information for cache items
-- Format: /k book name -author name
-- Example: /k zero to one -peter thiel

-- Add author column (nullable for backward compatibility)
ALTER TABLE cache_items
ADD COLUMN IF NOT EXISTS author VARCHAR(200);

-- Add index for author searches
CREATE INDEX IF NOT EXISTS idx_cache_author ON cache_items(author);

-- Comments for documentation
COMMENT ON COLUMN cache_items.author IS 'Author/creator of the item (e.g., book author, movie director, product brand). Extracted from text after "-" separator.';

-- Example usage:
-- /k Atomic Habits -James Clear
-- /f Inception -Christopher Nolan
-- /u iPhone 15 Pro -Apple

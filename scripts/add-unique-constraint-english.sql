-- Add UNIQUE constraint to english column to prevent duplicates
-- This allows ON CONFLICT to work in future inserts

ALTER TABLE english_words
ADD CONSTRAINT english_words_english_unique UNIQUE (english);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_english_words_english ON english_words(english);

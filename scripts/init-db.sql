-- Telegram Bot + Neon DB Integration
-- Database Initialization Script
-- Run this in Neon SQL Editor

-- Create notes table
CREATE TABLE IF NOT EXISTS notes (
  id BIGSERIAL PRIMARY KEY,

  -- Type and Category
  note_type VARCHAR(20) NOT NULL CHECK (note_type IN ('link', 'quote', 'video', 'book')),
  category VARCHAR(50) NOT NULL,

  -- Content
  title VARCHAR(500),              -- Only for links
  text TEXT NOT NULL,              -- Main content (description for links, quote/note for others)

  -- Metadata
  author VARCHAR(200),
  source VARCHAR(500),
  url TEXT,
  tags TEXT[],                     -- PostgreSQL array

  -- System Fields
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  is_migrated BOOLEAN DEFAULT FALSE,

  -- GitHub Sync
  github_path TEXT,
  github_commit_sha VARCHAR(40),

  -- Constraints
  CONSTRAINT check_link_has_title CHECK (note_type != 'link' OR title IS NOT NULL)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_notes_type ON notes(note_type);
CREATE INDEX IF NOT EXISTS idx_notes_category ON notes(category);
CREATE INDEX IF NOT EXISTS idx_notes_created_at ON notes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notes_type_category ON notes(note_type, category);
CREATE INDEX IF NOT EXISTS idx_notes_tags ON notes USING GIN(tags);

-- Create valid_categories reference table
CREATE TABLE IF NOT EXISTS valid_categories (
  id SERIAL PRIMARY KEY,
  note_type VARCHAR(20) NOT NULL,
  category_id VARCHAR(50) NOT NULL,
  category_name VARCHAR(100) NOT NULL,
  icon VARCHAR(10),
  UNIQUE(note_type, category_id)
);

-- Seed valid categories (from kesifler.js)
INSERT INTO valid_categories (note_type, category_id, category_name, icon) VALUES
  ('link', 'teknik', 'Teknik', '🚀'),
  ('link', 'icerik', 'İçerik', '📖'),
  ('link', 'diger', 'Diğer', '🌍'),

  ('quote', 'kisisel', 'Kişisel', '💭'),
  ('quote', 'saglik', 'Sağlık', '🏥'),
  ('quote', 'gida', 'Gıda', '🍎'),
  ('quote', 'seyahat', 'Seyahat', '✈️'),
  ('quote', 'genel', 'Genel', '📝'),

  ('video', 'youtube', 'YouTube', '▶️'),
  ('video', 'documentary', 'Belgesel', '🎬'),
  ('video', 'course', 'Kurs', '🎓'),
  ('video', 'podcast', 'Podcast', '🎙️'),

  ('book', 'science', 'Bilim', '🔬'),
  ('book', 'selfhelp', 'Kişisel Gelişim', '🌱'),
  ('book', 'biography', 'Biyografi', '👤'),
  ('book', 'fiction', 'Kurgu', '📖'),
  ('book', 'health', 'Sağlık', '🏥')
ON CONFLICT (note_type, category_id) DO NOTHING;

-- Optional: Create telegram_messages_log for debugging
CREATE TABLE IF NOT EXISTS telegram_messages_log (
  id BIGSERIAL PRIMARY KEY,
  telegram_message_id BIGINT NOT NULL,
  telegram_user_id BIGINT NOT NULL,
  telegram_username VARCHAR(100),
  message_text TEXT NOT NULL,
  detected_type VARCHAR(20),
  processing_status VARCHAR(20) DEFAULT 'pending',
  error_message TEXT,
  note_id BIGINT REFERENCES notes(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_telegram_log_status ON telegram_messages_log(processing_status);
CREATE INDEX IF NOT EXISTS idx_telegram_log_created ON telegram_messages_log(created_at DESC);

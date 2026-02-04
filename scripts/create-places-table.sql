-- ============================================
-- MEKANLAR (PLACES) TABLE
-- ============================================
-- Stores discovered places (restaurants, cafes, museums, etc.)
-- Added via Telegram bot with Gemini AI parsing
-- ============================================

CREATE TABLE IF NOT EXISTS places (
  id SERIAL PRIMARY KEY,

  -- Basic Information
  name VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL,  -- restoran, kafe, bar, muze, park, etc.

  -- Location Data
  address TEXT,
  city VARCHAR(100) NOT NULL,
  country VARCHAR(100) NOT NULL,

  -- Optional Metadata
  notes TEXT,                      -- Personal notes/impressions
  url TEXT,                        -- Website or Google Maps link

  -- System Fields
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance (critical for geographical queries)
CREATE INDEX IF NOT EXISTS idx_places_country ON places(country);
CREATE INDEX IF NOT EXISTS idx_places_city ON places(city);
CREATE INDEX IF NOT EXISTS idx_places_country_city ON places(country, city);
CREATE INDEX IF NOT EXISTS idx_places_category ON places(category);
CREATE INDEX IF NOT EXISTS idx_places_created_at ON places(created_at DESC);

-- Comments
COMMENT ON TABLE places IS 'Discovered places added via Telegram bot with Gemini AI';
COMMENT ON COLUMN places.category IS 'AI-determined: restoran, kafe, bar, muze, park, tarihi, doga, alisveris, konaklama, diger';

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Places table created successfully!';
  RAISE NOTICE '🎯 Ready to use with >mekan command in Telegram';
END $$;

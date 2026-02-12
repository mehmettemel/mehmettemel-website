-- Create english_words table for storing English vocabulary with Turkish translations
-- Added: 2026-02-12

CREATE TABLE IF NOT EXISTS english_words (
  id SERIAL PRIMARY KEY,

  -- Kelime bilgileri
  english VARCHAR(200) NOT NULL,           -- İngilizce kelime
  turkish VARCHAR(200) NOT NULL,           -- Türkçe karşılığı
  example TEXT NOT NULL,                   -- İngilizcede örnek cümle
  example_turkish TEXT,                    -- Örnek cümlenin Türkçe çevirisi (opsiyonel)

  -- Zaman damgaları
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- İndeksler
CREATE INDEX IF NOT EXISTS idx_english_words_english ON english_words(english);
CREATE INDEX IF NOT EXISTS idx_english_words_created_at ON english_words(created_at DESC);

-- Notlar:
-- - AI ile eklenecek kelimeler (Telegram bot .i komutu)
-- - example: İngilizce örnek cümle
-- - example_turkish: Opsiyonel Türkçe çeviri (AI üretebilir)

-- ============================================
-- TARIFLER (RECIPES) TABLOSU
-- ============================================
-- Telegram bot ile eklenen yemek tariflerini saklar
-- Gemini AI tarafından parse edilip formatlanır
--
-- Özellikler:
-- - Tam tarif bilgileri (malzemeler, yapılış, süreler)
-- - Kategori, zorluk, porsiyon bilgisi
-- - Tag sistemi
-- - Modal view ile detaylı görüntüleme
--
-- Kullanım:
-- psql $DATABASE_URL -f scripts/create-recipes-table.sql
-- ============================================

-- Recipes table
CREATE TABLE IF NOT EXISTS recipes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  ingredients TEXT NOT NULL,
  instructions TEXT NOT NULL,
  category VARCHAR(100),
  prep_time INTEGER,
  cook_time INTEGER,
  servings INTEGER,
  difficulty VARCHAR(50),
  tags TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_recipes_category ON recipes(category);
CREATE INDEX IF NOT EXISTS idx_recipes_name ON recipes(name);
CREATE INDEX IF NOT EXISTS idx_recipes_created_at ON recipes(created_at DESC);

-- Comments
COMMENT ON TABLE recipes IS 'Telegram bot ile eklenen tarifler (Gemini AI tarafından parse edilir)';
COMMENT ON COLUMN recipes.name IS 'Tarif adı (örn: Tavuk Sote)';
COMMENT ON COLUMN recipes.description IS 'Tarif açıklaması (2-3 cümle)';
COMMENT ON COLUMN recipes.ingredients IS 'Malzemeler listesi (her satırda bir malzeme)';
COMMENT ON COLUMN recipes.instructions IS 'Yapılış adımları (numaralandırılmış)';
COMMENT ON COLUMN recipes.category IS 'Ana yemek, Tatlı, Çorba, Salata, Aperatif, İçecek, Kahvaltı';
COMMENT ON COLUMN recipes.prep_time IS 'Hazırlık süresi (dakika)';
COMMENT ON COLUMN recipes.cook_time IS 'Pişirme süresi (dakika)';
COMMENT ON COLUMN recipes.servings IS 'Porsiyon sayısı';
COMMENT ON COLUMN recipes.difficulty IS 'Kolay, Orta, Zor';
COMMENT ON COLUMN recipes.tags IS 'Etiketler array (örn: ["pratik", "hızlı", "tavuk"])';

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Recipes table created successfully!';
  RAISE NOTICE '📊 Table: recipes';
  RAISE NOTICE '🔍 Indexes: idx_recipes_category, idx_recipes_name, idx_recipes_created_at';
  RAISE NOTICE '🎯 Ready to use with /tarif command in Telegram';
END $$;

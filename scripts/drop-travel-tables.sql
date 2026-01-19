-- ============================================================
-- DROP TRAVEL TABLES
-- ============================================================
-- This script removes all travel-related tables from the database
-- Run this script to completely clean up the travel feature
--
-- IMPORTANT: This action is IRREVERSIBLE. All travel data will be lost.
-- Make sure you have a backup if you need the data later.
--
-- Usage:
-- 1. Connect to your Neon database
-- 2. Run this entire script
-- ============================================================

-- Drop tables in reverse order of dependencies (child tables first)
-- CASCADE will automatically drop dependent objects (indexes, constraints, etc.)

-- 1. Drop travel_places table (has FK to travel_countries)
DROP TABLE IF EXISTS travel_places CASCADE;

-- 2. Drop travel_countries table (has FK to travel_continents)
DROP TABLE IF EXISTS travel_countries CASCADE;

-- 3. Drop travel_continents table (parent table)
DROP TABLE IF EXISTS travel_continents CASCADE;

-- Verification: Check if tables are dropped
-- Run this query to confirm all travel tables are gone:
-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name LIKE 'travel_%';
-- Should return 0 rows if successful

-- ============================================================
-- CLEANUP COMPLETE
-- ============================================================

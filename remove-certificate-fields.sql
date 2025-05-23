-- Remove date and URL fields from certificates table
-- Run this in your Supabase SQL editor

-- Drop the date_issued and credential_url columns
ALTER TABLE certificates 
DROP COLUMN IF EXISTS date_issued,
DROP COLUMN IF EXISTS credential_url;

-- Verify the table structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'certificates' 
ORDER BY ordinal_position; 
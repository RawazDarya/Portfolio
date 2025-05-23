-- Add is_featured column to projects table
-- This allows marking projects as featured for display in the portfolio

ALTER TABLE projects 
ADD COLUMN is_featured BOOLEAN DEFAULT FALSE NOT NULL;

-- Add a comment to the column
COMMENT ON COLUMN projects.is_featured IS 'Marks project as featured for homepage display';

-- Create an index for better query performance
CREATE INDEX idx_projects_featured ON projects(is_featured) WHERE is_featured = true;

-- Optionally, set the first 3 projects as featured (based on creation date)
-- You can modify this or run it separately as needed
UPDATE projects 
SET is_featured = true 
WHERE id IN (
  SELECT id 
  FROM projects 
  WHERE is_visible = true 
  ORDER BY created_at DESC 
  LIMIT 3
); 
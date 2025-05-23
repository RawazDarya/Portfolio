-- Add certificates to the certificates table (simplified structure)
-- Make sure to run this in your Supabase SQL editor
-- Compatible with Studio admin interface

INSERT INTO certificates (title, organization, image_url, is_visible) VALUES
(
  'Automate getting new leads into your pipeline',
  'Zapier',
  NULL,
  true
),
(
  'Introduction to UX/UI',
  'Re:Coded',
  NULL,
  true
),
(
  'Automate qualifying and nurturing leads',
  'Zapier',
  NULL,
  true
),
(
  'Increase productivity using AI',
  'Zapier',
  NULL,
  true
),
(
  'Business IT & English',
  'WorkWell',
  NULL,
  true
),
(
  'The Complete Full-Stack Web Development Bootcamp',
  'Udemy',
  NULL,
  true
),
(
  'Microsoft Power BI Desktop for Business Intelligence',
  'Udemy',
  NULL,
  true
);

-- Optional: Verify the insertion
SELECT title, organization, image_url, is_visible 
FROM certificates 
WHERE organization IN ('Zapier', 'Re:Coded', 'WorkWell', 'Udemy') 
ORDER BY created_at DESC; 
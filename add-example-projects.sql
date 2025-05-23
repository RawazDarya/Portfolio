-- Example Projects for Portfolio Testing
-- Run these INSERT statements in your Supabase SQL editor

INSERT INTO projects (
  title,
  description,
  image_url,
  tech_stack,
  live_link,
  demo_link,
  is_visible,
  created_at
) VALUES
(
  'E-Commerce Dashboard',
  'A comprehensive admin dashboard for managing online stores with real-time analytics, inventory management, and order tracking. Features include user authentication, data visualization, and responsive design.',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
  '["React", "TypeScript", "Laravel", "MySQL", "Tailwind CSS", "Chart.js"]'::jsonb,
  'https://ecommerce-dashboard-demo.vercel.app',
  'https://github.com/rawaz/ecommerce-dashboard',
  true,
  '2024-01-15T10:30:00Z'
),
(
  'Task Management App',
  'A collaborative project management tool with drag-and-drop functionality, team collaboration features, and real-time updates. Built with modern web technologies for optimal performance.',
  'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
  '["React", "Node.js", "MongoDB", "Socket.io", "Express", "Framer Motion"]'::jsonb,
  'https://taskflow-app.netlify.app',
  'https://github.com/rawaz/taskflow-app',
  true,
  '2023-12-08T14:20:00Z'
),
(
  'Real Estate Platform',
  'A full-featured real estate marketplace with property listings, advanced search filters, virtual tours, and mortgage calculator. Includes both client and agent portals.',
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
  '["Vue.js", "Laravel", "PostgreSQL", "AWS S3", "Stripe API", "Google Maps API"]'::jsonb,
  'https://realestate-pro.com',
  'https://github.com/rawaz/realestate-platform',
  true,
  '2023-11-22T09:15:00Z'
),
(
  'Social Media Analytics',
  'An analytics dashboard that aggregates data from multiple social media platforms, providing insights through interactive charts and automated reporting features.',
  'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800&h=600&fit=crop',
  '["React", "TypeScript", "Python", "FastAPI", "Redis", "D3.js"]'::jsonb,
  'https://social-analytics-hub.com',
  'https://github.com/rawaz/social-analytics',
  true,
  '2023-10-30T16:45:00Z'
),
(
  'Restaurant Ordering System',
  'A complete restaurant management system with online ordering, kitchen display system, and customer loyalty program. Features QR code menu and contactless payments.',
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
  '["React Native", "Laravel", "MySQL", "PayPal API", "Push Notifications"]'::jsonb,
  'https://restaurant-orders.app',
  'https://github.com/rawaz/restaurant-system',
  true,
  '2023-09-18T11:30:00Z'
),
(
  'Learning Management System',
  'An educational platform with course creation tools, student progress tracking, interactive quizzes, and video streaming. Supports multiple user roles and learning paths.',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
  '["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Mux Video", "Stripe"]'::jsonb,
  'https://edulearn-platform.com',
  'https://github.com/rawaz/learning-management',
  true,
  '2023-08-25T13:20:00Z'
); 
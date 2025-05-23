-- Create tech_stack_items table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.tech_stack_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    icon_url_or_svg TEXT,
    category TEXT,
    is_visible BOOLEAN DEFAULT true
);

-- Enable Row Level Security (safe to run multiple times)
ALTER TABLE public.tech_stack_items ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate them
DROP POLICY IF EXISTS "Public read access for visible tech stack items" ON public.tech_stack_items;
DROP POLICY IF EXISTS "Authenticated users can do everything" ON public.tech_stack_items;

-- Create RLS Policies
CREATE POLICY "Public read access for visible tech stack items" ON public.tech_stack_items
    FOR SELECT USING (is_visible = true);

CREATE POLICY "Authenticated users can do everything" ON public.tech_stack_items
    FOR ALL USING (auth.role() = 'authenticated');

-- Clear existing sample data and insert fresh data
DELETE FROM public.tech_stack_items WHERE name IN ('React', 'Node.js', 'TypeScript', 'JavaScript', 'HTML5');

-- Insert sample data with working icon URLs
INSERT INTO public.tech_stack_items (name, icon_url_or_svg, category, is_visible) VALUES 
    ('React', 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg', 'Frontend', true),
    ('Node.js', 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg', 'Backend', true),
    ('TypeScript', 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg', 'Language', true),
    ('JavaScript', 'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg', 'Language', true),
    ('HTML5', 'https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg', 'Frontend', true); 
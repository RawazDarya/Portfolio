import { createClient } from '@supabase/supabase-js';

// For Vite (which you are using based on vite.config.ts)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Supabase URL or Anon Key is not configured. Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your environment variables.\n' +
    'For local development: add them to your .env file.\n' +
    'For Vercel: add them in your project settings under Environment Variables.\n' +
    'You can find your Supabase Project URL in your Supabase project dashboard under Project Settings > API.'
  );
}

// Create the client with fallback values to prevent build errors
// In production, proper environment variables should be set
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder-key'
);

// Export a flag to check if Supabase is properly configured
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey); 
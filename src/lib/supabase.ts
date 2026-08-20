import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { authService } from "./auth";

let supabaseClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  const settings = authService.getSettings();
  if (!settings.useSupabase || !settings.supabaseUrl || !settings.supabaseAnonKey) {
    return null;
  }

  if (!supabaseClient) {
    supabaseClient = createClient(settings.supabaseUrl, settings.supabaseAnonKey);
  }
  return supabaseClient;
}

export const SUPABASE_SCHEMA_SQL = `
-- Create projects table in Supabase
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  tagline TEXT,
  short_description TEXT,
  description TEXT,
  problem TEXT,
  solution TEXT,
  highlights JSONB DEFAULT '[]'::jsonb,
  tags JSONB DEFAULT '[]'::jsonb,
  category TEXT DEFAULT 'Full Stack',
  github_url TEXT,
  live_url TEXT,
  image_url TEXT,
  screenshots JSONB DEFAULT '[]'::jsonb,
  status TEXT DEFAULT 'Published',
  featured BOOLEAN DEFAULT true,
  impact_metric TEXT,
  role TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published projects only
CREATE POLICY "Public can view published projects"
  ON public.projects FOR SELECT
  USING (status = 'Published');

-- Allow authenticated admins to do everything
CREATE POLICY "Admins full access"
  ON public.projects FOR ALL
  USING (auth.role() = 'authenticated');
`;

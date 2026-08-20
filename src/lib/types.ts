export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  tagline: string;
  shortDescription: string;
  description: string;
  problem: string;
  solution: string;
  highlights: string[];
  tags: string[];
  category: "Full Stack" | "AI & Data" | "Web App" | "Mobile";
  githubUrl: string;
  liveUrl?: string;
  imageUrl?: string;
  screenshots?: string[];
  status: "Published" | "Draft";
  featured: boolean;
  impactMetric?: string;
  role?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface AdminSettingsConfig {
  adminEmail: string;
  adminName: string;
  aiProvider: "built-in" | "gemini" | "openai";
  geminiApiKey?: string;
  openaiApiKey?: string;
  supabaseUrl?: string;
  supabaseAnonKey?: string;
  useSupabase: boolean;
}

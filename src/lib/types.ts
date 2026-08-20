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
  portfolioName?: string;
  portfolioTitle?: string;
  portfolioEmail?: string;
  availabilityStatus?: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

// ─── Task / Improvement System ────────────────────────────────────────────────

export type TaskPriority = "high" | "medium" | "low";
export type TaskStatus = "pending" | "in-progress" | "done" | "needs-attention";
export type TaskCategory =
  | "content"
  | "design"
  | "performance"
  | "seo"
  | "accessibility"
  | "security"
  | "projects"
  | "general";

export interface AdminTask {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  category: TaskCategory;
  createdAt: string;
  completedAt?: string;
  aiGenerated?: boolean;
}

// ─── Activity Log ─────────────────────────────────────────────────────────────

export type ActivityAction =
  | "project_created"
  | "project_updated"
  | "project_published"
  | "project_unpublished"
  | "project_deleted"
  | "project_featured"
  | "project_unfeatured"
  | "content_updated"
  | "settings_changed"
  | "ai_action"
  | "task_created"
  | "task_completed"
  | "message_read"
  | "admin_locked"
  | "admin_unlocked";

export interface ActivityLogEntry {
  id: string;
  action: ActivityAction;
  target: string;
  detail?: string;
  timestamp: string;
  status: "success" | "failed";
}

// ─── Portfolio Health ─────────────────────────────────────────────────────────

export type HealthStatus = "excellent" | "good" | "needs-attention" | "critical";

export interface HealthCategory {
  id: string;
  name: string;
  score: number; // 0-100
  status: HealthStatus;
  problems: string[];
  improvements: string[];
  weight: number; // contribution to overall score
}

export interface PortfolioHealth {
  overallScore: number;
  categories: HealthCategory[];
  lastUpdated: string;
  pendingCount: number;
}

// ─── Admin Chat ───────────────────────────────────────────────────────────────

export type ChatSender = "user" | "ai" | "system";

export interface ChatAction {
  type:
    | "preview"
    | "publish"
    | "save-draft"
    | "edit"
    | "delete"
    | "confirm"
    | "cancel"
    | "apply"
    | "undo";
  label: string;
  variant?: "primary" | "danger" | "secondary";
  payload?: Record<string, unknown>;
}

export interface ChatMessage {
  id: string;
  sender: ChatSender;
  text: string;
  timestamp: string;
  // Rich content widgets
  projectDraft?: Partial<ProjectItem>;
  projectList?: ProjectItem[];
  healthReport?: PortfolioHealth;
  taskList?: AdminTask[];
  activityList?: ActivityLogEntry[];
  actions?: ChatAction[];
  isLoading?: boolean;
  error?: string;
}

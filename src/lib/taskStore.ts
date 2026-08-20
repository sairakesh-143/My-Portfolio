import { AdminTask, TaskPriority, TaskStatus, TaskCategory } from "./types";

const STORE_KEY = "rakesh_portfolio_tasks_v1";

// Pre-seeded improvement tasks based on portfolio audit
const DEFAULT_TASKS: AdminTask[] = [
  {
    id: "task-screenshots",
    title: "Add project screenshots to all 3 projects",
    description: "WareMind AI, AI Finance, and HealthGuard AI need real screenshots or demo GIFs to increase recruiter engagement and visual credibility.",
    priority: "high",
    status: "pending",
    category: "projects",
    createdAt: new Date().toISOString(),
    aiGenerated: false,
  },
  {
    id: "task-og-image",
    title: "Add Open Graph og:image for social sharing",
    description: "When you share your portfolio link on LinkedIn, there's no preview card image. Add an og:image meta tag with a professional banner.",
    priority: "high",
    status: "pending",
    category: "seo",
    createdAt: new Date().toISOString(),
    aiGenerated: false,
  },
  {
    id: "task-case-study",
    title: "Improve project case studies with real impact metrics",
    description: "Project descriptions should include specific, verifiable results (load times, accuracy, scale) rather than generic descriptions.",
    priority: "high",
    status: "pending",
    category: "content",
    createdAt: new Date().toISOString(),
    aiGenerated: false,
  },
  {
    id: "task-resume",
    title: "Add downloadable resume/CV link",
    description: "The resume CTA button in Hero links to GitHub. Replace with an actual PDF resume hosted on Google Drive, Notion, or similar.",
    priority: "medium",
    status: "pending",
    category: "content",
    createdAt: new Date().toISOString(),
    aiGenerated: false,
  },
  {
    id: "task-github-stats",
    title: "Connect live GitHub contribution stats",
    description: "GitHub Showcase shows static numbers. Integrate GitHub's public API or github-readme-stats to show real contribution graphs.",
    priority: "medium",
    status: "pending",
    category: "general",
    createdAt: new Date().toISOString(),
    aiGenerated: false,
  },
  {
    id: "task-seo-sitemap",
    title: "Add sitemap.xml for SEO crawling",
    description: "Add a sitemap.xml to help search engines index your portfolio. Vite can generate this via vite-plugin-sitemap.",
    priority: "medium",
    status: "pending",
    category: "seo",
    createdAt: new Date().toISOString(),
    aiGenerated: false,
  },
  {
    id: "task-mobile-perf",
    title: "Optimize mobile performance and spacing",
    description: "Run Lighthouse on mobile. Check for layout shifts, large images, render-blocking fonts, and excessive animation on low-end devices.",
    priority: "low",
    status: "pending",
    category: "performance",
    createdAt: new Date().toISOString(),
    aiGenerated: false,
  },
];

function load(): AdminTask[] {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) {
      localStorage.setItem(STORE_KEY, JSON.stringify(DEFAULT_TASKS));
      return DEFAULT_TASKS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_TASKS;
  }
}

function save(tasks: AdminTask[]) {
  localStorage.setItem(STORE_KEY, JSON.stringify(tasks));
}

const subscribers = new Set<() => void>();

function notify() {
  subscribers.forEach((fn) => fn());
}

export const taskStore = {
  subscribe(fn: () => void) {
    subscribers.add(fn);
    return () => subscribers.delete(fn);
  },

  getTasks(): AdminTask[] {
    return load();
  },

  getPendingTasks(): AdminTask[] {
    return load()
      .filter((t) => t.status === "pending" || t.status === "in-progress" || t.status === "needs-attention")
      .sort((a, b) => {
        const prio: Record<TaskPriority, number> = { high: 0, medium: 1, low: 2 };
        return prio[a.priority] - prio[b.priority];
      });
  },

  getTopPriority(limit = 3): AdminTask[] {
    return this.getPendingTasks().slice(0, limit);
  },

  createTask(task: Omit<AdminTask, "id" | "createdAt">): AdminTask {
    const tasks = load();
    const newTask: AdminTask = {
      ...task,
      id: `task-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    tasks.unshift(newTask);
    save(tasks);
    notify();
    return newTask;
  },

  updateTaskStatus(id: string, status: TaskStatus): AdminTask | null {
    const tasks = load();
    const idx = tasks.findIndex((t) => t.id === id);
    if (idx === -1) return null;
    tasks[idx] = {
      ...tasks[idx],
      status,
      completedAt: status === "done" ? new Date().toISOString() : undefined,
    };
    save(tasks);
    notify();
    return tasks[idx];
  },

  completeTask(id: string): AdminTask | null {
    return this.updateTaskStatus(id, "done");
  },

  deleteTask(id: string): boolean {
    const tasks = load().filter((t) => t.id !== id);
    save(tasks);
    notify();
    return true;
  },

  getStats() {
    const all = load();
    return {
      total: all.length,
      pending: all.filter((t) => t.status === "pending").length,
      inProgress: all.filter((t) => t.status === "in-progress").length,
      done: all.filter((t) => t.status === "done").length,
      needsAttention: all.filter((t) => t.status === "needs-attention").length,
      high: all.filter((t) => t.priority === "high" && t.status !== "done").length,
    };
  },
};

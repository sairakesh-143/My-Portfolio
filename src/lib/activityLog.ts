import { ActivityLogEntry, ActivityAction } from "./types";

const STORE_KEY = "rakesh_portfolio_activity_log_v1";
const MAX_ENTRIES = 100;

function load(): ActivityLogEntry[] {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function save(entries: ActivityLogEntry[]) {
  // Keep only the latest MAX_ENTRIES
  const trimmed = entries.slice(0, MAX_ENTRIES);
  localStorage.setItem(STORE_KEY, JSON.stringify(trimmed));
}

const subscribers = new Set<() => void>();
function notify() {
  subscribers.forEach((fn) => fn());
}

export const activityLog = {
  subscribe(fn: () => void) {
    subscribers.add(fn);
    return () => subscribers.delete(fn);
  },

  log(action: ActivityAction, target: string, detail?: string, status: "success" | "failed" = "success"): ActivityLogEntry {
    const entries = load();
    const entry: ActivityLogEntry = {
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      action,
      target,
      detail,
      timestamp: new Date().toISOString(),
      status,
    };
    entries.unshift(entry);
    save(entries);
    notify();
    return entry;
  },

  getEntries(limit?: number): ActivityLogEntry[] {
    const entries = load();
    return limit ? entries.slice(0, limit) : entries;
  },

  getRecent(limit = 5): ActivityLogEntry[] {
    return this.getEntries(limit);
  },

  clear() {
    localStorage.removeItem(STORE_KEY);
    notify();
  },

  getActionLabel(action: ActivityAction): string {
    const labels: Record<ActivityAction, string> = {
      project_created: "Project Created",
      project_updated: "Project Updated",
      project_published: "Project Published",
      project_unpublished: "Project Unpublished",
      project_deleted: "Project Deleted",
      project_featured: "Project Featured",
      project_unfeatured: "Project Unfeatured",
      content_updated: "Content Updated",
      settings_changed: "Settings Changed",
      ai_action: "AI Action",
      task_created: "Task Created",
      task_completed: "Task Completed",
      message_read: "Message Read",
      admin_locked: "Admin Locked",
      admin_unlocked: "Admin Unlocked",
    };
    return labels[action] || action;
  },
};

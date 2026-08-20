import { ProjectItem } from "./types";

const STORAGE_KEY = "rakesh_portfolio_projects_v1";

export const initialProjects: ProjectItem[] = [
  {
    id: "waremind-ai",
    slug: "waremind-ai",
    title: "WareMind AI",
    subtitle: "Smart Warehouse Operations & Order Fulfillment System",
    tagline: "Intelligent Warehouse Operations & Multi-Zone Order Fulfillment",
    shortDescription:
      "An intelligent warehouse operations platform designed to automate inventory visibility, order prioritization, smart batching, fulfillment tracking, and operational decisions.",
    description:
      "WareMind AI transforms traditional fulfillment centers by replacing manual blind spots and stockout delays with an automated order prioritization engine, multi-zone inventory allocation, and predictive replenishment triggers.",
    problem:
      "Traditional fulfillment centers suffer from inventory blind spots, slow manual batching, and stockout delays that hurt SLA fulfillment times.",
    solution:
      "WareMind AI provides automated order prioritization, real-time multi-zone inventory allocation, predictive replenishment triggers, and live operator routing.",
    highlights: [
      "Real-time inventory visibility across multi-zone warehouse layouts",
      "Automated order prioritization & dynamic allocation engine",
      "Fulfillment bottleneck analytics & worker task routing",
      "Sub-100ms UI interactions with responsive data tables",
    ],
    tags: ["React", "TypeScript", "Node.js", "Tailwind CSS", "REST APIs", "Analytics"],
    category: "Full Stack",
    githubUrl: "https://github.com/sairakesh-143",
    liveUrl: "https://dbsr.netlify.app/",
    status: "Published",
    featured: true,
    impactMetric: "Real-Time Multi-Zone Allocation",
    role: "Full-Stack & Architecture Lead",
    createdAt: "2026-01-15T10:00:00.000Z",
    updatedAt: "2026-08-20T10:00:00.000Z",
  },
  {
    id: "ai-finance-dashboard",
    slug: "ai-finance-dashboard",
    title: "AI Finance",
    subtitle: "Intelligent Personal Finance & Budget Analytics Dashboard",
    tagline: "Personal Financial Intelligence, Spending Anomalies & Forecasting",
    shortDescription:
      "A full-featured personal financial analytics dashboard that visualizes cash flows, detects spending anomalies, and provides predictive budget recommendations.",
    description:
      "An end-to-end finance visualization platform that simplifies complex multi-channel financial data into actionable insights, automated subscription anomaly detection, and predictive month-end balance forecasts.",
    problem:
      "Individuals and small teams struggle to aggregate multi-channel expenses, spot sneaky recurring charges, and forecast month-end balance shortfalls.",
    solution:
      "Visualizes spending trends with automated anomaly detection, recurring charge classification, and interactive predictive budget forecasting charts.",
    highlights: [
      "Interactive cashflow charts and customizable category breakdowns",
      "AI-assisted spending anomaly and recurring expense tracking",
      "Configurable budget thresholds with visual warning alerts",
      "Instant client-side filtering and dark mode data visualizations",
    ],
    tags: ["React", "TypeScript", "Tailwind CSS", "Recharts", "Data Visualization"],
    category: "AI & Data",
    githubUrl: "https://github.com/sairakesh-143",
    liveUrl: "https://brsml.netlify.app/",
    status: "Published",
    featured: true,
    impactMetric: "Predictive Cash Flow Insights",
    role: "Frontend Engineer & Data Visualizer",
    createdAt: "2026-02-10T10:00:00.000Z",
    updatedAt: "2026-08-20T10:00:00.000Z",
  },
  {
    id: "healthguard-ai",
    slug: "healthguard-ai",
    title: "HealthGuard AI",
    subtitle: "AI-Powered Medical Fraud & Clinical Inconsistencies Detection",
    tagline: "Automated Clinical Record Verification & Claims Discrepancy Audits",
    shortDescription:
      "A security-focused AI healthcare platform analyzing clinical records, diagnostic histories, and claims data to identify potential billing fraud and medical discrepancies.",
    description:
      "HealthGuard AI leverages rule-based medical pattern verification and anomaly scoring to inspect patient diagnostic timelines, preventing fraudulent insurance submissions and clinical record discrepancies.",
    problem:
      "Manual healthcare record and insurance audit processes are slow, error-prone, and allow billing discrepancies and inconsistencies to slip through.",
    solution:
      "Leverages rule-based validation and pattern recognition algorithms to flag diagnostic and billing inconsistencies in real time.",
    highlights: [
      "Automated medical claim consistency checks and anomaly scoring",
      "Patient record visualization and diagnostic timeline explorer",
      "Security-first audit trails, compliance exports, and report generation",
      "Clean REST API integration with robust schema validation",
    ],
    tags: ["React", "TypeScript", "Python", "Node.js", "Healthcare AI", "REST API"],
    category: "Full Stack",
    githubUrl: "https://github.com/sairakesh-143/portfolio",
    liveUrl: "https://lnkd.in/eFbEk2UD",
    status: "Published",
    featured: true,
    impactMetric: "Automated Clinical Audit Engine",
    role: "AI & Full-Stack Developer",
    createdAt: "2025-11-20T10:00:00.000Z",
    updatedAt: "2026-08-20T10:00:00.000Z",
  },
];

// In-memory event listeners for reactivity
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

export const projectStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  getProjects(): ProjectItem[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        // Initialize default seed
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProjects));
        return initialProjects;
      }
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProjects));
        return initialProjects;
      }
      return parsed;
    } catch {
      return initialProjects;
    }
  },

  getPublishedProjects(): ProjectItem[] {
    return this.getProjects().filter((p) => p.status === "Published");
  },

  getFeaturedProjects(): ProjectItem[] {
    return this.getProjects().filter((p) => p.status === "Published" && p.featured);
  },

  getProjectById(id: string): ProjectItem | undefined {
    return this.getProjects().find((p) => p.id === id);
  },

  findBySlugOrTitle(nameOrSlug: string): ProjectItem | undefined {
    const lower = nameOrSlug.toLowerCase();
    return this.getProjects().find(
      (p) => p.slug.toLowerCase() === lower || p.title.toLowerCase() === lower
    );
  },

  saveProject(project: Omit<ProjectItem, "id" | "createdAt" | "updatedAt"> & { id?: string }): ProjectItem {
    const projects = this.getProjects();
    const now = new Date().toISOString();

    if (project.id) {
      // Update existing
      const index = projects.findIndex((p) => p.id === project.id);
      if (index !== -1) {
        const updated: ProjectItem = {
          ...projects[index],
          ...project,
          id: project.id,
          updatedAt: now,
        };
        projects[index] = updated;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
        notify();
        return updated;
      }
    }

    // Create new — ensure unique ID
    let baseId = project.slug || project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `proj-${Date.now()}`;
    let newId = baseId;
    // If an entry with this ID already exists, append a timestamp to make it unique
    if (projects.some((p) => p.id === newId)) {
      newId = `${baseId}-${Date.now()}`;
    }
    const newProject: ProjectItem = {
      ...project,
      id: newId,
      slug: newId,
      createdAt: now,
      updatedAt: now,
    };
    projects.unshift(newProject);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    notify();
    return newProject;
  },

  deleteProject(id: string): boolean {
    const projects = this.getProjects();
    const filtered = projects.filter((p) => p.id !== id);
    if (filtered.length !== projects.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      notify();
      return true;
    }
    return false;
  },

  togglePublishStatus(id: string): ProjectItem | undefined {
    const projects = this.getProjects();
    const index = projects.findIndex((p) => p.id === id);
    if (index !== -1) {
      projects[index].status = projects[index].status === "Published" ? "Draft" : "Published";
      projects[index].updatedAt = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
      notify();
      return projects[index];
    }
    return undefined;
  },

  toggleFeaturedStatus(id: string): ProjectItem | undefined {
    const projects = this.getProjects();
    const index = projects.findIndex((p) => p.id === id);
    if (index !== -1) {
      projects[index].featured = !projects[index].featured;
      projects[index].updatedAt = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
      notify();
      return projects[index];
    }
    return undefined;
  },

  resetToDefaultSeed() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProjects));
    notify();
    return initialProjects;
  },

  importProjects(imported: ProjectItem[]) {
    if (Array.isArray(imported)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(imported));
      notify();
    }
  },
};

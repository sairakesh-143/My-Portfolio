import { ProjectItem } from "./types";

const STORAGE_KEY = "rakesh_portfolio_projects_v1";

export const initialProjects: ProjectItem[] = [
  {
    id: "hacklens",
    slug: "hacklens",
    title: "HackLens",
    subtitle: "AI-Powered Hackathon Project Assistant",
    tagline: "Generate ideas, structure architectures, and recommend tech stacks with AI",
    shortDescription:
      "An AI assistant that helps hackathon participants generate ideas, plan architecture, get live tech stack recommendations, and build projects faster.",
    description:
      "HackLens uses LLMs and RAG pipelines to generate tailored project plans, recommend scalable tech stacks, and create complete implementation roadmaps in seconds.",
    problem:
      "Hackathon participants struggle to come up with unique ideas, structured architectures, and optimal tech stacks under strict time constraints.",
    solution:
      "HackLens uses LLMs and RAG pipelines to generate tailored project plans, recommend scalable tech stacks, and create complete implementation roadmaps in seconds.",
    highlights: [
      "AI-driven concept generation & novelty evaluation",
      "Automated tech stack recommendations based on constraints",
      "Interactive RAG chat assistant for debugging & architecture",
      "Instant markdown export of full implementation blueprint",
    ],
    tags: ["React.js", "Python", "Supabase", "PostgreSQL", "Gemini", "Groq", "RAG"],
    category: "AI & Data",
    githubUrl: "https://github.com/sairakesh-143",
    liveUrl: "https://dbsr.netlify.app/",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
    status: "Published",
    featured: true,
    impactMetric: "Instant AI Architecture Blueprint",
    role: "Full-Stack & AI Engineer",
    createdAt: "2026-02-15T10:00:00.000Z",
    updatedAt: "2026-08-20T10:00:00.000Z",
  },
  {
    id: "smart-waste-sorting",
    slug: "smart-waste-sorting",
    title: "Smart Waste Sorting Assistant",
    subtitle: "Computer Vision + AI Recycling Guidance",
    tagline: "Detects waste type from images and suggests proper disposal",
    shortDescription:
      "Detects waste type from images and camera feeds, suggesting proper disposal methods and recycling classification in real-time.",
    description:
      "Uses computer vision classification models to instantly identify recyclable, organic, and hazardous waste categories with step-by-step disposal advice.",
    problem:
      "Improper waste disposal leads to recycling contamination and environmental degradation due to lack of immediate sorting guidance.",
    solution:
      "Uses computer vision classification models to instantly identify recyclable, organic, and hazardous waste categories with step-by-step disposal advice.",
    highlights: [
      "Real-time object detection and multi-class waste tagging",
      "Recycling feasibility index and municipal guidelines match",
      "Fast image upload & mobile camera integration",
      "Sub-150ms inference time with lightweight model deployment",
    ],
    tags: ["Python", "OpenCV", "PyTorch", "FastAPI", "React", "AI / CV"],
    category: "AI & Data",
    githubUrl: "https://github.com/sairakesh-143",
    liveUrl: "https://brsml.netlify.app/",
    imageUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&q=80",
    status: "Published",
    featured: true,
    impactMetric: "Sub-150ms Real-Time Inference",
    role: "AI & CV Developer",
    createdAt: "2026-03-01T10:00:00.000Z",
    updatedAt: "2026-08-20T10:00:00.000Z",
  },
  {
    id: "portfolio-admin-dashboard",
    slug: "portfolio-admin-dashboard",
    title: "Portfolio Admin Dashboard",
    subtitle: "Full-Featured CMS for Portfolio Management",
    tagline: "Complete administration panel to manage projects, messages, and content",
    shortDescription:
      "A complete admin panel to manage projects, messages, and site content with real-time statistics and AI assistance.",
    description:
      "Built a secure, modular CMS with CRUD project management, local/cloud storage sync, and automated AI assistance.",
    problem:
      "Developers frequently have to manually edit code files just to add a new project, modify tags, or update contact links.",
    solution:
      "Built a secure, modular CMS with CRUD project management, local/cloud storage sync, and automated AI assistance.",
    highlights: [
      "Live CRUD for projects with instant client-side reactivity",
      "Contact message inbox with unread badges & replies",
      "AI workspace for drafting summaries and tech stack descriptions",
      "LocalStorage persistence with optional Supabase cloud sync",
    ],
    tags: ["React", "TypeScript", "Tailwind CSS", "Supabase", "Radix UI"],
    category: "Full Stack",
    githubUrl: "https://github.com/sairakesh-143/My-Portfolio",
    liveUrl: "/admin",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    status: "Published",
    featured: true,
    impactMetric: "100% Client-Side Reactivity + Cloud Sync",
    role: "Full-Stack Architect",
    createdAt: "2026-01-10T10:00:00.000Z",
    updatedAt: "2026-08-20T10:00:00.000Z",
  },
  {
    id: "task-manager-app",
    slug: "task-manager-app",
    title: "Task Manager App",
    subtitle: "Modern Productivity & Sprint Organizer",
    tagline: "Organize tasks, track sprint progress, and boost productivity",
    shortDescription:
      "A modern task manager to organize tasks, track progress, and boost productivity with clean boards.",
    description:
      "Designed a sleek, lightweight task organizer with priority filters, status columns, and instant persistence.",
    problem:
      "Complex task management tools are cluttered and slow down agile solo developers and small student teams.",
    solution:
      "Designed a sleek, lightweight task organizer with priority filters, status columns, and instant persistence.",
    highlights: [
      "Drag & drop task board with real-time status transitions",
      "Category tagging and urgent priority alerts",
      "Progress analytics and completed task archive",
      "Lightweight bundle size with instant loading",
    ],
    tags: ["React", "Tailwind CSS", "Firebase", "TypeScript"],
    category: "Web App",
    githubUrl: "https://github.com/sairakesh-143",
    liveUrl: "https://dbsr.netlify.app/",
    imageUrl: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
    status: "Published",
    featured: false,
    impactMetric: "Agile Task Tracking Engine",
    role: "Frontend Developer",
    createdAt: "2026-02-01T10:00:00.000Z",
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
    const baseId = project.slug || project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `proj-${Date.now()}`;
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

  publishProject(id: string): ProjectItem | undefined {
    const projects = this.getProjects();
    const index = projects.findIndex((p) => p.id === id);
    if (index !== -1) {
      projects[index].status = "Published";
      projects[index].updatedAt = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
      notify();
      return projects[index];
    }
    return undefined;
  },

  unpublishProject(id: string): ProjectItem | undefined {
    const projects = this.getProjects();
    const index = projects.findIndex((p) => p.id === id);
    if (index !== -1) {
      projects[index].status = "Draft";
      projects[index].updatedAt = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
      notify();
      return projects[index];
    }
    return undefined;
  },

  deduplicateProjects(): ProjectItem[] {
    const projects = this.getProjects();
    const seen = new Set<string>();
    const deduped = projects.filter((p) => {
      if (seen.has(p.id)) return false;
      seen.add(p.id);
      return true;
    });
    if (deduped.length !== projects.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(deduped));
      notify();
    }
    return deduped;
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

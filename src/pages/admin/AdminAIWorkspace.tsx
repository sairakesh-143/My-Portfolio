import { useState, useEffect, useRef, useCallback } from "react";
import {
  Sparkles,
  Send,
  Lock,
  FolderGit2,
  Globe,
  Clock,
  Star,
  CheckCircle2,
  ExternalLink,
  Github,
  Trash2,
  Edit3,
  Eye,
  Plus,
  RefreshCw,
  MessageSquare,
  Settings,
  Layers,
  Check,
  AlertCircle,
  Lightbulb,
  TrendingUp,
  ChevronRight,
  Maximize2,
  X,
  FileCode2,
  Search,
  Filter,
  BookOpen,
  Loader2,
  Archive,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authService } from "@/lib/auth";
import { projectStore } from "@/lib/projectStore";
import { generateProject, type RawProjectInput } from "@/lib/aiProjectGenerator";
import { activityLog } from "@/lib/activityLog";
import { taskStore } from "@/lib/taskStore";
import { ProjectItem } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ChatMessage {
  id: string;
  sender: "user" | "ai" | "system";
  text: string;
  projectDraft?: Partial<ProjectItem>;
  projectList?: ProjectItem[];
  actions?: ChatAction[];
  timestamp: string;
  isLoading?: boolean;
  error?: string;
}

interface ChatAction {
  type: string;
  label: string;
  variant?: "primary" | "danger" | "secondary";
  payload?: Record<string, unknown>;
}

// step-by-step project creation wizard state
interface ProjectWizardState {
  active: boolean;
  step: "name" | "description" | "technologies" | "problem" | "features" | "github" | "liveUrl" | "category" | "review";
  data: Partial<RawProjectInput>;
  existingId?: string; // if editing existing project
}

type SidebarFilter = "all" | "published" | "draft" | "featured";

const INITIAL_WIZARD: ProjectWizardState = {
  active: false,
  step: "name",
  data: {},
};

const quickPrompts = [
  "Show my projects",
  "Show draft projects",
  "What should I improve next?",
  "Rate my portfolio",
  "Show contact messages",
];

function ts() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function makeId() {
  return `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const AdminAIWorkspace = () => {
  const navigate = useNavigate();

  // Projects state from store (single source of truth)
  const [projects, setProjects] = useState<ProjectItem[]>(projectStore.getProjects());
  const [selectedPreview, setSelectedPreview] = useState<Partial<ProjectItem> | null>(null);
  const [showPreviewPanel, setShowPreviewPanel] = useState(true);
  const [sidebarFilter, setSidebarFilter] = useState<SidebarFilter>("all");
  const [sidebarSearch, setSidebarSearch] = useState("");

  // Wizard state for step-by-step project creation
  const [wizard, setWizard] = useState<ProjectWizardState>(INITIAL_WIZARD);

  // Confirmation dialog state
  const [confirmAction, setConfirmAction] = useState<{
    type: "unpublish" | "delete";
    project: ProjectItem;
  } | null>(null);

  // Track which project ID the preview currently maps to (to avoid duplicates)
  const [previewProjectId, setPreviewProjectId] = useState<string | null>(null);
  // Track unsaved edits in preview
  const [previewDirty, setPreviewDirty] = useState(false);

  // Action loading state
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Chat
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-welcome",
      sender: "ai",
      text: "Hi Rakesh 👋 Welcome to your private Portfolio AI workspace!\n\nI can help you:\n• Create, edit, publish & unpublish projects\n• Answer questions about your portfolio\n• Show project stats, drafts, and recommendations\n• Manage your portfolio improvements\n\nTell me what you'd like to do, or click \"+ New Project\" to start creating.",
      timestamp: ts(),
    },
  ]);

  const [inputVal, setInputVal] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Subscribe to project store updates (single source of truth)
  useEffect(() => {
    // Clean up any duplicate projects from prior bugs on first load
    projectStore.deduplicateProjects();
    const reload = () => setProjects(projectStore.getProjects());
    reload();
    return projectStore.subscribe(reload);
  }, []);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isProcessing]);

  // ─── Helper: add AI message ──────────────────────────────────────────────
  const addAIMsg = useCallback(
    (text: string, extras?: Partial<ChatMessage>) => {
      setMessages((prev) => [
        ...prev,
        { id: makeId(), sender: "ai", text, timestamp: ts(), ...extras },
      ]);
    },
    []
  );

  // ─── Project Actions (real store operations) ────────────────────────────

  const doCreateProject = useCallback(
    (draft: Partial<ProjectItem>, status: "Published" | "Draft" = "Draft"): ProjectItem | null => {
      if (!draft.title) return null;
      const slug = draft.slug || draft.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

      // Check for duplicate by slug
      const existing = projectStore.getProjects().find(
        (p) => p.slug === slug || p.title.toLowerCase() === draft.title!.toLowerCase()
      );

      if (existing && !draft.id) {
        // Duplicate detected — we'll handle this in the caller
        return null;
      }

      const saved = projectStore.saveProject({
        id: existing?.id || draft.id || undefined,
        title: draft.title,
        slug,
        subtitle: draft.subtitle || `${draft.title} Platform`,
        tagline: draft.tagline || "",
        shortDescription: draft.shortDescription || draft.description || "",
        description: draft.description || "",
        problem: draft.problem || "",
        solution: draft.solution || "",
        highlights: draft.highlights || [],
        tags: draft.tags || ["React", "TypeScript"],
        category: draft.category || "Full Stack",
        githubUrl: draft.githubUrl || "https://github.com/sairakesh-143",
        liveUrl: draft.liveUrl,
        status,
        featured: draft.featured ?? false,
        impactMetric: draft.impactMetric,
        role: draft.role || "Full-Stack Developer",
      } as Omit<ProjectItem, "id" | "createdAt" | "updatedAt"> & { id?: string });

      activityLog.log(
        existing ? "project_updated" : "project_created",
        saved.title,
        `Status: ${status}`
      );
      return saved;
    },
    []
  );

  const doPublish = useCallback((id: string): ProjectItem | undefined => {
    const updated = projectStore.publishProject(id);
    if (updated) activityLog.log("project_published", updated.title);
    return updated;
  }, []);

  const doUnpublish = useCallback((id: string): ProjectItem | undefined => {
    const updated = projectStore.unpublishProject(id);
    if (updated) activityLog.log("project_unpublished", updated.title);
    return updated;
  }, []);

  const doDelete = useCallback((id: string): boolean => {
    const p = projectStore.getProjectById(id);
    const ok = projectStore.deleteProject(id);
    if (ok && p) activityLog.log("project_deleted", p.title);
    return ok;
  }, []);

  const doSetFeatured = useCallback((id: string, featured: boolean): ProjectItem | undefined => {
    const p = projectStore.getProjectById(id);
    if (!p) return undefined;
    const updated = projectStore.saveProject({ ...p, featured });
    activityLog.log(featured ? "project_featured" : "project_unfeatured", updated.title);
    return updated;
  }, []);

  // ─── Handle Lock / Logout ───────────────────────────────────────────────
  const handleLock = () => {
    authService.lock();
    activityLog.log("admin_locked", "Admin workspace");
    toast.info("Admin workspace locked.");
    navigate("/admin");
    window.location.reload();
  };

  // ─── Wizard Step Handler ────────────────────────────────────────────────
  const handleWizardInput = useCallback(
    async (input: string) => {
      const w = wizard;
      if (!w.active) return false;

      const userInput = input.trim();
      if (!userInput) return false;

      const nextWizard = { ...w, data: { ...w.data } };

      switch (w.step) {
        case "name": {
          nextWizard.data.name = userInput;
          // Check for existing project with same name
          const existingByName = projectStore.getProjects().find(
            (p) => p.title.toLowerCase() === userInput.toLowerCase()
          );
          if (existingByName) {
            addAIMsg(
              `⚠️ A project named "${existingByName.title}" already exists (${existingByName.status}).\n\nWould you like to edit the existing project, or create a new one with a different name?`,
              {
                actions: [
                  { type: "edit-existing", label: "✏️ Edit Existing", variant: "primary", payload: { id: existingByName.id } },
                  { type: "create-another", label: "➕ Create New", variant: "secondary" },
                  { type: "cancel-wizard", label: "Cancel", variant: "secondary" },
                ],
              }
            );
            // Stay on same step, waiting for action click
            setWizard(nextWizard);
            return true;
          }
          nextWizard.step = "description";
          addAIMsg(`Great! Project name: **${userInput}**\n\nWhat does "${userInput}" do? Give me a brief description of the project.`);
          setWizard(nextWizard);
          return true;
        }

        case "description":
          nextWizard.data.rawText = userInput;
          nextWizard.step = "technologies";
          addAIMsg("Got it! What technologies did you use? (e.g., React, TypeScript, Node.js, Supabase)");
          setWizard(nextWizard);
          return true;

        case "technologies":
          nextWizard.data.technologies = userInput;
          nextWizard.step = "problem";
          addAIMsg("What problem does this project solve? (What pain point motivated building it?)");
          setWizard(nextWizard);
          return true;

        case "problem":
          nextWizard.data.problem = userInput;
          nextWizard.step = "features";
          addAIMsg("List the key features (one per line or comma-separated):");
          setWizard(nextWizard);
          return true;

        case "features":
          nextWizard.data.features = userInput;
          nextWizard.step = "github";
          addAIMsg("GitHub URL? (or type 'skip' to use your default GitHub profile)");
          setWizard(nextWizard);
          return true;

        case "github":
          if (userInput.toLowerCase() !== "skip") {
            nextWizard.data.githubUrl = userInput;
          }
          nextWizard.step = "liveUrl";
          addAIMsg("Live demo URL? (or type 'skip' if not deployed yet)");
          setWizard(nextWizard);
          return true;

        case "liveUrl":
          if (userInput.toLowerCase() !== "skip") {
            nextWizard.data.liveUrl = userInput;
          }
          nextWizard.step = "review";

          // Generate the structured project
          addAIMsg("⏳ Generating your structured project draft...", { isLoading: true });
          setWizard(nextWizard);

          try {
            const generated = await generateProject(nextWizard.data as RawProjectInput);
            // Apply user-provided URLs
            if (nextWizard.data.githubUrl) generated.githubUrl = nextWizard.data.githubUrl;
            if (nextWizard.data.liveUrl) generated.liveUrl = nextWizard.data.liveUrl;
            generated.status = "Draft";
            generated.featured = false;

            // If editing existing
            if (nextWizard.existingId) {
              generated.id = nextWizard.existingId;
            }

            setSelectedPreview(generated);
            setPreviewProjectId(nextWizard.existingId || null);
            setPreviewDirty(true);
            setShowPreviewPanel(true);

            // Remove the loading message and add the real one
            setMessages((prev) => prev.filter((m) => !m.isLoading));
            addAIMsg(
              `✅ Project draft generated: **${generated.title}**\n\nCheck the preview panel on the right. You can:\n• **Save as Draft** — keeps it private\n• **Publish** — makes it live on your public portfolio`,
              {
                projectDraft: generated,
                actions: [
                  { type: "save-draft", label: "💾 Save as Draft", variant: "secondary" },
                  { type: "publish-draft", label: "🚀 Publish to Portfolio", variant: "primary" },
                ],
              }
            );

            // End wizard
            setWizard(INITIAL_WIZARD);
          } catch (err) {
            setMessages((prev) => prev.filter((m) => !m.isLoading));
            addAIMsg("❌ Failed to generate project draft. Please try again or provide more details.", { error: "generation_failed" });
            setWizard(INITIAL_WIZARD);
          }
          return true;

        default:
          return false;
      }
    },
    [wizard, addAIMsg]
  );

  // ─── Start Wizard ───────────────────────────────────────────────────────
  const startNewProjectWizard = useCallback(() => {
    setWizard({ active: true, step: "name", data: {} });
    addAIMsg("Let's create your new project! 🚀\n\nWhat's the project name?");
  }, [addAIMsg]);

  // ─── Find project by name in user text ──────────────────────────────────
  const findProjectByName = useCallback(
    (text: string): ProjectItem | undefined => {
      const lower = text.toLowerCase();
      // Try exact title match first
      let found = projects.find((p) => lower.includes(p.title.toLowerCase()));
      // Try slug match
      if (!found) found = projects.find((p) => lower.includes(p.slug.toLowerCase()));
      return found;
    },
    [projects]
  );

  // ─── Chat Message Processor ─────────────────────────────────────────────
  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputVal).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: makeId(),
      sender: "user",
      text: query,
      timestamp: ts(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputVal("");

    // If wizard is active, feed input to wizard
    if (wizard.active) {
      const handled = await handleWizardInput(query);
      if (handled) return;
    }

    setIsProcessing(true);
    const lower = query.toLowerCase();

    // Process with a slight delay for UX
    setTimeout(async () => {
      try {
        // ───────────────── COMMAND ROUTING ──────────────────

        // 1. Show all projects
        if (
          lower.includes("show my projects") ||
          lower.includes("list projects") ||
          lower === "show projects" ||
          lower === "my projects" ||
          lower.includes("what projects do i have")
        ) {
          const all = projectStore.getProjects();
          const pub = all.filter((p) => p.status === "Published").length;
          const draft = all.filter((p) => p.status === "Draft").length;
          addAIMsg(
            `You have **${all.length}** projects total:\n• **${pub}** Published (live on your portfolio)\n• **${draft}** Drafts (private)\n\nClick any project to preview it:`,
            { projectList: all }
          );
          setIsProcessing(false);
          return;
        }

        // 2. Show published projects
        if (
          (lower.includes("published") || lower.includes("live")) &&
          (lower.includes("show") || lower.includes("list"))
        ) {
          const pub = projectStore.getPublishedProjects();
          addAIMsg(
            pub.length > 0
              ? `Found **${pub.length}** published project(s) currently live on your portfolio:`
              : "You have no published projects. All projects are in draft mode.",
            { projectList: pub }
          );
          setIsProcessing(false);
          return;
        }

        // 3. Show draft projects
        if (
          lower.includes("draft") &&
          (lower.includes("show") || lower.includes("list"))
        ) {
          const drafts = projectStore.getProjects().filter((p) => p.status === "Draft");
          addAIMsg(
            drafts.length > 0
              ? `Found **${drafts.length}** draft project(s):`
              : "No draft projects. All your projects are published! 🎉",
            { projectList: drafts }
          );
          setIsProcessing(false);
          return;
        }

        // 4. Show featured projects
        if (
          lower.includes("featured") &&
          (lower.includes("show") || lower.includes("list") || lower.includes("which"))
        ) {
          const featured = projectStore.getFeaturedProjects();
          addAIMsg(
            featured.length > 0
              ? `**${featured.length}** featured project(s):`
              : "No projects are currently featured.",
            { projectList: featured }
          );
          setIsProcessing(false);
          return;
        }

        // 5. Publish command: "publish [name]"
        if (lower.startsWith("publish ")) {
          const found = findProjectByName(lower.replace("publish ", ""));
          if (found) {
            if (found.status === "Published") {
              addAIMsg(`"${found.title}" is already published and live on your portfolio.`);
            } else {
              const updated = doPublish(found.id);
              if (updated) {
                setSelectedPreview(updated);
                setPreviewProjectId(updated.id);
                setPreviewDirty(false);
                setShowPreviewPanel(true);
                addAIMsg(`✅ **"${updated.title}"** is now **Published** and live on your public portfolio!\n\nVisitors can see it immediately.`);
                toast.success(`Published "${updated.title}"`);
              } else {
                addAIMsg(`❌ Failed to publish "${found.title}". Please try again.`);
              }
            }
          } else {
            addAIMsg(`I couldn't find a project matching that name. Your projects are:\n${projects.map((p) => `• ${p.title} (${p.status})`).join("\n")}`);
          }
          setIsProcessing(false);
          return;
        }

        // 6. Unpublish command: "unpublish [name]"
        if (lower.startsWith("unpublish ")) {
          const found = findProjectByName(lower.replace("unpublish ", ""));
          if (found) {
            if (found.status === "Draft") {
              addAIMsg(`"${found.title}" is already a draft.`);
            } else {
              const updated = doUnpublish(found.id);
              if (updated) {
                setSelectedPreview(updated);
                setPreviewProjectId(updated.id);
                setPreviewDirty(false);
                setShowPreviewPanel(true);
                addAIMsg(`📁 **"${updated.title}"** has been unpublished and moved back to **Draft**.\n\nIt is no longer visible on your public portfolio.`);
                toast.info(`Unpublished "${updated.title}"`);
              } else {
                addAIMsg(`❌ Failed to unpublish "${found.title}". Please try again.`);
              }
            }
          } else {
            addAIMsg(`I couldn't find that project. Here are your projects:\n${projects.map((p) => `• ${p.title} (${p.status})`).join("\n")}`);
          }
          setIsProcessing(false);
          return;
        }

        // 7. Delete command: "delete [name]"
        if (lower.startsWith("delete ") || lower.includes("remove project")) {
          const searchText = lower.replace("delete ", "").replace("remove project", "").trim();
          const found = findProjectByName(searchText);
          if (found) {
            addAIMsg(
              `⚠️ Are you sure you want to **permanently delete** "${found.title}"?\n\nThis action cannot be undone.`,
              {
                actions: [
                  { type: "confirm-delete", label: "🗑️ Delete Permanently", variant: "danger", payload: { id: found.id } },
                  { type: "cancel-action", label: "Cancel", variant: "secondary" },
                ],
              }
            );
          } else {
            addAIMsg(`I couldn't find a project matching that name.`);
          }
          setIsProcessing(false);
          return;
        }

        // 8. Make featured: "make [name] featured" / "feature [name]"
        if (lower.includes("featured") && (lower.includes("make") || lower.startsWith("feature "))) {
          const found = findProjectByName(lower);
          if (found) {
            const updated = doSetFeatured(found.id, true);
            if (updated) {
              addAIMsg(`⭐ **"${updated.title}"** is now **Featured** on your portfolio.`);
              toast.success(`Featured "${updated.title}"`);
            }
          } else {
            addAIMsg("I couldn't find that project. Which project would you like to feature?");
          }
          setIsProcessing(false);
          return;
        }

        // 9. Remove featured: "unfeature [name]" / "remove featured [name]"
        if (lower.includes("unfeature") || (lower.includes("remove") && lower.includes("featured"))) {
          const found = findProjectByName(lower);
          if (found) {
            const updated = doSetFeatured(found.id, false);
            if (updated) {
              addAIMsg(`"${updated.title}" is no longer featured.`);
              toast.info(`Removed featured from "${updated.title}"`);
            }
          } else {
            addAIMsg("I couldn't find that project.");
          }
          setIsProcessing(false);
          return;
        }

        // 10. Add/Create new project → start wizard
        if (
          lower.includes("add") && (lower.includes("project") || lower.includes("new")) ||
          lower.includes("create") && lower.includes("project") ||
          lower === "new project" ||
          lower.includes("add my new project")
        ) {
          startNewProjectWizard();
          setIsProcessing(false);
          return;
        }

        // 11. Update project description/field
        if (lower.includes("update") || lower.includes("change") || lower.includes("edit")) {
          const found = findProjectByName(lower);
          if (found) {
            setSelectedPreview(found);
            setPreviewProjectId(found.id);
            setPreviewDirty(false);
            setShowPreviewPanel(true);
            addAIMsg(
              `Showing "${found.title}" in the preview panel. You can edit it there.\n\nOr tell me what to change, e.g.:\n• "Change the description to..."\n• "Update GitHub URL to..."`,
            );
          } else {
            addAIMsg("Which project would you like to update? I have:\n" + projects.map((p) => `• ${p.title}`).join("\n"));
          }
          setIsProcessing(false);
          return;
        }

        // 12. Show contact messages
        if (lower.includes("contact") && (lower.includes("messages") || lower.includes("show") || lower.includes("inbox"))) {
          try {
            const raw = localStorage.getItem("rakesh_portfolio_messages_v1");
            const msgs = raw ? JSON.parse(raw) : [];
            const unread = msgs.filter((m: { read?: boolean }) => !m.read).length;
            addAIMsg(
              msgs.length > 0
                ? `📩 You have **${msgs.length}** contact messages (**${unread}** unread).\n\n${msgs.slice(0, 5).map((m: { name: string; email: string; message: string; read: boolean }) => `• **${m.name}** (${m.email}): "${m.message.substring(0, 60)}..." ${m.read ? "" : "🔴"}`).join("\n")}`
                : "📭 No contact messages yet."
            );
          } catch {
            addAIMsg("📭 No contact messages found.");
          }
          setIsProcessing(false);
          return;
        }

        // 13. What should I improve / pending tasks
        if (
          lower.includes("improve") ||
          lower.includes("what should") ||
          lower.includes("pending") ||
          lower.includes("next") ||
          lower.includes("recommendation")
        ) {
          const tasks = taskStore.getTopPriority(5);
          if (tasks.length > 0) {
            addAIMsg(
              `Here are your top priority improvements:\n\n${tasks.map((t, i) => `**${i + 1}. ${t.title}**\nPriority: ${t.priority.toUpperCase()} | Status: ${t.status}\n${t.description}`).join("\n\n")}\n\nWould you like me to help with any of these?`
            );
          } else {
            addAIMsg("🎉 All improvement tasks are done! Your portfolio is looking great.\n\nAsk me to rate your portfolio or suggest new improvements.");
          }
          setIsProcessing(false);
          return;
        }

        // 14. Rate portfolio
        if (lower.includes("rate") && lower.includes("portfolio")) {
          const all = projectStore.getProjects();
          const pub = all.filter((p) => p.status === "Published").length;
          const featured = all.filter((p) => p.featured && p.status === "Published").length;
          const withLive = all.filter((p) => p.liveUrl).length;
          const withGithub = all.filter((p) => p.githubUrl && p.githubUrl !== "https://github.com/sairakesh-143").length;
          const pendingTasks = taskStore.getPendingTasks().length;

          let score = 60;
          if (pub >= 3) score += 10;
          if (featured >= 2) score += 5;
          if (withLive >= 2) score += 5;
          if (withGithub >= 2) score += 5;
          if (pendingTasks === 0) score += 10;
          else if (pendingTasks <= 3) score += 5;
          score = Math.min(score, 100);

          addAIMsg(
            `📊 **Portfolio Rating: ${score}/100**\n\n` +
            `• Projects: ${pub} published, ${all.length - pub} drafts\n` +
            `• Featured: ${featured}\n` +
            `• Live demos: ${withLive}\n` +
            `• Custom GitHub links: ${withGithub}\n` +
            `• Pending improvements: ${pendingTasks}\n\n` +
            (score >= 90 ? "🏆 Excellent! Your portfolio is in great shape." :
             score >= 75 ? "👍 Good portfolio! A few improvements will push it to 10/10." :
             "💪 Solid foundation. Work through the pending improvements to level up.") +
            "\n\nAsk me \"What should I improve next?\" for specific recommendations."
          );
          setIsProcessing(false);
          return;
        }

        // 15. Portfolio stats
        if (lower.includes("stats") || lower.includes("statistics") || lower.includes("how many")) {
          const all = projectStore.getProjects();
          addAIMsg(
            `📊 **Portfolio Stats**\n\n` +
            `• Total projects: ${all.length}\n` +
            `• Published: ${all.filter((p) => p.status === "Published").length}\n` +
            `• Drafts: ${all.filter((p) => p.status === "Draft").length}\n` +
            `• Featured: ${all.filter((p) => p.featured).length}\n` +
            `• Categories: ${[...new Set(all.map((p) => p.category))].join(", ")}\n` +
            `• Pending tasks: ${taskStore.getPendingTasks().length}`
          );
          setIsProcessing(false);
          return;
        }

        // 16. Recent activity
        if (lower.includes("recent") && (lower.includes("change") || lower.includes("activity") || lower.includes("did i"))) {
          const entries = activityLog.getRecent(8);
          if (entries.length > 0) {
            addAIMsg(
              `📋 **Recent Activity:**\n\n${entries.map((e) => {
                const date = new Date(e.timestamp);
                return `• **${activityLog.getActionLabel(e.action)}**: ${e.target} — ${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
              }).join("\n")}`
            );
          } else {
            addAIMsg("No recent activity recorded yet.");
          }
          setIsProcessing(false);
          return;
        }

        // 17. Normal conversational AI (fallback)
        // Instead of auto-generating a project, give a helpful conversational response
        const allProjects = projectStore.getProjects();
        const projectNames = allProjects.map((p) => p.title).join(", ");

        let response = "";

        if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
          response = "Hey Rakesh! 👋 How can I help you today?\n\nI can manage your projects, rate your portfolio, suggest improvements, or just chat about your work.";
        } else if (lower.includes("help")) {
          response = "Here's what I can do:\n\n" +
            "**Project Management:**\n• \"Add my new project\" — step-by-step project creator\n• \"Show my projects\" — list all projects\n• \"Publish [name]\" / \"Unpublish [name]\"\n• \"Delete [name]\" (with confirmation)\n• \"Make [name] featured\"\n\n" +
            "**Portfolio Intelligence:**\n• \"Rate my portfolio\" — get a score\n• \"What should I improve next?\"\n• \"Show contact messages\"\n• \"What did I change recently?\"\n\n" +
            "**Quick Actions:**\n• Click \"+ New Project\" to start creating\n• Click any project in the sidebar to preview";
        } else if (lower.includes("thank")) {
          response = "You're welcome, Rakesh! 🙌 Let me know if you need anything else.";
        } else if (lower.includes("project") || lower.includes("about section") || lower.includes("skills")) {
          response = `I'd be happy to help with that! You currently have ${allProjects.length} projects: ${projectNames}.\n\nWhat specifically would you like to do? You can:\n• Add a new project\n• Edit an existing one\n• Publish or unpublish\n• Get improvement suggestions`;
        } else if (lower.includes("recruiter") || lower.includes("professional") || lower.includes("10/10")) {
          response = `To make your portfolio recruiter-ready:\n\n1. **Strong project case studies** — problem → solution → impact\n2. **Real screenshots** for each project\n3. **Specific tech mentions** in descriptions\n4. **Live demo links** that work\n5. **Professional descriptions** (no lorem ipsum)\n\nYour current projects (${projectNames}) have good foundations. Want me to suggest specific improvements?`;
        } else {
          response = `I understand you said: "${query}"\n\nI'm best at managing your portfolio projects. Try:\n• "Show my projects"\n• "Add my new project"\n• "Rate my portfolio"\n• "What should I improve?"\n\nOr ask me anything about your portfolio!`;
        }

        addAIMsg(response);
        setIsProcessing(false);

      } catch (err) {
        addAIMsg("❌ Something went wrong. Please try again.", { error: "unknown" });
        setIsProcessing(false);
      }
    }, 400);
  };

  // ─── Handle Action Button Clicks (from chat messages) ───────────────────
  const handleActionClick = useCallback(
    (actionType: string, payload?: Record<string, unknown>, draft?: Partial<ProjectItem>) => {
      const target = draft || selectedPreview;

      switch (actionType) {
        case "preview": {
          if (target) {
            setSelectedPreview(target);
            setShowPreviewPanel(true);
            toast.info(`Previewing "${target.title}"`);
          }
          break;
        }

        case "save-draft":
        case "draft": {
          if (!target?.title) return;
          setActionLoading("save-draft");

          // Check if we're editing an existing project
          const existingId = previewProjectId || (target as ProjectItem).id;
          const draftData = { ...target, id: existingId || undefined };

          const saved = doCreateProject(draftData, "Draft");
          if (saved) {
            setSelectedPreview(saved);
            setPreviewProjectId(saved.id);
            setPreviewDirty(false);
            addAIMsg(`💾 **"${saved.title}"** saved as a **Draft**.\n\nIt's in your project list but hidden from the public portfolio. Publish it when you're ready!`);
            toast.success(`Saved "${saved.title}" as draft`);
          } else {
            // Duplicate detected
            const existing = projectStore.getProjects().find(
              (p) => p.title.toLowerCase() === target.title!.toLowerCase()
            );
            if (existing) {
              addAIMsg(
                `⚠️ A project named "${existing.title}" already exists. Would you like to update it instead?`,
                {
                  actions: [
                    { type: "update-existing-draft", label: "✏️ Update Existing", variant: "primary", payload: { id: existing.id } },
                    { type: "cancel-action", label: "Cancel", variant: "secondary" },
                  ],
                }
              );
            }
          }
          setActionLoading(null);
          break;
        }

        case "update-existing-draft": {
          if (!target?.title || !payload?.id) return;
          const updated = projectStore.saveProject({ ...target, id: payload.id as string, status: "Draft" } as ProjectItem);
          setSelectedPreview(updated);
          setPreviewProjectId(updated.id);
          setPreviewDirty(false);
          addAIMsg(`✅ Updated "${updated.title}" draft.`);
          toast.success(`Updated "${updated.title}"`);
          break;
        }

        case "publish-draft":
        case "publish": {
          if (!target?.title) return;
          setActionLoading("publish");

          const existingId = previewProjectId || (target as ProjectItem).id;
          const pubData = { ...target, id: existingId || undefined };

          // First save/create, then publish
          let saved: ProjectItem | null;
          if (existingId) {
            const result = doPublish(existingId);
            saved = result || null;
          } else {
            saved = doCreateProject(pubData, "Published");
            if (!saved) {
              // Duplicate — update existing instead
              const existing = projectStore.getProjects().find(
                (p) => p.title.toLowerCase() === target.title!.toLowerCase()
              );
              if (existing) {
                saved = projectStore.saveProject({ ...target, id: existing.id, status: "Published" } as ProjectItem);
                activityLog.log("project_published", saved.title);
              }
            }
          }

          if (saved) {
            setSelectedPreview(saved);
            setPreviewProjectId(saved.id);
            setPreviewDirty(false);
            addAIMsg(`🎉 **"${saved.title}"** is now **LIVE** on your public portfolio!\n\nVisitors can see it immediately without any code changes.`);
            toast.success(`Published "${saved.title}" to live portfolio`);
          } else {
            addAIMsg("❌ Unable to publish this project. Please try again.");
          }
          setActionLoading(null);
          break;
        }

        case "unpublish-project": {
          const pid = (payload?.id as string) || previewProjectId;
          if (!pid) return;
          const project = projectStore.getProjectById(pid);
          if (project) {
            setConfirmAction({ type: "unpublish", project });
          }
          break;
        }

        case "confirm-delete": {
          const pid = payload?.id as string;
          if (!pid) return;
          const project = projectStore.getProjectById(pid);
          if (project) {
            const ok = doDelete(pid);
            if (ok) {
              if (previewProjectId === pid) {
                setSelectedPreview(null);
                setPreviewProjectId(null);
              }
              addAIMsg(`🗑️ **"${project.title}"** has been permanently deleted.`);
              toast.success(`Deleted "${project.title}"`);
            } else {
              addAIMsg(`❌ Failed to delete the project.`);
            }
          }
          break;
        }

        case "edit-existing": {
          const pid = payload?.id as string;
          if (!pid) return;
          const existing = projectStore.getProjectById(pid);
          if (existing) {
            setWizard({ active: true, step: "description", data: { name: existing.title }, existingId: existing.id });
            addAIMsg(`Editing "${existing.title}". What's the updated description?`);
          }
          break;
        }

        case "create-another": {
          setWizard((w) => ({ ...w, step: "description" }));
          addAIMsg(`OK, creating a new project with the name "${wizard.data.name}". What does it do?`);
          break;
        }

        case "cancel-wizard": {
          setWizard(INITIAL_WIZARD);
          addAIMsg("Project creation cancelled. Let me know when you want to try again!");
          break;
        }

        case "cancel-action": {
          addAIMsg("Action cancelled.");
          break;
        }
      }
    },
    [selectedPreview, previewProjectId, doCreateProject, doPublish, doDelete, addAIMsg, wizard.data.name]
  );

  // ─── Confirmation Dialog Handlers ───────────────────────────────────────
  const handleConfirmYes = useCallback(() => {
    if (!confirmAction) return;
    const { type, project } = confirmAction;

    if (type === "unpublish") {
      const updated = doUnpublish(project.id);
      if (updated) {
        setSelectedPreview(updated);
        setPreviewProjectId(updated.id);
        setPreviewDirty(false);
        addAIMsg(`📁 **"${updated.title}"** unpublished and moved back to **Draft**.\n\nIt is no longer visible on your public portfolio.`);
        toast.info(`Unpublished "${updated.title}"`);
      }
    } else if (type === "delete") {
      const ok = doDelete(project.id);
      if (ok) {
        if (previewProjectId === project.id) {
          setSelectedPreview(null);
          setPreviewProjectId(null);
        }
        addAIMsg(`🗑️ **"${project.title}"** deleted permanently.`);
        toast.success(`Deleted "${project.title}"`);
      }
    }
    setConfirmAction(null);
  }, [confirmAction, doUnpublish, doDelete, addAIMsg, previewProjectId]);

  // ─── Preview Panel Actions ──────────────────────────────────────────────
  const handlePreviewSaveDraft = useCallback(() => {
    if (!selectedPreview?.title) return;
    setActionLoading("save-draft");

    const existingId = previewProjectId || (selectedPreview as ProjectItem).id;
    const saved = projectStore.saveProject({
      ...selectedPreview,
      id: existingId || undefined,
      status: "Draft",
    } as ProjectItem);

    activityLog.log(existingId ? "project_updated" : "project_created", saved.title, "Saved as Draft");
    setSelectedPreview(saved);
    setPreviewProjectId(saved.id);
    setPreviewDirty(false);
    addAIMsg(`💾 **"${saved.title}"** saved as Draft.`);
    toast.success(`Saved "${saved.title}" as draft`);
    setActionLoading(null);
  }, [selectedPreview, previewProjectId, addAIMsg]);

  const handlePreviewPublish = useCallback(() => {
    if (!selectedPreview?.title) return;
    setActionLoading("publish");

    const existingId = previewProjectId || (selectedPreview as ProjectItem).id;
    const saved = projectStore.saveProject({
      ...selectedPreview,
      id: existingId || undefined,
      status: "Published",
    } as ProjectItem);

    activityLog.log("project_published", saved.title);
    setSelectedPreview(saved);
    setPreviewProjectId(saved.id);
    setPreviewDirty(false);
    addAIMsg(`🎉 **"${saved.title}"** published to your live portfolio!`);
    toast.success(`Published "${saved.title}"`);
    setActionLoading(null);
  }, [selectedPreview, previewProjectId, addAIMsg]);

  const handlePreviewUnpublish = useCallback(() => {
    if (!previewProjectId) return;
    const project = projectStore.getProjectById(previewProjectId);
    if (project) {
      setConfirmAction({ type: "unpublish", project });
    }
  }, [previewProjectId]);

  const handlePreviewUpdate = useCallback(() => {
    if (!selectedPreview?.title || !previewProjectId) return;
    setActionLoading("update");

    const saved = projectStore.saveProject({
      ...selectedPreview,
      id: previewProjectId,
    } as ProjectItem);

    activityLog.log("project_updated", saved.title);
    setSelectedPreview(saved);
    setPreviewDirty(false);
    addAIMsg(`✅ **"${saved.title}"** updated successfully.`);
    toast.success(`Updated "${saved.title}"`);
    setActionLoading(null);
  }, [selectedPreview, previewProjectId, addAIMsg]);

  // ─── Computed values ────────────────────────────────────────────────────
  const publishedCount = projects.filter((p) => p.status === "Published").length;
  const draftCount = projects.filter((p) => p.status === "Draft").length;

  // Sidebar filtered projects
  const filteredProjects = projects.filter((p) => {
    if (sidebarFilter === "published") return p.status === "Published";
    if (sidebarFilter === "draft") return p.status === "Draft";
    if (sidebarFilter === "featured") return p.featured && p.status === "Published";
    return true;
  }).filter((p) => {
    if (!sidebarSearch) return true;
    return p.title.toLowerCase().includes(sidebarSearch.toLowerCase()) ||
           p.category.toLowerCase().includes(sidebarSearch.toLowerCase());
  });

  // Preview status
  const previewStatus = selectedPreview
    ? previewProjectId
      ? projectStore.getProjectById(previewProjectId)?.status || "Draft"
      : "Draft"
    : null;

  const previewIsPublished = previewStatus === "Published";

  // ─── RENDER ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#070910] text-[#F5F7FF] flex flex-col h-screen overflow-hidden">
      
      {/* ── Confirmation Dialog ── */}
      <AnimatePresence>
        {confirmAction && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0c1020] border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  confirmAction.type === "delete" ? "bg-rose-500/20" : "bg-amber-500/20"
                }`}>
                  {confirmAction.type === "delete" ? (
                    <Trash2 className="w-5 h-5 text-rose-400" />
                  ) : (
                    <EyeOff className="w-5 h-5 text-amber-400" />
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">
                    {confirmAction.type === "delete" ? "Delete project permanently?" : "Unpublish this project?"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {confirmAction.type === "delete"
                      ? "This action cannot be undone."
                      : "It will be removed from your public portfolio."}
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] mb-3">
                <p className="text-xs font-bold text-white">{confirmAction.project.title}</p>
                <p className="text-[11px] text-slate-400">{confirmAction.project.category} · {confirmAction.project.status}</p>
              </div>

              {confirmAction.type === "unpublish" && (
                <p className="text-[11px] text-emerald-400/80 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-3 py-2 mb-4">
                  ✓ Your project data, GitHub URL, live URL, and all details will remain safely saved in Drafts.
                </p>
              )}
              {confirmAction.type === "delete" && (
                <p className="text-[11px] text-rose-400/80 bg-rose-500/10 border border-rose-500/20 rounded-xl px-3 py-2 mb-4">
                  ⚠ All project data including description, technologies, URLs, and images will be permanently removed.
                </p>
              )}

              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => setConfirmAction(null)}
                  className="flex-1 bg-white/[0.05] border border-white/10 text-white hover:bg-white/[0.1] text-xs"
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleConfirmYes}
                  className={`flex-1 text-xs font-bold ${
                    confirmAction.type === "delete"
                      ? "bg-rose-500 hover:bg-rose-400 text-white"
                      : "bg-amber-500 hover:bg-amber-400 text-black"
                  }`}
                >
                  {confirmAction.type === "delete" ? "Delete Permanently" : "Unpublish"}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Top Header Bar ── */}
      <header className="h-14 border-b border-white/[0.08] bg-[#0a0e1b] px-4 sm:px-6 flex items-center justify-between flex-shrink-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 flex items-center justify-center font-bold text-white text-xs shadow-md shadow-indigo-500/25">
            RP
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-bold text-white tracking-tight">
              Rakesh Portfolio AI
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Private Admin Workspace
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Quick Stats Pill — computed from real data */}
          <div className="hidden md:flex items-center gap-2 text-xs font-mono bg-white/[0.03] border border-white/[0.06] px-3 py-1 rounded-xl">
            <span className="text-emerald-400 font-semibold">{publishedCount} Live</span>
            <span className="text-slate-600">·</span>
            <span className="text-amber-400 font-semibold">{draftCount} Drafts</span>
          </div>

          {/* Toggle Preview Panel Button */}
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowPreviewPanel(!showPreviewPanel)}
            className="hidden lg:flex bg-white/[0.03] border-white/[0.1] text-slate-300 hover:text-white text-xs gap-1.5 h-8"
          >
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span>{showPreviewPanel ? "Hide Preview" : "Show Preview"}</span>
          </Button>

          {/* Lock / Logout Button */}
          <Button
            size="sm"
            onClick={handleLock}
            className="bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/25 text-rose-300 hover:text-rose-200 text-xs gap-1.5 h-8 rounded-xl font-medium"
          >
            <Lock className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Lock Workspace</span>
          </Button>
        </div>
      </header>

      {/* ── Main Workspace Layout ── */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        
        {/* ── LEFT SIDEBAR ── */}
        <aside className="w-64 border-r border-white/[0.08] bg-[#080b15] hidden md:flex flex-col justify-between p-4 flex-shrink-0">
          <div className="space-y-4">
            
            {/* Mode Switchers */}
            <div className="space-y-1">
              <button
                type="button"
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold bg-indigo-600/20 text-white border border-indigo-500/30 shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>AI Assistant</span>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-amber-500/20 text-amber-300">
                  Active
                </span>
              </button>
            </div>

            {/* + New Project Button */}
            <button
              type="button"
              onClick={startNewProjectWizard}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-bold text-xs py-2.5 px-3 rounded-xl shadow-md shadow-amber-500/15 flex items-center justify-center gap-1.5 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Project</span>
            </button>

            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={sidebarSearch}
                onChange={(e) => setSidebarSearch(e.target.value)}
                placeholder="Search projects..."
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl text-xs text-white placeholder:text-slate-500 pl-8 pr-3 py-2 focus:outline-none focus:border-amber-500/30"
              />
            </div>

            {/* Filter pills */}
            <div className="flex gap-1 flex-wrap">
              {(["all", "published", "draft", "featured"] as SidebarFilter[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setSidebarFilter(f)}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono capitalize transition-all ${
                    sidebarFilter === f
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      : "bg-white/[0.02] text-slate-400 border border-white/[0.06] hover:text-white"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Project List */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 uppercase tracking-wider px-1">
                <span>Projects</span>
                <span>{filteredProjects.length}</span>
              </div>

              <div className="space-y-1 max-h-[calc(100vh-380px)] overflow-y-auto pr-1">
                {filteredProjects.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setSelectedPreview(p);
                      setPreviewProjectId(p.id);
                      setPreviewDirty(false);
                      setShowPreviewPanel(true);
                    }}
                    className={`p-2 rounded-xl border cursor-pointer transition-all flex items-center justify-between group ${
                      previewProjectId === p.id
                        ? "bg-indigo-600/15 border-indigo-500/30"
                        : "bg-white/[0.02] hover:bg-white/[0.06] border-white/[0.05]"
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <p className="text-xs font-bold text-white group-hover:text-amber-300 truncate transition-colors">
                        {p.title}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate">
                        {p.category}
                      </p>
                    </div>

                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono flex-shrink-0 ${
                      p.status === "Published"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-amber-500/10 text-amber-300"
                    }`}>
                      {p.status}
                    </span>
                  </div>
                ))}
                {filteredProjects.length === 0 && (
                  <p className="text-[11px] text-slate-500 px-2 py-3">No projects match this filter.</p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="pt-4 border-t border-white/[0.06] text-[11px] text-slate-500 font-mono space-y-1">
            <p>Admin: Bhargava Sai Rakesh</p>
            <p className="text-[10px] text-slate-600">Changes sync live to portfolio</p>
          </div>
        </aside>

        {/* ── CENTER: ChatGPT-Style Conversation ── */}
        <section className="flex-1 flex flex-col min-w-0 bg-[#070910] relative">
          
          {/* Conversation Stream */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className={`flex gap-3.5 max-w-3xl ${
                  msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  msg.sender === "user"
                    ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
                    : "bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/20"
                }`}>
                  {msg.sender === "user" ? "You" : <Sparkles className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div className={`rounded-2xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed space-y-3 ${
                  msg.sender === "user"
                    ? "bg-amber-500/15 border border-amber-500/30 text-white rounded-tr-none max-w-lg"
                    : "bg-[#0b0f1e]/90 border border-white/[0.09] text-slate-200 rounded-tl-none shadow-xl max-w-2xl"
                }`}>
                  {/* Parse bold text with ** */}
                  <div className="whitespace-pre-wrap">
                    {msg.text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
                      part.startsWith("**") && part.endsWith("**") ? (
                        <strong key={i} className="text-white font-bold">{part.slice(2, -2)}</strong>
                      ) : (
                        <span key={i}>{part}</span>
                      )
                    )}
                  </div>

                  {/* Project List Widget */}
                  {msg.projectList && msg.projectList.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-white/[0.08]">
                      {msg.projectList.map((p) => (
                        <div
                          key={p.id}
                          className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between gap-3"
                        >
                          <div className="min-w-0">
                            <span className="font-bold text-white block truncate">{p.title}</span>
                            <span className="text-[11px] text-slate-400 block truncate">
                              {p.category} · {p.status}
                              {p.featured ? " · ⭐ Featured" : ""}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                setSelectedPreview(p);
                                setPreviewProjectId(p.id);
                                setPreviewDirty(false);
                                setShowPreviewPanel(true);
                              }}
                              className="h-7 px-2 text-[11px] text-amber-300 hover:bg-white/[0.05]"
                            >
                              Preview
                            </Button>
                            {p.status === "Published" ? (
                              <Button
                                size="sm"
                                onClick={() => setConfirmAction({ type: "unpublish", project: p })}
                                className="h-7 px-2 text-[11px] font-mono rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/30"
                              >
                                Unpublish
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                onClick={() => {
                                  const updated = doPublish(p.id);
                                  if (updated) {
                                    addAIMsg(`✅ **"${updated.title}"** published!`);
                                    toast.success(`Published "${updated.title}"`);
                                  }
                                }}
                                className="h-7 px-2 text-[11px] font-mono rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30"
                              >
                                Publish
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons */}
                  {msg.actions && (
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-white/[0.08]">
                      {msg.actions.map((act) => (
                        <Button
                          key={act.type}
                          size="sm"
                          onClick={() => handleActionClick(act.type, act.payload, msg.projectDraft)}
                          className={`text-xs font-bold rounded-xl h-8 px-3.5 transition-all ${
                            act.variant === "primary"
                              ? "bg-emerald-500 hover:bg-emerald-400 text-black shadow-md shadow-emerald-500/20"
                              : act.variant === "danger"
                              ? "bg-rose-500 hover:bg-rose-400 text-white shadow-md shadow-rose-500/20"
                              : "bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.12] text-white"
                          }`}
                        >
                          {act.label}
                        </Button>
                      ))}
                    </div>
                  )}

                  <span className="text-[10px] font-mono text-slate-500 block text-right pt-1">
                    {msg.timestamp}
                  </span>
                </div>
              </motion.div>
            ))}

            {/* AI Typing Indicator */}
            {isProcessing && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3.5 mr-auto max-w-md items-center"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
                <div className="p-3.5 rounded-2xl bg-[#0b0f1e] border border-white/[0.08] text-xs text-amber-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span>Thinking...</span>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Pills */}
          <div className="px-4 sm:px-6 pt-2 pb-1 bg-[#070910] flex items-center gap-2 overflow-x-auto no-scrollbar">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => handleSendMessage(prompt)}
                className="px-3 py-1 rounded-full text-[11px] font-medium bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-amber-500/30 text-slate-300 hover:text-white whitespace-nowrap transition-all"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-4 sm:p-6 bg-[#090d1a] border-t border-white/[0.08]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2.5 max-w-4xl mx-auto relative"
            >
              <Input
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder={
                  wizard.active
                    ? `Answer the question above...`
                    : `Ask me anything or type a command...`
                }
                className="bg-white/[0.04] border-white/[0.12] focus-visible:border-amber-400 text-white placeholder:text-slate-500 text-xs sm:text-sm rounded-2xl py-3 pl-4 pr-12 focus-visible:ring-amber-400 shadow-inner"
              />

              <Button
                type="submit"
                disabled={!inputVal.trim() || isProcessing}
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold shadow-md shadow-amber-500/20 disabled:opacity-40"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </section>

        {/* ── RIGHT PANEL: Live Project Preview ── */}
        <AnimatePresence>
          {showPreviewPanel && selectedPreview && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 440, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border-l border-white/[0.08] bg-[#090d1a] hidden xl:flex flex-col justify-between overflow-hidden flex-shrink-0 z-20"
            >
              {/* Preview Header */}
              <div className="p-4 border-b border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${previewIsPublished ? "bg-emerald-400" : "bg-amber-400"} animate-pulse`} />
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                    Live Project Preview
                  </h3>
                </div>

                <div className="flex items-center gap-1.5">
                  {/* Status badge */}
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    previewIsPublished
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  }`}>
                    {previewIsPublished ? "PUBLISHED" : "DRAFT"}
                  </span>
                  <button
                    onClick={() => setShowPreviewPanel(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Preview Card Body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                
                <div className={`rounded-2xl bg-[#0a0e1c] border p-5 shadow-2xl space-y-4 ${
                  previewIsPublished ? "border-emerald-500/30" : "border-amber-500/30"
                }`}>
                  {/* Browser Bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-500/70" />
                      <span className="w-2 h-2 rounded-full bg-amber-500/70" />
                      <span className="w-2 h-2 rounded-full bg-emerald-500/70" />
                      <span className="text-[10px] font-mono text-slate-400 ml-1.5 truncate max-w-[120px]">
                        {selectedPreview.slug || "project"}.app
                      </span>
                    </div>

                    {previewDirty && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono text-rose-300 bg-rose-500/10 border border-rose-500/20">
                        Unsaved changes
                      </span>
                    )}
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h4 className="text-lg font-bold text-white leading-tight">
                      {selectedPreview.title}
                    </h4>
                    <p className="text-xs text-amber-400 font-medium mt-0.5">
                      {selectedPreview.subtitle || selectedPreview.tagline}
                    </p>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedPreview.description || selectedPreview.shortDescription}
                  </p>

                  {/* Problem & Solution */}
                  {selectedPreview.problem && (
                    <div className="p-3 rounded-xl bg-rose-500/[0.05] border border-rose-500/20 space-y-1">
                      <div className="flex items-center gap-1 text-[11px] font-semibold text-rose-400">
                        <AlertCircle className="w-3 h-3" />
                        <span>The Problem:</span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        {selectedPreview.problem}
                      </p>
                    </div>
                  )}

                  {selectedPreview.solution && (
                    <div className="p-3 rounded-xl bg-emerald-500/[0.05] border border-emerald-500/20 space-y-1">
                      <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                        <Lightbulb className="w-3 h-3" />
                        <span>Engineered Solution:</span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        {selectedPreview.solution}
                      </p>
                    </div>
                  )}

                  {/* Highlights */}
                  {selectedPreview.highlights && selectedPreview.highlights.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <p className="text-[10px] font-mono uppercase text-slate-400">Capabilities:</p>
                      {selectedPreview.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                          <span className="line-clamp-1">{h}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1 pt-2">
                    {selectedPreview.tags?.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded bg-white/[0.04] text-slate-300 border border-white/[0.08] text-[10px] font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-2 pt-2">
                    {selectedPreview.githubUrl && (
                      <a
                        href={selectedPreview.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors"
                      >
                        <Github className="w-3 h-3" /> GitHub
                      </a>
                    )}
                    {selectedPreview.liveUrl && (
                      <a
                        href={selectedPreview.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" /> Live Demo
                      </a>
                    )}
                  </div>

                  {/* Impact Metric */}
                  {selectedPreview.impactMetric && (
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 font-medium">
                      <TrendingUp className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                      <span>{selectedPreview.impactMetric}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Preview Footer Actions — Dynamic based on status */}
              <div className="p-4 border-t border-white/[0.08] bg-[#080b15] space-y-2">
                {previewDirty && !previewIsPublished && (
                  <div className="flex items-center gap-2 text-[11px] text-rose-300 bg-rose-500/10 rounded-lg px-3 py-1.5 border border-rose-500/20">
                    <AlertCircle className="w-3 h-3" />
                    <span>Unsaved changes</span>
                  </div>
                )}

                {previewIsPublished ? (
                  /* Published project: Update + Unpublish */
                  <div className="grid grid-cols-2 gap-2">
                    {previewDirty && (
                      <Button
                        size="sm"
                        onClick={handlePreviewUpdate}
                        disabled={actionLoading === "update"}
                        className="bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs"
                      >
                        {actionLoading === "update" ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" /> : <Check className="w-3.5 h-3.5 mr-1" />}
                        Update Project
                      </Button>
                    )}
                    <Button
                      size="sm"
                      onClick={handlePreviewUnpublish}
                      className={`bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-300 font-bold text-xs ${!previewDirty ? "col-span-2" : ""}`}
                    >
                      <EyeOff className="w-3.5 h-3.5 mr-1" />
                      Unpublish
                    </Button>
                  </div>
                ) : (
                  /* Draft project: Save Draft + Publish */
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handlePreviewSaveDraft}
                      disabled={actionLoading === "save-draft"}
                      className="bg-white/[0.04] border-white/[0.1] text-xs text-slate-200"
                    >
                      {actionLoading === "save-draft" ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" /> : null}
                      Save as Draft
                    </Button>
                    <Button
                      size="sm"
                      onClick={handlePreviewPublish}
                      disabled={actionLoading === "publish"}
                      className="bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-bold text-xs"
                    >
                      {actionLoading === "publish" ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" /> : null}
                      Publish to Portfolio
                    </Button>
                  </div>
                )}

                {/* Delete button for both states */}
                {previewProjectId && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      const p = projectStore.getProjectById(previewProjectId);
                      if (p) setConfirmAction({ type: "delete", project: p });
                    }}
                    className="w-full text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    Delete Project
                  </Button>
                )}
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default AdminAIWorkspace;

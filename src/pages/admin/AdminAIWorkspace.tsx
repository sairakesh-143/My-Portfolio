import { useState, useEffect, useRef } from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { authService } from "@/lib/auth";
import { projectStore } from "@/lib/projectStore";
import { generateProject } from "@/lib/aiProjectGenerator";
import { ProjectItem } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  projectDraft?: Partial<ProjectItem>;
  projectList?: ProjectItem[];
  actions?: {
    type: "preview" | "publish" | "draft" | "edit";
    label: string;
  }[];
  timestamp: string;
}

const quickPrompts = [
  "Add my new project",
  "Show my projects",
  "Show draft projects",
  "Publish WareMind AI",
  "How to add project screenshots?",
];

export const AdminAIWorkspace = () => {
  const navigate = useNavigate();

  // Projects state from store
  const [projects, setProjects] = useState<ProjectItem[]>(projectStore.getProjects());
  const [selectedPreview, setSelectedPreview] = useState<Partial<ProjectItem> | null>(null);
  const [showPreviewPanel, setShowPreviewPanel] = useState(true);
  const [activeTab, setActiveTab] = useState<"workspace" | "projects" | "settings">("workspace");

  // Chat conversation state
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-welcome",
      sender: "ai",
      text: "Hi Rakesh 👋 Welcome to your private Portfolio AI workspace!\n\nI can help you create, formulate, edit, and publish projects to your portfolio, or manage existing ones. Tell me what you'd like to do, or paste raw project details below.",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const [inputVal, setInputVal] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Subscribe to project store updates
  useEffect(() => {
    const reload = () => setProjects(projectStore.getProjects());
    reload();
    return projectStore.subscribe(reload);
  }, []);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isProcessing]);

  // Handle Lock / Logout
  const handleLock = () => {
    authService.lock();
    toast.info("Admin workspace locked.");
    navigate("/admin");
    window.location.reload();
  };

  // Chat Message Processor
  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputVal).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputVal("");
    setIsProcessing(true);

    const lower = query.toLowerCase();

    // Natural Language Command Handling
    setTimeout(async () => {
      // 1. Command: Show projects
      if (lower.includes("show my projects") || lower.includes("list projects") || lower === "show projects") {
        const all = projectStore.getProjects();
        setIsProcessing(false);
        setMessages((prev) => [
          ...prev,
          {
            id: `msg-${Date.now()}-ai`,
            sender: "ai",
            text: `You currently have ${all.length} projects in your database (${
              all.filter((p) => p.status === "Published").length
            } Published, ${all.filter((p) => p.status === "Draft").length} Drafts):`,
            projectList: all,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
        return;
      }

      // 2. Command: Show draft projects
      if (lower.includes("draft") && (lower.includes("show") || lower.includes("list"))) {
        const drafts = projectStore.getProjects().filter((p) => p.status === "Draft");
        setIsProcessing(false);
        setMessages((prev) => [
          ...prev,
          {
            id: `msg-${Date.now()}-ai`,
            sender: "ai",
            text: drafts.length > 0
              ? `Found ${drafts.length} draft project(s):`
              : "You have no draft projects right now. All projects are published live!",
            projectList: drafts,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
        return;
      }

      // 3. Command: Publish [name]
      if (lower.startsWith("publish ")) {
        const targetName = lower.replace("publish ", "").trim();
        const found = projectStore.getProjects().find((p) => p.title.toLowerCase().includes(targetName));
        if (found) {
          projectStore.saveProject({ ...found, status: "Published" });
          setIsProcessing(false);
          setMessages((prev) => [
            ...prev,
            {
              id: `msg-${Date.now()}-ai`,
              sender: "ai",
              text: `✅ "${found.title}" has been published! It is now live on your public portfolio.`,
              timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            },
          ]);
          toast.success(`Published "${found.title}" to live portfolio.`);
          return;
        }
      }

      // 4. Command: Unpublish [name]
      if (lower.startsWith("unpublish ")) {
        const targetName = lower.replace("unpublish ", "").trim();
        const found = projectStore.getProjects().find((p) => p.title.toLowerCase().includes(targetName));
        if (found) {
          projectStore.saveProject({ ...found, status: "Draft" });
          setIsProcessing(false);
          setMessages((prev) => [
            ...prev,
            {
              id: `msg-${Date.now()}-ai`,
              sender: "ai",
              text: `📁 "${found.title}" has been moved to Drafts and hidden from your public portfolio.`,
              timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            },
          ]);
          toast.info(`Moved "${found.title}" to drafts.`);
          return;
        }
      }

      // 5. Default / Project Creation Flow:
      // If the message contains project information or says "add project"
      try {
        const generated = await generateProject({
          name: query.length < 50 ? query.replace(/^add (my )?(new )?project/i, "").trim() || "My New Project" : "New Portfolio Project",
          rawText: query,
          notes: query,
        });

        setSelectedPreview(generated);
        setShowPreviewPanel(true);
        setIsProcessing(false);

        setMessages((prev) => [
          ...prev,
          {
            id: `msg-${Date.now()}-ai`,
            sender: "ai",
            text: `I've formulated the structured project entry for "${generated.title || "your project"}".\n\nTake a look at the live preview panel on the right. You can edit any field, save it as a draft, or publish it directly to your live portfolio!`,
            projectDraft: generated,
            actions: [
              { type: "preview", label: "👁️ Preview in Panel" },
              { type: "publish", label: "🚀 Publish Live" },
              { type: "draft", label: "💾 Save Draft" },
            ],
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      } catch (err) {
        setIsProcessing(false);
        setMessages((prev) => [
          ...prev,
          {
            id: `msg-${Date.now()}-ai`,
            sender: "ai",
            text: "I ran into an issue formulating the project. Please provide the project name and key features, or check your settings.",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      }
    }, 450);
  };

  // Quick Action Handler for Chat Buttons
  const handleActionClick = (action: "preview" | "publish" | "draft" | "edit", draft?: Partial<ProjectItem>) => {
    const target = draft || selectedPreview;
    if (!target || !target.title) return;

    if (action === "preview") {
      setSelectedPreview(target);
      setShowPreviewPanel(true);
      toast.info(`Previewing "${target.title}" in the right panel.`);
    } else if (action === "publish") {
      const saved = projectStore.saveProject({
        title: target.title,
        slug: target.slug || target.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        subtitle: target.subtitle || `${target.title} Platform`,
        tagline: target.tagline || "",
        shortDescription: target.shortDescription || target.description || "",
        description: target.description || "",
        problem: target.problem || "",
        solution: target.solution || "",
        highlights: target.highlights || ["Scalable modern architecture"],
        tags: target.tags || ["React", "TypeScript"],
        category: target.category || "Full Stack",
        githubUrl: target.githubUrl || "https://github.com/sairakesh-143",
        liveUrl: target.liveUrl,
        status: "Published",
        featured: target.featured ?? true,
        impactMetric: target.impactMetric,
        role: target.role || "Full-Stack Developer",
      });

      toast.success(`"${saved.title}" published! Live on public portfolio.`);
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}-ai`,
          sender: "ai",
          text: `🎉 Project "${saved.title}" is now LIVE on your public portfolio!\n\nNormal visitors can now view it immediately on the homepage without needing a code rebuild.`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } else if (action === "draft") {
      const saved = projectStore.saveProject({
        title: target.title,
        slug: target.slug || target.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        subtitle: target.subtitle || `${target.title} Platform`,
        tagline: target.tagline || "",
        shortDescription: target.shortDescription || target.description || "",
        description: target.description || "",
        problem: target.problem || "",
        solution: target.solution || "",
        highlights: target.highlights || ["Scalable modern architecture"],
        tags: target.tags || ["React", "TypeScript"],
        category: target.category || "Full Stack",
        githubUrl: target.githubUrl || "https://github.com/sairakesh-143",
        liveUrl: target.liveUrl,
        status: "Draft",
        featured: target.featured ?? true,
        impactMetric: target.impactMetric,
        role: target.role || "Full-Stack Developer",
      });

      toast.info(`"${saved.title}" saved to Drafts.`);
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}-ai`,
          sender: "ai",
          text: `💾 Saved "${saved.title}" as a Draft. You can publish it anytime.`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }
  };

  const publishedCount = projects.filter((p) => p.status === "Published").length;
  const draftCount = projects.filter((p) => p.status === "Draft").length;

  return (
    <div className="min-h-screen bg-[#070910] text-[#F5F7FF] flex flex-col h-screen overflow-hidden">
      
      {/* Top Header Bar */}
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
          {/* Quick Stats Pill */}
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

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        
        {/* ── LEFT SIDEBAR: Navigation & Quick Projects ── */}
        <aside className="w-64 border-r border-white/[0.08] bg-[#080b15] hidden md:flex flex-col justify-between p-4 flex-shrink-0">
          <div className="space-y-5">
            
            {/* Mode Switchers */}
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => setActiveTab("workspace")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  activeTab === "workspace"
                    ? "bg-indigo-600/20 text-white font-semibold border border-indigo-500/30 shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>AI Assistant</span>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-amber-500/20 text-amber-300">
                  Active
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleSendMessage("Show my projects")}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.03] transition-all"
              >
                <FolderGit2 className="w-4 h-4 text-slate-400" />
                <span>All Projects ({projects.length})</span>
              </button>
            </div>

            {/* Quick Action */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setInputVal("Add my new project ");
                }}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-bold text-xs py-2 px-3 rounded-xl shadow-md shadow-amber-500/15 flex items-center justify-center gap-1.5 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Project Prompt</span>
              </button>
            </div>

            {/* Recent Projects Mini-List */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 uppercase tracking-wider px-1">
                <span>Recent Projects</span>
                <span>{projects.length}</span>
              </div>

              <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
                {projects.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setSelectedPreview(p);
                      setShowPreviewPanel(true);
                    }}
                    className="p-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.05] cursor-pointer transition-all flex items-center justify-between group"
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
              </div>
            </div>

          </div>

          {/* Sidebar Footer Info */}
          <div className="pt-4 border-t border-white/[0.06] text-[11px] text-slate-500 font-mono space-y-1">
            <p>Admin: Bhargava Sai Rakesh</p>
            <p className="text-[10px] text-slate-600">Changes sync live to portfolio</p>
          </div>
        </aside>

        {/* ── CENTER: ChatGPT-Style Conversation Interface ── */}
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
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {/* Project List Widget if returned */}
                  {msg.projectList && msg.projectList.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-white/[0.08]">
                      {msg.projectList.map((p) => (
                        <div
                          key={p.id}
                          className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between gap-3"
                        >
                          <div className="min-w-0">
                            <span className="font-bold text-white block truncate">{p.title}</span>
                            <span className="text-[11px] text-slate-400 block truncate">{p.subtitle || p.shortDescription}</span>
                          </div>

                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                setSelectedPreview(p);
                                setShowPreviewPanel(true);
                              }}
                              className="h-7 px-2 text-[11px] text-amber-300 hover:bg-white/[0.05]"
                            >
                              Preview
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleActionClick(p.status === "Published" ? "draft" : "publish", p)}
                              className={`h-7 px-2 text-[11px] font-mono rounded-lg ${
                                p.status === "Published"
                                  ? "bg-amber-500/20 text-amber-300 hover:bg-amber-500/30"
                                  : "bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30"
                              }`}
                            >
                              {p.status === "Published" ? "Unpublish" : "Publish"}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons if returned */}
                  {msg.actions && (
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-white/[0.08]">
                      {msg.actions.map((act) => (
                        <Button
                          key={act.type}
                          size="sm"
                          onClick={() => handleActionClick(act.type, msg.projectDraft)}
                          className={`text-xs font-bold rounded-xl h-8 px-3.5 transition-all ${
                            act.type === "publish"
                              ? "bg-emerald-500 hover:bg-emerald-400 text-black shadow-md shadow-emerald-500/20"
                              : act.type === "draft"
                              ? "bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.12] text-white"
                              : "bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30"
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
                  <Sparkles className="w-4 h-4 animate-spin" />
                </div>
                <div className="p-3.5 rounded-2xl bg-[#0b0f1e] border border-white/[0.08] text-xs text-amber-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span>Formulating structured project intelligence...</span>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Pills Bar */}
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

          {/* Input Box Footer */}
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
                placeholder="Type instructions or paste project details (e.g. 'Add WareMind AI: warehouse inventory app with React & Supabase')..."
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

        {/* ── RIGHT PANEL: Dynamic Live Project Preview ── */}
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
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                    Live Project Preview
                  </h3>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleActionClick("publish")}
                    className="px-2.5 py-1 rounded-lg bg-emerald-500 text-black font-bold text-[11px] shadow-sm hover:bg-emerald-400 transition-colors"
                  >
                    Publish
                  </button>
                  <button
                    onClick={() => setShowPreviewPanel(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Preview Card Body (Identical to Public Card) */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                
                <div className="rounded-2xl bg-[#0a0e1c] border border-amber-500/30 p-5 shadow-2xl space-y-4">
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

                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium text-amber-300 bg-amber-500/10 border border-amber-500/20">
                      {selectedPreview.status || "Draft"}
                    </span>
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

                  {/* Problem & Solution Mini Blocks */}
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

                  {/* Impact Metric */}
                  {selectedPreview.impactMetric && (
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 font-medium">
                      <TrendingUp className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                      <span>{selectedPreview.impactMetric}</span>
                    </div>
                  )}
                </div>

              </div>

              {/* Preview Footer Actions */}
              <div className="p-4 border-t border-white/[0.08] grid grid-cols-2 gap-2 bg-[#080b15]">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleActionClick("draft")}
                  className="bg-white/[0.04] border-white/[0.1] text-xs text-slate-200"
                >
                  Save as Draft
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleActionClick("publish")}
                  className="bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-bold text-xs"
                >
                  Publish to Portfolio
                </Button>
              </div>

            </motion.aside>
          )}
        </AnimatePresence>

      </div>

    </div>
  );
};

export default AdminAIWorkspace;

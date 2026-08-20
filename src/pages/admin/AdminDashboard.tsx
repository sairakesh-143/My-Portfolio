import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  FolderGit2,
  Sparkles,
  MessageSquare,
  Plus,
  Eye,
  Star,
  ExternalLink,
  CheckCircle2,
  Clock,
  ArrowRight,
  Trash2,
  Edit3,
  Globe,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { projectStore } from "@/lib/projectStore";
import { messageStore } from "@/lib/messageStore";
import { ProjectItem } from "@/lib/types";
import { toast } from "sonner";

const AdminDashboard = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [unreadMessages, setUnreadMessages] = useState<number>(0);

  const loadData = () => {
    setProjects(projectStore.getProjects());
    setUnreadMessages(messageStore.getUnreadCount());
  };

  useEffect(() => {
    loadData();
    const unsubProjects = projectStore.subscribe(loadData);
    const unsubMessages = messageStore.subscribe(loadData);
    return () => {
      unsubProjects();
      unsubMessages();
    };
  }, []);

  const totalProjects = projects.length;
  const publishedProjects = projects.filter((p) => p.status === "Published").length;
  const draftProjects = projects.filter((p) => p.status === "Draft").length;
  const featuredProjects = projects.filter((p) => p.featured).length;

  const handleTogglePublish = (id: string) => {
    const updated = projectStore.togglePublishStatus(id);
    if (updated) {
      toast.success(
        `Project status changed to ${updated.status}. ${
          updated.status === "Published" ? "Now visible on live portfolio!" : "Hidden from public view."
        }`
      );
    }
  };

  const handleToggleFeatured = (id: string) => {
    const updated = projectStore.toggleFeaturedStatus(id);
    if (updated) {
      toast.success(`Project ${updated.featured ? "marked as Featured ⭐" : "unmarked from Featured"}`);
    }
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      projectStore.deleteProject(id);
      toast.success(`Deleted project "${title}"`);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header Overview */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage your dynamic portfolio projects, AI content generation, and inquiries.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <Button
            asChild
            className="bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-bold text-xs py-2 px-4 rounded-xl shadow-md shadow-amber-500/20 gap-1.5"
          >
            <Link to="/admin/ai-assistant">
              <Sparkles className="w-4 h-4" />
              <span>AI Project Assistant</span>
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.12] text-white text-xs py-2 px-4 rounded-xl gap-1.5"
          >
            <Link to="/admin/projects/new">
              <Plus className="w-4 h-4 text-amber-400" />
              <span>Manual Add</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Projects */}
        <div className="p-5 rounded-2xl bg-[#0b0f1d]/90 border border-white/[0.08] shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-slate-400">Total Projects</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <FolderGit2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white">
            {totalProjects}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">In local storage database</p>
        </div>

        {/* Published Projects */}
        <div className="p-5 rounded-2xl bg-[#0b0f1d]/90 border border-white/[0.08] shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-slate-400">Published Live</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Globe className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-emerald-400">
            {publishedProjects}
          </div>
          <p className="text-[11px] text-emerald-500/80 mt-1">Visible on public portfolio</p>
        </div>

        {/* Draft Projects */}
        <div className="p-5 rounded-2xl bg-[#0b0f1d]/90 border border-white/[0.08] shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-slate-400">Drafts</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-amber-400">
            {draftProjects}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Unpublished WIPs</p>
        </div>

        {/* Unread Inquiries */}
        <div className="p-5 rounded-2xl bg-[#0b0f1d]/90 border border-white/[0.08] shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-slate-400">New Inquiries</span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-purple-400">
            {unreadMessages}
          </div>
          <Link to="/admin/messages" className="text-[11px] text-indigo-400 hover:underline mt-1">
            Check Inbox &rarr;
          </Link>
        </div>

      </div>

      {/* AI Assistant Banner / Quick Entry */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-950/40 via-[#0b0f1d] to-amber-950/20 border border-white/[0.1] shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            Zero-Code Project Publishing
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Add a New Project in 30 Seconds with AI
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Just paste raw notes, tech stack, or README text. The AI assistant extracts Problem, Solution, Highlights, and Tags, lets you preview, and publishes straight to your live portfolio.
          </p>
        </div>

        <Button
          asChild
          className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-6 py-3 rounded-xl shadow-lg shadow-amber-500/20 flex-shrink-0"
        >
          <Link to="/admin/ai-assistant">
            Launch AI Assistant &rarr;
          </Link>
        </Button>
      </div>

      {/* Recent Projects Table / List */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0b0f1d]/90 border border-white/[0.08] shadow-xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">
              Recent Projects
            </h3>
            <p className="text-xs text-slate-400">
              Live status and quick management actions
            </p>
          </div>

          <Link
            to="/admin/projects"
            className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-white/[0.06] overflow-x-auto">
          {projects.map((p) => (
            <div
              key={p.id}
              className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.02] px-2 rounded-xl transition-colors"
            >
              {/* Left Info */}
              <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                <button
                  type="button"
                  onClick={() => handleToggleFeatured(p.id)}
                  className={`p-2 rounded-xl transition-colors ${
                    p.featured
                      ? "text-amber-400 bg-amber-500/10 border border-amber-500/20"
                      : "text-slate-500 hover:text-slate-300 bg-white/[0.02]"
                  }`}
                  title={p.featured ? "Featured Project" : "Click to feature"}
                >
                  <Star className="w-4 h-4 fill-current" />
                </button>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-sm font-bold text-white truncate">
                      {p.title}
                    </h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] text-slate-300 border border-white/[0.06]">
                      {p.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                    {p.subtitle || p.shortDescription}
                  </p>
                </div>
              </div>

              {/* Right Controls */}
              <div className="flex items-center gap-2.5 self-end sm:self-center">
                {/* Publish Toggle Button */}
                <button
                  type="button"
                  onClick={() => handleTogglePublish(p.id)}
                  className={`px-3 py-1 rounded-full text-xs font-mono font-medium transition-all ${
                    p.status === "Published"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 hover:bg-emerald-500/20"
                      : "bg-amber-500/10 text-amber-300 border border-amber-500/25 hover:bg-amber-500/20"
                  }`}
                >
                  {p.status}
                </button>

                {/* Edit Link */}
                <Button
                  asChild
                  size="sm"
                  variant="ghost"
                  className="w-8 h-8 p-0 text-slate-400 hover:text-white"
                  title="Edit Project"
                >
                  <Link to={`/admin/projects/${p.id}/edit`}>
                    <Edit3 className="w-4 h-4" />
                  </Link>
                </Button>

                {/* Live Demo Link */}
                {p.liveUrl && (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-slate-400 hover:text-amber-400 transition-colors"
                    title="Open Live App"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}

                {/* Delete Button */}
                <button
                  type="button"
                  onClick={() => handleDelete(p.id, p.title)}
                  className="p-2 rounded-lg text-slate-400 hover:text-rose-400 transition-colors"
                  title="Delete Project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;

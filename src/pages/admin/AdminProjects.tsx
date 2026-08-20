import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FolderGit2,
  Plus,
  Search,
  Filter,
  Edit3,
  Trash2,
  ExternalLink,
  Github,
  Star,
  Sparkles,
  CheckCircle2,
  Clock,
  Eye,
  EyeOff,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { projectStore } from "@/lib/projectStore";
import { ProjectItem } from "@/lib/types";
import { toast } from "sonner";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

const AdminProjects = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  // Confirmation dialog state
  const [unpublishTarget, setUnpublishTarget] = useState<{ id: string; title: string } | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);

  const loadProjects = () => {
    setProjects(projectStore.getProjects());
  };

  useEffect(() => {
    loadProjects();
    const unsub = projectStore.subscribe(loadProjects);
    return unsub;
  }, []);

  const handlePublish = (id: string) => {
    const updated = projectStore.publishProject(id);
    if (updated) {
      toast.success(`✅ "${updated.title}" is now live on your public portfolio!`);
    }
  };

  const handleUnpublish = () => {
    if (!unpublishTarget) return;
    const updated = projectStore.unpublishProject(unpublishTarget.id);
    if (updated) {
      toast.success(`"${updated.title}" moved to Drafts. Removed from public portfolio.`);
    }
    setUnpublishTarget(null);
  };

  const handleToggleFeatured = (id: string) => {
    const updated = projectStore.toggleFeaturedStatus(id);
    if (updated) {
      toast.success(`Project ${updated.featured ? "marked as Featured ⭐" : "unmarked from Featured"}`);
    }
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    projectStore.deleteProject(deleteTarget.id);
    toast.success(`Permanently deleted "${deleteTarget.title}"`);
    setDeleteTarget(null);
  };

  const filtered = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory = filterCategory === "All" || p.category === filterCategory;
    const matchesStatus = filterStatus === "All" || p.status === filterStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Projects Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Create, edit, publish, and structure all projects rendered on your portfolio.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            asChild
            className="bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-bold text-xs py-2 px-4 rounded-xl shadow-md shadow-amber-500/20 gap-1.5"
          >
            <Link to="/admin/ai-assistant">
              <Sparkles className="w-4 h-4" />
              <span>Generate with AI</span>
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.12] text-white text-xs py-2 px-4 rounded-xl gap-1.5"
          >
            <Link to="/admin/projects/new">
              <Plus className="w-4 h-4 text-amber-400" />
              <span>Add Manually</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#0b0f1d]/90 border border-white/[0.08] flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <Input
            type="text"
            placeholder="Search projects by title, tech stack, or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-slate-500 text-xs rounded-xl"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          {/* Category Filter */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-[#0e1424] border border-white/[0.1] text-xs text-slate-300 rounded-xl px-3 py-2 outline-none focus:ring-1 focus:ring-amber-400"
          >
            <option value="All">All Categories</option>
            <option value="Full Stack">Full Stack</option>
            <option value="AI & Data">AI & Data</option>
            <option value="Web App">Web App</option>
            <option value="Mobile">Mobile</option>
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-[#0e1424] border border-white/[0.1] text-xs text-slate-300 rounded-xl px-3 py-2 outline-none focus:ring-1 focus:ring-amber-400"
          >
            <option value="All">All Statuses</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Projects Table */}
      <div className="p-6 rounded-3xl bg-[#0b0f1d]/90 border border-white/[0.08] shadow-xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <FolderGit2 className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white">No projects found</h3>
            <p className="text-xs text-slate-400 mt-1 mb-4">
              Try adjusting your search query or add a new project.
            </p>
            <Button
              asChild
              className="bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold rounded-xl"
            >
              <Link to="/admin/ai-assistant">
                <Sparkles className="w-4 h-4 mr-1.5" />
                Create with AI
              </Link>
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/[0.08] text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="pb-3 font-medium">Project</th>
                  <th className="pb-3 font-medium">Category</th>
                  <th className="pb-3 font-medium">Tech Stack</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Featured</th>
                  <th className="pb-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                    
                    {/* Title & Subtitle */}
                    <td className="py-4 pr-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm hover:text-amber-300 transition-colors">
                            {p.title}
                          </span>
                        </div>
                        <p className="text-slate-400 line-clamp-1 mt-0.5 max-w-xs">
                          {p.subtitle || p.shortDescription}
                        </p>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 pr-4">
                      <span className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] font-mono text-[11px] text-slate-300">
                        {p.category}
                      </span>
                    </td>

                    {/* Tech Badges */}
                    <td className="py-4 pr-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {p.tags.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded bg-white/[0.03] text-slate-300 border border-white/[0.06] text-[10px] font-mono"
                          >
                            {t}
                          </span>
                        ))}
                        {p.tags.length > 3 && (
                          <span className="text-[10px] text-slate-500 font-mono self-center">
                            +{p.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 pr-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-medium select-none ${
                          p.status === "Published"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25"
                            : "bg-amber-500/10 text-amber-300 border border-amber-500/25"
                        }`}
                      >
                        {p.status === "Published" ? "● Published" : "◌ Draft"}
                      </span>
                    </td>

                    {/* Featured Toggle */}
                    <td className="py-4 pr-4">
                      <button
                        type="button"
                        onClick={() => handleToggleFeatured(p.id)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          p.featured
                            ? "text-amber-400 bg-amber-500/10 border border-amber-500/25"
                            : "text-slate-600 hover:text-slate-300 bg-white/[0.02]"
                        }`}
                        title={p.featured ? "Featured Project" : "Click to feature"}
                      >
                        <Star className="w-4 h-4 fill-current" />
                      </button>
                    </td>

                    {/* Actions — status-specific */}
                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">

                        {/* Edit — always visible */}
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

                        {p.status === "Published" ? (
                          /* Published: Unpublish */
                          <button
                            type="button"
                            onClick={() => setUnpublishTarget({ id: p.id, title: p.title })}
                            className="px-2.5 py-1.5 rounded-xl text-xs font-medium bg-amber-500/10 text-amber-300 border border-amber-500/25 hover:bg-amber-500/20 transition-all flex items-center gap-1"
                            title="Unpublish — move to Drafts"
                          >
                            <EyeOff className="w-3.5 h-3.5" />
                            Unpublish
                          </button>
                        ) : (
                          /* Draft: Preview + Publish + Delete */
                          <>
                            {p.liveUrl && (
                              <a
                                href={p.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg text-slate-400 hover:text-amber-400 transition-colors"
                                title="Preview"
                              >
                                <Eye className="w-4 h-4" />
                              </a>
                            )}

                            <button
                              type="button"
                              onClick={() => handlePublish(p.id)}
                              className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 hover:bg-emerald-500/25 transition-all flex items-center gap-1"
                              title="Publish to portfolio"
                            >
                              <Send className="w-3.5 h-3.5" />
                              Publish
                            </button>

                            <button
                              type="button"
                              onClick={() => setDeleteTarget({ id: p.id, title: p.title })}
                              className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                              title="Delete permanently"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Unpublish Confirmation ── */}
      <ConfirmDialog
        open={!!unpublishTarget}
        onOpenChange={(open) => !open && setUnpublishTarget(null)}
        title="Unpublish this project?"
        description="This will remove it from your public portfolio, but your project will remain safely saved in Drafts. You can publish it again anytime."
        confirmLabel="Unpublish"
        confirmVariant="warning"
        onConfirm={handleUnpublish}
      />

      {/* ── Delete Confirmation ── */}
      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete this project permanently?"
        description="This action cannot be undone. All project data including description, technologies, URLs, and images will be permanently removed."
        confirmLabel="Delete Permanently"
        confirmVariant="danger"
        onConfirm={handleDelete}
      />

    </div>
  );
};

export default AdminProjects;

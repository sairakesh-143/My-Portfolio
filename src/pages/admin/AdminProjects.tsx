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
            Manage and organize all your portfolio projects with live publishing.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/admin/projects/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold text-xs shadow-md shadow-purple-500/25 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add New Project</span>
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#0E1322]/90 border border-slate-800 flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <Input
            type="text"
            placeholder="Search projects by title, tech stack, or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-dark-850 border-slate-800 text-white placeholder:text-slate-500 text-xs rounded-xl focus:border-purple-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 sm:pb-0">
          {/* Category Filter */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-dark-850 border border-slate-800 text-xs text-slate-300 rounded-xl px-3 py-2 outline-none focus:border-purple-500"
          >
            <option value="All">All Categories</option>
            <option value="AI & Data">AI / ML</option>
            <option value="Full Stack">Full Stack</option>
            <option value="Web App">Web App</option>
            <option value="Mobile">Mobile / Tools</option>
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-dark-850 border border-slate-800 text-xs text-slate-300 rounded-xl px-3 py-2 outline-none focus:border-purple-500"
          >
            <option value="All">All Statuses</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Projects Container: Desktop Table + Mobile Card View */}
      <div className="p-4 sm:p-6 rounded-2xl bg-[#0E1322]/90 border border-slate-800 shadow-xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <FolderGit2 className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white">No projects found</h3>
            <p className="text-xs text-slate-400 mt-1 mb-4">
              Try adjusting your search query or add a new project.
            </p>
            <Link
              to="/admin/projects/new"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-semibold"
            >
              <Plus className="w-4 h-4" />
              Add Project
            </Link>
          </div>
        ) : (
          <>
            {/* Desktop Table View (hidden on small screens) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-slate-800 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="pb-3 font-medium">Project</th>
                    <th className="pb-3 font-medium">Category</th>
                    <th className="pb-3 font-medium">Tech Stack</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Featured</th>
                    <th className="pb-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {filtered.map((p) => (
                    <tr key={p.id} className="hover:bg-dark-850/50 transition-colors">
                      
                      {/* Title & Subtitle */}
                      <td className="py-4 pr-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm hover:text-purple-300 transition-colors">
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
                        <span className="px-2.5 py-1 rounded-lg bg-dark-850 border border-slate-800 font-mono text-[11px] text-slate-300">
                          {p.category}
                        </span>
                      </td>

                      {/* Tech Badges */}
                      <td className="py-4 pr-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {p.tags.slice(0, 3).map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 rounded bg-dark-800 text-slate-300 border border-slate-700/60 text-[10px]"
                            >
                              {t}
                            </span>
                          ))}
                          {p.tags.length > 3 && (
                            <span className="text-[10px] text-purple-400 font-mono self-center">
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
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                              : "bg-amber-500/10 text-amber-300 border border-amber-500/30"
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
                              : "text-slate-600 hover:text-slate-300 bg-dark-850"
                          }`}
                          title={p.featured ? "Featured Project" : "Click to feature"}
                        >
                          <Star className="w-4 h-4 fill-current" />
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
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
                            <button
                              type="button"
                              onClick={() => setUnpublishTarget({ id: p.id, title: p.title })}
                              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-amber-500/10 text-amber-300 border border-amber-500/25 hover:bg-amber-500/20 transition-all flex items-center gap-1"
                              title="Unpublish"
                            >
                              <EyeOff className="w-3.5 h-3.5" />
                              <span>Draft</span>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handlePublish(p.id)}
                              className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 hover:bg-emerald-500/25 transition-all flex items-center gap-1"
                              title="Publish"
                            >
                              <Send className="w-3.5 h-3.5" />
                              <span>Publish</span>
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => setDeleteTarget({ id: p.id, title: p.title })}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards View (displayed on phones & small screens) */}
            <div className="md:hidden space-y-3">
              {filtered.map((p) => (
                <div
                  key={p.id}
                  className="p-4 rounded-xl bg-dark-850/80 border border-slate-800 space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-white text-sm">
                        {p.title}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                        {p.subtitle || p.shortDescription}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-medium shrink-0 ${
                        p.status === "Published"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                          : "bg-amber-500/10 text-amber-300 border border-amber-500/30"
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    <span className="px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-[10px] text-purple-300">
                      {p.category}
                    </span>
                    {p.tags.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded bg-dark-800 text-slate-400 text-[10px]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => handleToggleFeatured(p.id)}
                      className={`p-1.5 rounded-lg text-xs flex items-center gap-1 ${
                        p.featured ? "text-amber-400" : "text-slate-500"
                      }`}
                    >
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{p.featured ? "Featured" : "Feature"}</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <Link
                        to={`/admin/projects/${p.id}/edit`}
                        className="px-2.5 py-1 rounded-lg bg-dark-800 text-slate-300 hover:text-white text-xs border border-slate-700 flex items-center gap-1"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Edit</span>
                      </Link>

                      <button
                        type="button"
                        onClick={() => setDeleteTarget({ id: p.id, title: p.title })}
                        className="p-1 rounded-lg text-rose-400 hover:bg-rose-500/10"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Confirmation Dialogs */}
      <ConfirmDialog
        open={!!unpublishTarget}
        onOpenChange={(open) => !open && setUnpublishTarget(null)}
        title="Unpublish this project?"
        description="This will remove it from your public portfolio, but it will remain saved in Drafts."
        confirmLabel="Unpublish"
        confirmVariant="warning"
        onConfirm={handleUnpublish}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete this project permanently?"
        description="This action cannot be undone. All project details will be permanently erased."
        confirmLabel="Delete Permanently"
        confirmVariant="danger"
        onConfirm={handleDelete}
      />

    </div>
  );
};

export default AdminProjects;

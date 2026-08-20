import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  Save,
  ArrowLeft,
  Sparkles,
  ExternalLink,
  Github,
  Plus,
  Trash2,
  CheckCircle2,
  FolderGit2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { projectStore } from "@/lib/projectStore";
import { ProjectItem } from "@/lib/types";
import { toast } from "sonner";

const AdminProjectForm = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Partial<ProjectItem>>({
    title: "",
    slug: "",
    subtitle: "",
    tagline: "",
    shortDescription: "",
    description: "",
    problem: "",
    solution: "",
    highlights: ["", "", ""],
    tags: [],
    category: "Full Stack",
    githubUrl: "https://github.com/sairakesh-143",
    liveUrl: "",
    status: "Published",
    featured: true,
    impactMetric: "",
    role: "Full-Stack Developer",
  });

  const [techInput, setTechInput] = useState("");

  useEffect(() => {
    if (id) {
      const existing = projectStore.getProjectById(id);
      if (existing) {
        setFormData(existing);
        setTechInput(existing.tags.join(", "));
      } else {
        toast.error("Project not found.");
        navigate("/admin/projects");
      }
    }
  }, [id, navigate]);

  const handleHighlightChange = (index: number, val: string) => {
    const updated = [...(formData.highlights || [])];
    updated[index] = val;
    setFormData({ ...formData, highlights: updated });
  };

  const addHighlight = () => {
    setFormData({
      ...formData,
      highlights: [...(formData.highlights || []), ""],
    });
  };

  const removeHighlight = (index: number) => {
    const updated = (formData.highlights || []).filter((_, i) => i !== index);
    setFormData({ ...formData, highlights: updated });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title?.trim()) {
      toast.error("Please enter a project title.");
      return;
    }

    const tags = techInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const highlights = (formData.highlights || []).filter((h) => h.trim().length > 0);

    const slug =
      formData.slug?.trim() ||
      formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

    const toSave: any = {
      ...formData,
      slug,
      tags: tags.length > 0 ? tags : ["React", "TypeScript"],
      highlights: highlights.length > 0 ? highlights : ["Real-time state & responsive architecture"],
      shortDescription: formData.shortDescription || formData.description || "",
      id: id || undefined,
    };

    const saved = projectStore.saveProject(toSave);
    toast.success(`Project "${saved.title}" saved successfully!`);
    navigate("/admin/projects");
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="w-9 h-9 text-slate-400 hover:text-white"
          >
            <Link to="/admin/projects">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>

          <div>
            <h1 className="text-2xl font-bold text-white">
              {isEditing ? `Edit: ${formData.title}` : "Create New Project"}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              {isEditing ? "Modify project parameters & presentation" : "Add a project manually to your portfolio"}
            </p>
          </div>
        </div>

        {!isEditing && (
          <Button
            asChild
            variant="outline"
            className="bg-amber-500/10 border-amber-500/30 text-amber-300 text-xs"
          >
            <Link to="/admin/ai-assistant">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              Use AI Assistant instead
            </Link>
          </Button>
        )}
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-[#0b0f1d]/90 border border-white/[0.08] shadow-2xl space-y-6">
        
        {/* Row 1: Title & Slug */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">
              Project Title <span className="text-amber-400">*</span>
            </label>
            <Input
              required
              value={formData.title || ""}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. WareMind AI"
              className="bg-white/[0.03] border-white/[0.1] text-white text-xs rounded-xl"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">
              Slug / Unique ID
            </label>
            <Input
              value={formData.slug || ""}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="e.g. waremind-ai"
              className="bg-white/[0.03] border-white/[0.1] text-white text-xs rounded-xl"
            />
          </div>
        </div>

        {/* Row 2: Subtitle & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">
              Subtitle / Tagline
            </label>
            <Input
              value={formData.subtitle || ""}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              placeholder="e.g. Smart Warehouse Operations & Order Fulfillment"
              className="bg-white/[0.03] border-white/[0.1] text-white text-xs rounded-xl"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">
              Category
            </label>
            <select
              value={formData.category || "Full Stack"}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
              className="w-full bg-[#0e1424] border border-white/[0.1] text-xs text-white rounded-xl p-2.5 outline-none focus:ring-1 focus:ring-amber-400"
            >
              <option value="Full Stack">Full Stack</option>
              <option value="AI & Data">AI & Data</option>
              <option value="Web App">Web App</option>
              <option value="Mobile">Mobile</option>
            </select>
          </div>
        </div>

        {/* Row 3: Description */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-300">
            Detailed Description
          </label>
          <Textarea
            rows={3}
            value={formData.description || ""}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Detailed narrative of what this platform does..."
            className="bg-white/[0.03] border-white/[0.1] text-white text-xs rounded-xl"
          />
        </div>

        {/* Row 4: Problem & Solution */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">
              The Problem (Context)
            </label>
            <Textarea
              rows={3}
              value={formData.problem || ""}
              onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
              placeholder="What bottlenecks or pain points existed?"
              className="bg-white/[0.03] border-white/[0.1] text-white text-xs rounded-xl"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">
              The Engineered Solution
            </label>
            <Textarea
              rows={3}
              value={formData.solution || ""}
              onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
              placeholder="How does your architecture solve it?"
              className="bg-white/[0.03] border-white/[0.1] text-white text-xs rounded-xl"
            />
          </div>
        </div>

        {/* Row 5: Technologies & Impact Metric */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">
              Technologies (comma separated)
            </label>
            <Input
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              placeholder="React, TypeScript, Node.js, Tailwind CSS"
              className="bg-white/[0.03] border-white/[0.1] text-white text-xs rounded-xl"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">
              Standout Deliverable / Metric
            </label>
            <Input
              value={formData.impactMetric || ""}
              onChange={(e) => setFormData({ ...formData, impactMetric: e.target.value })}
              placeholder="e.g. Real-Time Multi-Zone Allocation"
              className="bg-white/[0.03] border-white/[0.1] text-white text-xs rounded-xl"
            />
          </div>
        </div>

        {/* Row 6: URLs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">
              GitHub URL
            </label>
            <Input
              value={formData.githubUrl || ""}
              onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
              placeholder="https://github.com/sairakesh-143/..."
              className="bg-white/[0.03] border-white/[0.1] text-white text-xs rounded-xl"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">
              Live Demo URL
            </label>
            <Input
              value={formData.liveUrl || ""}
              onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
              placeholder="https://..."
              className="bg-white/[0.03] border-white/[0.1] text-white text-xs rounded-xl"
            />
          </div>
        </div>

        {/* Row 7: Key Capabilities / Highlights list */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-slate-300">
              Key Capabilities & Highlights
            </label>
            <button
              type="button"
              onClick={addHighlight}
              className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Highlight
            </button>
          </div>

          <div className="space-y-2">
            {(formData.highlights || []).map((h, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Input
                  value={h}
                  onChange={(e) => handleHighlightChange(idx, e.target.value)}
                  placeholder={`Highlight #${idx + 1}`}
                  className="bg-white/[0.03] border-white/[0.1] text-white text-xs rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => removeHighlight(idx)}
                  className="p-2 text-slate-500 hover:text-rose-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Row 8: Status & Featured Toggles */}
        <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-white/[0.08]">
          <div className="flex items-center gap-3">
            <label className="text-xs font-medium text-slate-300">Publishing Status:</label>
            <select
              value={formData.status || "Published"}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="bg-[#0e1424] border border-white/[0.1] text-xs text-white rounded-xl px-3 py-1.5"
            >
              <option value="Published">Published (Live)</option>
              <option value="Draft">Draft (Hidden)</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="featured-check"
              checked={formData.featured ?? true}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="rounded bg-white/[0.05] border-white/[0.2] text-amber-500 focus:ring-0 cursor-pointer"
            />
            <label htmlFor="featured-check" className="text-xs text-slate-300 cursor-pointer">
              Mark as Featured Project ⭐
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-3 pt-4 border-t border-white/[0.08]">
          <Button
            asChild
            variant="outline"
            className="bg-white/[0.03] border-white/[0.1] text-xs rounded-xl"
          >
            <Link to="/admin/projects">Cancel</Link>
          </Button>

          <Button
            type="submit"
            className="bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-bold text-xs px-6 py-2.5 rounded-xl shadow-lg shadow-amber-500/25"
          >
            <Save className="w-4 h-4 mr-1.5" />
            {isEditing ? "Update Project" : "Save & Publish Project"}
          </Button>
        </div>

      </form>

    </div>
  );
};

export default AdminProjectForm;

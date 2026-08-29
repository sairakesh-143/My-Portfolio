import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  Save,
  ArrowLeft,
  Sparkles,
  Plus,
  Trash2,
  Loader2,
  X,
  Send,
  Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { projectStore } from "@/lib/projectStore";
import { ProjectItem } from "@/lib/types";
import { generateProjectWithBuiltinAI } from "@/lib/aiProjectGenerator";
import { toast } from "sonner";

// ─── AI Field Generator ─────────────────────────────────────────────────────

type AiTarget =
  | "description"
  | "problem"
  | "solution"
  | "subtitle"
  | "tagline"
  | "highlights"
  | "impactMetric"
  | "shortDescription"
  | null;

interface AiPanelProps {
  target: AiTarget;
  projectTitle: string;
  currentValue: string;
  onAccept: (value: string) => void;
  onClose: () => void;
}

function AiFieldPanel({ target, projectTitle, currentValue, onAccept, onClose }: AiPanelProps) {
  const [prompt, setPrompt] = useState("");
  const [generated, setGenerated] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    setGenerated("");
    setPrompt("");
  }, [target]);

  const fieldLabel: Record<NonNullable<AiTarget>, string> = {
    description: "Detailed Description",
    problem: "Problem Statement",
    solution: "Engineered Solution",
    subtitle: "Subtitle",
    tagline: "Tagline",
    highlights: "Key Highlights (bullet points)",
    impactMetric: "Impact Metric / Standout Deliverable",
    shortDescription: "Short Description",
  };

  const fieldHints: Record<NonNullable<AiTarget>, string> = {
    description:
      'e.g. "Write a detailed description for my warehouse AI system that handles multi-zone inventory"',
    problem: 'e.g. "Describe the pain point this solves for fulfillment centers"',
    solution: 'e.g. "Explain how the order prioritization engine works technically"',
    subtitle: 'e.g. "Write a punchy subtitle for a finance analytics dashboard"',
    tagline: 'e.g. "Create a professional tagline for a healthcare fraud detection system"',
    highlights:
      'e.g. "Generate 4 bullet points highlighting the key technical features"',
    impactMetric: 'e.g. "Write a short standout metric like Predictive Cash Flow Insights"',
    shortDescription:
      'e.g. "Write a 1-sentence description suitable for a portfolio card"',
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please describe what you want the AI to write.");
      return;
    }
    setLoading(true);
    setGenerated("");

    try {
      // Craft high quality output directly tailored to user request
      let output = craftFromPrompt(target!, prompt, projectTitle);

      if (target === "highlights" || target === "description") {
        try {
          const result = generateProjectWithBuiltinAI({
            name: projectTitle || "My Project",
            rawText: prompt,
            notes: `Field to generate: ${target}. User request: ${prompt}. Current value: ${currentValue}`,
          });
          if (target === "highlights" && result.highlights && result.highlights.length > 0) {
            output = result.highlights.join("\n");
          } else if (target === "description" && result.description && result.description.length > 30) {
            output = result.description;
          }
        } catch {
          // fallback to crafted output
        }
      }

      setGenerated(output);
    } catch {
      toast.error("AI generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = () => {
    if (!generated) return;
    onAccept(generated);
    onClose();
    toast.success(`✨ AI content applied to ${fieldLabel[target!]}`);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-xl bg-[#0c1020] border border-indigo-500/30 rounded-2xl shadow-2xl shadow-indigo-500/10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-indigo-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">AI Write for Me</p>
              <p className="text-[11px] text-indigo-400 font-mono">
                → {target ? fieldLabel[target] : ""}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          {/* Instruction textarea */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">
              Tell the AI what to write:
            </label>
            <Textarea
              ref={inputRef}
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleGenerate();
              }}
              placeholder={target ? fieldHints[target] : "Describe what you want..."}
              className="bg-white/[0.03] border-indigo-500/20 focus:border-indigo-500/50 text-white text-xs rounded-xl resize-none"
            />
            <p className="text-[10px] text-slate-500">Ctrl+Enter to generate</p>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-2.5 rounded-xl gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                Generate with AI
              </>
            )}
          </Button>

          {/* Generated output */}
          {generated && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                <p className="text-[11px] font-mono text-indigo-400 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" /> AI Generated
                </p>
                <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-line">
                  {generated}
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  onClick={() => setGenerated("")}
                  className="flex-1 text-xs text-slate-400 hover:text-white border border-white/[0.08] rounded-xl h-9"
                >
                  Regenerate
                </Button>
                <Button
                  onClick={handleAccept}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl h-9 gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  Apply to Form
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Smart content crafter (fallback when AI engine output is thin) ─────────

function craftFromPrompt(field: NonNullable<AiTarget>, prompt: string, title: string): string {
  const t = title || "This platform";
  const p = prompt.trim().replace(/^[-•*]\s*/, "");

  switch (field) {
    case "description":
      return `${t} is an advanced software platform engineered to ${p.toLowerCase().includes("ai") ? "leverage AI to" : ""} ${p.toLowerCase()}. Built with modern architecture, high-performance APIs, and an intuitive user interface for maximum reliability and scalability.`;
    case "problem": {
      const cleanPrompt = p.charAt(0).toUpperCase() + p.slice(1).replace(/[.!?]$/, "");
      return `${cleanPrompt}. Without an automated solution, teams and users face significant operational delays, manual errors, lack of visibility, and scaling bottlenecks that limit efficiency and throughput.`;
    }
    case "solution": {
      const cleanPrompt = p.charAt(0).toUpperCase() + p.slice(1).replace(/[.!?]$/, "");
      return `${t} resolves this by ${cleanPrompt.toLowerCase()}. The system leverages automated workflows, real-time state synchronization, and a streamlined interface to ensure reliability and measurable efficiency gains.`;
    }
    case "subtitle":
      return p.charAt(0).toUpperCase() + p.slice(1);
    case "tagline":
      return p.charAt(0).toUpperCase() + p.slice(1);
    case "shortDescription":
      return `${t} — ${p.toLowerCase().replace(/[.!?]$/, "")}. Built for real-world impact and reliability.`;
    case "impactMetric":
      return p.charAt(0).toUpperCase() + p.slice(1).replace(/[.!?]$/, "");
    case "highlights": {
      const items = p
        .split(/\n|,|;/)
        .map((s) => s.replace(/^[-•*]\s*/, "").trim())
        .filter(Boolean)
        .slice(0, 5);
      return items.length > 0
        ? items.join("\n")
        : `Real-time ${p} with complete end-to-end data integrity`;
    }
    default:
      return p;
  }
}

// ─── AI Button (inline spark button per field) ───────────────────────────────

function AiBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title="Ask AI to write this"
      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-indigo-500/15 hover:bg-indigo-500/30 text-indigo-400 hover:text-indigo-300 transition-all border border-indigo-500/20"
    >
      <Sparkles className="w-3.5 h-3.5" />
    </button>
  );
}

// ─── Main Form ───────────────────────────────────────────────────────────────

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
  const [aiTarget, setAiTarget] = useState<AiTarget>(null);

  useEffect(() => {
    if (id) {
      const existing = projectStore.getProjectById(id) || projectStore.findBySlugOrTitle(id);
      if (existing) {
        const prob = existing.problem || (existing as any).problemSolution?.problem || "";
        const sol = existing.solution || (existing as any).problemSolution?.solution || "";
        setFormData({
          ...existing,
          problem: prob,
          solution: sol,
        });
        setTechInput(existing.tags ? existing.tags.join(", ") : "");
      } else {
        toast.error("Project not found.");
        navigate("/admin/projects");
      }
    }
  }, [id, navigate]);

  // ─── AI accept handler — applies generated content to the right field ──────

  const handleAiAccept = (value: string) => {
    if (!aiTarget) return;
    if (aiTarget === "highlights") {
      const lines = value.split("\n").map((l) => l.replace(/^[-•*]\s*/, "").trim()).filter(Boolean);
      setFormData((prev) => ({ ...prev, highlights: lines }));
    } else {
      setFormData((prev) => ({ ...prev, [aiTarget]: value }));
    }
  };

  const handleHighlightChange = (index: number, val: string) => {
    const updated = [...(formData.highlights || [])];
    updated[index] = val;
    setFormData({ ...formData, highlights: updated });
  };

  const addHighlight = () => {
    setFormData({ ...formData, highlights: [...(formData.highlights || []), ""] });
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

    const tags = techInput.split(",").map((t) => t.trim()).filter(Boolean);
    const highlights = (formData.highlights || []).filter((h) => h.trim().length > 0);
    const slug =
      formData.slug?.trim() ||
      formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

    const toSave: Parameters<typeof projectStore.saveProject>[0] = {
      ...formData,
      slug,
      tags: tags.length > 0 ? tags : ["React", "TypeScript"],
      highlights: highlights.length > 0 ? highlights : ["Real-time state & responsive architecture"],
      shortDescription: formData.shortDescription || formData.description || "",
      problem: formData.problem || "",
      solution: formData.solution || "",
      id: id || undefined,
    };

    const saved = projectStore.saveProject(toSave);
    toast.success(`✅ Project "${saved.title}" saved successfully!`);
    navigate("/admin/projects");
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">

      {/* AI Field Panel */}
      {aiTarget && (
        <AiFieldPanel
          target={aiTarget}
          projectTitle={formData.title || ""}
          currentValue={
            aiTarget === "highlights"
              ? (formData.highlights || []).join("\n")
              : String(formData[aiTarget] || "")
          }
          onAccept={handleAiAccept}
          onClose={() => setAiTarget(null)}
        />
      )}

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
              {isEditing
                ? "Update project fields. Click ✨ next to any field to ask the AI."
                : "Fill in manually or click ✨ on any field to get AI-generated content."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            AI-assisted editing
          </div>
        </div>
      </div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="p-6 sm:p-8 rounded-3xl bg-[#0b0f1d]/90 border border-white/[0.08] shadow-2xl space-y-6"
      >

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
            <label className="text-xs font-medium text-slate-300">Slug / Unique ID</label>
            <Input
              value={formData.slug || ""}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="e.g. waremind-ai (auto-generated if blank)"
              className="bg-white/[0.03] border-white/[0.1] text-white text-xs rounded-xl"
            />
          </div>
        </div>

        {/* Row 2: Subtitle & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-slate-300">Subtitle</label>
              <button
                type="button"
                onClick={() => setAiTarget("subtitle")}
                className="flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 font-medium"
              >
                <Sparkles className="w-3 h-3" /> Ask AI
              </button>
            </div>
            <Input
              value={formData.subtitle || ""}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              placeholder="e.g. Smart Warehouse Operations & Order Fulfillment"
              className="bg-white/[0.03] border-white/[0.1] text-white text-xs rounded-xl"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Category</label>
            <select
              value={formData.category || "Full Stack"}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as ProjectItem["category"] })}
              className="w-full bg-[#0e1424] border border-white/[0.1] text-xs text-white rounded-xl p-2.5 outline-none focus:ring-1 focus:ring-amber-400"
            >
              <option value="Full Stack">Full Stack</option>
              <option value="AI & Data">AI & Data</option>
              <option value="Web App">Web App</option>
              <option value="Mobile">Mobile</option>
            </select>
          </div>
        </div>

        {/* Tagline */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-slate-300">Tagline</label>
            <button
              type="button"
              onClick={() => setAiTarget("tagline")}
              className="flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 font-medium"
            >
              <Sparkles className="w-3 h-3" /> Ask AI
            </button>
          </div>
          <Input
            value={formData.tagline || ""}
            onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
            placeholder="e.g. Intelligent Warehouse Operations & Multi-Zone Fulfillment"
            className="bg-white/[0.03] border-white/[0.1] text-white text-xs rounded-xl"
          />
        </div>

        {/* Short Description */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-slate-300">Short Description (Portfolio Card)</label>
            <button
              type="button"
              onClick={() => setAiTarget("shortDescription")}
              className="flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 font-medium"
            >
              <Sparkles className="w-3 h-3" /> Ask AI
            </button>
          </div>
          <Textarea
            rows={2}
            value={formData.shortDescription || ""}
            onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
            placeholder="1–2 sentences shown on project cards..."
            className="bg-white/[0.03] border-white/[0.1] text-white text-xs rounded-xl"
          />
        </div>

        {/* Detailed Description */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-slate-300">Detailed Description</label>
            <button
              type="button"
              onClick={() => setAiTarget("description")}
              className="flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 font-medium"
            >
              <Sparkles className="w-3 h-3" /> Ask AI
            </button>
          </div>
          <Textarea
            rows={4}
            value={formData.description || ""}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Full narrative of what this platform does, how it was built, and what it achieves..."
            className="bg-white/[0.03] border-white/[0.1] text-white text-xs rounded-xl"
          />
        </div>

        {/* Problem & Solution */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-slate-300">The Problem</label>
              <button
                type="button"
                onClick={() => setAiTarget("problem")}
                className="flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 font-medium"
              >
                <Sparkles className="w-3 h-3" /> Ask AI
              </button>
            </div>
            <Textarea
              rows={3}
              value={formData.problem || ""}
              onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
              placeholder="What bottlenecks or pain points existed before this solution?"
              className="bg-white/[0.03] border-white/[0.1] text-white text-xs rounded-xl"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-slate-300">The Solution</label>
              <button
                type="button"
                onClick={() => setAiTarget("solution")}
                className="flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 font-medium"
              >
                <Sparkles className="w-3 h-3" /> Ask AI
              </button>
            </div>
            <Textarea
              rows={3}
              value={formData.solution || ""}
              onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
              placeholder="How does your architecture solve it technically?"
              className="bg-white/[0.03] border-white/[0.1] text-white text-xs rounded-xl"
            />
          </div>
        </div>

        {/* Technologies & Impact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Technologies (comma separated)</label>
            <Input
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              placeholder="React, TypeScript, Node.js, Tailwind CSS"
              className="bg-white/[0.03] border-white/[0.1] text-white text-xs rounded-xl"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-slate-300">Standout Metric / Impact</label>
              <button
                type="button"
                onClick={() => setAiTarget("impactMetric")}
                className="flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 font-medium"
              >
                <Sparkles className="w-3 h-3" /> Ask AI
              </button>
            </div>
            <Input
              value={formData.impactMetric || ""}
              onChange={(e) => setFormData({ ...formData, impactMetric: e.target.value })}
              placeholder="e.g. Real-Time Multi-Zone Allocation"
              className="bg-white/[0.03] border-white/[0.1] text-white text-xs rounded-xl"
            />
          </div>
        </div>

        {/* URLs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">GitHub URL</label>
            <Input
              value={formData.githubUrl || ""}
              onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
              placeholder="https://github.com/sairakesh-143/..."
              className="bg-white/[0.03] border-white/[0.1] text-white text-xs rounded-xl"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Live Demo URL</label>
            <Input
              value={formData.liveUrl || ""}
              onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
              placeholder="https://..."
              className="bg-white/[0.03] border-white/[0.1] text-white text-xs rounded-xl"
            />
          </div>
        </div>

        {/* Key Highlights */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-slate-300">Key Capabilities & Highlights</label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setAiTarget("highlights")}
                className="flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 font-medium"
              >
                <Sparkles className="w-3 h-3" /> Ask AI
              </button>
              <button
                type="button"
                onClick={addHighlight}
                className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {(formData.highlights || []).map((h, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Input
                  value={h}
                  onChange={(e) => handleHighlightChange(idx, e.target.value)}
                  placeholder={`Highlight #${idx + 1} — e.g. Real-time inventory visibility across multi-zone layouts`}
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

        {/* Status & Featured */}
        <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-white/[0.08]">
          <div className="flex items-center gap-3">
            <label className="text-xs font-medium text-slate-300">Publishing Status:</label>
            <select
              value={formData.status || "Published"}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as ProjectItem["status"] })}
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

        {/* Submit */}
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

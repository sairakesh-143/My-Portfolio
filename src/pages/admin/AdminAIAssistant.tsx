import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Upload,
  FileText,
  CheckCircle2,
  ExternalLink,
  Github,
  Edit3,
  Globe,
  Star,
  Layers,
  ArrowRight,
  RefreshCw,
  Eye,
  AlertCircle,
  Lightbulb,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { generateProject } from "@/lib/aiProjectGenerator";
import { projectStore } from "@/lib/projectStore";
import { ProjectItem } from "@/lib/types";
import { toast } from "sonner";

const AdminAIAssistant = () => {
  const navigate = useNavigate();

  // Input states
  const [projectName, setProjectName] = useState("");
  const [rawNotes, setRawNotes] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [problem, setProblem] = useState("");
  const [features, setFeatures] = useState("");
  const [fileName, setFileName] = useState("");

  // Generation & Editing states
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedProject, setGeneratedProject] = useState<Partial<ProjectItem> | null>(null);
  const [activeTab, setActiveTab] = useState<"preview" | "edit">("preview");

  // Handle File Upload (README / .md / .txt)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setRawNotes((prev) => (prev ? `${prev}\n\n=== README (${file.name}) ===\n${content}` : content));
      toast.success(`Loaded ${file.name} into AI context.`);
    };
    reader.readAsText(file);
  };

  // Run AI Generation
  const handleGenerate = async () => {
    if (!projectName.trim() && !rawNotes.trim()) {
      toast.error("Please enter a project name or paste some project notes.");
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateProject({
        name: projectName || "My New Project",
        rawText: rawNotes,
        githubUrl,
        liveUrl,
        technologies,
        problem,
        features,
        notes: rawNotes,
      });

      setGeneratedProject(result);
      setActiveTab("preview");
      toast.success("AI project content generated successfully! Review below.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate project. Please check settings.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Publish to portfolio
  const handlePublish = (status: "Published" | "Draft") => {
    if (!generatedProject || !generatedProject.title) {
      toast.error("No valid project content to save.");
      return;
    }

    const toSave = {
      title: generatedProject.title,
      slug: generatedProject.slug || generatedProject.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      subtitle: generatedProject.subtitle || `${generatedProject.title} Platform`,
      tagline: generatedProject.tagline || "",
      shortDescription: generatedProject.shortDescription || generatedProject.description || "",
      description: generatedProject.description || "",
      problem: generatedProject.problem || "",
      solution: generatedProject.solution || "",
      highlights: generatedProject.highlights || [],
      tags: generatedProject.tags || ["React", "TypeScript"],
      category: generatedProject.category || "Full Stack",
      githubUrl: generatedProject.githubUrl || "https://github.com/sairakesh-143",
      liveUrl: generatedProject.liveUrl || undefined,
      imageUrl: generatedProject.imageUrl,
      status,
      featured: generatedProject.featured ?? true,
      impactMetric: generatedProject.impactMetric,
      role: generatedProject.role || "Full-Stack Developer",
    };

    const saved = projectStore.saveProject(toSave);
    toast.success(
      status === "Published"
        ? `"${saved.title}" published! It is now live on your portfolio.`
        : `"${saved.title}" saved to Drafts.`
    );
    navigate("/admin/projects");
  };

  // Quick Preset Sample Fill for Testing
  const handleLoadSample = () => {
    setProjectName("PulseSync AI");
    setTechnologies("React, TypeScript, FastAPI, Python, PostgreSQL, Redis");
    setProblem("Remote engineering teams suffer from fragmented standup updates, meeting fatigue, and lost action items across Slack and Jira.");
    setFeatures("Automated daily standup summarization\nAction item extraction with AI\nTeam velocity and bottleneck analytics\nSlack & GitHub webhook integration");
    setGithubUrl("https://github.com/sairakesh-143/pulsesync-ai");
    setLiveUrl("https://pulsesync.vercel.app");
    setRawNotes("Hackathon winner project for automated agile workflow intelligence.");
    toast.info("Loaded sample project parameters.");
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            AI Project Assistant
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Intelligent Project Generator
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Provide raw notes, tech stack, or README. The AI will formulate production-level project copy, problem/solution breakdown, and publish directly.
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={handleLoadSample}
          className="bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.1] text-xs text-amber-300 self-start sm:self-auto"
        >
          Load Example Input
        </Button>
      </div>

      {/* Main Input Form */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0b0f1d]/90 border border-white/[0.08] shadow-2xl space-y-6">
        
        {/* Project Name & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">
              Project Name <span className="text-amber-400">*</span>
            </label>
            <Input
              type="text"
              placeholder="e.g. WareMind AI / PulseSync"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="bg-white/[0.03] border-white/[0.1] text-white placeholder:text-slate-500 focus-visible:ring-amber-400 rounded-xl"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">
              Technologies (comma separated)
            </label>
            <Input
              type="text"
              placeholder="e.g. React, TypeScript, Python, Tailwind CSS, Supabase"
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
              className="bg-white/[0.03] border-white/[0.1] text-white placeholder:text-slate-500 focus-visible:ring-amber-400 rounded-xl"
            />
          </div>
        </div>

        {/* URLs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">
              GitHub Repository URL
            </label>
            <Input
              type="url"
              placeholder="https://github.com/sairakesh-143/..."
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              className="bg-white/[0.03] border-white/[0.1] text-white placeholder:text-slate-500 focus-visible:ring-amber-400 rounded-xl"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">
              Live Demo URL (Optional)
            </label>
            <Input
              type="url"
              placeholder="https://myproject.vercel.app"
              value={liveUrl}
              onChange={(e) => setLiveUrl(e.target.value)}
              className="bg-white/[0.03] border-white/[0.1] text-white placeholder:text-slate-500 focus-visible:ring-amber-400 rounded-xl"
            />
          </div>
        </div>

        {/* Problem Statement & Key Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">
              Problem Context (What problem does it solve?)
            </label>
            <Textarea
              rows={3}
              placeholder="e.g. Traditional warehouse centers suffer from inventory blind spots and slow manual order batching..."
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              className="bg-white/[0.03] border-white/[0.1] text-white placeholder:text-slate-500 focus-visible:ring-amber-400 rounded-xl resize-none text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">
              Key Features / Capabilities (1 per line or raw text)
            </label>
            <Textarea
              rows={3}
              placeholder="e.g. Real-time multi-zone allocation&#10;Automated order prioritization engine&#10;Worker route optimization"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              className="bg-white/[0.03] border-white/[0.1] text-white placeholder:text-slate-500 focus-visible:ring-amber-400 rounded-xl resize-none text-xs"
            />
          </div>
        </div>

        {/* Dropzone / Upload / Raw Text */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-300">
            Raw Description / README / Notes
          </label>
          <Textarea
            rows={4}
            placeholder="Paste your project README, rough thoughts, or copy directly here..."
            value={rawNotes}
            onChange={(e) => setRawNotes(e.target.value)}
            className="bg-white/[0.03] border-white/[0.1] text-white placeholder:text-slate-500 focus-visible:ring-amber-400 rounded-xl text-xs"
          />

          {/* File Upload Dropzone */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-dashed border-white/[0.15] hover:border-amber-500/40 transition-colors flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-medium text-white">
                  {fileName ? `Loaded: ${fileName}` : "Upload README.md or Project Notes"}
                </p>
                <p className="text-[10px] text-slate-500">
                  Markdown, text, or documentation file
                </p>
              </div>
            </div>

            <label className="cursor-pointer px-3.5 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-semibold text-slate-200 transition-colors">
              <Upload className="w-3.5 h-3.5 inline mr-1.5" />
              Browse File
              <input
                type="file"
                accept=".md,.txt,.json,.markdown"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Generate Button */}
        <Button
          type="button"
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-bold py-3.5 rounded-2xl shadow-xl shadow-amber-500/25 transition-all text-sm gap-2"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Analyzing & Formulating Portfolio Content...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>✨ Generate Structured Project</span>
            </>
          )}
        </Button>

      </div>

      {/* Generated Result & Preview Section */}
      {generatedProject && (
        <div className="space-y-6 pt-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0b0f1d] border border-white/[0.1]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <h3 className="text-base font-bold text-white">
                Generated Portfolio Preview
              </h3>
            </div>

            {/* View / Edit Mode Toggle */}
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setActiveTab("preview")}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                    activeTab === "preview"
                      ? "bg-amber-500 text-black"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Eye className="w-3.5 h-3.5 inline mr-1" />
                  Live Preview
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("edit")}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                    activeTab === "edit"
                      ? "bg-amber-500 text-black"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Edit3 className="w-3.5 h-3.5 inline mr-1" />
                  Edit Fields
                </button>
              </div>

              {/* Publish Action Buttons */}
              <Button
                type="button"
                variant="outline"
                onClick={() => handlePublish("Draft")}
                className="bg-white/[0.04] border-white/[0.12] text-slate-200 text-xs px-3.5 py-1.5 rounded-xl"
              >
                Save as Draft
              </Button>

              <Button
                type="button"
                onClick={() => handlePublish("Published")}
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs px-4 py-1.5 rounded-xl shadow-lg shadow-emerald-500/20"
              >
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                Publish Live to Portfolio
              </Button>
            </div>
          </div>

          {/* TAB 1: Live Exact Public Card Preview */}
          {activeTab === "preview" && (
            <div className="rounded-3xl bg-[#0a0e1c] border border-amber-500/40 shadow-2xl shadow-black/80 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                
                {/* Visual Mockup Column */}
                <div className="lg:col-span-5 relative bg-gradient-to-br from-[#0e1428] via-[#090d1a] to-[#060812] p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/[0.08]">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                        <span className="text-[10px] font-mono text-slate-300 ml-2">
                          {generatedProject.slug}.app
                        </span>
                      </div>
                      
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium text-amber-300 bg-amber-500/10 border border-amber-500/20">
                        {generatedProject.status || "Published"}
                      </span>
                    </div>

                    <div className="relative rounded-2xl bg-white/[0.02] border border-white/[0.08] p-5 mb-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 font-bold text-sm">
                          ⭐
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white leading-tight">
                            {generatedProject.title}
                          </h4>
                          <span className="text-xs text-amber-400 font-medium">
                            {generatedProject.category}
                          </span>
                        </div>
                      </div>

                      {generatedProject.impactMetric && (
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 font-medium">
                          <TrendingUp className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                          <span>{generatedProject.impactMetric}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5 z-10">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-slate-300 mb-1">
                      Key Highlights:
                    </p>
                    {generatedProject.highlights?.slice(0, 2).map((h) => (
                      <div key={h} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <span className="line-clamp-1">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content Column */}
                <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
                      {generatedProject.title}
                    </h3>

                    <p className="text-sm sm:text-base text-amber-400/90 font-medium mb-4">
                      {generatedProject.subtitle}
                    </p>

                    <p className="text-sm text-slate-300 leading-relaxed mb-6">
                      {generatedProject.description}
                    </p>

                    {/* Problem & Solution */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
                      <div className="p-3.5 rounded-xl bg-rose-500/[0.04] border border-rose-500/15">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-400 mb-1.5">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>The Problem</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {generatedProject.problem}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-emerald-500/[0.04] border border-emerald-500/15">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 mb-1.5">
                          <Lightbulb className="w-3.5 h-3.5" />
                          <span>Engineered Solution</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {generatedProject.solution}
                        </p>
                      </div>
                    </div>

                    {/* Tech Badges */}
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-1.5">
                        {generatedProject.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 text-xs font-mono font-medium rounded-lg bg-white/[0.04] text-slate-300 border border-white/[0.08]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-5 border-t border-white/[0.07]">
                    {generatedProject.liveUrl && (
                      <Button
                        size="sm"
                        className="bg-amber-500 text-black font-semibold text-xs rounded-xl"
                        asChild
                      >
                        <a href={generatedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-3.5 h-3.5 mr-1" />
                          Live Demo
                        </a>
                      </Button>
                    )}

                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-white/[0.04] border-white/[0.12] text-xs rounded-xl"
                      asChild
                    >
                      <a href={generatedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-3.5 h-3.5 mr-1" />
                        GitHub Code
                      </a>
                    </Button>
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* TAB 2: Inline Editor */}
          {activeTab === "edit" && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0b0f1d] border border-white/[0.1] shadow-2xl space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">Project Title</label>
                  <Input
                    value={generatedProject.title || ""}
                    onChange={(e) => setGeneratedProject({ ...generatedProject, title: e.target.value })}
                    className="bg-white/[0.03] border-white/[0.1] text-white text-xs rounded-xl"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">Category</label>
                  <select
                    value={generatedProject.category || "Full Stack"}
                    onChange={(e) => setGeneratedProject({ ...generatedProject, category: e.target.value as ProjectItem["category"] })}
                    className="w-full bg-[#0e1424] border border-white/[0.1] text-xs text-white rounded-xl p-2.5 outline-none"
                  >
                    <option value="Full Stack">Full Stack</option>
                    <option value="AI & Data">AI & Data</option>
                    <option value="Web App">Web App</option>
                    <option value="Mobile">Mobile</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Subtitle / Tagline</label>
                <Input
                  value={generatedProject.subtitle || ""}
                  onChange={(e) => setGeneratedProject({ ...generatedProject, subtitle: e.target.value })}
                  className="bg-white/[0.03] border-white/[0.1] text-white text-xs rounded-xl"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Description</label>
                <Textarea
                  rows={3}
                  value={generatedProject.description || ""}
                  onChange={(e) => setGeneratedProject({ ...generatedProject, description: e.target.value })}
                  className="bg-white/[0.03] border-white/[0.1] text-white text-xs rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">The Problem</label>
                  <Textarea
                    rows={3}
                    value={generatedProject.problem || ""}
                    onChange={(e) => setGeneratedProject({ ...generatedProject, problem: e.target.value })}
                    className="bg-white/[0.03] border-white/[0.1] text-white text-xs rounded-xl"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">The Solution</label>
                  <Textarea
                    rows={3}
                    value={generatedProject.solution || ""}
                    onChange={(e) => setGeneratedProject({ ...generatedProject, solution: e.target.value })}
                    className="bg-white/[0.03] border-white/[0.1] text-white text-xs rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Tech Stack (comma separated)</label>
                <Input
                  value={generatedProject.tags?.join(", ") || ""}
                  onChange={(e) =>
                    setGeneratedProject({
                      ...generatedProject,
                      tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
                    })
                  }
                  className="bg-white/[0.03] border-white/[0.1] text-white text-xs rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/[0.08]">
                <Button
                  type="button"
                  onClick={() => setActiveTab("preview")}
                  className="bg-amber-500 text-black font-bold text-xs rounded-xl"
                >
                  Save Edits & View Preview &rarr;
                </Button>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
};

export default AdminAIAssistant;

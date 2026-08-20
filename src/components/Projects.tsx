import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Github,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  AlertCircle,
  Lightbulb,
  FolderGit2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { projectStore } from "@/lib/projectStore";
import { ProjectItem } from "@/lib/types";

const Projects = () => {
  const [projects, setProjects] = useState<ProjectItem[]>(projectStore.getPublishedProjects());
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    const loadPublished = () => {
      setProjects(projectStore.getPublishedProjects());
    };
    loadPublished();
    const unsub = projectStore.subscribe(loadPublished);
    return unsub;
  }, []);

  return (
    <section id="projects" className="py-20 md:py-28 relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-1/4 w-[400px] h-[400px] bg-indigo-600/8 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Featured Work
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Real-World Products & AI Systems
            </h2>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
              Every project is engineered to solve a concrete problem with production-level architecture, responsive UX, and real data workflows.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>Showing</span>
            <span className="text-amber-400 font-bold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
              {projects.length} Published Projects
            </span>
          </div>
        </div>

        {/* Dynamic Projects List */}
        {projects.length === 0 ? (
          <div className="py-16 text-center rounded-3xl bg-[#0a0e1c] border border-white/[0.08] p-8">
            <FolderGit2 className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white">No published projects</h3>
            <p className="text-xs text-slate-400 mt-1">
              Add a new project from the Admin Dashboard to have it appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-12 lg:space-y-16">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative rounded-3xl bg-[#0a0e1c] border border-white/[0.09] hover:border-amber-500/35 transition-all duration-300 shadow-2xl shadow-black/60 overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                  
                  {/* Left Column: Visual Frame */}
                  <div className="lg:col-span-5 relative bg-gradient-to-br from-[#0e1428] via-[#090d1a] to-[#060812] p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/[0.07] overflow-hidden">
                    
                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-transparent to-amber-500/10 opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none" />

                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                          <span className="text-[10px] font-mono text-slate-300 ml-2">
                            {project.slug || project.id}.app
                          </span>
                        </div>
                        
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium text-amber-300 bg-amber-500/10 border border-amber-500/20">
                          {project.status || "Production Ready"}
                        </span>
                      </div>

                      <div className="relative rounded-2xl bg-white/[0.02] border border-white/[0.08] p-5 mb-4 group-hover:border-amber-500/30 transition-all">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 font-bold text-sm">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-white leading-tight">
                              {project.title}
                            </h4>
                            <span className="text-xs text-amber-400 font-medium">
                              {project.category}
                            </span>
                          </div>
                        </div>

                        {project.impactMetric && (
                          <div className="flex items-center gap-2 p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 font-medium">
                            <TrendingUp className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                            <span>{project.impactMetric}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1.5 z-10">
                      <p className="text-[11px] font-mono uppercase tracking-wider text-slate-300 mb-1">
                        Key Highlights:
                      </p>
                      {project.highlights.slice(0, 2).map((h) => (
                        <div key={h} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                          <span className="line-clamp-1">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Details & Structured Problem-Solution */}
                  <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover:text-amber-300 transition-colors">
                          {project.title}
                        </h3>
                      </div>

                      <p className="text-sm sm:text-base text-amber-400/90 font-medium mb-4">
                        {project.subtitle || project.tagline}
                      </p>

                      <p className="text-sm text-slate-300 leading-relaxed mb-6">
                        {project.description || project.shortDescription}
                      </p>

                      {/* Problem / Solution structured blocks */}
                      {(project.problem || project.solution) && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
                          {project.problem && (
                            <div className="p-3.5 rounded-xl bg-rose-500/[0.04] border border-rose-500/15">
                              <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-400 mb-1.5">
                                <AlertCircle className="w-3.5 h-3.5" />
                                <span>The Problem</span>
                              </div>
                              <p className="text-xs text-slate-300 leading-relaxed">
                                {project.problem}
                              </p>
                            </div>
                          )}

                          {project.solution && (
                            <div className="p-3.5 rounded-xl bg-emerald-500/[0.04] border border-emerald-500/15">
                              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 mb-1.5">
                                <Lightbulb className="w-3.5 h-3.5" />
                                <span>Engineered Solution</span>
                              </div>
                              <p className="text-xs text-slate-300 leading-relaxed">
                                {project.solution}
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Technology Badges */}
                      <div className="mb-8">
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 text-xs font-mono font-medium rounded-lg bg-white/[0.04] text-slate-300 border border-white/[0.08] group-hover:border-white/[0.15] transition-colors"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-5 border-t border-white/[0.07]">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        {project.liveUrl && (
                          <Button
                            size="sm"
                            className="bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs px-4 py-2 rounded-xl shadow-md shadow-amber-500/15 transition-all gap-1.5"
                            asChild
                          >
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-3.5 h-3.5" />
                              Live Demo
                            </a>
                          </Button>
                        )}

                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.12] hover:border-white/[0.2] text-slate-200 hover:text-white text-xs font-medium px-4 py-2 rounded-xl transition-all gap-1.5"
                          asChild
                        >
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="w-3.5 h-3.5" />
                            GitHub Code
                          </a>
                        </Button>
                      </div>

                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setSelectedProject(project)}
                        className="text-xs text-slate-400 hover:text-amber-300 hover:bg-white/[0.04] rounded-xl transition-colors gap-1 px-3"
                      >
                        <span>Case Study & Architecture</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Button>
                    </div>

                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Project Case Study Dialog */}
        <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
          <DialogContent className="max-w-2xl bg-[#0b0f1d] border border-white/[0.12] text-white p-6 sm:p-8 rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
            {selectedProject && (
              <div className="space-y-6">
                <DialogHeader className="text-left space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
                      {selectedProject.category}
                    </span>
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                      {selectedProject.status}
                    </span>
                  </div>
                  <DialogTitle className="text-2xl font-bold text-white">
                    {selectedProject.title}
                  </DialogTitle>
                  <DialogDescription className="text-sm text-slate-300">
                    {selectedProject.subtitle || selectedProject.tagline}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 text-sm text-slate-300">
                  {selectedProject.problem && (
                    <div className="p-4 rounded-2xl bg-rose-500/[0.05] border border-rose-500/20 space-y-1.5">
                      <h5 className="font-semibold text-rose-300 text-xs uppercase tracking-wider">
                        Problem Context:
                      </h5>
                      <p className="text-slate-200">{selectedProject.problem}</p>
                    </div>
                  )}

                  {selectedProject.solution && (
                    <div className="p-4 rounded-2xl bg-emerald-500/[0.05] border border-emerald-500/20 space-y-1.5">
                      <h5 className="font-semibold text-emerald-300 text-xs uppercase tracking-wider">
                        Engineered Solution:
                      </h5>
                      <p className="text-slate-200">{selectedProject.solution}</p>
                    </div>
                  )}

                  {selectedProject.highlights && selectedProject.highlights.length > 0 && (
                    <div>
                      <h5 className="font-semibold text-slate-300 text-xs uppercase tracking-wider mb-2">
                        Key Capabilities & Deliverables:
                      </h5>
                      <ul className="space-y-2">
                        {selectedProject.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2.5 text-xs text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <h5 className="font-semibold text-slate-300 text-xs uppercase tracking-wider mb-2">
                      Technology Stack:
                    </h5>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.tags.map((t) => (
                        <span key={t} className="px-2.5 py-1 text-xs font-mono rounded-lg bg-white/[0.06] text-slate-200 border border-white/[0.08]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/[0.08]">
                  <Button
                    variant="outline"
                    className="bg-white/[0.04] border-white/[0.12] text-xs rounded-xl"
                    asChild
                  >
                    <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-3.5 h-3.5 mr-1.5" />
                      View Code
                    </a>
                  </Button>
                  {selectedProject.liveUrl && (
                    <Button
                      className="bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs rounded-xl"
                      asChild
                    >
                      <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                        Open Live Demo
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default Projects;

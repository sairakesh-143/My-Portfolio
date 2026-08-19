import { useState } from "react";
import { ExternalLink, Github, Layers, CheckCircle2, ArrowUpRight, Sparkles, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { portfolioData, Project } from "@/data/portfolioData";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-300 mb-4">
            <Layers className="w-3.5 h-3.5" />
            Engineered Systems
          </div>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            A selection of production-grade full-stack web applications and AI solutions designed to solve real operational and analytical challenges.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {portfolioData.projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="card-premium rounded-2xl overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Visual Header Mockup */}
                <div className="relative h-48 bg-gradient-to-br from-[#0e1628] via-[#111936] to-[#1e1338] p-5 flex flex-col justify-between border-b border-white/[0.08] overflow-hidden">
                  {/* Subtle Grid Pattern */}
                  <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />
                  
                  {/* Top Badges */}
                  <div className="flex items-center justify-between relative z-10">
                    <span className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-md bg-white/[0.08] text-indigo-300 border border-white/[0.08] backdrop-blur-md">
                      {project.category}
                    </span>
                    <span className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {project.status}
                    </span>
                  </div>

                  {/* Visual Center Preview */}
                  <div className="relative z-10">
                    <h4 className="text-xl font-bold text-white tracking-tight group-hover:text-indigo-200 transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-xs text-slate-400 font-mono line-clamp-1">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Ambient Glow */}
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl group-hover:bg-indigo-500/30 transition-all pointer-events-none" />
                </div>

                {/* Card Content Body */}
                <div className="p-6">
                  <p className="text-sm text-slate-300 leading-relaxed mb-5">
                    {project.description}
                  </p>

                  {/* Problem & Solution Mini Box */}
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-2 mb-5">
                    <div className="text-xs text-slate-300">
                      <span className="text-indigo-400 font-semibold">Solution: </span>
                      {project.problemSolution.solution}
                    </div>
                  </div>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 text-xs font-mono font-medium rounded-md bg-white/[0.04] text-slate-300 border border-white/[0.06]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="p-6 pt-0 flex flex-col gap-2">
                <div className="grid grid-cols-2 gap-2">
                  {project.liveUrl && (
                    <Button
                      size="sm"
                      className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-lg transition-all gap-1.5"
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
                    className="bg-white/[0.03] hover:bg-white/[0.08] border-white/[0.1] text-slate-200 hover:text-white text-xs font-medium rounded-lg transition-all gap-1.5"
                    asChild
                  >
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-3.5 h-3.5" />
                      Code
                    </a>
                  </Button>
                </div>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setSelectedProject(project)}
                  className="w-full text-xs text-slate-400 hover:text-indigo-300 hover:bg-white/[0.04] rounded-lg transition-colors gap-1"
                >
                  <span>View Architecture & Case Study</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Case Study Dialog */}
        <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
          <DialogContent className="max-w-2xl bg-[#0b0f19] border border-white/[0.1] text-white p-6 sm:p-8 rounded-2xl shadow-2xl">
            {selectedProject && (
              <div className="space-y-6">
                <DialogHeader className="text-left space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 rounded-full">
                      {selectedProject.category}
                    </span>
                    <span className="text-xs font-mono text-emerald-400">
                      • {selectedProject.status}
                    </span>
                  </div>
                  <DialogTitle className="text-2xl font-bold text-white">
                    {selectedProject.title}
                  </DialogTitle>
                  <DialogDescription className="text-sm text-slate-400">
                    {selectedProject.subtitle}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 text-sm text-slate-300">
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-2">
                    <h5 className="font-semibold text-white text-xs uppercase tracking-wider text-slate-400">
                      Problem Context:
                    </h5>
                    <p>{selectedProject.problemSolution.problem}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/20 space-y-2">
                    <h5 className="font-semibold text-indigo-300 text-xs uppercase tracking-wider">
                      Engineered Solution:
                    </h5>
                    <p>{selectedProject.problemSolution.solution}</p>
                  </div>

                  <div>
                    <h5 className="font-semibold text-white text-xs uppercase tracking-wider text-slate-400 mb-2">
                      Key Highlights & Capabilities:
                    </h5>
                    <ul className="space-y-1.5">
                      {selectedProject.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-semibold text-white text-xs uppercase tracking-wider text-slate-400 mb-2">
                      Stack & Tools:
                    </h5>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.tags.map((t) => (
                        <span key={t} className="px-2.5 py-1 text-xs font-mono rounded bg-white/[0.06] text-slate-200">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/[0.08]">
                  <Button
                    variant="outline"
                    className="bg-white/[0.03] border-white/[0.1] text-xs"
                    asChild
                  >
                    <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-3.5 h-3.5 mr-1.5" />
                      View Code
                    </a>
                  </Button>
                  {selectedProject.liveUrl && (
                    <Button
                      className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium"
                      asChild
                    >
                      <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                        Open Live Application
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

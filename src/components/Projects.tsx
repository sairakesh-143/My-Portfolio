import { useState, useEffect } from "react";
import { ExternalLink, Github, Sparkles, ArrowUpRight, X, CheckCircle2, Target, Lightbulb, TrendingUp, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData, Project } from "@/data/portfolioData";
import { projectStore } from "@/lib/projectStore";

const categories = ["All", "AI / ML", "Web Development", "RAG", "Tools"];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [projectsList, setProjectsList] = useState<Project[]>(portfolioData.projects);
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  useEffect(() => {
    const syncProjects = () => {
      const stored = projectStore.getPublishedProjects();
      if (stored && stored.length > 0) {
        const mapped: Project[] = stored.map((item) => {
          const matchDefault = portfolioData.projects.find((p) => p.id === item.id);
          return {
            id: item.id,
            title: item.title,
            subtitle: item.subtitle || item.tagline || "",
            description: item.shortDescription || item.description,
            problemSolution: {
              problem: item.problem || matchDefault?.problemSolution?.problem || "Problem details not specified.",
              solution: item.solution || matchDefault?.problemSolution?.solution || "Solution details not specified.",
            },
            highlights: item.highlights || matchDefault?.highlights || [],
            tags: item.tags || [],
            liveUrl: item.liveUrl,
            githubUrl: item.githubUrl || "https://github.com/sairakesh-143",
            category: (item.category === "AI & Data" ? "AI / ML" : item.category === "Full Stack" ? "Web Development" : (item.category as Project["category"])),
            featured: item.featured,
            status: item.status,
            imageUrl: item.imageUrl || matchDefault?.imageUrl,
            features: matchDefault?.features || item.highlights,
            contribution: item.role || matchDefault?.contribution || "Full-Stack Development",
            architecture: matchDefault?.architecture,
            result: matchDefault?.result,
          };
        });
        setProjectsList(mapped);
      } else {
        setProjectsList(portfolioData.projects);
      }
    };

    syncProjects();
    const unsub = projectStore.subscribe(syncProjects);
    return () => unsub();
  }, []);

  const filteredProjects = projectsList.filter((project) => {
    if (selectedCategory === "All") return true;
    if (selectedCategory === "AI / ML") return project.category === "AI / ML" || project.tags.some(t => t.toLowerCase().includes("ai") || t.toLowerCase().includes("vision") || t.toLowerCase().includes("ml"));
    if (selectedCategory === "RAG") return project.tags.some(t => t.toLowerCase().includes("rag") || t.toLowerCase().includes("gemini") || t.toLowerCase().includes("groq"));
    if (selectedCategory === "Web Development") return project.category === "Web Development" || project.tags.some(t => t.toLowerCase().includes("react") || t.toLowerCase().includes("node"));
    if (selectedCategory === "Tools") return project.category === "Tools" || project.tags.some(t => t.toLowerCase().includes("tool") || t.toLowerCase().includes("cms"));
    return true;
  });

  const featuredProject = filteredProjects.find((p) => p.featured);
  const otherProjects = filteredProjects.filter((p) => p !== featuredProject);

  return (
    <section id="projects" className="relative py-20 lg:py-28 overflow-hidden">
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-blue-600/8 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 w-full">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-semibold mb-2 inline-block px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
            Featured Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white tracking-tight mb-3">
            My Projects
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Things I've built while learning and experimenting with real-world stacks.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md shadow-purple-500/25"
                    : "bg-dark-850/80 text-slate-400 border border-slate-800 hover:border-purple-500/30 hover:text-white"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Featured Flagship Project — large card */}
        {featuredProject && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onClick={() => setActiveModalProject(featuredProject)}
            className="group cursor-pointer rounded-2xl bg-[#0E1322] border border-purple-500/30 hover:border-purple-500/50 p-5 sm:p-6 mb-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(139,92,246,0.15)] overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              {/* Left: Image */}
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-dark-900 border border-slate-800">
                <img
                  src={featuredProject.imageUrl || "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80"}
                  alt={featuredProject.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1322] via-transparent to-transparent opacity-60" />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-purple-600/90 text-white backdrop-blur-md">
                    {featuredProject.category}
                  </span>
                  <span className="px-2 py-1 rounded-lg text-[11px] font-semibold bg-amber-500/90 text-white backdrop-blur-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Featured</span>
                  </span>
                </div>
              </div>

              {/* Right: Details */}
              <div className="flex flex-col">
                <div className="text-[11px] font-mono uppercase tracking-widest text-purple-400 mb-2">
                  Flagship Project
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1.5 group-hover:text-purple-300 transition-colors">
                  {featuredProject.title}
                </h3>
                <p className="text-sm text-purple-400/90 font-medium mb-3">{featuredProject.subtitle}</p>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">{featuredProject.description}</p>

                {/* Problem → Solution → Result summary */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-start gap-2 text-xs">
                    <Target className="w-3.5 h-3.5 text-rose-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-400 line-clamp-2">{featuredProject.problemSolution.problem}</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs">
                    <Lightbulb className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-400 line-clamp-2">{featuredProject.problemSolution.solution}</span>
                  </div>
                  {featuredProject.result && (
                    <div className="flex items-start gap-2 text-xs">
                      <TrendingUp className="w-3.5 h-3.5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300 line-clamp-2">{featuredProject.result}</span>
                    </div>
                  )}
                </div>

                {/* Tech chips */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {featuredProject.tags.slice(0, 6).map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-dark-850 border border-slate-700/60 text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 mt-auto pt-3 border-t border-slate-800/80">
                  <span className="text-xs font-mono text-purple-400 group-hover:underline">
                    View full case study →
                  </span>
                  <div className="flex items-center gap-2 ml-auto" onClick={(e) => e.stopPropagation()}>
                    {featuredProject.liveUrl && (
                      <a
                        href={featuredProject.liveUrl}
                        target={featuredProject.liveUrl.startsWith("/") ? "_self" : "_blank"}
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-purple-600/20 hover:bg-purple-600 border border-purple-500/40 text-purple-300 hover:text-white text-xs font-semibold flex items-center gap-1 transition-all"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Live Demo</span>
                      </a>
                    )}
                    {featuredProject.githubUrl && (
                      <a
                        href={featuredProject.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-dark-850 hover:bg-dark-750 border border-slate-700 text-slate-300 hover:text-white transition-all"
                        title="View GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Other Projects — normal grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              onClick={() => setActiveModalProject(project)}
              className="group cursor-pointer rounded-2xl bg-[#0E1322]/85 border border-slate-800 hover:border-purple-500/40 p-5 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-dark-900 border border-slate-800 mb-4">
                  <img
                    src={project.imageUrl || "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E1322] via-transparent to-transparent opacity-70" />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-purple-600/90 text-white backdrop-blur-md">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="px-2 py-1 rounded-lg text-[11px] font-semibold bg-amber-500/90 text-white backdrop-blur-md flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>Featured</span>
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-purple-300 transition-colors flex items-center justify-between">
                  <span>{project.title}</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </h3>
                <p className="text-xs text-purple-400/90 font-medium mb-2">{project.subtitle}</p>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-2 mb-3">{project.description}</p>

                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-dark-850 border border-slate-700/60 text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-mono text-purple-400 bg-purple-500/10">
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                <span className="text-xs font-mono text-purple-400 hover:underline">
                  Details →
                </span>
                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target={project.liveUrl.startsWith("/") ? "_self" : "_blank"}
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-purple-600/20 hover:bg-purple-600 border border-purple-500/40 text-purple-300 hover:text-white text-xs font-semibold flex items-center gap-1 transition-all"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Demo</span>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg bg-dark-850 hover:bg-dark-750 border border-slate-700 text-slate-300 hover:text-white transition-all"
                      title="View GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Details Modal — enhanced with Result + Contribution */}
      <AnimatePresence>
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0B0F19] border border-purple-500/30 p-6 sm:p-8 shadow-2xl z-10 text-left"
            >
              <button
                type="button"
                onClick={() => setActiveModalProject(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-dark-850 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="mb-6 pr-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-purple-600/20 border border-purple-500/30 text-purple-300">
                    {activeModalProject.category}
                  </span>
                  {activeModalProject.status && (
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                      {activeModalProject.status}
                    </span>
                  )}
                  {activeModalProject.featured && (
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Featured</span>
                    </span>
                  )}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">{activeModalProject.title}</h3>
                <p className="text-sm text-purple-300 font-medium mt-1">{activeModalProject.subtitle}</p>
              </div>

              {/* Modal Body */}
              <div className="space-y-6 text-sm">
                {/* Overview */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5 font-semibold">Overview</h4>
                  <p className="text-slate-300 leading-relaxed">{activeModalProject.description}</p>
                </div>

                {/* Problem → Solution → Result */}
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-dark-850/80 border border-rose-500/20">
                    <h5 className="text-xs font-semibold uppercase tracking-wider text-rose-400 mb-1.5 flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5" /> Problem
                    </h5>
                    <p className="text-xs text-slate-300 leading-relaxed">{activeModalProject.problemSolution.problem}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-dark-850/80 border border-emerald-500/20">
                    <h5 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1.5 flex items-center gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5" /> Solution
                    </h5>
                    <p className="text-xs text-slate-300 leading-relaxed">{activeModalProject.problemSolution.solution}</p>
                  </div>
                  {activeModalProject.result && (
                    <div className="p-4 rounded-xl bg-dark-850/80 border border-blue-500/20">
                      <h5 className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-1.5 flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5" /> Result
                      </h5>
                      <p className="text-xs text-slate-300 leading-relaxed">{activeModalProject.result}</p>
                    </div>
                  )}
                </div>

                {/* Key Features */}
                {activeModalProject.features && activeModalProject.features.length > 0 && (
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-semibold">Key Features</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {activeModalProject.features.map((feat) => (
                        <div key={feat} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Stack & Architecture */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-semibold">Tech Stack &amp; Architecture</h4>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {activeModalProject.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-lg bg-dark-850 border border-slate-700 text-xs font-medium text-slate-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {activeModalProject.architecture && (
                    <p className="text-xs font-mono text-purple-300 mt-2 p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                      {activeModalProject.architecture}
                    </p>
                  )}
                </div>

                {/* My Contribution — dedicated section */}
                {activeModalProject.contribution && (
                  <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-purple-400 mb-1.5 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" /> My Contribution
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{activeModalProject.contribution}</p>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="mt-8 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-end gap-3">
                {activeModalProject.githubUrl && (
                  <a
                    href={activeModalProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-dark-850 hover:bg-dark-750 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-2 transition-all"
                  >
                    <Github className="w-4 h-4" />
                    <span>View GitHub</span>
                  </a>
                )}
                {activeModalProject.liveUrl && (
                  <a
                    href={activeModalProject.liveUrl}
                    target={activeModalProject.liveUrl.startsWith("/") ? "_self" : "_blank"}
                    rel="noreferrer"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-purple-500/25 transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open Live Demo</span>
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

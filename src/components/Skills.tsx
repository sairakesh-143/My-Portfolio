import { useState } from "react";
import { Layout, Server, Brain, Database, Wrench, ChevronDown, Sparkles, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";

export default function Skills() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (title: string) => {
    setExpandedCategory((prev) => (prev === title ? null : title));
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Layout":
        return <Layout className="w-5 h-5 text-cyan-400" />;
      case "Server":
        return <Server className="w-5 h-5 text-blue-400" />;
      case "Brain":
        return <Brain className="w-5 h-5 text-purple-400" />;
      case "Database":
        return <Database className="w-5 h-5 text-emerald-400" />;
      case "Wrench":
      default:
        return <Wrench className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <section id="skills" className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background Neon Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 w-full">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-semibold mb-2 inline-block px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
            Technical Proficiency
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white tracking-tight mb-3">
            Skills & Technologies
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Technologies, frameworks, and tools I work with to build production systems.
          </p>
        </div>

        {/* Categorized Skills Grid (Desktop & Tablet) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioData.skillCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-2xl bg-[#0E1322]/85 backdrop-blur-xl border border-slate-800 hover:border-purple-500/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(139,92,246,0.16)] flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-dark-800 border border-slate-700/60 flex items-center justify-center">
                      {getCategoryIcon(category.iconName)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {category.title}
                      </h3>
                      <p className="text-[11px] text-slate-400">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Skill Chips List */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {category.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-dark-850 border border-slate-700/60 text-slate-200 text-xs font-medium hover:border-purple-500/50 hover:bg-purple-500/10 hover:text-white transition-all transform hover:scale-105 cursor-default"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                      <span>{skill.name}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom tag */}
              <div className="mt-5 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>{category.skills.length} SKILLS</span>
                <span className="text-purple-400">ACTIVE STACK</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 p-6 rounded-2xl bg-dark-850/60 border border-slate-800 text-center max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-slate-300">
          <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
          <span>Always exploring emerging tech, LLM frameworks, vector architectures, and modern web performance.</span>
        </div>
      </div>
    </section>
  );
}

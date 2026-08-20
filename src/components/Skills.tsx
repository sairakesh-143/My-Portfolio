import { useState } from "react";
import { motion } from "framer-motion";
import { Layout, Server, Brain, Wrench, Code2, Sparkles, CheckCircle2, Terminal, Cpu, Network, Flame, Palette, Globe, Atom, FileCode2, Zap, Laptop, Cloud, GitBranch, Github, BarChart3 } from "lucide-react";
import { portfolioData, SkillCategory } from "@/data/portfolioData";

const categoryIconMap: Record<string, React.ElementType> = {
  Layout,
  Server,
  Brain,
  Wrench,
};

const skillIconMap: Record<string, React.ElementType> = {
  Atom,
  FileCode2,
  Code2,
  Palette,
  Globe,
  Sparkles,
  Terminal,
  Cpu,
  Server,
  Network,
  Flame,
  Brain,
  BarChart3,
  GitBranch,
  Github,
  Zap,
  Laptop,
  Cloud,
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", ...portfolioData.skillCategories.map((c) => c.title)];

  const filteredCategories =
    activeCategory === "All"
      ? portfolioData.skillCategories
      : portfolioData.skillCategories.filter((c) => c.title === activeCategory);

  return (
    <section id="skills" className="py-20 md:py-28 relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-indigo-600/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono mb-3">
              <Code2 className="w-3.5 h-3.5" />
              Technical Arsenal
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Skills & Technologies
            </h2>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
              Categorized stack with hands-on proficiency across modern frontend, server architecture, AI algorithms, and deployment toolchains.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-amber-500 text-black font-semibold shadow-md shadow-amber-500/20"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredCategories.map((cat, catIdx) => {
            const CatIcon = categoryIconMap[cat.iconName] || Code2;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: catIdx * 0.08 }}
                className="p-7 rounded-3xl bg-[#0b0f1d]/90 border border-white/[0.08] hover:border-amber-500/30 transition-all duration-300 shadow-xl group"
              >
                {/* Category Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] group-hover:border-amber-500/30 flex items-center justify-center text-amber-400">
                      <CatIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white leading-tight">
                        {cat.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {cat.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Skills Badges Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-4 border-t border-white/[0.06]">
                  {cat.skills.map((skill) => {
                    const SkillIcon = (skill.iconName && skillIconMap[skill.iconName]) || Code2;
                    return (
                      <div
                        key={skill.name}
                        className="group/skill flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] hover:border-amber-500/30 transition-all"
                      >
                        <div className="w-6 h-6 rounded-lg bg-white/[0.04] flex items-center justify-center text-slate-300 group-hover/skill:text-amber-400 transition-colors flex-shrink-0">
                          <SkillIcon className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-white truncate leading-tight group-hover/skill:text-amber-300 transition-colors">
                            {skill.name}
                          </p>
                          <p className="text-[10px] font-mono text-slate-400 leading-none mt-0.5">
                            {skill.level}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Skills;

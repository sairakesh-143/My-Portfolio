import { Layout, Server, Brain, Wrench, Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";

const iconMap = {
  Layout: Layout,
  Server: Server,
  Brain: Brain,
  Wrench: Wrench,
};

const Skills = () => {
  return (
    <section id="skills" className="py-24 md:py-32 bg-[#060912]/80 relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-300 mb-4">
            <Wrench className="w-3.5 h-3.5" />
            Technical Stack
          </div>
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-subtitle">
            A comprehensive, battle-tested toolset spanning modern client-side engineering, backend microservices, machine learning concepts, and reliable developer workflows.
          </p>
        </div>

        {/* Skill Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {portfolioData.skillCategories.map((category, index) => {
            const Icon = iconMap[category.iconName as keyof typeof iconMap] || Layout;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="card-premium p-6 rounded-2xl flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-105 group-hover:bg-indigo-500/20 transition-all">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-200 transition-colors">
                    {category.title}
                  </h3>

                  <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                    {category.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill.name}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/[0.04] text-slate-200 border border-white/[0.08] hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:text-indigo-200 transition-all cursor-default"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Competency Highlight Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-wrap items-center justify-between gap-4 text-xs text-slate-300"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="font-semibold text-white">Engineering Philosophy:</span>
            <span className="text-slate-400">Strict TypeScript typing • Reusable Components • Accessible Markup • Modular Architecture</span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Zero Bloat • Production Optimized
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;

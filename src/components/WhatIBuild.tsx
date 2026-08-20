import { motion } from "framer-motion";
import { Brain, Laptop, BarChart3, CheckCircle2, ArrowRight } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";

const iconMap: Record<string, React.ElementType> = {
  Brain,
  Laptop,
  BarChart3,
};

const WhatIBuild = () => {
  return (
    <section id="what-i-build" className="py-20 md:py-28 relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-indigo-600/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col items-start max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            Core Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            What I Build
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Beyond knowing technologies, here is what I engineer to solve real business bottlenecks and product requirements.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {portfolioData.whatIBuild.map((item, index) => {
            const Icon = iconMap[item.icon] || Laptop;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="group relative flex flex-col justify-between p-7 rounded-3xl bg-[#0b0f1d]/90 border border-white/[0.08] hover:border-amber-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/5"
              >
                {/* Header glow */}
                <div className="absolute -top-10 -right-10 w-36 h-36 bg-indigo-500/10 group-hover:bg-amber-500/10 rounded-full blur-2xl transition-all pointer-events-none" />

                <div>
                  {/* Category Pill + Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.1] group-hover:border-amber-500/40 flex items-center justify-center text-amber-400 shadow-inner group-hover:scale-105 transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono text-slate-400 bg-white/[0.03] border border-white/[0.06]">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Bullet Points */}
                  <div className="space-y-2.5 pt-4 border-t border-white/[0.06]">
                    {item.points.map((point) => (
                      <div key={point} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/[0.05]">
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    <span>See related work</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhatIBuild;

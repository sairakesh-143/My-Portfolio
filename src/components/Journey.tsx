import { motion } from "framer-motion";
import { Milestone, Sparkles, CheckCircle2, Calendar, Briefcase, GraduationCap, Rocket } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";

const iconMap = [GraduationCap, Sparkles, Rocket, Briefcase];

const Journey = () => {
  return (
    <section id="journey" className="py-20 md:py-28 relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-[450px] h-[450px] bg-indigo-600/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        
        {/* Section Header */}
        <div className="flex flex-col items-start max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono mb-3">
            <Calendar className="w-3.5 h-3.5" />
            Engineering Story
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Developer Journey & Milestones
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            From algorithmic foundations to shipping production-ready AI & full-stack systems, here is how my skillset evolved.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l border-white/[0.1] ml-4 sm:ml-8 md:ml-12 pl-6 sm:pl-10 space-y-12">
          {portfolioData.journey.map((item, index) => {
            const Icon = iconMap[index % iconMap.length];
            return (
              <motion.div
                key={item.year + item.title}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                {/* Timeline Dot / Icon */}
                <div className={`absolute -left-[35px] sm:-left-[51px] top-1.5 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                  item.isCurrent
                    ? "bg-amber-500 border-amber-300 text-black shadow-lg shadow-amber-500/30 scale-110"
                    : "bg-[#0c101e] border-white/[0.2] text-slate-300 group-hover:border-amber-400 group-hover:text-amber-300"
                }`}>
                  <Icon className="w-4 h-4" />
                </div>

                {/* Milestone Card */}
                <div className="p-6 sm:p-7 rounded-3xl bg-[#0b0f1d]/90 border border-white/[0.08] hover:border-amber-500/30 transition-all duration-300 shadow-xl group-hover:shadow-amber-500/5">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/25">
                        {item.year}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {item.role}
                      </span>
                    </div>

                    {item.isCurrent && (
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Current Focus
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed mb-5">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.05]">
                    {item.badges.map((badge) => (
                      <span
                        key={badge}
                        className="px-2.5 py-0.5 text-xs font-mono text-slate-300 bg-white/[0.03] border border-white/[0.06] rounded-md"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Journey;

import { GraduationCap, Brain, Trophy, Layers, Sparkles, Calendar, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";

export default function Journey() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "GraduationCap":
        return <GraduationCap className="w-5 h-5" />;
      case "Brain":
        return <Brain className="w-5 h-5" />;
      case "Trophy":
        return <Trophy className="w-5 h-5" />;
      case "Layers":
        return <Layers className="w-5 h-5" />;
      case "Sparkles":
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  const getAccentClass = (color: string) => {
    switch (color) {
      case "purple":
        return {
          glow: "border-purple-500/40 text-purple-400 bg-purple-500/10 shadow-[0_0_15px_rgba(139,92,246,0.3)]",
          badge: "bg-purple-500/10 text-purple-300 border-purple-500/30",
          node: "bg-purple-500 ring-purple-500/30",
        };
      case "cyan":
        return {
          glow: "border-cyan-500/40 text-cyan-400 bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.3)]",
          badge: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
          node: "bg-cyan-400 ring-cyan-500/30",
        };
      case "emerald":
        return {
          glow: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.3)]",
          badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
          node: "bg-emerald-400 ring-emerald-500/30",
        };
      case "blue":
        return {
          glow: "border-blue-500/40 text-blue-400 bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.3)]",
          badge: "bg-blue-500/10 text-blue-300 border-blue-500/30",
          node: "bg-blue-500 ring-blue-500/30",
        };
      case "amber":
      default:
        return {
          glow: "border-amber-500/40 text-amber-400 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.3)]",
          badge: "bg-amber-500/10 text-amber-300 border-amber-500/30",
          node: "bg-amber-400 ring-amber-500/30",
        };
    }
  };

  return (
    <section id="journey" className="relative py-20 lg:py-28 overflow-hidden">
      {/* Glow Backdrop */}
      <div className="absolute top-1/2 right-10 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-[1100px] mx-auto px-4 sm:px-8 w-full">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-semibold mb-2 inline-block px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
            Timeline & Milestones
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white tracking-tight mb-3">
            My Journey
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Education, projects, learning, hackathons, and software engineering milestones.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative pl-6 sm:pl-8 md:pl-0">
          {/* Vertical Center Line for Desktop, Left Line for Mobile */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-purple-500 via-blue-500 to-amber-500 -translate-x-1/2 opacity-30 pointer-events-none" />

          <div className="space-y-12">
            {portfolioData.journey.map((item, idx) => {
              const isEven = idx % 2 === 0;
              const styling = getAccentClass(item.accentColor);

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline Glowing Node */}
                  <div className="absolute left-0 md:left-1/2 top-4 -translate-x-1/2 z-10">
                    <div className={`w-8 h-8 rounded-full border-2 border-dark-900 ring-4 flex items-center justify-center ${styling.node}`}>
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                  </div>

                  {/* Content Card (Half Width on Desktop, Full Width on Mobile) */}
                  <div className="w-full md:w-[calc(50%-2.5rem)] ml-6 md:ml-0">
                    <div className="rounded-2xl bg-[#0E1322]/90 backdrop-blur-xl border border-slate-800 hover:border-purple-500/40 p-6 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(139,92,246,0.15)] hover:-translate-y-0.5">
                      {/* Year & Icon Header */}
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold bg-dark-800 border border-slate-700/80 text-white">
                          <Calendar className="w-3.5 h-3.5 text-purple-400" />
                          <span>{item.year}</span>
                        </div>
                        <div className={`p-2 rounded-xl border ${styling.glow}`}>
                          {getIcon(item.icon)}
                        </div>
                      </div>

                      {/* Title & Subtitle */}
                      <h3 className="text-lg font-bold text-white mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-purple-300 font-medium mb-3">
                        {item.subtitle}
                      </p>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/60">
                        {item.badges.map((b) => (
                          <span
                            key={b}
                            className={`px-2.5 py-0.5 rounded-md text-[11px] font-medium border ${styling.badge}`}
                          >
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Empty Spacer on Opposite Side (Desktop only) */}
                  <div className="hidden md:block w-[calc(50%-2.5rem)]" />
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

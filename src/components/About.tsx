import { GraduationCap, Layers, Brain, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import { Button } from "@/components/ui/button";

const iconMap = {
  GraduationCap: GraduationCap,
  Layers: Layers,
  Brain: Brain,
  Sparkles: Sparkles,
};

const About = () => {
  return (
    <section id="about" className="py-20 md:py-28 relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 w-[450px] h-[450px] bg-indigo-600/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-300 mb-4">
            <GraduationCap className="w-3.5 h-3.5" />
            Background & Mindset
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Engineering Philosophy
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Combining formal Artificial Intelligence & Data Science education at KIET College with relentless self-driven product building.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16">
          {portfolioData.aboutPillars.map((pillar, index) => {
            const Icon = iconMap[pillar.icon as keyof typeof iconMap] || Layers;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-7 sm:p-8 rounded-3xl bg-[#0b0f1d]/90 border border-white/[0.08] hover:border-amber-500/30 transition-all duration-300 shadow-xl group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] group-hover:border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-all flex-shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono font-semibold text-amber-400 tracking-wide uppercase">
                      {pillar.subtitle}
                    </span>
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors mt-0.5">
                      {pillar.title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {pillar.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.06]">
                  {pillar.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 text-xs font-mono text-slate-300 bg-white/[0.03] border border-white/[0.06] rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Narrative Banner Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-indigo-950/40 via-[#0b0f1d] to-amber-950/20 border border-white/[0.1] backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-2 text-left">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              Ready to ship scalable software & AI tools
            </h3>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Seeking developer internships and full-stack engineering roles where I can contribute to production web systems, build intelligent tools, and continuously level up with modern engineering teams.
            </p>
          </div>

          <Button
            className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 whitespace-nowrap gap-2 flex-shrink-0"
            asChild
          >
            <a href="#contact">
              Let's Connect
              <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

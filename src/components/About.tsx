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
    <section id="about" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-300 mb-4">
            <GraduationCap className="w-3.5 h-3.5" />
            Background & Focus
          </div>
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            I am a B.Tech student specializing in Artificial Intelligence & Data Science at KIET College, 
            combining rigorous algorithmic training with modern full-stack web engineering.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {portfolioData.aboutPillars.map((pillar, index) => {
            const Icon = iconMap[pillar.icon as keyof typeof iconMap] || Layers;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-premium p-6 sm:p-8 rounded-2xl relative overflow-hidden group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-105 group-hover:bg-indigo-500/20 transition-all flex-shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-indigo-400 tracking-wide uppercase">
                      {pillar.subtitle}
                    </span>
                    <h3 className="text-xl font-bold text-white group-hover:text-indigo-200 transition-colors">
                      {pillar.title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                  {pillar.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.06]">
                  {pillar.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs font-medium rounded-md bg-white/[0.04] text-slate-300 border border-white/[0.06]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Narrative & Career Goal Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-slate-900/40 border border-indigo-500/20 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-2 text-left">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              Ready to create practical software impact
            </h3>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Seeking developer internships and full-stack engineering roles where I can contribute to production web systems, build intelligent tools, and continuously level up with modern engineering teams.
            </p>
          </div>

          <Button
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-6 py-2.5 rounded-xl shadow-lg shadow-indigo-600/30 whitespace-nowrap gap-2 flex-shrink-0"
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

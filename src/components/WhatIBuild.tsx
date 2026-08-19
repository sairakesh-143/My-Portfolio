import { Laptop, Brain, BarChart3, CheckCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";

const iconMap = {
  Laptop: Laptop,
  Brain: Brain,
  BarChart3: BarChart3,
};

const WhatIBuild = () => {
  return (
    <section id="what-i-build" className="py-24 md:py-32 bg-[#060912]/80 relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-300 mb-4">
            <Laptop className="w-3.5 h-3.5" />
            Engineering Capabilities
          </div>
          <h2 className="section-title">What I Build</h2>
          <p className="section-subtitle">
            Focusing on clean, scalable architectures that bridge intuitive frontend user experiences with powerful backend systems and AI-driven logic.
          </p>
        </div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {portfolioData.whatIBuild.map((item, index) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap] || Laptop;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="card-premium p-8 rounded-2xl flex flex-col justify-between group"
              >
                <div>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 group-hover:border-indigo-500/40 transition-all">
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-200 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {item.description}
                  </p>

                  <ul className="space-y-2.5 mb-8">
                    {item.points.map((pt) => (
                      <li key={pt} className="text-xs sm:text-sm text-slate-400 flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center text-xs font-semibold text-indigo-400 group-hover:text-indigo-300">
                  <a href="#projects" className="inline-flex items-center gap-1.5 hover:underline">
                    Explore related projects
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

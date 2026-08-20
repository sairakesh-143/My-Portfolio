import { motion } from "framer-motion";
import { Code2, Brain, Layers, GraduationCap, ArrowUpRight } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";

const iconMap: Record<string, React.ElementType> = {
  Code2,
  Brain,
  Layers,
  GraduationCap,
};

const Highlights = () => {
  return (
    <section className="py-8 relative z-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {portfolioData.highlights.map((item, index) => {
            const Icon = iconMap[item.icon] || Code2;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="group relative p-4 sm:p-5 rounded-2xl bg-[#0b0f1d]/80 border border-white/[0.07] hover:border-amber-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5 backdrop-blur-sm flex flex-col justify-between"
              >
                {/* Glow on hover */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl group-hover:bg-amber-500/10 transition-all pointer-events-none" />

                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] group-hover:border-amber-500/30 flex items-center justify-center text-amber-400 transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-300 uppercase tracking-wider">
                    {item.label}
                  </span>
                </div>

                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-amber-300 transition-colors">
                    {item.value}
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-snug">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Highlights;

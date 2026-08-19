import { Code2, GraduationCap, Layers, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";

const iconMap = {
  Code2: Code2,
  GraduationCap: GraduationCap,
  Layers: Layers,
  Briefcase: Briefcase,
};

const Highlights = () => {
  return (
    <section className="py-8 border-y border-white/[0.06] bg-[#070b14]/60 backdrop-blur-md relative z-10">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {portfolioData.highlights.map((item, index) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap] || Layers;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-indigo-500/30 transition-all flex items-start gap-3.5 group"
              >
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 flex-shrink-0 group-hover:scale-105 group-hover:bg-indigo-500/20 transition-all">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                    {item.label}
                  </span>
                  <span className="text-sm sm:text-base font-bold text-white tracking-tight truncate group-hover:text-indigo-300 transition-colors">
                    {item.value}
                  </span>
                  <span className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                    {item.description}
                  </span>
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

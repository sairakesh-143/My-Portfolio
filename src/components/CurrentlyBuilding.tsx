import { Database, FileText, Layers, Wrench, ArrowUpRight, Github } from "lucide-react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";

const iconMap: Record<string, React.ReactNode> = {
  Database: <Database className="w-5 h-5" />,
  FileText: <FileText className="w-5 h-5" />,
  Layers: <Layers className="w-5 h-5" />,
  Wrench: <Wrench className="w-5 h-5" />,
};

export default function CurrentlyBuilding() {
  const { currentlyBuilding } = portfolioData;

  return (
    <section id="currently-building" className="relative py-20 lg:py-24 overflow-hidden">
      <div className="absolute top-1/2 right-10 w-[350px] h-[350px] bg-cyan-500/8 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-[1100px] mx-auto px-4 sm:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-2 inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
            Always Building
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white tracking-tight mb-3">
            Currently Building
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Actively learning and shipping — here's what I'm exploring right now.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl bg-[#0E1322]/90 border border-slate-800 p-6 sm:p-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-sm font-bold text-white">{currentlyBuilding.focus}</span>
          </div>

          <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-2xl">
            {currentlyBuilding.description}
          </p>

          {/* Explorations grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {currentlyBuilding.explorations.map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-dark-850/80 border border-slate-800 hover:border-cyan-500/30 transition-all"
              >
                <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400">
                  {iconMap[item.icon] || <Wrench className="w-5 h-5" />}
                </div>
                <span className="text-sm font-medium text-slate-200">{item.name}</span>
              </motion.div>
            ))}
          </div>

          {/* Follow on GitHub CTA */}
          <a
            href={portfolioData.personal.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-dark-850 hover:bg-dark-800 border border-slate-700 hover:border-cyan-500/40 text-slate-200 hover:text-white text-sm font-semibold transition-all group"
          >
            <Github className="w-4 h-4 text-cyan-400" />
            <span>Follow my GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

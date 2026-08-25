import { BookOpen, Hammer, Rocket, ArrowRight, GraduationCap, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";

export default function About() {
  return (
    <section id="about" className="relative py-20 lg:py-28 overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[350px] h-[350px] bg-purple-600/8 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 w-full">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-semibold mb-2 inline-block px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
            Background &amp; Mindset
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white tracking-tight mb-3">
            About Me
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            A student who learns by building real-world software.
          </p>
        </div>

        {/* Main Grid: Bio + Education */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">

          {/* Bio Card — spans 2 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 rounded-2xl bg-[#0E1322]/90 border border-slate-800 p-6 sm:p-8"
          >
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              {/* Profile Photo — compact circle */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0 group">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-purple-500/30 to-blue-500/15 blur-sm opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-purple-500/30 bg-dark-900">
                  <img
                    src="/profile.jpg"
                    alt={portfolioData.personal.fullName}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Bio Narrative */}
              <div className="flex-1 text-left">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  <span>Passionate Developer &amp; Builder</span>
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-3">
                  {portfolioData.personal.aboutBio}
                </p>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  As a 3rd-year B.Tech student in AI &amp; Full-Stack Development, I focus on shipping practical AI applications, RAG pipelines, and responsive web products. I thrive in hackathons and love turning ideas into functional software.
                </p>

                {/* Currently exploring */}
                <div className="mt-5 pt-4 border-t border-slate-800/60">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-2">
                    Currently exploring
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["RAG", "LLM Applications", "Full-Stack Development", "Vector Search"].map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg bg-dark-850 border border-slate-700/60 text-xs font-medium text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Education + Location — compact card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl bg-[#0E1322]/90 border border-slate-800 p-6 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-purple-400" />
                <span>Education</span>
              </h3>

              <div className="space-y-4 text-sm">
                <div>
                  <div className="font-semibold text-white">{portfolioData.personal.education}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{portfolioData.personal.branch}</div>
                  <div className="text-xs text-purple-300 mt-0.5">{portfolioData.personal.college}</div>
                </div>

                <div className="pt-4 border-t border-slate-800/60 flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-slate-500 uppercase font-mono tracking-wide">Location</div>
                    <div className="text-xs text-slate-300 font-medium mt-0.5">{portfolioData.personal.location}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats — compact */}
            <div className="mt-5 pt-5 border-t border-slate-800/60 grid grid-cols-3 gap-2 text-center">
              {portfolioData.personal.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-xl font-black font-display bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* My Approach — 3 compact steps */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white">My Approach</h3>
            <p className="text-sm text-slate-400 mt-1">A structured loop of continuous growth and execution.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {portfolioData.approach.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="rounded-2xl bg-[#0E1322]/90 border border-slate-800 hover:border-purple-500/30 p-5 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-400">
                    {item.icon === "BookOpen" && <BookOpen className="w-4.5 h-4.5" />}
                    {item.icon === "Hammer" && <Hammer className="w-4.5 h-4.5" />}
                    {item.icon === "Rocket" && <Rocket className="w-4.5 h-4.5" />}
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-600">{item.tag}</span>
                </div>
                <h4 className="text-base font-bold text-white mb-1.5">{item.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Banner — simplified */}
        <a
          href="#contact"
          className="group block rounded-2xl bg-gradient-to-r from-purple-900/30 via-blue-900/20 to-purple-900/30 border border-purple-500/25 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all hover:border-purple-500/40"
        >
          <div className="text-center sm:text-left">
            <h4 className="text-lg sm:text-xl font-bold text-white mb-1">
              Have an idea or internship opportunity?
            </h4>
            <p className="text-sm text-slate-400">Let's turn ideas into a high-impact, functional product together.</p>
          </div>
          <span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-sm whitespace-nowrap group-hover:scale-105 transition-transform">
            <span>Let's Talk</span>
            <ArrowRight className="w-4 h-4" />
          </span>
        </a>

      </div>
    </section>
  );
}

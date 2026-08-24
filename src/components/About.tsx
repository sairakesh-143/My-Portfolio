import { BookOpen, Hammer, Rocket, ArrowRight, User, GraduationCap, MapPin, Sparkles, CheckCircle2, Laptop } from "lucide-react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";

export default function About() {
  return (
    <section id="about" className="relative py-20 lg:py-28 overflow-hidden">
      {/* Glow Backdrop */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 w-full">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-semibold mb-2 inline-block px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
            Background & Mindset
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white tracking-tight mb-4">
            About Me
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            A student who learns by building real-world software.
          </p>
        </div>

        {/* Top Grid: Bio + Photo on Left, Personal Info on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left: Bio Narrative with Developer Photo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Bio Card with Developer Portrait Photo */}
            <div className="rounded-2xl bg-[#0E1322]/85 backdrop-blur-xl border border-slate-800 p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              
              {/* Profile Photo Frame */}
              <div className="relative w-36 h-44 sm:w-44 sm:h-52 rounded-2xl overflow-hidden border-2 border-purple-500/40 shadow-[0_0_30px_rgba(139,92,246,0.3)] flex-shrink-0 bg-dark-900 group">
                <img
                  src="/profile.jpg"
                  alt={portfolioData.personal.fullName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-2 right-2 text-center">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-black/80 text-purple-300 border border-purple-500/30 backdrop-blur-sm">
                    KIET '28
                  </span>
                </div>
              </div>

              {/* Bio Narrative */}
              <div className="flex-1 text-left">
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                  <span>Passionate Developer & Builder</span>
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-3">
                  {portfolioData.personal.aboutBio}
                </p>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  As a 3rd-year B.Tech student in AI & Full-Stack Development, I focus on shipping practical AI applications, RAG pipelines, and responsive web products. I thrive in hackathons and love turning ideas into functional software.
                </p>
              </div>

            </div>

            {/* 3 Stats Cards */}
            <div className="grid grid-cols-3 gap-4">
              {portfolioData.personal.stats.map((stat, idx) => (
                <div
                  key={stat.label}
                  className="rounded-2xl bg-[#0E1322]/90 border border-purple-500/20 p-4 sm:p-6 text-center hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.2)] transition-all"
                >
                  <div className="text-2xl sm:text-4xl font-black font-display bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white">
                    {stat.label}
                  </div>
                  <div className="text-[10px] sm:text-xs text-slate-400 hidden sm:block mt-1">
                    {stat.description}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Personal Information & Tools */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Personal Information Card */}
            <div className="rounded-2xl bg-[#0E1322]/80 backdrop-blur-xl border border-slate-800 p-6">
              <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                <User className="w-4 h-4 text-purple-400" />
                <span>Personal Information</span>
              </h3>

              <div className="space-y-3.5 text-xs sm:text-sm">
                <div className="flex justify-between py-2 border-b border-slate-800/80">
                  <span className="text-slate-400">Name</span>
                  <span className="font-semibold text-slate-200 text-right">{portfolioData.personal.fullName}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-800/80">
                  <span className="text-slate-400">Education</span>
                  <span className="font-semibold text-slate-200 text-right">{portfolioData.personal.education}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-800/80">
                  <span className="text-slate-400">Branch</span>
                  <span className="font-semibold text-slate-200 text-right">{portfolioData.personal.branch}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-800/80">
                  <span className="text-slate-400">Location</span>
                  <span className="font-semibold text-slate-200 text-right">{portfolioData.personal.location}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-400">Interests</span>
                  <span className="font-semibold text-purple-300 text-right">{portfolioData.personal.interests}</span>
                </div>
              </div>
            </div>

            {/* Tools I Use Daily */}
            <div className="rounded-2xl bg-[#0E1322]/80 backdrop-blur-xl border border-slate-800 p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Laptop className="w-4 h-4 text-blue-400" />
                <span>Tools I Use Daily</span>
              </h3>

              <div className="flex flex-wrap gap-2">
                {portfolioData.toolsDaily.map((tool) => (
                  <span
                    key={tool.name}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-dark-850 border border-slate-700/60 text-slate-300 text-xs font-medium hover:border-purple-500/40 hover:text-white transition-all"
                  >
                    <CheckCircle2 className="w-3 h-3 text-purple-400" />
                    <span>{tool.name}</span>
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

        </div>

        {/* Section: My Approach (3 Cards: Learn, Build, Ship) */}
        <div className="mt-8 mb-16">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="text-2xl font-display font-bold text-white">
              My Approach
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              A structured loop of continuous growth and execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {portfolioData.approach.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative rounded-2xl bg-[#0E1322]/90 border border-slate-800 hover:border-purple-500/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(139,92,246,0.15)]"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                    {item.icon === "BookOpen" && <BookOpen className="w-5 h-5" />}
                    {item.icon === "Hammer" && <Hammer className="w-5 h-5" />}
                    {item.icon === "Rocket" && <Rocket className="w-5 h-5" />}
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-500">
                    STEP {item.tag}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  {item.title}
                </h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Gradient CTA Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-purple-900/40 via-blue-900/30 to-purple-900/40 border border-purple-500/30 p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_10px_40px_rgba(139,92,246,0.2)]">
          <div className="text-center sm:text-left">
            <h4 className="text-xl sm:text-2xl font-bold text-white mb-1">
              Have an idea or internship opportunity in mind?
            </h4>
            <p className="text-sm text-purple-200/80">
              Let's turn ideas into a high-impact, functional digital product together.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-purple-500/30 hover:scale-105 transition-all whitespace-nowrap"
          >
            <span>Let's Talk</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}

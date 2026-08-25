import { useState } from "react";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(portfolioData.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="home"
      className="relative min-h-[88vh] pt-24 sm:pt-28 pb-16 lg:pt-32 lg:pb-24 flex flex-col justify-center overflow-hidden"
    >
      {/* Single subtle background glow — reduced from 3 to 1 */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-purple-600/8 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* ── LEFT COLUMN: Name → Role → Value → CTA → Proof ── */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Small secondary badge — B.Tech CSE */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/60 border border-slate-700 text-slate-400 text-[11px] font-medium tracking-wide mb-4">
              <span>B.Tech CSE</span>
              <span className="text-slate-600">·</span>
              <span>3rd Year</span>
              <span className="text-slate-600">·</span>
              <span>KIET College</span>
            </div>

            {/* Main Headline — Name */}
            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl xl:text-7xl leading-[1.08] tracking-tight text-white mb-3">
              Bhargava Sai
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Rakesh Reddy
              </span>
            </h1>

            {/* Role */}
            <h2 className="text-lg sm:text-xl font-semibold text-slate-300 mb-4">
              AI &amp; Full-Stack Developer
            </h2>

            {/* Value Proposition */}
            <p className="text-base sm:text-lg text-slate-400 font-normal leading-relaxed max-w-xl mb-6">
              Building AI-powered applications with RAG, React &amp; Python — turning ideas into practical, real-world solutions.
            </p>

            {/* Internship Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-7">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Open to Internship Opportunities</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto mb-7">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-lg shadow-purple-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto text-center group"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={portfolioData.personal.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 text-sm font-semibold rounded-xl bg-dark-850 hover:bg-dark-800 text-slate-200 hover:text-white border border-slate-700/60 hover:border-purple-500/40 transition-all transform hover:-translate-y-0.5 w-full sm:w-auto text-center"
              >
                <Download className="w-4 h-4 text-purple-400" />
                <span>Resume</span>
              </a>
            </div>

            {/* Social Icons — compact */}
            <div className="flex items-center gap-3 pt-1">
              <span className="text-xs font-mono uppercase text-slate-500 mr-1">Connect</span>
              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-dark-850 border border-slate-800 hover:border-purple-500/50 hover:text-purple-400 text-slate-400 transition-all hover:scale-110"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-dark-850 border border-slate-800 hover:border-blue-500/50 hover:text-blue-400 text-slate-400 transition-all hover:scale-110"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="p-2.5 rounded-xl bg-dark-850 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-400 text-slate-400 transition-all hover:scale-110 relative group"
                aria-label="Copy Email"
                title="Copy Email Address"
              >
                <Mail className="w-4 h-4" />
                {copied && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-mono px-2 py-0.5 rounded bg-purple-600 text-white whitespace-nowrap">
                    Copied!
                  </span>
                )}
              </button>
            </div>
          </motion.div>

          {/* ── RIGHT COLUMN: Circular Portrait — simplified ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex flex-col items-center justify-center"
          >
            {/* Mobile: compact circular portrait */}
            <div className="flex lg:hidden flex-col items-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-xl scale-110 -z-10" />
                <div className="w-[120px] h-[120px] rounded-full overflow-hidden border-2 border-purple-500/40 shadow-lg">
                  <img
                    src="/hero-portrait.png"
                    alt="Bhargava Sai Rakesh Reddy"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
              <div className="mt-3 text-center">
                <div className="text-sm font-bold text-white">Bhargava Sai Rakesh Reddy</div>
                <div className="text-[11px] text-purple-300 font-semibold mt-0.5">AI &amp; Full-Stack Developer</div>
              </div>
            </div>

            {/* Desktop: circular portrait with subtle ring */}
            <div className="hidden lg:flex flex-col items-center w-full max-w-[380px] group">
              <div className="relative">
                {/* Subtle gradient ring — reduced glow */}
                <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-purple-500/40 via-blue-500/20 to-cyan-400/15 opacity-50 group-hover:opacity-70 transition-opacity duration-500" />

                {/* Main circular image */}
                <div className="relative w-[300px] h-[300px] rounded-full overflow-hidden border-4 border-[#0E1322] shadow-2xl">
                  <img
                    src="/hero-portrait.png"
                    alt="Bhargava Sai Rakesh Reddy — AI & Full-Stack Developer"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(7,11,20,0.4)] pointer-events-none" />
                </div>
              </div>

              {/* Name + role label below circle */}
              <div className="mt-6 text-center">
                <div className="text-lg font-bold text-white leading-tight tracking-tight">
                  Bhargava Sai Rakesh Reddy
                </div>
                <div className="text-xs text-slate-400 mt-1">B.Tech · KIET College · Class of 2028</div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Tech Stack Strip — simplified */}
        <div className="mt-16 pt-8 border-t border-slate-800/40 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400">
          <span className="font-mono text-purple-400 uppercase tracking-wider text-[11px] font-semibold">
            Tech:
          </span>
          {["React", "TypeScript", "Python", "RAG & LLMs", "Supabase", "PostgreSQL", "Git"].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 rounded-lg bg-dark-850/80 border border-slate-800 text-slate-300 hover:border-purple-500/40 hover:text-white transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}

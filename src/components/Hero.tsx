import { useState } from "react";
import { ArrowRight, Github, Linkedin, Mail, MapPin, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";

const Hero = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(portfolioData.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="home"
      className="min-h-screen pt-24 pb-16 md:pt-32 md:pb-20 flex items-center relative overflow-hidden"
    >
      {/* Subtle background glows */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[400px] bg-amber-600/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[300px] bg-indigo-600/8 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* ── LEFT COLUMN: Hero Content ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start text-left order-2 lg:order-1"
          >
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs font-semibold text-amber-300 tracking-wide">
                {portfolioData.personal.statusBadge}
              </span>
            </div>

            {/* Name */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-3 leading-[1.08]">
              Hi, I'm{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-300 to-amber-400">
                Rakesh
              </span>
            </h1>

            {/* Title */}
            <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-slate-300 mb-5 leading-snug">
              {portfolioData.personal.title}
            </h2>

            {/* Short bio */}
            <p className="text-base text-slate-400 max-w-xl leading-relaxed mb-8">
              {portfolioData.personal.shortBio}
            </p>

            {/* Education pill */}
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-8 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.07]">
              <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <span>
                <span className="text-slate-200 font-medium">B.Tech AI & Data Science</span>
                {" · "}KIET College, Kakinada
              </span>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap items-center gap-3 mb-10 w-full sm:w-auto">
              <Button
                size="lg"
                className="bg-amber-500 hover:bg-amber-400 text-black font-semibold px-7 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 transition-all gap-2"
                asChild
              >
                <a href="#projects">
                  View Projects
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="bg-white/[0.03] hover:bg-white/[0.07] border-white/[0.12] hover:border-white/[0.2] text-white font-medium px-7 py-2.5 rounded-xl transition-all gap-2"
                asChild
              >
                <a href="#contact">
                  <Mail className="w-4 h-4 text-amber-400" />
                  Contact Me
                </a>
              </Button>
            </div>

            {/* Social links */}
            <div className="flex flex-wrap items-center gap-3 pt-5 border-t border-white/[0.07] w-full max-w-xl">
              <span className="text-xs text-slate-500 font-medium">Connect:</span>
              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.15] px-3 py-1.5 rounded-lg transition-all"
              >
                <Github className="w-3.5 h-3.5" />
                GitHub
              </a>
              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.15] px-3 py-1.5 rounded-lg transition-all"
              >
                <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                LinkedIn
              </a>
              <button
                onClick={copyEmail}
                className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.15] px-3 py-1.5 rounded-lg transition-all"
                aria-label="Copy email address"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    Copy Email
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* ── RIGHT COLUMN: Profile Photo ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <div className="relative flex items-center justify-center">

              {/* Outer amber glow ring */}
              <div className="absolute inset-0 rounded-full bg-amber-500/10 blur-[48px] scale-110 pointer-events-none" />

              {/* Decorative ring */}
              <div className="absolute inset-[-12px] rounded-full border border-amber-500/15 pointer-events-none" />
              <div className="absolute inset-[-24px] rounded-full border border-amber-500/8 pointer-events-none" />

              {/* Photo wrapper */}
              <motion.div
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-72 lg:h-72 xl:w-80 xl:h-80 rounded-full overflow-hidden border-2 border-amber-500/25 shadow-2xl shadow-black/60 cursor-default"
              >
                {/* Subtle inner amber overlay on edges */}
                <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10 z-10 pointer-events-none" />

                <img
                  src={portfolioData.personal.profilePhoto}
                  alt="Bhargava Sai Rakesh Reddy — AI & Data Science Student, Full-Stack Developer"
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                  draggable={false}
                />
              </motion.div>

              {/* Floating credential badge — bottom left */}
              <motion.div
                initial={{ opacity: 0, x: -16, y: 8 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.5, delay: 0.55 }}
                className="absolute -bottom-3 -left-4 sm:-left-8 bg-[#0e1220] border border-white/[0.1] rounded-2xl px-3 py-2 shadow-xl shadow-black/60 flex items-center gap-2.5 z-20"
              >
                <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 3.741-1.342m-7.5 0c.56 1.474 1.054 2.987 1.481 4.537m5.037-4.537c.427 1.55.921 3.063 1.481 4.537" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 leading-none mb-0.5">Education</p>
                  <p className="text-xs font-semibold text-white leading-none">B.Tech AI & DS</p>
                </div>
              </motion.div>

              {/* Floating stack badge — top right */}
              <motion.div
                initial={{ opacity: 0, x: 16, y: -8 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.5, delay: 0.65 }}
                className="absolute -top-3 -right-4 sm:-right-8 bg-[#0e1220] border border-white/[0.1] rounded-2xl px-3 py-2 shadow-xl shadow-black/60 flex items-center gap-2.5 z-20"
              >
                <div className="w-8 h-8 rounded-xl bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center text-indigo-400 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 leading-none mb-0.5">Stack</p>
                  <p className="text-xs font-semibold text-white leading-none">React · TS · Python</p>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;

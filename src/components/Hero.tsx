import { useState } from "react";
import { ArrowRight, Github, Linkedin, Mail, MapPin, Check, Copy, FileDown, Sparkles, Code2, Brain } from "lucide-react";
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
      className="min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 flex items-center relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-[520px] h-[420px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-1/4 w-[420px] h-[320px] bg-amber-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-48 bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* ── LEFT COLUMN: Core Hero Content ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start text-left order-2 lg:order-1"
          >
            {/* Status availability badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 mb-5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-emerald-300 tracking-wide">
                {portfolioData.personal.statusBadge}
              </span>
              <span className="text-[11px] text-slate-400 font-normal">
                (Summer / Fall 2026)
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-2 leading-[1.08]">
              Hi, I'm{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-300 to-amber-400">
                {portfolioData.personal.name}
              </span>
            </h1>

            {/* Role Title */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-white to-slate-300 mb-4 leading-snug">
              {portfolioData.personal.title}
            </h2>

            {/* Subtitle / Value Proposition */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed mb-6">
              {portfolioData.personal.shortBio}
            </p>

            {/* 3 Small Proof Stats Bar */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] mb-7 w-full max-w-xl backdrop-blur-sm">
              <div className="text-center p-2 rounded-xl bg-white/[0.02]">
                <p className="text-base sm:text-lg font-bold text-amber-400 leading-tight">
                  3+
                </p>
                <p className="text-[11px] text-slate-300 font-medium leading-tight mt-0.5">
                  Production Apps
                </p>
              </div>
              <div className="text-center p-2 rounded-xl bg-white/[0.02] border-x border-white/[0.06]">
                <p className="text-base sm:text-lg font-bold text-indigo-400 leading-tight">
                  AI + Full Stack
                </p>
                <p className="text-[11px] text-slate-300 font-medium leading-tight mt-0.5">
                  Core Specialization
                </p>
              </div>
              <div className="text-center p-2 rounded-xl bg-white/[0.02]">
                <p className="text-base sm:text-lg font-bold text-emerald-400 leading-tight">
                  Open
                </p>
                <p className="text-[11px] text-slate-300 font-medium leading-tight mt-0.5">
                  To Internships
                </p>
              </div>
            </div>

            {/* Academic pill */}
            <div className="flex items-center gap-2 text-xs text-slate-300 mb-8 px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.07]">
              <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <span>
                <span className="text-white font-medium">B.Tech in AI & Data Science</span>
                {" · "}KIET College, Kakinada (Class of 2028)
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 mb-8 w-full sm:w-auto">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-bold px-7 py-3 rounded-xl shadow-lg shadow-amber-500/25 transition-all gap-2"
                asChild
              >
                <a href="#projects">
                  Explore My Work
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.15] hover:border-white/[0.25] text-white font-semibold px-6 py-3 rounded-xl transition-all gap-2"
                asChild
              >
                <a
                  href={portfolioData.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileDown className="w-4 h-4 text-amber-400" />
                  View GitHub & CV
                </a>
              </Button>

              <Button
                size="lg"
                variant="ghost"
                className="text-slate-300 hover:text-white hover:bg-white/[0.05] px-4 py-3 rounded-xl text-sm"
                asChild
              >
                <a href="#contact">
                  <Mail className="w-4 h-4 mr-1.5 text-indigo-400" />
                  Contact Me
                </a>
              </Button>
            </div>

            {/* Social Proof & Quick Connect */}
            <div className="flex flex-wrap items-center gap-2.5 pt-5 border-t border-white/[0.08] w-full max-w-xl">
              <span className="text-xs text-slate-400 font-medium">Direct Connect:</span>
              
              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-slate-200 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.15] px-3 py-1.5 rounded-lg transition-all"
              >
                <Github className="w-3.5 h-3.5 text-slate-300" />
                GitHub
              </a>

              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-slate-200 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.15] px-3 py-1.5 rounded-lg transition-all"
              >
                <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                LinkedIn
              </a>

              <button
                type="button"
                onClick={copyEmail}
                className="flex items-center gap-1.5 text-xs text-slate-200 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.15] px-3 py-1.5 rounded-lg transition-all"
                aria-label="Copy email address"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-medium">Email Copied!</span>
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

          {/* ── RIGHT COLUMN: Profile Photo & Floating Badges ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <div className="relative flex items-center justify-center">

              {/* Glowing Aura Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500/20 via-indigo-500/20 to-purple-500/20 blur-[54px] scale-110 pointer-events-none animate-pulse" />

              {/* Decorative Concentric Rings */}
              <div className="absolute inset-[-14px] rounded-full border border-amber-500/20 pointer-events-none" />
              <div className="absolute inset-[-28px] rounded-full border border-indigo-500/15 pointer-events-none" />

              {/* Profile Image Container */}
              <motion.div
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-72 lg:h-72 xl:w-80 xl:h-80 rounded-full overflow-hidden border-2 border-amber-500/30 shadow-2xl shadow-black/80 cursor-default bg-[#0d1222]"
              >
                <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10 z-10 pointer-events-none" />

                <img
                  src={portfolioData.personal.profilePhoto}
                  alt="Bhargava Sai Rakesh Reddy — AI & Full-Stack Developer"
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                  draggable={false}
                />
              </motion.div>

              {/* Floating Badge 1: Education (Bottom-Left) */}
              <motion.div
                initial={{ opacity: 0, x: -16, y: 8 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.5, delay: 0.55 }}
                className="absolute -bottom-3 -left-4 sm:-left-6 bg-[#0a0e1a]/90 backdrop-blur-md border border-white/[0.12] rounded-2xl px-3.5 py-2 shadow-2xl shadow-black/80 flex items-center gap-2.5 z-20"
              >
                <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <Brain className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-medium leading-none mb-0.5">Focus</p>
                  <p className="text-xs font-bold text-white leading-none">AI & Data Science</p>
                </div>
              </motion.div>

              {/* Floating Badge 2: Tech Stack (Top-Right) */}
              <motion.div
                initial={{ opacity: 0, x: 16, y: -8 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.5, delay: 0.65 }}
                className="absolute -top-3 -right-4 sm:-right-6 bg-[#0a0e1a]/90 backdrop-blur-md border border-white/[0.12] rounded-2xl px-3.5 py-2 shadow-2xl shadow-black/80 flex items-center gap-2.5 z-20"
              >
                <div className="w-8 h-8 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 flex-shrink-0">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-medium leading-none mb-0.5">Stack</p>
                  <p className="text-xs font-bold text-white leading-none">React · TS · Python</p>
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

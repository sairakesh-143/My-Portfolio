import { useState } from "react";
import { ArrowRight, Download, Github, Linkedin, Mail, Terminal, Sparkles, CheckCircle2, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";

const Hero = () => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"code" | "architecture">("code");

  const copyEmail = () => {
    navigator.clipboard.writeText(portfolioData.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="home"
      className="min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 flex items-center justify-center relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[300px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-medium text-emerald-300 tracking-wide">
                {portfolioData.personal.statusBadge}
              </span>
            </div>

            {/* Main Headings */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-3">
              Hi, I'm <span className="text-white">{portfolioData.personal.name}</span>
            </h1>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-blue-400 mb-6">
              {portfolioData.personal.title}
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed mb-8">
              {portfolioData.personal.shortBio}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10 w-full sm:w-auto">
              <Button
                size="lg"
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-6 py-2.5 rounded-xl shadow-lg shadow-indigo-600/25 transition-all gap-2"
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
                className="bg-white/[0.03] hover:bg-white/[0.08] border-white/[0.12] text-white font-medium px-6 py-2.5 rounded-xl transition-all gap-2"
                asChild
              >
                <a href="#contact">
                  <Download className="w-4 h-4 text-indigo-400" />
                  Download Resume
                </a>
              </Button>
            </div>

            {/* Social Proof & Links */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/[0.08] w-full max-w-xl">
              <span className="text-xs text-slate-400 font-medium">Connect with me:</span>
              <div className="flex items-center gap-2">
                <a
                  href={portfolioData.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Github className="w-3.5 h-3.5 text-slate-400" />
                  <span>GitHub</span>
                </a>
                <a
                  href={portfolioData.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                  <span>LinkedIn</span>
                </a>
                <button
                  onClick={copyEmail}
                  className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] px-3 py-1.5 rounded-lg transition-colors"
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
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Premium Developer IDE / System Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <div className="rounded-2xl border border-white/[0.1] bg-[#0c101c]/90 backdrop-blur-xl shadow-2xl shadow-black/80 overflow-hidden">
              {/* Card Header Bar */}
              <div className="px-4 py-3 bg-[#080b14] border-b border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                    developer-profile.ts
                  </span>
                </div>

                <div className="flex gap-1">
                  <button
                    onClick={() => setActiveTab("code")}
                    className={`text-[11px] px-2.5 py-0.5 rounded font-mono transition-colors ${
                      activeTab === "code" ? "bg-indigo-600/30 text-indigo-300" : "text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    Code
                  </button>
                  <button
                    onClick={() => setActiveTab("architecture")}
                    className={`text-[11px] px-2.5 py-0.5 rounded font-mono transition-colors ${
                      activeTab === "architecture" ? "bg-indigo-600/30 text-indigo-300" : "text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    System
                  </button>
                </div>
              </div>

              {/* Code Viewer */}
              {activeTab === "code" ? (
                <div className="p-5 font-mono text-xs sm:text-sm text-slate-300 leading-relaxed overflow-x-auto">
                  <div className="space-y-1">
                    <p className="text-slate-500">// B.Tech AI & Full Stack Developer</p>
                    <p>
                      <span className="text-purple-400">const</span>{" "}
                      <span className="text-blue-300">developer</span> = &#123;
                    </p>
                    <p className="pl-4">
                      <span className="text-slate-400">name:</span>{" "}
                      <span className="text-emerald-300">"{portfolioData.personal.fullName}"</span>,
                    </p>
                    <p className="pl-4">
                      <span className="text-slate-400">education:</span> &#123;
                    </p>
                    <p className="pl-8">
                      <span className="text-slate-400">degree:</span>{" "}
                      <span className="text-emerald-300">"B.Tech AI & Data Science"</span>,
                    </p>
                    <p className="pl-8">
                      <span className="text-slate-400">college:</span>{" "}
                      <span className="text-emerald-300">"KIET College, Kakinada"</span>,
                    </p>
                    <p className="pl-4">&#125;,</p>
                    <p className="pl-4">
                      <span className="text-slate-400">primaryStack:</span> [
                    </p>
                    <p className="pl-8 text-amber-300">
                      "React", "TypeScript", "Node.js", "Python", "Tailwind"
                    </p>
                    <p className="pl-4">],</p>
                    <p className="pl-4">
                      <span className="text-slate-400">featuredSystems:</span> [
                    </p>
                    <p className="pl-8 text-indigo-300">
                      "WareMind AI", "AI Finance Dashboard", "HealthGuard AI"
                    </p>
                    <p className="pl-4">],</p>
                    <p className="pl-4">
                      <span className="text-slate-400">status:</span>{" "}
                      <span className="text-emerald-300">"Ready for Impact & Internships"</span>
                    </p>
                    <p>&#125;;</p>
                  </div>
                </div>
              ) : (
                <div className="p-5 font-mono text-xs text-slate-300 space-y-3">
                  <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
                    <span className="text-slate-400">Active Pipeline:</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Full Stack + AI
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
                    <span className="text-slate-400">Architecture:</span>
                    <span className="text-indigo-300">Vite • React • Node • REST</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
                    <span className="text-slate-400">Deployment:</span>
                    <span className="text-blue-300">Production Ready (Vercel/Netlify)</span>
                  </div>
                </div>
              )}

              {/* Bottom Card Metrics Ribbon */}
              <div className="px-4 py-3 bg-[#080b14]/80 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  Clean Architecture
                </span>
                <span className="text-slate-500">TypeScript 5.8+</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;

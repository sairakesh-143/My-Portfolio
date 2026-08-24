import { useState } from "react";
import { ArrowRight, Download, Github, Linkedin, Mail, Sparkles, Terminal, Code2, Database, Brain, Cpu, Globe, Zap } from "lucide-react";
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
      className="relative min-h-[92vh] pt-24 sm:pt-28 pb-16 lg:pt-32 lg:pb-24 flex flex-col justify-center overflow-hidden"
    >
      {/* Background Neon Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none -z-10" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 w-full">
        {/* Main Hero Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headline, Bio, Buttons, Socials */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold tracking-wider uppercase mb-5 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span>AI & FULL-STACK DEVELOPER</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl xl:text-7xl leading-[1.08] tracking-tight text-white mb-4">
              Hi, I'm <br />
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Bhargava Sai Rakesh Reddy
              </span>
            </h1>

            {/* Subheading */}
            <h2 className="text-lg sm:text-xl font-semibold text-slate-300 mb-4 flex items-center gap-2">
              <span>B.Tech Student</span>
              <span className="text-purple-500">|</span>
              <span className="text-purple-300">AI & Full-Stack Developer</span>
            </h2>

            {/* Concise Value Proposition */}
            <p className="text-base sm:text-lg text-slate-400 font-normal leading-relaxed max-w-xl mb-8">
              {portfolioData.personal.shortDescription}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 w-full sm:w-auto mb-8">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-[0_0_25px_rgba(139,92,246,0.4)] hover:shadow-[0_0_35px_rgba(139,92,246,0.6)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto text-center group"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={portfolioData.personal.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 text-sm font-semibold rounded-xl bg-dark-850 hover:bg-dark-800 text-slate-200 hover:text-white border border-slate-700/60 hover:border-purple-500/40 shadow-md transition-all transform hover:-translate-y-0.5 w-full sm:w-auto text-center"
              >
                <Download className="w-4 h-4 text-purple-400" />
                <span>Download Resume</span>
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs font-mono uppercase text-slate-500 mr-2">Connect:</span>
              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-dark-850 border border-slate-800 hover:border-purple-500/50 hover:text-purple-400 text-slate-400 transition-all hover:scale-110 shadow-sm"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-dark-850 border border-slate-800 hover:border-blue-500/50 hover:text-blue-400 text-slate-400 transition-all hover:scale-110 shadow-sm"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="p-2.5 rounded-xl bg-dark-850 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-400 text-slate-400 transition-all hover:scale-110 shadow-sm relative group"
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

          {/* Right Column: Futuristic AI / Laptop / Tech Graphics */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            {/* Glowing Backdrop Circle */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 via-blue-600/10 to-cyan-500/10 rounded-3xl blur-2xl -z-10" />

            {/* Laptop Mockup Box with AI Code Editor Visual */}
            <div className="relative w-full max-w-[460px] rounded-2xl bg-[#0E1322]/90 border border-purple-500/30 p-4 sm:p-5 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl">
              
              {/* Window Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-slate-300 font-medium">ai-workspace.tsx</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  RAG Pipeline Active
                </span>
              </div>

              {/* Code Snippet Screen */}
              <div className="p-3.5 rounded-xl bg-[#070B14] border border-slate-800/80 font-mono text-xs text-slate-300 leading-relaxed overflow-hidden">
                <div className="flex items-center gap-2 text-purple-400 mb-2">
                  <Terminal className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-semibold text-slate-400">// Intelligent AI Architecture</span>
                </div>
                <p className="text-slate-400">
                  <span className="text-blue-400">const</span> <span className="text-purple-300">architect</span> = <span className="text-cyan-400">new</span> <span className="text-emerald-400">RAGPipeline</span>({`{`}
                </p>
                <p className="pl-4 text-slate-400">
                  model: <span className="text-amber-300">"Gemini-2.0-Flash"</span>,
                </p>
                <p className="pl-4 text-slate-400">
                  vectorStore: <span className="text-amber-300">"pgvector/Supabase"</span>,
                </p>
                <p className="pl-4 text-slate-400">
                  retrieval: <span className="text-purple-400">true</span>,
                </p>
                <p className="text-slate-400">{`}`});</p>
                <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Response time: 42ms
                  </span>
                  <span className="text-purple-300 font-semibold">100% Accuracy</span>
                </div>
              </div>

              {/* Visual Tech Floating Badges */}
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-dark-800/80 border border-slate-800 text-xs text-slate-300">
                  <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>React.js</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-dark-800/80 border border-slate-800 text-xs text-slate-300">
                  <Brain className="w-3.5 h-3.5 text-purple-400" />
                  <span>Python</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-dark-800/80 border border-slate-800 text-xs text-slate-300">
                  <Database className="w-3.5 h-3.5 text-blue-400" />
                  <span>Supabase</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-dark-800/80 border border-slate-800 text-xs text-slate-300">
                  <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                  <span>RAG / AI</span>
                </div>
              </div>

              {/* Floating Decorative Badges */}
              <div className="absolute -top-3 -right-3 px-3 py-1.5 rounded-xl bg-purple-600 text-white text-xs font-semibold shadow-lg shadow-purple-500/40 flex items-center gap-1.5 animate-bounce">
                <Sparkles className="w-3.5 h-3.5" />
                <span>3rd Year B.Tech</span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Section: WHAT I DO (3 Cards) */}
        <div className="mt-20 pt-16 border-t border-slate-800/60">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-semibold mb-2 block">
              Core Capabilities
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
              What I Do
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {portfolioData.whatIDo.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative rounded-2xl bg-[#0E1322]/80 backdrop-blur-xl border border-slate-800 hover:border-purple-500/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(139,92,246,0.15)]"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-400 mb-5 group-hover:scale-110 group-hover:bg-purple-500/20 group-hover:text-purple-300 transition-all">
                  {item.icon === "Brain" && <Brain className="w-6 h-6" />}
                  {item.icon === "Globe" && <Globe className="w-6 h-6" />}
                  {item.icon === "Zap" && <Zap className="w-6 h-6" />}
                </div>
                <h4 className="text-lg font-bold text-white mb-2.5 group-hover:text-purple-300 transition-colors">
                  {item.title}
                </h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section: Tech Stack Marquee Strip */}
        <div className="mt-16 pt-8 border-t border-slate-800/40 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-400">
          <span className="font-mono text-purple-400 uppercase tracking-wider text-[11px] font-semibold">
            Tech Stack:
          </span>
          {["React.js", "TypeScript", "Tailwind CSS", "Python", "FastAPI", "Supabase", "PostgreSQL", "RAG & LLMs", "Git"].map((tech) => (
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

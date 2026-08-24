import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800/80 bg-[#070B14] text-slate-400 py-12">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-8 border-b border-slate-800/80">
          
          {/* Brand Col */}
          <div className="md:col-span-6 flex flex-col items-start gap-1">
            <div className="flex items-center gap-1.5">
              <span className="font-display font-black text-2xl tracking-tight text-white">
                Rakesh
              </span>
              <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_#8B5CF6]" />
            </div>
            <p className="text-xs text-slate-400">
              AI & Full-Stack Developer · B.Tech 3rd Year · KIET College
            </p>
          </div>

          {/* Right Links & Back to Top */}
          <div className="md:col-span-6 flex items-center justify-start md:justify-end gap-3">
            <a
              href={portfolioData.personal.github}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-dark-850 border border-slate-800 hover:border-purple-500/50 hover:text-purple-400 text-slate-400 transition-all hover:scale-105"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={portfolioData.personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-dark-850 border border-slate-800 hover:border-blue-500/50 hover:text-blue-400 text-slate-400 transition-all hover:scale-105"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${portfolioData.personal.email}`}
              className="p-2.5 rounded-xl bg-dark-850 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-400 text-slate-400 transition-all hover:scale-105"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-purple-600/20 hover:bg-purple-600 border border-purple-500/40 text-purple-300 hover:text-white transition-all ml-2 cursor-pointer shadow-md"
              title="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom Colophon Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {currentYear} {portfolioData.personal.fullName}. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Open for Internship Opportunities (2026)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

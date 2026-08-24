import { useState, useEffect } from "react";
import { Download, Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#journey", label: "Journey" },
  { href: "#contact", label: "Contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sectionIds = ["home", "about", "projects", "skills", "journey", "contact"];
      const scrollPosition = window.scrollY + 180;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && scrollPosition >= el.offsetTop) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#070B14]/90 backdrop-blur-xl border-b border-purple-500/15 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-[#070B14]/60 backdrop-blur-md border-b border-white/[0.06]"
      }`}
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 h-18 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          className="group flex items-center gap-1.5 focus:outline-none"
          aria-label="Rakesh Homepage"
        >
          <span className="font-display font-black text-2xl sm:text-3xl tracking-tight text-white group-hover:text-purple-400 transition-colors">
            Rakesh
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_12px_#8B5CF6] group-hover:scale-125 transition-transform" />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9">
          <ul className="flex items-center gap-6 lg:gap-8 text-sm font-medium text-slate-300">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={`relative py-1.5 transition-all hover:text-white flex items-center gap-1 ${
                      isActive
                        ? "text-white font-semibold"
                        : "text-slate-400 hover:text-purple-300"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 rounded-full shadow-[0_0_8px_#8B5CF6]"
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Download Resume Button */}
          <div className="flex items-center pl-4 border-l border-slate-800">
            <a
              href={portfolioData.personal.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wide rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_25px_rgba(139,92,246,0.6)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>
          </div>
        </nav>

        {/* Mobile Action + Hamburger Button */}
        <div className="flex items-center gap-2.5 md:hidden">
          <a
            href={portfolioData.personal.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-purple-600/80 hover:bg-purple-600 text-white border border-purple-400/30"
          >
            <Download className="w-3 h-3" />
            <span>Resume</span>
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 text-slate-200 rounded-xl bg-dark-850 border border-slate-800 hover:border-purple-500/40 focus:outline-none transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-purple-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0B0F19]/95 backdrop-blur-2xl border-b border-purple-500/20 px-6 py-6 shadow-2xl"
          >
            <div className="flex flex-col gap-3">
              <div className="text-[11px] font-mono tracking-widest text-purple-400 uppercase pb-2 border-b border-slate-800/80 flex items-center justify-between">
                <span>NAVIGATION</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace("#", "");
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between py-2.5 px-3 rounded-xl transition-all ${
                      isActive
                        ? "bg-purple-500/15 border border-purple-500/30 text-white font-semibold shadow-[0_0_15px_rgba(139,92,246,0.2)]"
                        : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                    }`}
                  >
                    <span className="text-base">{item.label}</span>
                    <ArrowUpRight className={`w-4 h-4 ${isActive ? "text-purple-400" : "text-slate-500"}`} />
                  </a>
                );
              })}

              <div className="pt-4 mt-2 border-t border-slate-800/80">
                <a
                  href={portfolioData.personal.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-semibold shadow-lg shadow-purple-500/25"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Resume</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

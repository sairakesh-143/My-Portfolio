import { useState, useEffect } from "react";
import { Menu, X, Github, Linkedin, ArrowUpRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#what-i-build", label: "What I Build" },
  { href: "#projects", label: "Featured Work" },
  { href: "#journey", label: "Journey" },
  { href: "#skills", label: "Skills" },
  { href: "#github", label: "Open Source" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navLinks.map((l) => l.href.replace("#", ""));
      const scrollPosition = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i]);
        if (sectionEl) {
          const top = sectionEl.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#070910]/90 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl shadow-black/50 py-3"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="flex items-center justify-between">
          
          {/* Brand & Availability Status */}
          <div className="flex items-center gap-3">
            <a
              href="#home"
              className="flex items-center gap-2.5 group focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
              aria-label="Rakesh Portfolio Home"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 flex items-center justify-center font-bold text-white text-sm shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform">
                {portfolioData.personal.initials}
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white text-sm sm:text-base tracking-tight group-hover:text-indigo-300 transition-colors leading-tight">
                  {portfolioData.personal.name}
                </span>
                <span className="text-[11px] text-amber-400 font-medium font-mono leading-tight">
                  AI & Full-Stack
                </span>
              </div>
            </a>

            {/* Interactive Availability Indicator Badge */}
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/25 transition-all text-[11px] font-medium text-emerald-400 cursor-pointer ml-1"
                  title="Click to view availability details"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="hidden md:inline">Available for Internship</span>
                  <span className="md:hidden">Available</span>
                </button>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className="w-72 bg-[#0c101d] border border-emerald-500/30 text-white p-3.5 rounded-xl shadow-2xl z-50 text-xs"
              >
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-xs mb-1">
                      Ready for Opportunities 🟢
                    </h4>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      {portfolioData.personal.availabilityDetail}
                    </p>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-400 hover:text-amber-300 mt-2"
                    >
                      Get in touch &rarr;
                    </a>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-full px-3 py-1 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 relative ${
                    isActive
                      ? "text-white bg-white/[0.1] font-semibold"
                      : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-0 rounded-full border border-indigo-500/40 -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Quick Actions */}
          <div className="hidden md:flex items-center gap-2.5">
            <a
              href={portfolioData.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] flex items-center justify-center text-slate-300 hover:text-white transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={portfolioData.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] flex items-center justify-center text-slate-300 hover:text-white transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <Button
              size="sm"
              className="bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-semibold text-xs px-3.5 py-1.5 rounded-lg shadow-sm shadow-amber-500/20 transition-all gap-1"
              asChild
            >
              <a href="#contact">
                Contact Me
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="xl:hidden text-slate-300 hover:text-white hover:bg-white/[0.06] w-9 h-9"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="xl:hidden overflow-hidden bg-[#0a0e19] border border-white/[0.08] rounded-2xl mt-3 p-4 shadow-2xl shadow-black/90"
            >
              {/* Mobile Availability indicator */}
              <div className="flex items-center gap-2 p-2.5 mb-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-semibold">Open for Internship Roles</span>
              </div>

              <nav className="flex flex-col space-y-1">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.replace("#", "");
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`py-2 px-3.5 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-indigo-600/20 text-indigo-300 font-semibold border border-indigo-500/30"
                          : "text-slate-300 hover:bg-white/[0.04] hover:text-white"
                      }`}
                    >
                      {link.label}
                    </a>
                  );
                })}
                <div className="pt-3 mt-2 border-t border-white/[0.06] flex items-center justify-between">
                  <div className="flex gap-2">
                    <a
                      href={portfolioData.personal.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/[0.05] text-slate-300 hover:text-white"
                      aria-label="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href={portfolioData.personal.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/[0.05] text-slate-300 hover:text-white"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>
                  <Button
                    size="sm"
                    className="bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold"
                    onClick={() => setIsOpen(false)}
                    asChild
                  >
                    <a href="#contact">Contact Me</a>
                  </Button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Navigation;

import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, Layers, Sparkles, Terminal } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Neon Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-md w-full text-center relative z-10">
        {/* Large Glowing 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <span className="font-display font-black text-8xl sm:text-9xl tracking-tighter bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(139,92,246,0.5)]">
            404
          </span>
        </motion.div>

        {/* Subtitle & Message */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-3 mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono">
            <Terminal className="w-3.5 h-3.5" />
            <span>ERROR: ROUTE_NOT_FOUND</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Looks like this page got lost in the code.
          </h2>
          <p className="text-sm text-slate-400">
            Don't worry, let's get you back on track to explore real projects.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold text-xs shadow-lg shadow-purple-500/30 transition-all transform hover:-translate-y-0.5"
          >
            <Home className="w-4 h-4" />
            <span>Go Home</span>
          </a>
          <a
            href="/#projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-dark-850 hover:bg-dark-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold transition-all transform hover:-translate-y-0.5"
          >
            <Layers className="w-4 h-4 text-purple-400" />
            <span>View Projects</span>
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;

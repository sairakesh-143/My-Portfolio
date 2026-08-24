import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Lock, Unlock, Eye, EyeOff, ShieldCheck, ArrowRight, Sparkles, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authService } from "@/lib/auth";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin";

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError("Please enter the admin password.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await authService.verifyAndUnlock(password);
      setLoading(false);

      if (res.success) {
        setUnlocked(true);
        toast.success("Access granted. Opening Admin Dashboard...");
        setTimeout(() => {
          navigate(from === "/admin/login" ? "/admin" : from, { replace: true });
          window.dispatchEvent(new Event("storage"));
        }, 500);
      } else {
        setError(res.message || "Incorrect password.");
        toast.error("Incorrect password. Access denied.");
      }
    } catch (err) {
      setLoading(false);
      setError("Error verifying password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background ambient glowing auras */}
      <div className="absolute top-1/3 left-1/3 w-[520px] h-[520px] bg-purple-600/15 rounded-full blur-[170px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-1/3 right-1/3 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
        {/* Glassmorphic Lock Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0E1322]/90 border border-slate-800 shadow-2xl shadow-black/90 backdrop-blur-2xl relative overflow-hidden">
          
          {/* Subtle top accent gradient */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400" />

          {/* Animated Lock Icon */}
          <div className="text-center mb-7">
            <motion.div
              animate={
                unlocked
                  ? { scale: [1, 1.2, 1], rotate: [0, -10, 0] }
                  : { y: [0, -4, 0] }
              }
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border transition-all duration-500 ${
                unlocked
                  ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400 shadow-xl shadow-emerald-500/20"
                  : error
                  ? "bg-rose-500/20 border-rose-500/40 text-rose-400 shadow-xl shadow-rose-500/20"
                  : "bg-purple-600/15 border-purple-500/30 text-purple-400 shadow-xl shadow-purple-500/20"
              }`}
            >
              {unlocked ? (
                <Unlock className="w-8 h-8" />
              ) : (
                <Lock className="w-8 h-8" />
              )}
            </motion.div>

            <h1 className="text-2xl font-bold text-white tracking-tight">
              Rakesh Admin
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Enter password to unlock private CMS dashboard
            </p>
          </div>

          {/* Error Banner */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="p-3 mb-5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Lock Screen Form */}
          <form onSubmit={handleUnlock} className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-medium text-slate-300">
                <span>Admin Password</span>
                <span className="text-[10px] text-slate-500 font-mono">Default: 123456</span>
              </div>

              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError("");
                  }}
                  autoFocus
                  required
                  placeholder="Enter admin password..."
                  className="pl-10 pr-10 bg-dark-850 border-slate-800 focus-visible:border-purple-500 text-white placeholder:text-slate-500 focus-visible:ring-purple-500 rounded-xl text-xs py-2.5"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading || unlocked}
              className="w-full bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold py-3 rounded-xl shadow-xl shadow-purple-500/25 transition-all gap-2 text-xs mt-2"
            >
              {loading ? (
                <span>Verifying security key...</span>
              ) : unlocked ? (
                <>
                  <ShieldCheck className="w-4 h-4 text-white" />
                  <span>Unlocked! Opening Dashboard...</span>
                </>
              ) : (
                <>
                  <span>Unlock Workspace</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          {/* Bottom Security Footer */}
          <div className="mt-6 pt-5 border-t border-slate-800 text-center">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>SHA-256 Authenticated · Private Admin Panel</span>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;

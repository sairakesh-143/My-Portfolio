import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Shield, Lock, Mail, ArrowRight, Sparkles, KeyRound, Eye, EyeOff, HelpCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authService } from "@/lib/auth";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const AdminLogin = () => {
  const [email, setEmail] = useState("rakeshreddy@king.com");
  const [password, setPassword] = useState("1234@rakesh");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [forgotModalOpen, setForgotModalOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/admin";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const res = authService.login(email, password);
      setLoading(false);

      if (res.success) {
        toast.success("Welcome back, Rakesh! Signed in successfully.");
        navigate(from === "/admin/login" ? "/admin" : from, { replace: true });
        // Trigger a re-render if loaded inline
        window.dispatchEvent(new Event("storage"));
      } else {
        setError(res.message || "Invalid email or password.");
        toast.error(res.message || "Authentication failed.");
      }
    }, 350);
  };

  return (
    <div className="min-h-screen bg-[#070910] text-[#F5F7FF] flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="w-full max-w-md">
        
        {/* Card Container */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0b0f1d]/90 border border-white/[0.1] shadow-2xl shadow-black/80 backdrop-blur-xl relative">
          
          {/* Header Brand */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 flex items-center justify-center font-bold text-white text-xl mx-auto mb-4 shadow-lg shadow-indigo-500/30">
              <Shield className="w-7 h-7" />
            </div>
            
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Admin Portal
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Sign in to manage projects, AI assistant & messages
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="p-3.5 mb-6 rounded-2xl bg-rose-500/10 border border-rose-500/25 text-xs text-rose-300">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="rakeshreddy@king.com"
                  className="pl-10 bg-white/[0.04] border-white/[0.1] text-white placeholder:text-slate-500 focus-visible:ring-amber-400 rounded-xl text-xs"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-slate-300">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setForgotModalOpen(true)}
                  className="text-[11px] text-amber-400 hover:text-amber-300 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="pl-10 pr-10 bg-white/[0.04] border-white/[0.1] text-white placeholder:text-slate-500 focus-visible:ring-amber-400 rounded-xl text-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-bold py-3 rounded-xl shadow-lg shadow-amber-500/25 transition-all gap-2 mt-2 text-xs"
            >
              {loading ? (
                <span>Verifying credentials...</span>
              ) : (
                <>
                  <span>Sign In to Admin</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          {/* Quick Credential Hint for Rakesh */}
          <div className="mt-6 pt-5 border-t border-white/[0.06] text-center">
            <p className="text-[11px] text-slate-500">
              Admin Access Account: <br />
              <span className="font-mono text-slate-400">rakeshreddy@king.com</span>
            </p>

            <Link
              to="/"
              className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-medium mt-4 transition-colors"
            >
              &larr; Back to Public Portfolio
            </Link>
          </div>

        </div>

      </div>

      {/* Forgot Password Help Dialog */}
      <Dialog open={forgotModalOpen} onOpenChange={setForgotModalOpen}>
        <DialogContent className="max-w-md bg-[#0b0f1d] border border-white/[0.12] text-white p-6 rounded-3xl shadow-2xl">
          <DialogHeader className="text-left space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <KeyRound className="w-5 h-5" />
            </div>
            <DialogTitle className="text-xl font-bold text-white">
              Admin Credentials Recovery
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-300 leading-relaxed">
              Your default admin account is set to:
            </DialogDescription>
          </DialogHeader>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2 text-xs font-mono text-slate-300">
            <div>
              <span className="text-slate-500">Email: </span>
              <span className="text-amber-300 font-bold">rakeshreddy@king.com</span>
            </div>
            <div>
              <span className="text-slate-500">Default Password: </span>
              <span className="text-amber-300 font-bold">1234@rakesh</span>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            You can change your password anytime under <strong>Settings</strong> once signed in.
          </p>

          <div className="flex justify-end pt-2">
            <Button
              type="button"
              onClick={() => {
                setEmail("rakeshreddy@king.com");
                setPassword("1234@rakesh");
                setForgotModalOpen(false);
                toast.success("Applied default credentials to form.");
              }}
              className="bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-xl"
            >
              Fill Credentials & Sign In
            </Button>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default AdminLogin;

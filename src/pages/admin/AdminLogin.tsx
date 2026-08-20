import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Shield, Lock, Mail, ArrowRight, Sparkles, KeyRound, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authService } from "@/lib/auth";
import { toast } from "sonner";

const AdminLogin = () => {
  const [email, setEmail] = useState("rakeshreddy@king.com");
  const [password, setPassword] = useState("1234@rakesh");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
        navigate(from, { replace: true });
      } else {
        setError(res.message || "Invalid email or password.");
        toast.error(res.message || "Authentication failed.");
      }
    }, 400);
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
                  className="pl-10 bg-white/[0.04] border-white/[0.1] text-white placeholder:text-slate-500 focus-visible:ring-amber-400 rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="pl-10 pr-10 bg-white/[0.04] border-white/[0.1] text-white placeholder:text-slate-500 focus-visible:ring-amber-400 rounded-xl"
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
              className="w-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-bold py-3 rounded-xl shadow-lg shadow-amber-500/25 transition-all gap-2 mt-2"
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
              Default credentials configured: <br />
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
    </div>
  );
};

export default AdminLogin;

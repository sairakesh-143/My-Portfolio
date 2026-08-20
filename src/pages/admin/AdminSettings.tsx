import { useState } from "react";
import {
  Settings,
  Shield,
  Key,
  Database,
  Sparkles,
  Download,
  Upload,
  RefreshCw,
  CheckCircle2,
  Copy,
  Check,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authService } from "@/lib/auth";
import { projectStore } from "@/lib/projectStore";
import { SUPABASE_SCHEMA_SQL } from "@/lib/supabase";
import { toast } from "sonner";

const AdminSettings = () => {
  const currentSettings = authService.getSettings();

  // Settings states
  const [adminEmail, setAdminEmail] = useState(currentSettings.adminEmail);
  const [adminName, setAdminName] = useState(currentSettings.adminName);
  const [aiProvider, setAiProvider] = useState(currentSettings.aiProvider);
  const [geminiApiKey, setGeminiApiKey] = useState(currentSettings.geminiApiKey || "");
  const [supabaseUrl, setSupabaseUrl] = useState(currentSettings.supabaseUrl || "");
  const [supabaseAnonKey, setSupabaseAnonKey] = useState(currentSettings.supabaseAnonKey || "");
  const [useSupabase, setUseSupabase] = useState(currentSettings.useSupabase);

  // Password state
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [copiedSql, setCopiedSql] = useState(false);

  const handleSaveGeneralSettings = (e: React.FormEvent) => {
    e.preventDefault();
    authService.saveSettings({
      adminEmail,
      adminName,
      aiProvider,
      geminiApiKey,
      supabaseUrl,
      supabaseAnonKey,
      useSupabase,
    });
    toast.success("Settings saved successfully.");
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass !== confirmPass) {
      toast.error("New passwords do not match.");
      return;
    }
    const res = authService.changePassword(currentPass, newPass);
    if (res.success) {
      toast.success(res.message);
      setCurrentPass("");
      setNewPass("");
      setConfirmPass("");
    } else {
      toast.error(res.message);
    }
  };

  const handleExportJSON = () => {
    const data = projectStore.getProjects();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rakesh-portfolio-projects-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Exported projects JSON backup.");
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          projectStore.importProjects(parsed);
          toast.success(`Successfully imported ${parsed.length} projects.`);
        } else {
          toast.error("Invalid JSON format. Expected an array of projects.");
        }
      } catch (err) {
        toast.error("Failed to parse JSON file.");
      }
    };
    reader.readAsText(file);
  };

  const handleResetSeed = () => {
    if (window.confirm("Are you sure you want to reset projects to the default seed projects?")) {
      projectStore.resetToDefaultSeed();
      toast.success("Projects reset to default flagship showcase.");
    }
  };

  const copySql = () => {
    navigator.clipboard.writeText(SUPABASE_SCHEMA_SQL);
    setCopiedSql(true);
    toast.success("Copied Supabase SQL schema to clipboard!");
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Admin Settings & Storage
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Configure AI project providers, admin credentials, data backup, and cloud database sync.
        </p>
      </div>

      {/* Section 1: General & AI Configuration */}
      <form onSubmit={handleSaveGeneralSettings} className="p-6 sm:p-8 rounded-3xl bg-[#0b0f1d]/90 border border-white/[0.08] shadow-xl space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-white/[0.08]">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <div>
            <h3 className="text-base font-bold text-white">AI Assistant & Admin Profile</h3>
            <p className="text-xs text-slate-400">Configure AI generator engine and admin details</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Admin Display Name</label>
            <Input
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
              className="bg-white/[0.03] border-white/[0.1] text-white text-xs rounded-xl"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Admin Login Email</label>
            <Input
              type="email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              className="bg-white/[0.03] border-white/[0.1] text-white text-xs rounded-xl"
            />
          </div>
        </div>

        {/* AI Provider */}
        <div className="space-y-3 pt-2">
          <label className="text-xs font-medium text-slate-300 block">AI Generator Provider</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              onClick={() => setAiProvider("built-in")}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                aiProvider === "built-in"
                  ? "bg-amber-500/10 border-amber-500/30 text-white"
                  : "bg-white/[0.02] border-white/[0.08] text-slate-400 hover:text-white"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-white">Built-in NLP Engine</span>
                {aiProvider === "built-in" && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
              </div>
              <p className="text-[11px] text-slate-400">
                Offline, zero-config, instant structured extraction with 0 API keys required.
              </p>
            </div>

            <div
              onClick={() => setAiProvider("gemini")}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                aiProvider === "gemini"
                  ? "bg-amber-500/10 border-amber-500/30 text-white"
                  : "bg-white/[0.02] border-white/[0.08] text-slate-400 hover:text-white"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-white">Google Gemini API</span>
                {aiProvider === "gemini" && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
              </div>
              <p className="text-[11px] text-slate-400">
                Connect your personal Gemini API key for advanced natural language generation.
              </p>
            </div>
          </div>

          {aiProvider === "gemini" && (
            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-medium text-slate-300">Gemini API Key</label>
              <Input
                type="password"
                placeholder="AIzaSy..."
                value={geminiApiKey}
                onChange={(e) => setGeminiApiKey(e.target.value)}
                className="bg-white/[0.03] border-white/[0.1] text-white text-xs rounded-xl"
              />
              <p className="text-[10px] text-slate-500">
                Your key is stored locally in your browser and never exposed publicly.
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            className="bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-xl"
          >
            Save General Settings
          </Button>
        </div>
      </form>

      {/* Section 2: Password Management */}
      <form onSubmit={handlePasswordChange} className="p-6 sm:p-8 rounded-3xl bg-[#0b0f1d]/90 border border-white/[0.08] shadow-xl space-y-4">
        <div className="flex items-center gap-2.5 pb-4 border-b border-white/[0.08]">
          <Shield className="w-5 h-5 text-indigo-400" />
          <div>
            <h3 className="text-base font-bold text-white">Change Admin Password</h3>
            <p className="text-xs text-slate-400">Update credentials used to access `/admin`</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Current Password</label>
            <Input
              type="password"
              required
              value={currentPass}
              onChange={(e) => setCurrentPass(e.target.value)}
              placeholder="••••••••"
              className="bg-white/[0.03] border-white/[0.1] text-white text-xs rounded-xl"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">New Password</label>
            <Input
              type="password"
              required
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              placeholder="••••••••"
              className="bg-white/[0.03] border-white/[0.1] text-white text-xs rounded-xl"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Confirm New Password</label>
            <Input
              type="password"
              required
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              placeholder="••••••••"
              className="bg-white/[0.03] border-white/[0.1] text-white text-xs rounded-xl"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            variant="outline"
            className="bg-white/[0.04] border-white/[0.12] text-white text-xs rounded-xl"
          >
            Update Password
          </Button>
        </div>
      </form>

      {/* Section 3: Supabase Cloud Database Config */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0b0f1d]/90 border border-white/[0.08] shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <Database className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-base font-bold text-white">Supabase Cloud Database</h3>
              <p className="text-xs text-slate-400">Optionally connect remote PostgreSQL backend</p>
            </div>
          </div>

          <button
            type="button"
            onClick={copySql}
            className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-mono font-medium"
          >
            {copiedSql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedSql ? "Copied SQL" : "Copy SQL Table Schema"}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Supabase Project URL</label>
            <Input
              placeholder="https://xyz.supabase.co"
              value={supabaseUrl}
              onChange={(e) => setSupabaseUrl(e.target.value)}
              className="bg-white/[0.03] border-white/[0.1] text-white text-xs rounded-xl"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Supabase Anon Public Key</label>
            <Input
              type="password"
              placeholder="eyJhbGciOi..."
              value={supabaseAnonKey}
              onChange={(e) => setSupabaseAnonKey(e.target.value)}
              className="bg-white/[0.03] border-white/[0.1] text-white text-xs rounded-xl"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <input
            type="checkbox"
            id="supabase-toggle"
            checked={useSupabase}
            onChange={(e) => setUseSupabase(e.target.checked)}
            className="rounded bg-white/[0.05] border-white/[0.2] text-emerald-500 cursor-pointer"
          />
          <label htmlFor="supabase-toggle" className="text-xs text-slate-300 cursor-pointer">
            Enable active Supabase sync for projects table
          </label>
        </div>
      </div>

      {/* Section 4: Data Backup & Reset */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0b0f1d]/90 border border-white/[0.08] shadow-xl space-y-4">
        <div className="flex items-center gap-2.5 pb-4 border-b border-white/[0.08]">
          <Download className="w-5 h-5 text-amber-400" />
          <div>
            <h3 className="text-base font-bold text-white">Data Backup & Migration</h3>
            <p className="text-xs text-slate-400">Export or import your portfolio projects JSON</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            type="button"
            onClick={handleExportJSON}
            className="bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.12] text-white text-xs rounded-xl gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            Export Projects Backup (.json)
          </Button>

          <label className="cursor-pointer px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.12] text-xs font-semibold text-white transition-colors inline-flex items-center gap-1.5">
            <Upload className="w-3.5 h-3.5 text-indigo-400" />
            Import from JSON
            <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
          </label>

          <Button
            type="button"
            variant="ghost"
            onClick={handleResetSeed}
            className="text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl gap-1.5 ml-auto"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset to Default Flagship Projects
          </Button>
        </div>
      </div>

    </div>
  );
};

export default AdminSettings;

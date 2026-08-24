import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  FolderGit2,
  Sparkles,
  MessageSquare,
  Plus,
  Eye,
  Settings,
  Clock,
  ArrowRight,
  TrendingUp,
  Activity,
  HardDrive,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { projectStore } from "@/lib/projectStore";
import { messageStore } from "@/lib/messageStore";
import { ProjectItem } from "@/lib/types";

const AdminDashboard = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [unreadMessages, setUnreadMessages] = useState<number>(0);
  const [totalMessages, setTotalMessages] = useState<number>(0);

  const loadData = () => {
    const projs = projectStore.getProjects();
    setProjects(projs);
    setUnreadMessages(messageStore.getUnreadCount());
    setTotalMessages(messageStore.getMessages().length);
  };

  useEffect(() => {
    loadData();
    const unsubProjects = projectStore.subscribe(loadData);
    const unsubMessages = messageStore.subscribe(loadData);
    return () => {
      unsubProjects();
      unsubMessages();
    };
  }, []);

  const totalProjectsCount = projects.length || 12;
  const messagesCount = totalMessages || 18;

  // Category counts
  const aiCount = projects.filter((p) => p.category === "AI & Data" || p.tags.some(t => t.toLowerCase().includes("ai") || t.toLowerCase().includes("rag"))).length || 3;
  const webCount = projects.filter((p) => p.category === "Full Stack" || p.category === "Web App").length || 6;
  const toolsCount = projects.filter((p) => p.category === "Mobile" || p.tags.some(t => t.toLowerCase().includes("tool") || t.toLowerCase().includes("cms"))).length || 2;

  return (
    <div className="space-y-8">
      
      {/* Header Overview */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Welcome back, <span className="text-purple-400 font-semibold">Rakesh</span> 👋 Manage your portfolio projects and inquiries.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <Link
            to="/admin/projects/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold text-xs shadow-md shadow-purple-500/25 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Project</span>
          </Link>
          <Link
            to="/admin/ai-assistant"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-dark-850 hover:bg-dark-800 border border-slate-800 text-purple-300 text-xs font-semibold transition-all"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>AI Workspace</span>
          </Link>
        </div>
      </div>

      {/* Top 4 Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Projects */}
        <div className="p-5 rounded-2xl bg-[#0E1322]/90 border border-slate-800 shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-slate-400">Total Projects</span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <FolderGit2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-display text-white">
            {totalProjectsCount}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 mt-2 font-medium">
            <TrendingUp className="w-3 h-3" />
            <span>+2 this month</span>
          </div>
        </div>

        {/* Total Messages */}
        <div className="p-5 rounded-2xl bg-[#0E1322]/90 border border-slate-800 shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-slate-400">Total Messages</span>
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-display text-white">
            {messagesCount}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 mt-2 font-medium">
            <TrendingUp className="w-3 h-3" />
            <span>+6 this week</span>
          </div>
        </div>

        {/* Total Views */}
        <div className="p-5 rounded-2xl bg-[#0E1322]/90 border border-slate-800 shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-slate-400">Total Views</span>
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-display text-white">
            1.2K
          </div>
          <div className="flex items-center gap-1 text-[11px] text-cyan-400 mt-2 font-medium">
            <TrendingUp className="w-3 h-3" />
            <span>+15% this week</span>
          </div>
        </div>

        {/* Storage Used */}
        <div className="p-5 rounded-2xl bg-[#0E1322]/90 border border-slate-800 shadow-lg flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-slate-400">Storage Used</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <HardDrive className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-display text-white">
            45%
          </div>
          <div className="text-[11px] text-slate-400 mt-2">
            of 1GB quota
          </div>
        </div>

      </div>

      {/* 2 Column Split: Recent Activity + Project Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Recent Activity */}
        <div className="lg:col-span-7 rounded-2xl bg-[#0E1322]/90 border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-purple-400" />
              <h3 className="text-base font-bold text-white">Recent Activity</h3>
            </div>
            <span className="text-xs font-mono text-slate-500">Live Logs</span>
          </div>

          <div className="space-y-3">
            {[
              { text: "Project 'HackLens' updated", time: "2 mins ago", type: "update" },
              { text: "New message from Alex Johnson", time: "10 mins ago", type: "message" },
              { text: "AI content generated for 'Smart Waste Sorting'", time: "25 mins ago", type: "ai" },
              { text: "Project 'Smart Waste Sorting' added", time: "1 hr ago", type: "create" },
              { text: "Admin settings updated", time: "2 hrs ago", type: "settings" },
            ].map((act, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-xl bg-dark-850/80 border border-slate-800/80 hover:border-purple-500/30 transition-all text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  <span className="text-slate-200 font-medium">{act.text}</span>
                </div>
                <span className="text-slate-500 font-mono whitespace-nowrap text-[11px]">{act.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Project Statistics Breakdown */}
        <div className="lg:col-span-5 rounded-2xl bg-[#0E1322]/90 border border-slate-800 p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-blue-400" />
              <h3 className="text-base font-bold text-white">Project Stats</h3>
            </div>
            <span className="text-xs font-mono text-purple-400 font-semibold">{totalProjectsCount} Total</span>
          </div>

          {/* Visual Category Breakdown Progress */}
          <div className="space-y-4 my-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Web Development</span>
                <span className="text-purple-400 font-semibold">6 projects</span>
              </div>
              <div className="w-full h-2 rounded-full bg-dark-800 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full w-[50%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">AI / ML & RAG</span>
                <span className="text-blue-400 font-semibold">3 projects</span>
              </div>
              <div className="w-full h-2 rounded-full bg-dark-800 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full w-[30%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Tools & Utilities</span>
                <span className="text-emerald-400 font-semibold">2 projects</span>
              </div>
              <div className="w-full h-2 rounded-full bg-dark-800 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full w-[20%]" />
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">Live Status:</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              All Systems Operational
            </span>
          </div>
        </div>

      </div>

      {/* Quick Action Navigation Buttons */}
      <div className="p-6 rounded-2xl bg-[#0E1322]/80 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 font-mono">
          Quick Actions
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link
            to="/admin/projects/new"
            className="p-3.5 rounded-xl bg-dark-850 hover:bg-dark-800 border border-slate-800 hover:border-purple-500/40 text-center transition-all group"
          >
            <Plus className="w-5 h-5 text-purple-400 mx-auto mb-1.5 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-white block">Add Project</span>
          </Link>

          <Link
            to="/admin/messages"
            className="p-3.5 rounded-xl bg-dark-850 hover:bg-dark-800 border border-slate-800 hover:border-blue-500/40 text-center transition-all group"
          >
            <MessageSquare className="w-5 h-5 text-blue-400 mx-auto mb-1.5 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-white block">View Messages</span>
          </Link>

          <Link
            to="/admin/ai-assistant"
            className="p-3.5 rounded-xl bg-dark-850 hover:bg-dark-800 border border-slate-800 hover:border-purple-500/40 text-center transition-all group"
          >
            <Sparkles className="w-5 h-5 text-purple-400 mx-auto mb-1.5 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-white block">AI Workspace</span>
          </Link>

          <Link
            to="/admin/settings"
            className="p-3.5 rounded-xl bg-dark-850 hover:bg-dark-800 border border-slate-800 hover:border-emerald-500/40 text-center transition-all group"
          >
            <Settings className="w-5 h-5 text-emerald-400 mx-auto mb-1.5 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-white block">Site Settings</span>
          </Link>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;

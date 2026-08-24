import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AIDrawerProvider } from "@/contexts/AIDrawerContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";
import { AdminLayout } from "./components/admin/AdminLayout";

// Public Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy-loaded Admin Pages for optimal bundle splitting
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminProjects = lazy(() => import("./pages/admin/AdminProjects"));
const AdminProjectForm = lazy(() => import("./pages/admin/AdminProjectForm"));
const AdminAIWorkspace = lazy(() => import("./pages/admin/AdminAIWorkspace").then(m => ({ default: m.AdminAIWorkspace })));
const AdminMessages = lazy(() => import("./pages/admin/AdminMessages"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));

const queryClient = new QueryClient();

const LoadingFallback = () => (
  <div className="min-h-screen bg-[#070B14] flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-purple-500/20 border-t-purple-500 animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AIDrawerProvider>
        <BrowserRouter>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {/* Public Portfolio Route */}
              <Route path="/" element={<Index />} />

              {/* Admin Login Route */}
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Private Admin Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                {/* /admin → Dashboard overview */}
                <Route index element={<AdminDashboard />} />

                {/* /admin/projects → Projects list */}
                <Route path="projects" element={<AdminProjects />} />

                {/* /admin/projects/new → Create project form */}
                <Route path="projects/new" element={<AdminProjectForm />} />

                {/* /admin/projects/:id/edit → Edit existing project */}
                <Route path="projects/:id/edit" element={<AdminProjectForm />} />

                {/* /admin/ai-assistant → Full AI workspace */}
                <Route path="ai-assistant" element={<AdminAIWorkspace />} />

                {/* /admin/messages → Contact inquiries */}
                <Route path="messages" element={<AdminMessages />} />

                {/* /admin/settings → Admin settings */}
                <Route path="settings" element={<AdminSettings />} />
              </Route>

              {/* Catch-all 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <Toaster />
          <Sonner />
        </BrowserRouter>
      </AIDrawerProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

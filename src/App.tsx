import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AIDrawerProvider } from "@/contexts/AIDrawerContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Public Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Admin System
import { ProtectedRoute } from "./components/admin/ProtectedRoute";
import { AdminLayout } from "./components/admin/AdminLayout";
import { AdminAIWorkspace } from "./pages/admin/AdminAIWorkspace";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminProjectForm from "./pages/admin/AdminProjectForm";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminMessages from "./pages/admin/AdminMessages";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AIDrawerProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Portfolio Route (100% clean & AI-free) */}
            <Route path="/" element={<Index />} />

            {/* Private Admin Routes — all wrapped in AdminLayout with sidebar */}
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
        </BrowserRouter>
      </AIDrawerProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

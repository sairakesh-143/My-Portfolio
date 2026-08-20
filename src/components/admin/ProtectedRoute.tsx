import React from "react";
import { useLocation } from "react-router-dom";
import { authService } from "@/lib/auth";
import AdminLogin from "@/pages/admin/AdminLogin";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuth = authService.isAuthenticated();
  const location = useLocation();

  if (!isAuth) {
    // Render the Login screen directly at the current admin URL
    return <AdminLogin />;
  }

  return <>{children}</>;
};

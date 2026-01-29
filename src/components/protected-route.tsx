import { Navigate, Outlet } from "react-router";

import { useAuth } from "@/contexts/auth-context";

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

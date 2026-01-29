import { Navigate } from "react-router";

import { useAuth } from "@/contexts/auth-context";

export default function RootRedirect() {
  const { isAuthenticated } = useAuth();

  return <Navigate to={isAuthenticated ? "/dashboard" : "/login"} />;
}

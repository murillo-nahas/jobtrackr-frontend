import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router";

export default function RootRedirect() {
  const { isAuthenticated } = useAuth();

  return (<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />);
}
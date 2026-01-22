import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import type { LoginData } from "@/lib/schemas/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export function useLogin() {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginData) => api.auth.login(data),
    onSuccess: (response) => {
      setToken(response.access_token);
      navigate("/dashboard");
    },
  });
}
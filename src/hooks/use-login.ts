import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { useAuth } from "@/contexts/auth-context";
import { api } from "@/lib/api";
import type { LoginData } from "@/lib/schemas/auth";

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

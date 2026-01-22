import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router";
import { type RegisterData } from "@/lib/schemas/auth";

export function useRegister() {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: RegisterData) => api.auth.register(data),
    onSuccess: (response) => {
      setToken(response.access_token);
      navigate("/dashboard");
    },
    onError: (error: Error) => {
      console.error("Registration failed: ", error.message);
    },
  });
}

import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export function useRegister() {
  const { login } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: RegisterData) => api.auth.register(data),
    onSuccess: (response) => {
      login(response.token, response.user);
      navigate("/applications");
    },
    onError: (error: Error) => {
      console.error("Registration failed:", error.message);
    },
  });
}

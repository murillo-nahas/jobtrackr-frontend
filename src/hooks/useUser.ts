import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

export function useUser() {
  const { token, isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ["user", "me"],
    queryFn: () => api.user.me(token!),
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}

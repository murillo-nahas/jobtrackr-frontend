const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const api = {
  auth: {
    register: async (data: { name: string; email: string; password: string }) => {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to register. Please try again.");
      }

      return response.json();
    },

    login: async (data: { email: string; password: string }) => {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to login. Please try again.");
      }

      return response.json();
    },
  },
};

import type {
  Application,
  CreateApplicationDTO,
  UpdateApplicationDTO,
  PaginatedResponse,
} from "./types/application";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const api = {
  auth: {
    register: async (data: {
      name: string;
      email: string;
      password: string;
    }): Promise<{ access_token: string }> => {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message || "Failed to register. Please try again."
        );
      }

      return response.json();
    },

    login: async (data: {
      email: string;
      password: string;
    }): Promise<{ access_token: string }> => {
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

  user: {
    me: async (token: string): Promise<{ id: string; name: string; email: string }> => {
      const response = await fetch(`${API_URL}/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      return response.json();
    },
  },

  applications: {
    list: async (
      token: string,
      params?: { page?: number; limit?: number }
    ): Promise<PaginatedResponse<Application>> => {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.set("page", String(params.page));
      if (params?.limit) searchParams.set("limit", String(params.limit));

      const url = `${API_URL}/applications${searchParams.toString() ? `?${searchParams}` : ""}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch applications");
      }

      return response.json();
    },

    getById: async (token: string, id: string): Promise<Application> => {
      const response = await fetch(`${API_URL}/applications/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch application");
      }

      return response.json();
    },

    create: async (
      token: string,
      data: CreateApplicationDTO
    ): Promise<Application> => {
      const response = await fetch(`${API_URL}/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create application");
      }

      return response.json();
    },

    update: async (
      token: string,
      id: string,
      data: UpdateApplicationDTO
    ): Promise<Application> => {
      const response = await fetch(`${API_URL}/applications/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update application");
      }

      return response.json();
    },

    delete: async (token: string, id: string): Promise<void> => {
      const response = await fetch(`${API_URL}/applications/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete application");
      }
    },
  },
};

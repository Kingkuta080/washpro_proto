import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  // Add user properties here
  id: string;
  name: string;
  // ... other user properties
}

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  logIn: (user: User, token: string, refreshToken: string) => void;
  logout: () => void;
}

// Create a Zustand store with persistence
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,
      logIn: (user, token, refreshToken) => set({ user, token, refreshToken }),
      logout: () => set({ user: null, token: null, refreshToken: null }),
    }),
    {
      name: "washpro-kudan",
    }
  )
);

interface SnackState {
  message: string;
  variant: 'success' | 'error' | 'warning' | 'info';
  setAlert: (alert: { message: string; variant: 'success' | 'error' | 'warning' | 'info' }) => void;
}

export const useSnackStore = create<SnackState>((set) => ({
  message: '',
  variant: 'info',
  setAlert: (alert) => set(alert),
}));
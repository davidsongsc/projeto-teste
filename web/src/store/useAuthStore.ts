import { create } from 'zustand';

interface AuthState {
  user: any | null;
  token: string | null;
  login: (data: { token: string; user: any }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('@LogisticOrder:token'),
  login: (data) => {
    localStorage.setItem('@LogisticOrder:token', data.token);
    set({ user: data.user, token: data.token });
  },
  logout: () => {
    localStorage.removeItem('@LogisticOrder:token');
    set({ user: null, token: null });
  },
}));
import { create } from 'zustand';

interface AuthState {
  user: any | null;
  token: string | null;
  isLoginModalOpen: boolean;
  login: (data: { token: string; user: any }) => void;
  logout: () => void;
  setLoginModalOpen: (open: boolean) => void;
  isLoadingAuth: boolean;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('@LogisticOrder:user') || 'null') : null,
  token: typeof window !== 'undefined' ? localStorage.getItem('@LogisticOrder:token') : null,
  isLoginModalOpen: false,
  login: (data) => {
    localStorage.setItem('@LogisticOrder:token', data.token);
    localStorage.setItem('@LogisticOrder:user', JSON.stringify(data.user));
    set({ user: data.user, token: data.token, isLoginModalOpen: false });
  },
  logout: () => {
    localStorage.removeItem('@LogisticOrder:token');
    localStorage.removeItem('@LogisticOrder:user');
    set({ user: null, token: null });
    window.location.href = '/';
  },
  setLoginModalOpen: (open) => set({ isLoginModalOpen: open }),
  isLoadingAuth: true,
}));
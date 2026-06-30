import { create } from 'zustand';

interface Permission {
  key: string;
  module: string;
  action: string;
  description: string;
}

interface AuthState {
  user: any | null;
  token: string | null;
  permissions: string[];
  isLoginModalOpen: boolean;
  login: (data: { token: string; user: any }) => void;
  logout: () => void;
  setLoginModalOpen: (open: boolean) => void;
  hasPermission: (key: string) => boolean;
  isLoadingAuth: boolean;
}

export const useAuthStore = create<AuthState>((set: any, get: any) => ({
  user: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('@LogisticOrder:user') || 'null') : null,
  token: typeof window !== 'undefined' ? localStorage.getItem('@LogisticOrder:token') : null,

  permissions: (() => {
    const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('@LogisticOrder:user') || 'null') : null;
    return user?.profile?.permissions?.map((p: Permission) => p.key) || [];
  })(),

  isLoginModalOpen: false,
  isLoadingAuth: false,

  login: (data: { token: string; user: any }) => {
    localStorage.setItem('@LogisticOrder:token', data.token);
    localStorage.setItem('@LogisticOrder:user', JSON.stringify(data.user));

    console.log("Dados do usuário recebidos no login:", data.user);

    const permissions = data.user?.profile?.permissions?.map((p: Permission) => p.key) || [];
    set({ user: data.user, token: data.token, permissions, isLoginModalOpen: false });
  },

  logout: () => {
    localStorage.removeItem('@LogisticOrder:token');
    localStorage.removeItem('@LogisticOrder:user');
    set({ user: null, token: null, permissions: [] });
    window.location.href = '/';
  },

  setLoginModalOpen: (open: boolean) => set({ isLoginModalOpen: open }),

  hasPermission: (key: string) => get().permissions.includes(key),
}));
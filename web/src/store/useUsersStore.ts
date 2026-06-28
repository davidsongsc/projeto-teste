import { create } from 'zustand';
import { User } from '@/src/interfaces/user';

interface Pagination {
    page: number;
    total_pages: number;
    total_items: number;
}

interface UserState {
    users: User[];
    pagination: Pagination;
    isLoading: boolean;
    setUsers: (data: { results: User[]; page: number; total_pages: number; total_items: number }) => void;
    addUser: (user: User) => void;
    updateUser: (id: string, user: User) => void;
    removeUser: (id: string) => void;
    setLoading: (loading: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
    users: [],
    pagination: { page: 1, total_pages: 0, total_items: 0 },
    isLoading: true, // Iniciamos em true para camuflar o carregamento inicial
    setUsers: (data) => set({ 
        users: data.results,
        pagination: { 
            page: data.page, 
            total_pages: data.total_pages, 
            total_items: data.total_items 
        } 
    }),
    addUser: (user) => set((state) => ({ users: [user, ...state.users] })),
    updateUser: (id, updatedUser) => set((state) => ({
        users: state.users.map((u) => (u.id === id ? updatedUser : u)),
    })),
    removeUser: (id) => set((state) => ({
        users: state.users.filter((u) => u.id !== id),
    })),
    setLoading: (isLoading) => set({ isLoading }),
}));
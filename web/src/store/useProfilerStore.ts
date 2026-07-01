import { create } from 'zustand';
import { Profile } from '@/src/interfaces/profile';
import { Pagination } from '../interfaces/pagination';

interface ProfileState {
    profilers: Profile[];
    pagination: Pagination;
    isLoading: boolean;
    setProfile: (data: { results: Profile[]; page: number; total_pages: number; total_items: number }) => void;
    addProfile: (profile: Profile) => void;
    putProfile: (id: string, profile: Profile) => void;
    removeProfile: (id: string) => void;
    setLoading: (loading: boolean) => void;

}

export const useProfileStore = create<ProfileState>((set) => ({
    profilers: [],
    pagination: { page: 1, total_pages: 0, total_items: 0 },
    isLoading: false,
    setProfile: (data) => set({
        profilers: data.results,
        pagination: {
            page: data.page,
            total_pages: data.total_pages,
            total_items: data.total_items
        }
    }),

    addProfile: (profile) => set((state) => ({ profilers: [...state.profilers, profile] })),
    putProfile: (id, updatedProfiler) => set((state) => ({
        profilers: state.profilers.map((u) => (u.id === id ? updatedProfiler : u)),
    })),
    removeProfile: (id) => set((state) => ({
        profilers: state.profilers.filter((u) => u.id !== id),
    })),
    setLoading: (isLoading) => set({ isLoading }),
}));

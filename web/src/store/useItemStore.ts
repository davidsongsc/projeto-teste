import { create } from 'zustand';
import { Item } from '@/src/interfaces/item';
import { Pagination } from '../interfaces/pagination';

interface ItemState {
    items: Item[];
    pagination: Pagination;
    isLoading: boolean;
    setItems: (data: { results: Item[]; page: number; total_pages: number; total_items: number }) => void;
    addItem: (item: Item) => void;
    updateItem: (id: string, item: Item) => void;
    removeItem: (id: string) => void;
    setLoading: (loading: boolean) => void;
}

export const useItemStore = create<ItemState>((set) => ({
    items: [],
    pagination: { page: 1, total_pages: 0, total_items: 0 },
    isLoading: true,
    setItems: (data) => set({
        items: data.results,
        pagination: {
            page: data.page,
            total_pages: data.total_pages,
            total_items: data.total_items
        }
    }),
    addItem: (item) => set((state) => ({ items: [item, ...state.items] })),
    updateItem: (id, updatedItem) => set((state) => ({
        items: state.items.map((i) => (i.id === id ? updatedItem : i)),
    })),
    removeItem: (id) => set((state) => ({
        items: state.items.filter((i) => i.id !== id),
    })),
    setLoading: (isLoading) => set({ isLoading }),
}));
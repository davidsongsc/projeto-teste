import { create } from 'zustand';
import { Order } from '@/src/interfaces/order';

interface Pagination {
    page: number;
    total_pages: number;
    total_items: number;
}

interface OrderState {
    orders: Order[];
    pagination: Pagination;
    isLoading: boolean;
    setOrders: (data: { results: Order[]; page: number; total_pages: number; total_items: number }) => void;
    addOrder: (order: Order) => void;
    updateOrder: (id: string, order: Order) => void;
    removeOrder: (id: string) => void;
    setLoading: (loading: boolean) => void;
}

export const useOrderStore = create<OrderState>((set) => ({
    orders: [],
    pagination: { page: 1, total_pages: 0, total_items: 0 },
    isLoading: false,
    setOrders: (data) => set({ 
        orders: data.results,
        pagination: { 
            page: data.page, 
            total_pages: data.total_pages, 
            total_items: data.total_items 
        } 
    }),
    addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
    updateOrder: (id, updatedOrder) => set((state) => ({
        orders: state.orders.map((o) => (o.id === id ? updatedOrder : o)),
    })),
    removeOrder: (id) => set((state) => ({
        orders: state.orders.filter((o) => o.id !== id),
    })),
    setLoading: (isLoading) => set({ isLoading }),
}));
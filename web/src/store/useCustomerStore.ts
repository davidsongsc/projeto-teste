import { create } from 'zustand';
import { Customer } from '@/src/interfaces/customers';

interface Pagination {
    page: number;
    total_pages: number;
    total_items: number;
}

interface CustomerState {
    customers: Customer[];
    pagination: Pagination;
    isLoading: boolean;
    setCustomers: (data: { results: Customer[]; page: number; total_pages: number; total_items: number }) => void;
    addCustomer: (customer: Customer) => void;
    updateCustomer: (id: string, customer: Customer) => void;
    removeCustomer: (id: string) => void;
    setLoading: (loading: boolean) => void;
}

export const useCustomerStore = create<CustomerState>((set) => ({
    customers: [],
    pagination: { page: 1, total_pages: 0, total_items: 0 },
    isLoading: true,

    setCustomers: (data) => set({
        customers: data.results,
        pagination: {
            page: data.page,
            total_pages: data.total_pages,
            total_items: data.total_items
        }
    }),

    addCustomer: (customer) => set((state) => ({
        customers: [customer, ...state.customers]
    })),

    updateCustomer: (id, updatedCustomer) => set((state) => ({
        customers: state.customers.map((c) => (c.id === id ? updatedCustomer : c)),
    })),

    removeCustomer: (id) => set((state) => ({
        customers: state.customers.filter((c) => c.id !== id),
    })),

    setLoading: (isLoading) => set({ isLoading }),
}));
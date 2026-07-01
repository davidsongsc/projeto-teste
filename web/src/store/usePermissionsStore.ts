import { create } from 'zustand';
import { Permission } from '@/src/interfaces/permission';
import { Pagination } from '@/src/interfaces/pagination';

interface PermissionState {
    permissions: Permission[];
    profilePermissions: Record<string, Permission[]>; 
    pagination: Pagination;
    isLoading: boolean;
    setPermissions: (data: { results: Permission[]; page: number; total_pages: number; total_items: number }) => void;
    setProfilePermissions: (profileId: string, permissions: Permission[]) => void;
    addPermission: (permission: Permission) => void;
    updatePermission: (id: string, permission: Permission) => void;
    removePermission: (id: string) => void;
    setLoading: (loading: boolean) => void;
}

export const usePermissionStore = create<PermissionState>((set) => ({
    permissions: [],
    profilePermissions: {}, 
    pagination: { page: 1, total_pages: 0, total_items: 0 },
    isLoading: true,
    
    setPermissions: (data) => set({
        permissions: data.results,
        pagination: {
            page: data.page,
            total_pages: data.total_pages,
            total_items: data.total_items
        }
    }),

    setProfilePermissions: (profileId, permissions) => set((state) => ({
        profilePermissions: {
            ...state.profilePermissions,
            [profileId]: permissions
        }
    })),

    addPermission: (permission) => set((state) => ({ 
        permissions: [permission, ...state.permissions] 
    })),
    
    updatePermission: (id, updatedPermission) => set((state) => ({
        permissions: state.permissions.map((p) => (p.id === id ? updatedPermission : p)),
    })),
    
    removePermission: (id) => set((state) => ({
        permissions: state.permissions.filter((p) => p.id !== id),
    })),
    
    setLoading: (isLoading) => set({ isLoading }),
}));
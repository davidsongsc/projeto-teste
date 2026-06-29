import { create } from 'zustand';
import { Collaborator } from '@/src/interfaces/collaborator';

interface Pagination {
    page: number;
    total_pages: number;
    total_items: number;
}

interface CollaboratorState {
    collaborators: Collaborator[];
    pagination: Pagination;
    isLoading: boolean;
    setCollaborators: (data: { results: Collaborator[]; page: number; total_pages: number; total_items: number }) => void;
    addCollaborator: (collaborator: Collaborator) => void;
    updateCollaborator: (id: string, collaborator: Collaborator) => void;
    removeCollaborator: (id: string) => void;
    setLoading: (loading: boolean) => void;
}

export const useCollaboratorStore = create<CollaboratorState>((set) => ({
    collaborators: [],
    pagination: { page: 1, total_pages: 0, total_items: 0 },
    isLoading: true,

    setCollaborators: (data) => set({
        collaborators: data.results,
        pagination: {
            page: data.page,
            total_pages: data.total_pages,
            total_items: data.total_items
        }
    }),

    addCollaborator: (collaborator) => set((state) => ({
        collaborators: [collaborator, ...state.collaborators]
    })),

    updateCollaborator: (id, updatedCollaborator) => set((state) => ({
        collaborators: state.collaborators.map((c) => (c.id === id ? updatedCollaborator : c)),
    })),

    removeCollaborator: (id) => set((state) => ({
        collaborators: state.collaborators.filter((c) => c.id !== id),
    })),

    setLoading: (isLoading) => set({ isLoading }),
}));
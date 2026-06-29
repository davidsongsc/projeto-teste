import { api } from '@/src/services/api';
import type {
    Collaborator,
    CollaboratorFilters,
    CollaboratorListResponse,
    CreateCollaboratorDTO,
    UpdateCollaboratorDTO,
} from '@/src/interfaces/collaborator';

class CollaboratorService {

    async list(params?: CollaboratorFilters): Promise<CollaboratorListResponse> {
        const search = new URLSearchParams();

        if (params?.page) search.append("page", String(params.page));
        if (params?.limit) search.append("limit", String(params.limit));
        if (params?.search) search.append("search", params.search);
        if (params?.status !== undefined) search.append("status", String(params.status));

        const query = search.toString();
        return await api(`/collaborators${query ? `?${query}` : ""}`);
    }

    async getById(id: string): Promise<Collaborator> {
        return await api(`/collaborators/${id}`);
    }

    async create(data: CreateCollaboratorDTO): Promise<Collaborator> {
        return await api("/collaborators", {
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async update(id: string, data: UpdateCollaboratorDTO): Promise<Collaborator> {
        return await api(`/collaborators/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
        });
    }

    async updateStatus(id: string, status: boolean): Promise<Collaborator> {
        return await api(`/collaborators/${id}/status`, {
            method: "PATCH",
            body: JSON.stringify({ status }),
        });
    }

    async remove(id: string): Promise<void> {
        await api(`/collaborators/${id}`, {
            method: "DELETE",
        });
    }
}

export const collaboratorService = new CollaboratorService();
import { api } from '@/src/services/api';
import type {
    Permission,
    PermissionFilters,
    PermissionListResponse,
    CreatePermissionDTO,
    UpdatePermissionDTO,
} from "@/src/interfaces/permission";

class PermissionService {

    async list(params?: PermissionFilters): Promise<PermissionListResponse> {
        const search = new URLSearchParams();

        if (params?.page) search.append("page", String(params.page));
        if (params?.limit) search.append("limit", String(params.limit));
        if (params?.search) search.append("search", params.search);
        if (params?.module) search.append("module", params.module);

        const query = search.toString();
        return await api(`/permissions${query ? `?${query}` : ""}`);
    }

    async getById(id: string): Promise<Permission> {
        return await api(`/permissions/${id}`);
    }

    async getByProfileId(profileId: string): Promise<Permission[]> {
        return await api(`/permissions/profile/${profileId}`);
    }

    async create(data: CreatePermissionDTO): Promise<Permission> {
        return await api("/permissions", {
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async update(id: string, data: UpdatePermissionDTO): Promise<Permission> {
        return await api(`/permissions/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
        });
    }

    async remove(id: string): Promise<void> {
        await api(`/permissions/${id}`, {
            method: "DELETE",
        });
    }
}

export const permissionService = new PermissionService();
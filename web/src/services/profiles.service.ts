import { api } from '@/src/services/api';

import type {
    Profile,
    ProfileFilters,
    ProfileListResponse,
    CreateProfileDTO,
    UpdateProfileDTO,
} from "@/src/interfaces/profile";

class ProfileService {

    async list(params?: ProfileFilters): Promise<ProfileListResponse> {
        const search = new URLSearchParams();

        if (params?.page)
            search.append("page", String(params.page));

        if (params?.limit)
            search.append("limit", String(params.limit));

        if (params?.search)
            search.append("search", params.search);

        if (params?.status !== undefined)
            search.append("status", String(params.status));

        const query = search.toString();

        const response = await api(
            `/profiles${query ? `?${query}` : ""}`
        );

        return response;
    }

    async getById(id: string): Promise<Profile> {
        const response = await api(`/profiles/${id}`);
        return response;
    }

    async create(data: CreateProfileDTO): Promise<Profile> {
        const response = await api("/profiles", {
            method: "POST",
            body: JSON.stringify(data),
        });

        return response;
    }

    async update(
        id: string,
        data: UpdateProfileDTO
    ): Promise<Profile> {
        const response = await api(`/profiles/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
        });

        return response;
    }

    async remove(id: string): Promise<void> {
        await api(`/profiles/${id}`, {
            method: "DELETE",
        });
    }
}

export const profileService = new ProfileService();
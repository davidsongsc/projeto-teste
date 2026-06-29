import { api } from '@/src/services/api';

import type {
    User,
    UserFilters,
    UserListResponse,
    CreateUserDTO,
    UpdateUserDTO,
} from "@/src/interfaces/user";

class UserService {

    async list(params?: UserFilters): Promise<UserListResponse> {

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
            `/users${query ? `?${query}` : ""}`
        );

        return response;
    }

    async getById(id: string): Promise<User> {

        const response = await api(
            `/users/${id}`
        );

        return response;
    }

    async create(data: CreateUserDTO): Promise<User> {

        const response = await api(
            "/users",
            {
                method: "POST",
                body: JSON.stringify(data),
            }
        );

        return response;
    }

    async update(
        id: string,
        data: UpdateUserDTO
    ): Promise<User> {

        const response = await api(
            `/users/${id}`,
            {
                method: "PUT",
                body: JSON.stringify(data),
            }
        );

        return response;
    }

    async remove(id: string): Promise<void> {

        await api(
            `/users/${id}`,
            {
                method: "DELETE",
            }
        );
    }

}

export const userService = new UserService();
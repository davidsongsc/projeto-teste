import { api } from '@/src/services/api';

import type {
    Item,
    ItemFilters,
    ItemListResponse,
    CreateItemDTO,
    UpdateItemDTO,
} from "@/src/interfaces/item";

class ItemService {

    async list(params?: ItemFilters): Promise<ItemListResponse> {

        const search = new URLSearchParams();

        if (params?.page)
            search.append("page", String(params.page));

        if (params?.limit)
            search.append("limit", String(params.limit));

        if (params?.search)
            search.append("search", params.search);

        const query = search.toString();

        const response = await api(
            `/items${query ? `?${query}` : ""}`
        );

        return response;
    }

    async getById(id: string): Promise<Item> {

        const response = await api(
            `/items/${id}`
        );

        return response;
    }

    async create(data: CreateItemDTO): Promise<Item> {

        const response = await api(
            "/items",
            {
                method: "POST",
                body: JSON.stringify(data),
            }
        );

        return response;
    }

    async update(
        id: string,
        data: UpdateItemDTO
    ): Promise<Item> {

        const response = await api(
            `/items/${id}`,
            {
                method: "PUT",
                body: JSON.stringify(data),
            }
        );

        return response;
    }

    async remove(id: string): Promise<void> {

        await api(
            `/items/${id}`,
            {
                method: "DELETE",
            }
        );
    }
}

export const itemService = new ItemService();
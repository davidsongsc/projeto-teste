import { api } from '@/src/services/api';

import type {
    Order,
    OrderFilters,
    OrderListResponse,
    CreateOrderDTO,
    UpdateOrderDTO,
} from "@/src/interfaces/order";

class OrderService {

    async list(params?: OrderFilters): Promise<OrderListResponse> {

        const search = new URLSearchParams();

        if (params?.page)
            search.append("page", String(params.page));

        if (params?.limit)
            search.append("limit", String(params.limit));

        if (params?.search)
            search.append("search", params.search);

        if (params?.status)
            search.append("status", params.status);

        const query = search.toString();

        const response = await api(
            `/orders${query ? `?${query}` : ""}`
        );

        return response;
    }

    async getById(id: string): Promise<Order> {

        const response = await api(
            `/orders/${id}`
        );

        return response;
    }

    async create(data: CreateOrderDTO): Promise<Order> {

        const response = await api(
            "/orders",
            {
                method: "POST",
                body: JSON.stringify(data),
            }
        );

        return response;
    }

    async update(
        id: string,
        data: UpdateOrderDTO
    ): Promise<Order> {

        const response = await api(
            `/orders/${id}`,
            {
                method: "PUT",
                body: JSON.stringify(data),
            }
        );

        return response;
    }

    async remove(id: string): Promise<void> {

        await api(
            `/orders/${id}`,
            {
                method: "DELETE",
            }
        );
    }

}

export const orderService = new OrderService();
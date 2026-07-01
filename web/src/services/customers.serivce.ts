import { api } from "@/src/services/api";

import type {
    Customer,
    CustomerDetails,
    CustomerFilters,
    CustomerListResponse,
    CreateCustomerDTO,
    UpdateCustomerDTO,
} from "@/src/interfaces/customer";

class CustomerService {

    async list(params?: CustomerFilters): Promise<CustomerListResponse> {

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
            `/customers${query ? `?${query}` : ""}`
        );

        return response;
    }

    async getAutocomplete(search: string): Promise<{ label: string; value: string }[]> {
        const response = await api<CustomerListResponse>(
            `/customers?search=${encodeURIComponent(search)}&limit=10`
        );

        return response.results.map((c) => ({
            label: c.name,
            value: c.id,
        }));
    }

    async getById(id: string): Promise<CustomerDetails> {

        const response = await api<CustomerDetails>(
            `/customers/${id}`
        );

        return response;
    }

    async create(data: CreateCustomerDTO): Promise<Customer> {

        const response = await api(
            "/customers",
            {
                method: "POST",
                body: JSON.stringify(data),
            }
        );

        return response;
    }

    async update(
        id: string,
        data: UpdateCustomerDTO
    ): Promise<Customer> {

        const response = await api(
            `/customers/${id}`,
            {
                method: "PUT",
                body: JSON.stringify(data),
            }
        );

        return response;
    }

    async remove(id: string): Promise<void> {

        await api(
            `/customers/${id}`,
            {
                method: "DELETE",
            }
        );
    }

}

export const customerService = new CustomerService();
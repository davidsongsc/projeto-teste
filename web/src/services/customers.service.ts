import { api } from '@/src/services/api';
import type {
    Customer,
    CustomerFilters,
    CustomerListResponse,
    CreateCustomerDTO,
    UpdateCustomerDTO,
} from "@/src/interfaces/customers";

class CustomerService {

    async list(params?: CustomerFilters): Promise<CustomerListResponse> {
        const search = new URLSearchParams();

        if (params?.page) search.append("page", String(params.page));
        if (params?.limit) search.append("limit", String(params.limit));
        if (params?.search) search.append("search", params.search);
        if (params?.status !== undefined) search.append("status", String(params.status));

        const query = search.toString();
        return await api(`/customers${query ? `?${query}` : ""}`);
    }

    async getById(id: string): Promise<Customer> {
        return await api(`/customers/${id}`);
    }

    async create(data: CreateCustomerDTO): Promise<Customer> {
        return await api("/customers", {
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async update(id: string, data: UpdateCustomerDTO): Promise<Customer> {
        return await api(`/customers/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
        });
    }

    async updateStatus(id: string, status: boolean): Promise<Customer> {
        return await api(`/customers/${id}/status`, {
            method: "PATCH",
            body: JSON.stringify({ status }),
        });
    }

    async remove(id: string): Promise<void> {
        await api(`/customers/${id}`, {
            method: "DELETE",
        });
    }
}

export const customerService = new CustomerService();
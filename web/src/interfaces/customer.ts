import { Filters } from "./filters";
import { ListResponse } from "./listResponse";

export interface Customer {
    id: string;
    name: string;
    document: string;
    email: string;
    status: boolean;
    created_at: string;
    updated_at: string;
}

export type CustomerListResponse = ListResponse<Customer>;

export interface CustomerFilters extends Filters {
    status?: boolean;
}

export interface CreateCustomerDTO {
    name: string;
    document: string;
    email: string;
    status?: boolean;
}

export interface UpdateCustomerDTO {
    name?: string;
    document?: string;
    email?: string;
    status?: boolean;
}

export interface CustomerOrder {
    id: string;
    totalPrice: number;
    status: string;
    created_at: string;
}

export interface CustomerDetails extends Customer {
    orders: CustomerOrder[];
}
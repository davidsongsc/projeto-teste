import { Filters } from "./filters";
import { ListResponse } from "./listResponse";

export interface Customer {
    id: string;
    name: string;
    status: boolean;
    created_at: string;
    updated_at: string;
    profileId: string;
    userId: string;
    profile?: {
        id: string;
        name: string;
        role: string;
    };
    user?: {
        id: string;
        name: string;
        email: string;
    };
}

export interface CustomerFilters extends Filters {
    status?: boolean;
    profileId?: string;
    userId?: string;
}
export type CustomerListResponse = ListResponse<Customer>;

export interface CreateCustomerDTO {
    name: string;
    profileId: string;
    userId: string;
}

export interface UpdateCustomerDTO {
    name?: string;
    profileId?: string;
    userId?: string;
    status?: boolean;
}
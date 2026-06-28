import { Filters } from "./filters";
import { ListResponse } from "./listResponse";

export interface User {
    id: string;
    name: string;
    email: string;
    status: boolean;
    created_at: string;
    updated_at: string;
};

export type UserListResponse = ListResponse<User>;

export interface UserFilters extends Filters {
    status?: boolean ;
};

export interface CreateUserDTO {
    name: string;
    email: string;
    password: string;
    status: boolean;
};

export interface UpdateUserDTO {
    name?: string;
    email?: string;
    password?: string;
    status?: boolean;
};
import { Filters } from "./filters";
import { ListResponse } from "./listResponse";

export interface Collaborator {
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

export interface CollaboratorFilters extends Filters {
    status?: boolean;
    profileId?: string;
    userId?: string;
}
export type CollaboratorListResponse = ListResponse<Collaborator>;

export interface CreateCollaboratorDTO {
    name: string;
    profileId: string;
    userId: string;
}

export interface UpdateCollaboratorDTO {
    name?: string;
    profileId?: string;
    userId?: string;
    status?: boolean;
}
export interface Permission {
    id: string;
    key: string;
    module: string;
    action: string;
    description?: string;
}

export interface PermissionFilters {
    page?: number;
    limit?: number;
    search?: string;
    module?: string;
}

export interface PermissionListResponse {
    page: number;
    total_pages: number;
    total_items: number;
    results: Permission[];
}

export interface CreatePermissionDTO {
    key: string;
    module: string;
    action: string;
    description?: string;
}

export interface UpdatePermissionDTO {
    key?: string;
    module?: string;
    action?: string;
    description?: string;
}
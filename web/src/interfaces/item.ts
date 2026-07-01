export interface Item {
    id: string;
    name: string;
    price: string | number;
    description?: string | null;
    created_at: Date | string;
    updated_at: Date | string;
}

export interface ItemFilters {
    page?: number;
    limit?: number;
    search?: string;
}

export interface ItemListResponse {
    page: number;
    total_pages: number;
    total_items: number;
    results: Item[];
}

export interface CreateItemDTO {
    name: string;
    price: number;
    description?: string;
}

export interface UpdateItemDTO {
    name?: string;
    price?: number;
    description?: string;
}
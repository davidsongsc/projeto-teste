export interface ListResponse<T> {
  page: number;
  total_pages: number;
  total_items: number;
  results: T[];
}
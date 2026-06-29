import { Filters } from "./filters";
import { ListResponse } from "./listResponse";

export interface Profile {
  id: string;
  name: string;
  role: string;
  description?: string | null;
  status: boolean;
  created_at: string;
  updated_at: string;

  users?: { id: string; name: string; email: string }[];
  permissions?: any[]; // Ajuste o tipo conforme sua interface de permissão
};

export type ProfileListResponse = ListResponse<Profile>;

export interface ProfileFilters extends Filters {
  status?: boolean;
};

export interface CreateProfileDTO {
  name: string;
  role: string;
  description?: string;
};

export interface UpdateProfileDTO {
  name?: string;
  role?: string;
  description?: string;
  status?: boolean;
};
import { Customer } from "./customer";
import { Filters } from "./filters";
import { ListResponse } from "./listResponse";

export type OrderStatus =
  | "DRAFT"
  | "CONFIRMED"
  | "CANCELLED";

export interface OrderUser {
  id: string;
  name: string;
  email: string;
}

export interface OrderItem {
  id?: string;
  productId: string;
  price: number;
  count: number;
}

export interface Order {
  id: string;
  userId: string;
  totalPrice: number;
  status: OrderStatus;
  created_at: string;
  updated_at: string;
  customer?: Customer;
  user?: OrderUser;
  items?: OrderItem[];
}

export type OrderListResponse = ListResponse<Order>;

export interface OrderFilters extends Filters {
  status?: OrderStatus;
}

export interface CreateOrderDTO {
  userId: string;
  totalPrice: number;
  status: OrderStatus;

  items: OrderItem[];
}

export interface UpdateOrderDTO {
  userId?: string;
  totalPrice?: number;
  status?: OrderStatus;
}
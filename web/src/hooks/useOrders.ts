import { orderService } from '@/src/services/order.service';
import { useOrderStore } from '@/src/store/useOrderStore';
import { OrderFilters, CreateOrderDTO, UpdateOrderDTO } from '@/src/interfaces/order';

export const useOrders = () => {
  const { 
    orders, 
    pagination, 
    isLoading, 
    setLoading, 
    setOrders, 
    addOrder, 
    updateOrder: updateOrderStore, 
    removeOrder 
  } = useOrderStore();

  const fetchOrders = async (params?: OrderFilters) => {
    setLoading(true);
    try {
      const data = await orderService.list(params);
      setOrders(data);
      return data; // Retornamos para facilitar o uso no componente se necessário
    } catch (error) {
      // O tratamento de erro ocorre globalmente no api.ts
      throw error; 
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (data: CreateOrderDTO) => {
    setLoading(true);
    try {
      const newOrder = await orderService.create(data);
      addOrder(newOrder);
      return newOrder;
    } finally {
      setLoading(false);
    }
  };

  const updateOrder = async (id: string, data: UpdateOrderDTO) => {
    setLoading(true);
    try {
      const updatedOrder = await orderService.update(id, data);
      updateOrderStore(id, updatedOrder); // Atualiza no Zustand
      return updatedOrder;
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (id: string) => {
    setLoading(true);
    try {
      await orderService.remove(id);
      removeOrder(id);
    } finally {
      setLoading(false);
    }
  };

  return {
    orders,
    pagination,
    isLoading,
    fetchOrders,
    createOrder,
    updateOrder,
    deleteOrder
  };
};
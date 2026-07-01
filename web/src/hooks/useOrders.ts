import { orderService } from '@/src/services/order.service';
import { useOrderStore } from '@/src/store/useOrderStore';
import { OrderFilters, CreateOrderDTO, UpdateOrderDTO } from '@/src/interfaces/order';
import { notification } from '@/src/components/Notification/notification';
export const useOrders = () => {
  const {
    orders,
    pagination,
    isLoading,
    setLoading,
    setOrders,
    addOrder,
    putOrder,
    removeOrder
  } = useOrderStore();

  const fetchOrders = async (params?: OrderFilters) => {
    setLoading(true);
    try {
      const data = await orderService.list(params);
      setOrders(data);
      return data;
    } catch (error) {
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
      notification.success('Pedido criado com sucesso!', `O pedido ${newOrder.id} foi criado com sucesso.`);
      return newOrder;
    }
    catch (error) {
      notification.error(error);
    }
    finally {
      setLoading(false);
    }
  };

  const updateOrder = async (id: string, data: UpdateOrderDTO) => {
    setLoading(true);
    try {
      const updatedOrder = await orderService.update(id, data);
      putOrder(id, updatedOrder);
      notification.success('Pedido atualizado com sucesso!');
      return updatedOrder;
    } catch (error) {
      notification.error(error);
    }
    finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (id: string) => {
    setLoading(true);
    try {
      await orderService.remove(id);
      removeOrder(id);
      notification.success('Pedido excluído com sucesso!');
    }
    catch (error) {
      notification.error(error);
    }
    finally {
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
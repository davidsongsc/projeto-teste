import { describe, it, expect, vi, beforeEach } from 'vitest';
import { OrderItemService } from '@/services/orderItems.service';
import { prisma } from '@/lib/prisma';
import { AppError } from '@/errors/AppError';

vi.mock('@/lib/prisma', () => ({
  prisma: {
    order: { findUnique: vi.fn() },
    orderItem: {
      create: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
      delete: vi.fn()
    }
  }
}));

describe('OrderItemService', () => {
  const orderItemService = new OrderItemService();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('create', () => {
    it('deve criar um novo item do pedido com sucesso', async () => {
      const inputData = {
        orderId: 'order-123',
        itemId: 'item-456',
        count: 2,
        total: 100
      };

      vi.mocked(prisma.order.findUnique).mockResolvedValue({ id: 'order-123' } as any);
      vi.mocked(prisma.orderItem.create).mockResolvedValue({ id: 'order-item-001', ...inputData } as any);

      const result = await orderItemService.create(inputData);

      expect(result.id).toBe('order-item-001');
      expect(prisma.order.findUnique).toHaveBeenCalledWith({ where: { id: inputData.orderId } });
      expect(prisma.orderItem.create).toHaveBeenCalledWith({ data: inputData });
    });

    it('deve lançar erro ao tentar criar item para um pedido inexistente', async () => {
      vi.mocked(prisma.order.findUnique).mockResolvedValue(null);

      await expect(orderItemService.create({
        orderId: 'order-invalid',
        itemId: 'item-456',
        count: 1,
        total: 50
      })).rejects.toBeInstanceOf(AppError);

      expect(prisma.orderItem.create).not.toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('deve atualizar um item do pedido com sucesso', async () => {
      const updateData = { count: 3, total: 150 };

      vi.mocked(prisma.orderItem.findUnique).mockResolvedValue({ id: 'order-item-001' } as any);
      vi.mocked(prisma.orderItem.update).mockResolvedValue({ id: 'order-item-001', ...updateData } as any);

      const result = await orderItemService.update('order-item-001', updateData);

      expect(result.count).toBe(3);
      expect(prisma.orderItem.findUnique).toHaveBeenCalledWith({ where: { id: 'order-item-001' } });
      expect(prisma.orderItem.update).toHaveBeenCalledWith({
        where: { id: 'order-item-001' },
        data: updateData
      });
    });

    it('deve lançar erro ao tentar atualizar um item de pedido inexistente', async () => {
      vi.mocked(prisma.orderItem.findUnique).mockResolvedValue(null);

      await expect(orderItemService.update('invalid-id', { count: 2 }))
        .rejects.toBeInstanceOf(AppError);

      expect(prisma.orderItem.update).not.toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('deve deletar um item do pedido com sucesso', async () => {
      vi.mocked(prisma.orderItem.findUnique).mockResolvedValue({ id: 'order-item-001' } as any);
      vi.mocked(prisma.orderItem.delete).mockResolvedValue({ id: 'order-item-001' } as any);

      const result = await orderItemService.delete('order-item-001');

      expect(result.id).toBe('order-item-001');
      expect(prisma.orderItem.findUnique).toHaveBeenCalledWith({ where: { id: 'order-item-001' } });
      expect(prisma.orderItem.delete).toHaveBeenCalledWith({ where: { id: 'order-item-001' } });
    });

    it('deve lançar erro ao tentar deletar um item de pedido inexistente', async () => {
      vi.mocked(prisma.orderItem.findUnique).mockResolvedValue(null);

      await expect(orderItemService.delete('invalid-id')).rejects.toBeInstanceOf(AppError);

      expect(prisma.orderItem.delete).not.toHaveBeenCalled();
    });
  });
});
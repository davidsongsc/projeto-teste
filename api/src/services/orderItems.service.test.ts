import { describe, it, expect, vi, beforeEach } from 'vitest';
import { OrderService } from '@/services/order.service';
import { prisma } from '@/lib/prisma';
import { AppError } from '@/errors/AppError';

vi.mock('@/lib/prisma', () => ({
  prisma: {
    $transaction: vi.fn((callback) => callback(prisma)),
    user: { findUnique: vi.fn() },
    customer: { findUnique: vi.fn() },
    order: { create: vi.fn() }
  }
}));

describe('OrderService', () => {
  const orderService = new OrderService();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve criar um novo pedido com sucesso', async () => {
    const mockOrderData = {
      userId: 'user-123',
      customerId: 'cust-456',
      totalPrice: 100,
      status: 'DRAFT' as any,
      items: [{ itemId: 'item-789', count: 1, total: 100 }]
    };

    vi.mocked(prisma.user.findUnique).mockResolvedValue({ status: true } as any);
    vi.mocked(prisma.customer.findUnique).mockResolvedValue({ status: true } as any);
    vi.mocked(prisma.order.create).mockResolvedValue({ id: 'order-001', ...mockOrderData } as any);

    const order = await orderService.create(mockOrderData);

    expect(order.id).toBe('order-001');
    expect(prisma.order.create).toHaveBeenCalledTimes(1);
  });

  it('deve lançar erro se usuário estiver inativo', async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue({ status: false } as any);
    vi.mocked(prisma.customer.findUnique).mockResolvedValue({ status: true } as any);

    await expect(orderService.create({
      userId: 'user-123',
      customerId: 'cust-456',
      totalPrice: 100,
      status: 'DRAFT' as any,
      items: [{ itemId: 'item-789', count: 1, total: 100 }]
    })).rejects.toThrow(AppError);
  });
});
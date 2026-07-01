import { describe, it, expect, vi, beforeEach } from 'vitest';
import { OrderService } from '@/services/order.service';
import { prisma } from '@/lib/prisma';
import { AppError } from '@/errors/AppError';

vi.mock('@/lib/prisma', () => ({
  prisma: {
    user: { findUnique: vi.fn() },
    customer: { findUnique: vi.fn() },
    item: { findMany: vi.fn() },
    order: { create: vi.fn() },
    $transaction: vi.fn((callback) => callback(prisma))
  }
}));

describe('OrderService - Create Order (Validações)', () => {
  let orderService: OrderService;

  beforeEach(() => {
    orderService = new OrderService();
    vi.clearAllMocks();
  });

  it('deve impedir a criação de pedido sem itens', async () => {
    const orderData = {
      userId: 'user-1',
      customerId: 'cust-1',
      status: 'DRAFT',
      items: [] 
    };

    await expect(orderService.create(orderData as any))
      .rejects.toThrow('Não é possível criar um pedido sem itens.');
  });

  it('deve impedir a criação de pedido com valor total calculado igual ou menor que zero', async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue({ status: true } as any);
    vi.mocked(prisma.customer.findUnique).mockResolvedValue({ status: true } as any);
    vi.mocked(prisma.item.findMany).mockResolvedValue([{ id: 'item-1', price: 0 }] as any);

    const orderData = {
      userId: 'user-1',
      customerId: 'cust-1',
      status: 'DRAFT',
      items: [{ itemId: 'item-1', count: 1 }]
    };

    await expect(orderService.create(orderData as any))
      .rejects.toThrow('O valor total calculado deve ser maior que zero.');
  });

  it('deve impedir a criação de pedido se um produto não for encontrado no sistema', async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue({ status: true } as any);
    vi.mocked(prisma.customer.findUnique).mockResolvedValue({ status: true } as any);
    vi.mocked(prisma.item.findMany).mockResolvedValue([]);

    const orderData = {
      userId: 'user-1',
      customerId: 'cust-1',
      status: 'DRAFT',
      items: [{ itemId: 'item-fantasma', count: 1 }]
    };

    await expect(orderService.create(orderData as any))
      .rejects.toThrow('O produto com ID item-fantasma não foi encontrado no sistema.');
  });

  it('deve impedir a criação de pedido para cliente inativo', async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue({ status: true } as any);
    vi.mocked(prisma.customer.findUnique).mockResolvedValue({ status: false } as any);

    const orderData = {
      userId: 'user-1',
      customerId: 'cust-1',
      status: 'DRAFT',
      items: [{ itemId: 'item-1', count: 1 }]
    };

    await expect(orderService.create(orderData as any))
      .rejects.toThrow('Cliente inativo ou não encontrado.');
  });

  it('deve criar o pedido com sucesso se todas as validações passarem', async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue({ status: true } as any);
    vi.mocked(prisma.customer.findUnique).mockResolvedValue({ status: true } as any);
    vi.mocked(prisma.item.findMany).mockResolvedValue([{ id: 'item-1', price: 100 }] as any);
    vi.mocked(prisma.order.create).mockResolvedValue({ id: 'order-123' } as any);

    const orderData = {
      userId: 'user-1',
      customerId: 'cust-1',
      status: 'DRAFT',
      items: [{ itemId: 'item-1', count: 1 }]
    };

    const result = await orderService.create(orderData as any);

    expect(result.id).toBe('order-123');
    expect(prisma.item.findMany).toHaveBeenCalledTimes(1);
    expect(prisma.order.create).toHaveBeenCalledTimes(1);
  });
});
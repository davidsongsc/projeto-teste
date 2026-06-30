import { describe, it, expect, vi, beforeEach } from 'vitest';
import { OrderService } from '@/services/order.service';
import { prisma } from '@/lib/prisma';
import { AppError } from '@/errors/AppError';

// Mock do prisma incluindo $transaction
vi.mock('@/lib/prisma', () => ({
    prisma: {
        user: { findUnique: vi.fn() },
        customer: { findUnique: vi.fn() },
        order: { create: vi.fn() },
        $transaction: vi.fn((callback) => callback(prisma)) // Executa o callback passando o próprio prisma como "tx"
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
            totalPrice: 100,
            status: 'DRAFT',
            items: [] 
        };

        await expect(orderService.create(orderData as any))
            .rejects.toThrow('Não é possível criar um pedido sem itens.');
    });

    it('deve impedir a criação de pedido com valor total igual ou menor que zero', async () => {
        const orderData = {
            userId: 'user-1',
            customerId: 'cust-1',
            totalPrice: 0,
            status: 'DRAFT',
            items: [{ name: 'Item 1', price: 10, count: 1 }]
        };

        await expect(orderService.create(orderData as any))
            .rejects.toThrow('O valor total deve ser maior que zero.');
    });

    it('deve impedir a criação de pedido para cliente inativo', async () => {
        vi.mocked(prisma.user.findUnique).mockResolvedValue({ status: true } as any);
        vi.mocked(prisma.customer.findUnique).mockResolvedValue({ status: false } as any);

        const orderData = {
            userId: 'user-1',
            customerId: 'cust-1',
            totalPrice: 100,
            status: 'DRAFT',
            items: [{ name: 'Item 1', price: 100, count: 1 }]
        };

        await expect(orderService.create(orderData as any))
            .rejects.toThrow('Cliente inativo ou não encontrado.');
    });

    it('deve criar o pedido com sucesso se todas as validações passarem', async () => {
        vi.mocked(prisma.user.findUnique).mockResolvedValue({ status: true } as any);
        vi.mocked(prisma.customer.findUnique).mockResolvedValue({ status: true } as any);
        vi.mocked(prisma.order.create).mockResolvedValue({ id: 'order-123' } as any);

        const orderData = {
            userId: 'user-1',
            customerId: 'cust-1',
            totalPrice: 100,
            status: 'DRAFT',
            items: [{ name: 'Item 1', price: 100, count: 1 }]
        };

        const result = await orderService.create(orderData as any);

        expect(result.id).toBe('order-123');
        expect(prisma.order.create).toHaveBeenCalledTimes(1);
    });
});
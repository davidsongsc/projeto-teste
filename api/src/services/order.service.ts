import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { AppError } from '@/errors/AppError'

interface CreateOrderDTO {
  userId: string;
  customerId: string;
  totalPrice: number | string;
  status: 'DRAFT' | 'CONFIRMED' | 'CANCELLED';
  items: {
    name: string;
    price: number | string;
    count: number;
    description?: string;
  }[];
}

export class OrderService {
  async findAll(params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: any;
  }) {
    const page = Number(params?.page || 1);
    const limit = Number(params?.limit || 10);
    const skip = (page - 1) * limit;

    const where: Prisma.OrderWhereInput = {};
    if (params?.status) where.status = params.status;

    if (params?.search) {
      where.OR = [
        { user: { name: { contains: params.search, mode: 'insensitive' } } },
        { user: { email: { contains: params.search, mode: 'insensitive' } } },
        { customer: { name: { contains: params.search, mode: 'insensitive' } } }
      ];
    }

    const [totalItems, results] = await Promise.all([
      prisma.order.count({ where }),
      prisma.order.findMany({
        where,
        skip,
        take: limit,
        orderBy: { created_at: 'desc' },
        include: { 
          user: { select: { id: true, name: true, email: true } },
          customer: { select: { id: true, name: true, document: true, status: true } },
          items: true 
        }
      })
    ]);

    return {
      page,
      total_pages: Math.ceil(totalItems / limit),
      total_items: totalItems,
      results
    };
  }

  async findById(id: string) {
    return prisma.order.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, email: true } },
        customer: { select: { id: true, name: true, email: true, document: true, status: true } },
        items: true
      }
    });
  }

  async create(data: CreateOrderDTO) {
    if (!data.items?.length) throw new AppError('Não é possível criar um pedido sem itens.');
    if (Number(data.totalPrice) <= 0) throw new AppError('O valor total deve ser maior que zero.');

    return await prisma.$transaction(async (tx) => {
      const [user, customer] = await Promise.all([
        tx.user.findUnique({ where: { id: data.userId }, select: { status: true } }),
        tx.customer.findUnique({ where: { id: data.customerId }, select: { status: true } })
      ]);

      if (!user?.status) throw new AppError('Usuário inativo ou não encontrado.');
      if (!customer?.status) throw new AppError('Cliente inativo ou não encontrado.');

      return await tx.order.create({
        data: {
          userId: data.userId,
          customerId: data.customerId,
          totalPrice: data.totalPrice,
          status: data.status,
          items: {
            create: data.items.map(item => ({
              name: item.name,
              price: item.price,
              count: item.count,
              description: item.description,
              total: Number(item.price) * item.count
            }))
          }
        }
      });
    });
  }

  async update(id: string, data: {
    userId?: string;
    customerId?: string;
    totalPrice?: number | string;
    status?: any;
  }) {
    if (data.customerId) {
      const customer = await prisma.customer.findUnique({ where: { id: data.customerId } });
      if (!customer) throw new AppError('Cliente não encontrado.');
    }

    return prisma.order.update({ 
      where: { id }, 
      data 
    });
  }

  async delete(id: string) {
    return prisma.order.delete({ where: { id } });
  }
}
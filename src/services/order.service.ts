import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { AppError } from '@/errors/AppError'

interface CreateOrderDTO {
  userId: string;
  totalPrice: Prisma.Decimal | number | string;
  status: string;
  items: {
    productId: string;
    price: Prisma.Decimal | number | string;
    count: number;
  }[];
}

export class OrderService {
  async findAll(params?: {
    page?: number
    limit?: number
    search?: string
    status?: string
  }) {
    const page = Number(params?.page || 1)
    const limit = Number(params?.limit || 10)
    const skip = (page - 1) * limit

    const where: Prisma.OrderWhereInput = {}

    if (params?.status) {
      where.status = params.status
    }

    if (params?.search) {
      where.user = {
        OR: [
          {
            name: {
              contains: params.search,
              mode: 'insensitive'
            }
          },
          {
            email: {
              contains: params.search,
              mode: 'insensitive'
            }
          }
        ]
      }
    }

    const [totalItems, results] = await Promise.all([
      prisma.order.count({ where }),
      prisma.order.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          created_at: 'desc'
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          items: true
        }
      })
    ])

    return {
      page,
      total_pages: Math.ceil(totalItems / limit),
      total_items: totalItems,
      results
    }
  }

  async findById(id: string) {
    return prisma.order.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        items: true
      }
    })
  }

  async create(data: CreateOrderDTO) {
    if (!data.items || data.items.length === 0) {
      throw new AppError('Não é possível criar um pedido sem itens.');
    }

    const user = await prisma.user.findUnique({
      where: { id: data.userId },
      select: { status: true }
    });

    if (!user || user.status !== true) {
      throw new AppError('Não é possível criar um pedido para um usuário inativo.');
    }

    return prisma.order.create({
      data: {
        userId: data.userId,
        totalPrice: data.totalPrice,
        status: data.status,
        items: {
          create: data.items 
        }
      }
    });
  }

  async update(
    id: string,
    data: {
      userId?: string
      totalPrice?: Prisma.Decimal | number | string
      status?: string
    }
  ) {
    if (data.userId) {
      const user = await prisma.user.findUnique({
        where: { id: data.userId },
        select: { status: true }
      })

      if (!user || user.status !== true) {
        throw new AppError('Não é possível associar este pedido a um usuário inativo.')
      }
    }

    return prisma.order.update({ where: { id }, data })
  }

  async delete(id: string) {
    return prisma.order.delete({
      where: { id }
    })
  }
}

import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { AppError } from '@/errors/AppError'

interface CreateOrderDTO {
  userId: string;
  customerId: string;
  totalPrice: Prisma.Decimal | number | string;
  status: string;
  items: {
    productId: string;
    price: Prisma.Decimal | number | string;
    count: number;
    description?: string
    total?: Prisma.Decimal | number | string
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
      where.OR = [
        {
          user: {
            name: {
              contains: params.search,
              mode: 'insensitive'
            }
          }
        },
        {
          user: {
            email: {
              contains: params.search,
              mode: 'insensitive'
            }
          }
        },
        {
          customer: {
            name: {
              contains: params.search,
              mode: 'insensitive'
            }
          }
        }
      ];
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
          customer: {
            select: {
              id: true,
              name: true,

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
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
            document: true,
            status: true
          }
        },
        items: true
      }
    })
  }

  async create(data: CreateOrderDTO) {
    // 1. Validação de Itens
    if (!data.items || data.items.length === 0) {
      throw new AppError('Não é possível criar um pedido sem itens.');
    }

    // 2. Validação de Valor Total (não pode ser 0 ou negativo)
    if (Number(data.totalPrice) <= 0) {
      throw new AppError('O valor total do pedido deve ser maior que zero.');
    }

    // 3. Validação de Usuário (mantendo sua lógica atual)
    const user = await prisma.user.findUnique({
      where: { id: data.userId },
      select: { status: true }
    });

    if (!user || user.status !== true) {
      throw new AppError('Não é possível criar um pedido para um usuário inativo.');
    }

    // 4. Nova Validação: Status do Cliente
    const customer = await prisma.customer.findUnique({
      where: { id: data.customerId },
      select: { status: true }
    });

    if (!customer) {
      throw new AppError('Cliente não encontrado.');
    }

    if (customer.status !== true) {
      throw new AppError('Não é possível criar um pedido para um cliente inativo.');
    }

    // 5. Persistência
    return prisma.order.create({
      data: {
        userId: data.userId,
        customerId: data.customerId,
        totalPrice: data.totalPrice,
        status: data.status,
        items: {
          create: data.items.map(item => ({
            product: { connect: { id: item.productId } },
            price: item.price,
            count: item.count,
            description: item.description,
            total: Number(item.price) * item.count,
          })),
        },
      },
    });
  }

  async update(
    id: string,
    data: {
      userId?: string;
      customerId?: string;
      totalPrice?: Prisma.Decimal | number | string;
      status?: string;
    }
  ) {
    if (data.customerId) {
      const customer = await prisma.customer.findUnique({
        where: {
          id: data.customerId
        }
      });

      if (!customer) {
        throw new AppError('Cliente não encontrado.');
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

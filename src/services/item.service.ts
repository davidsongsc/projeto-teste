import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export class ItemService {
  async findAll(params?: {
    page?: number
    limit?: number
    search?: string
    orderId?: string
  }) {
    const page = Number(params?.page || 1)
    const limit = Number(params?.limit || 10)
    const skip = (page - 1) * limit

    const where: Prisma.ItemWhereInput = {}

    if (params?.orderId) {
      where.orderId = params.orderId
    }

    if (params?.search) {
      where.name = {
        contains: params.search,
        mode: 'insensitive'
      }
    }

    const [totalItems, results] = await Promise.all([
      prisma.item.count({ where }),
      prisma.item.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          created_at: 'desc'
        },
        include: {
          order: {
            select: {
              id: true,
              status: true
            }
          }
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
    return prisma.item.findUnique({
      where: { id },
      include: {
        order: {
          select: {
            id: true,
            status: true
          }
        }
      }
    })
  }

  async create(data: {
    orderId: string
    name: string
    price: Prisma.Decimal | number | string
    total: Prisma.Decimal | number | string
    count: number
    description?: string
  }) {
    return prisma.item.create({
      data
    })
  }

  async update(
    id: string,
    data: {
      orderId?: string
      name?: string
      price?: Prisma.Decimal | number | string
      total?: Prisma.Decimal | number | string
      count?: number
      description?: string
    }
  ) {
    return prisma.item.update({
      where: { id },
      data
    })
  }

  async delete(id: string) {
    return prisma.item.delete({
      where: { id }
    })
  }
}
import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export class ProductService {
  async findAll(params?: {
    page?: number
    limit?: number
    search?: string
    status?: boolean
  }) {
    const page = Number(params?.page || 1)
    const limit = Number(params?.limit || 10)
    const skip = (page - 1) * limit

    const where: Prisma.ProductWhereInput = {}

    if (params?.status !== undefined) {
      where.status = params.status
    }

    if (params?.search) {
      where.name = {
        contains: params.search,
        mode: 'insensitive'
      }
    }

    const [totalItems, results] = await Promise.all([
      prisma.product.count({ where }),
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          created_at: 'desc'
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
    return prisma.product.findUnique({
      where: { id }
    })
  }

  async create(data: {
    name: string
    price: Prisma.Decimal | number | string
  }) {
    return prisma.product.create({
      data
    })
  }

  async update(
    id: string,
    data: {
      name?: string
      price?: Prisma.Decimal | number | string
      status?: boolean
    }
  ) {
    return prisma.product.update({
      where: { id },
      data
    })
  }

  async updateStatus(id: string, status: boolean) {
    return prisma.product.update({
      where: { id },
      data: {
        status
      }
    })
  }

  async delete(id: string) {
    return prisma.product.delete({
      where: { id }
    })
  }
}
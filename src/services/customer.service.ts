import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export class CustomerService {
  async findAll(params?: {
    page?: number
    limit?: number
    search?: string
    status?: boolean
  }) {
    const page = Number(params?.page || 1)
    const limit = Number(params?.limit || 10)
    const skip = (page - 1) * limit

    const where: Prisma.CustomerWhereInput = {}

    if (params?.status !== undefined) {
      where.status = params.status
    }

    if (params?.search) {
      where.OR = [
        {
          name: {
            contains: params.search,
            mode: 'insensitive'
          }
        },
        {
          profile: {
            name: {
              contains: params.search,
              mode: 'insensitive'
            }
          }
        },
        {
          user: {
            name: {
              contains: params.search,
              mode: 'insensitive'
            }
          }
        }
      ]
    }

    const [totalItems, results] = await Promise.all([
      prisma.customer.count({ where }),
      prisma.customer.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          created_at: 'desc'
        },
        include: {
          profile: {
            select: {
              id: true,
              name: true,
              role: true
            }
          },
          user: {
            select: {
              id: true,
              name: true,
              email: true
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
    return prisma.customer.findUnique({
      where: { id },
      include: {
        profile: {
          select: {
            id: true,
            name: true,
            role: true
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })
  }

  async create(data: {
    name: string
    profileId: string
    userId: string
  }) {
    return prisma.customer.create({
      data
    })
  }
  
  async updateStatus(id: string, status: boolean) {
    return prisma.customer.update({
      where: {
        id
      },
      data: {
        status
      }
    })
  }

  async update(
    id: string,
    data: {
      name?: string
      profileId?: string
      userId?: string
      status?: boolean
    }
  ) {
    return prisma.customer.update({
      where: { id },
      data
    })
  }

  async delete(id: string) {
    return prisma.customer.delete({
      where: { id }
    })
  }
}
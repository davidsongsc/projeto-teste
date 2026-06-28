import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export class UserService {
  async findAll(params?: {
    page?: number
    limit?: number
    search?: string
    status?: boolean
  }) {
    const page = Number(params?.page || 1)
    const limit = Number(params?.limit || 10)
    const skip = (page - 1) * limit

    const where: Prisma.UserWhereInput = {}

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
          email: {
            contains: params.search,
            mode: 'insensitive'
          }
        }
      ]
    }

    const [totalItems, results] = await Promise.all([
      prisma.user.count({ where }),
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          created_at: 'desc'
        }
      })
    ])

    const totalPages = Math.ceil(totalItems / limit)

    return {
      page,
      total_pages: totalPages,
      total_items: totalItems,
      results
    }
  }

  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
        profile: { 
          select: {
            name: true,
            role: true
          }
        },
        created_at: true,
        updated_at: true
      }
    })
  }
  
  async create(data: {
    name: string
    email: string
    document?: string
    password: string
  }) {
    return prisma.user.create({
      data
    })
  }

  async update(
    id: string,
    data: {
      name?: string
      email?: string
      document?: string
      password?: string
      status?: boolean
    }
  ) {
    return prisma.user.update({
      where: { id },
      data
    })
  }

  async delete(id: string) {
    return prisma.user.delete({
      where: { id }
    })
  }
}
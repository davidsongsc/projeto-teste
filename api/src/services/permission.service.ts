import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export class PermissionService {
  async findAll(params?: {
    page?: number
    limit?: number
    search?: string
    module?: string
  }) {
    const page = Number(params?.page || 1)
    const limit = Number(params?.limit || 10)
    const skip = (page - 1) * limit

    const where: Prisma.PermissionWhereInput = {}

    if (params?.module) {
      where.module = params.module
    }

    if (params?.search) {
      where.OR = [
        {
          key: {
            contains: params.search,
            mode: 'insensitive'
          }
        },
        {
          module: {
            contains: params.search,
            mode: 'insensitive'
          }
        },
        {
          action: {
            contains: params.search,
            mode: 'insensitive'
          }
        },
        {
          description: {
            contains: params.search,
            mode: 'insensitive'
          }
        }
      ]
    }

    const [totalItems, results] = await Promise.all([
      prisma.permission.count({ where }),
      prisma.permission.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          module: 'asc'
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
  
  async findByProfileId(profileId: string) {
    return await prisma.permission.findMany({
      where: {
        profiles: {
          some: {
            id: profileId
          }
        }
      }
    });
  }

  async findById(id: string) {
    return prisma.permission.findUnique({
      where: { id }
    })
  }

  async create(data: {
    key: string
    module: string
    action: string
    description?: string
  }) {
    if (!data.key) throw new Error('Chave é obrigatória.')
    if (!data.module) throw new Error('Módulo é obrigatório.')
    if (!data.action) throw new Error('Ação é obrigatória.')
    return prisma.permission.create({
      data
    })
  }

  async update(
    id: string,
    data: {
      key?: string
      module?: string
      action?: string
      description?: string
    }
  ) {
    return prisma.permission.update({
      where: { id },
      data
    })
  }

  async delete(id: string) {
    return prisma.permission.delete({
      where: { id }
    })
  }
}
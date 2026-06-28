import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export class ProfileService {
  async findAll(params?: {
    page?: number
    limit?: number
    search?: string
    status?: boolean
  }) {
    const page = Number(params?.page || 1)
    const limit = Number(params?.limit || 10)
    const skip = (page - 1) * limit

    const where: Prisma.ProfileWhereInput = {}

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
          role: {
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
      prisma.profile.count({ where }),
      prisma.profile.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          name: 'asc'
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
    // 1. Verifica se o ID é um UUID válido antes de ir ao banco
    // Isso evita erros de validação do próprio Prisma
    if (!id || id.length < 36) {
      throw new Error('ID de perfil inválido');
    }

    const profile = await prisma.profile.findUnique({
      where: { id },
      include: {
        users: {
          select: { id: true, name: true, email: true }
        },
        permissions: true
      }
    });

    // 2. Se não encontrou, lance um erro específico para o controller capturar
    if (!profile) {
      throw new Error('Perfil não encontrado');
    }

    return profile;
  }

  async create(data: {
    name: string
    role: string
    description?: string
  }) {
    return prisma.profile.create({
      data
    })
  }

  async update(
    id: string,
    data: {
      name?: string
      role?: string
      description?: string
      status?: boolean
    }
  ) {
    return prisma.profile.update({
      where: { id },
      data
    })
  }

  async delete(id: string) {
    return prisma.profile.delete({
      where: { id }
    })
  }
}
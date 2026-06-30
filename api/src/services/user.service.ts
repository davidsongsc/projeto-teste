import { hash } from 'bcryptjs';
import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export class UserService {
  async findAll(params?: {
    page?: number
    limit?: number
    search?: string
    status?: boolean
    onlyWithProfile?: boolean // Adicionado parâmetro de filtro
  }) {
    const page = Number(params?.page || 1)
    const limit = Number(params?.limit || 10)
    const skip = (page - 1) * limit

    const where: Prisma.UserWhereInput = {}

    // Filtro de status
    if (params?.status !== undefined) {
      where.status = params.status
    }

    // Filtro de usuários apenas com profile
    if (params?.onlyWithProfile) {
      where.profile = {
        isNot: null
      }
    }

    // Filtro de busca (nome ou email)
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
        },
        include: {
          profile: true // Inclui os dados do perfil na resposta
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
            id: true,
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
    profileId?: string;
  }) {
    const passwordHash = await hash(data.password, 8);
    return prisma.user.create({
      data: {
        ...data,
        password: passwordHash,
      }
    });
  }
  async update(
    id: string,
    data: {
      name?: string;
      email?: string;
      password?: string;
      status?: boolean;
      profileId?: string;
    }
  ) {
    const updateData: Prisma.UserUpdateInput = {
      name: data.name,
      email: data.email,
      status: data.status,
      profileId: data.profileId,
    };

    if (data.password) {
      updateData.password = await hash(data.password, 8);
    }

    return prisma.user.update({
      where: { id },
      data: updateData,
      include: {
        profile: true,
      },
    });
  }

  async delete(id: string) {
    return prisma.user.delete({
      where: { id }
    })
  }
}
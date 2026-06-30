import { hash } from 'bcryptjs';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';

export class UserService {
  async findAll(params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: boolean;
    onlyWithProfile?: boolean;
  }) {
    const page = Number(params?.page || 1);
    const limit = Number(params?.limit || 10);
    const skip = (page - 1) * limit;

    const where: Prisma.UserWhereInput = {};

    if (params?.status !== undefined) {
      where.status = params.status;
    }

    if (params?.onlyWithProfile) {
      where.profileId = { not: null };
    }

    if (params?.search) {
      where.OR = [
        { name: { contains: params.search, mode: 'insensitive' } },
        { email: { contains: params.search, mode: 'insensitive' } },
      ];
    }

    const [totalItems, results] = await Promise.all([
      prisma.user.count({ where }),
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { created_at: 'desc' },
        include: { profile: true },
        omit: { password: true },
      }),
    ]);
    
    return {
      page,
      total_pages: Math.ceil(totalItems / limit),
      total_items: totalItems,
      results,
    };
  }

  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        profile: {
          select: { id: true, name: true, role: true },
        },
        omit: { password: true },
      },
    });
  }

  async create(data: {
    name: string;
    email: string;
    password?: string;
    profileId?: string;
  }) {
    const passwordHash = data.password ? await hash(data.password, 8) : null;

    return prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: passwordHash,
        profile: data.profileId ? { connect: { id: data.profileId } } : undefined,
      },
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
      profile: data.profileId ? { connect: { id: data.profileId } } : undefined,
    };

    if (data.password) {
      updateData.password = await hash(data.password, 8);
    }

    return prisma.user.update({
      where: { id },
      data: updateData,
      include: { profile: true },
    });
  }

  async delete(id: string) {
    return prisma.user.delete({
      where: { id },
    });
  }
}
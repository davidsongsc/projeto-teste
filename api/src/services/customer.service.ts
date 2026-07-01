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
                { name: { contains: params.search, mode: 'insensitive' } },
                { email: { contains: params.search, mode: 'insensitive' } }
            ]
        }

        const [totalItems, results] = await Promise.all([
            prisma.customer.count({ where }),
            prisma.customer.findMany({
                where,
                skip,
                take: limit,
                orderBy: { created_at: 'desc' }
            })
        ])

        return { page, total_pages: Math.ceil(totalItems / limit), total_items: totalItems, results }
    }

    // 2. Regra de Negócio: Impedir pedidos para clientes inativos
    async validateCustomerForOrder(customerId: string) {
        const customer = await prisma.customer.findUnique({
            where: { id: customerId }
        })

        if (!customer) {
            throw new Error("Cliente não encontrado.")
        }

        if (!customer.status) {
            throw new Error("Não é possível criar um pedido para um cliente inativo.")
        }

        return customer
    }

    async findById(id: string) {
        return prisma.customer.findUnique({
            where: { id },
            include: {
                orders: {
                    select: {
                        id: true,
                        totalPrice: true,
                        status: true,
                        created_at: true
                    }
                }
            }
        })
    }

    async create(data: {
        name: string
        document: string
        email: string
        status?: boolean
    }) {
        if (!data.name) throw new Error('Nome é obrigatório.')
        if (!data.email) throw new Error('Email é obrigatório.')
        if (!data.document) throw new Error('Documento é obrigatório.')
        return prisma.customer.create({
            data
        })
    }

    async update(
        id: string,
        data: {
            name?: string
            document?: string
            email?: string
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
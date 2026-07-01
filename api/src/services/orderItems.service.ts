import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { AppError } from '@/errors/AppError'

export class OrderItemService {
  async create(data: {
    orderId: string
    itemId: string
    count: number
    total: number | string
  }) {
    const orderExists = await prisma.order.findUnique({ where: { id: data.orderId } })
    if (!orderExists) throw new AppError('Pedido não encontrado.')

    return await prisma.orderItem.create({
      data
    })
  }

  async update(id: string, data: {
    count?: number
    total?: number | string
  }) {
    const item = await prisma.orderItem.findUnique({ where: { id } })
    if (!item) throw new AppError('Item do pedido não encontrado.')

    return await prisma.orderItem.update({
      where: { id },
      data
    })
  }

  async delete(id: string) {
    const item = await prisma.orderItem.findUnique({ where: { id } })
    if (!item) throw new AppError('Item do pedido não encontrado.')

    return await prisma.orderItem.delete({
      where: { id }
    })
  }
}
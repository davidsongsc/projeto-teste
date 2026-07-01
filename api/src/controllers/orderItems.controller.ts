import { Request, Response } from 'express'
import { OrderItemService } from '@/services/orderItems.service'
import { AppError } from '@/errors/AppError'

const orderItemService = new OrderItemService()

export class OrderItemController {
  async store(req: Request, res: Response) {
    try {
      const { orderId, itemId, count, total } = req.body

      const orderItem = await orderItemService.create({
        orderId,
        itemId,
        count,
        total: Number(total)
      })

      return res.status(201).json(orderItem)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(400).json({ success: false, message: error.message })
      }
      return res.status(400).json({ success: false, message: 'Erro ao adicionar item ao pedido', error })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id as string
      const { count, total } = req.body

      const orderItem = await orderItemService.update(id, {
        count,
        total: total ? Number(total) : undefined
      })

      return res.status(200).json(orderItem)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(400).json({ success: false, message: error.message })
      }
      return res.status(400).json({ success: false, message: 'Erro ao atualizar item do pedido', error })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id as string
      await orderItemService.delete(id)

      return res.status(204).send()
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(400).json({ success: false, message: error.message })
      }
      return res.status(400).json({ success: false, message: 'Erro ao remover item do pedido', error })
    }
  }
}
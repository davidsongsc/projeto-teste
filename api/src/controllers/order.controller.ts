import { Request, Response } from 'express'
import { OrderService } from '@/services/order.service'
import { AppError } from '@/errors/AppError'
import { OrderStatus } from '@prisma/client'

const service = new OrderService()

export class OrderController {
  async index(req: Request, res: Response) {
    try {
      const { page, limit, search, status } = req.query

      const result = await service.findAll({
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
        search: search as string,
        status: status ? (status as OrderStatus) : undefined
      })

      return res.status(200).json(result)
    } catch (error) {
      return res.status(400).json({ success: false, message: 'Erro ao listar pedidos', error })
    }
  }

  async show(req: Request, res: Response) {
    try {
      const id = req.params.id as string
      const order = await service.findById(id)

      if (!order) {
        return res.status(404).json({ success: false, message: 'Pedido não encontrado.' })
      }

      return res.status(200).json(order)
    } catch (error) {
      return res.status(400).json({ success: false, message: 'Erro ao buscar pedido', error })
    }
  }

  async store(req: Request, res: Response) {
    try {
      const { userId, customerId, totalPrice, status, items } = req.body

      const order = await service.create({
        userId,
        customerId,
        totalPrice: Number(totalPrice),
        status: status as OrderStatus,
        items
      })

      return res.status(201).json(order)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(400).json({ success: false, message: error.message })
      }
      return res.status(400).json({ success: false, message: 'Erro ao criar pedido', error })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id as string
      const { userId, customerId, totalPrice, status } = req.body

      const order = await service.update(id, {
        userId,
        customerId,
        totalPrice: totalPrice ? Number(totalPrice) : undefined,
        status
      })

      return res.status(200).json(order)
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(400).json({ success: false, message: error.message })
      }
      return res.status(400).json({ success: false, message: 'Erro ao atualizar pedido', error })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id as string
      await service.delete(id)

      return res.status(204).send()
    } catch (error) {
      return res.status(400).json({ success: false, message: 'Erro ao deletar pedido', error })
    }
  }
}
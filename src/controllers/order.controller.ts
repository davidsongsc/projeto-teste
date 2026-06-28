import { Request, Response } from 'express'
import { OrderService } from '@/services/order.service'

const service = new OrderService()

export class OrderController {
  async index(req: Request, res: Response) {
    try {
      const page = req.query.page as string
      const limit = req.query.limit as string
      const search = req.query.search as string
      const status = req.query.status as string

      const result = await service.findAll({
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
        search: search,
        status: status
      })

      return res.status(200).json(result)
    } catch (error) {
      return res.status(400).json({ success: false, message: 'Erro ao listar pedidos', error })
    }
  }

  async show(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
      
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
      const { userId, totalPrice, status } = req.body
      
      const order = await service.create({
        userId,
        totalPrice: Number(totalPrice), // Garantindo tipo numérico
        status
      })

      return res.status(201).json(order)
    } catch (error) {
      return res.status(400).json({ success: false, message: 'Erro ao criar pedido', error })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
      const data = req.body

      const order = await service.update(id, {
        userId: data.userId,
        totalPrice: data.totalPrice ? Number(data.totalPrice) : undefined,
        status: data.status
      })

      return res.status(200).json(order)
    } catch (error) {
      return res.status(400).json({ success: false, message: 'Erro ao atualizar pedido', error })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
      
      await service.delete(id)

      return res.status(204).send()
    } catch (error) {
      return res.status(400).json({ success: false, message: 'Erro ao deletar pedido', error })
    }
  }
}
import { Request, Response } from 'express'
import { ItemService } from '@/services/item.service'

const itemService = new ItemService()

export class ItemController {
  async index(req: Request, res: Response) {
    try {
      const page = req.query.page as string
      const limit = req.query.limit as string
      const search = req.query.search as string
      const orderId = req.query.orderId as string
      const productId = req.query.productId as string

      const result = await itemService.findAll({
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
        search,
        orderId,
        productId
      })

      return res.status(200).json(result)
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Erro ao buscar itens',
        error
      })
    }
  }

  async show(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id

      const item = await itemService.findById(id)

      if (!item) {
        return res.status(404).json({
          success: false,
          message: 'Item não encontrado'
        })
      }

      return res.status(200).json(item)
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Erro ao buscar item',
        error
      })
    }
  }

  async store(req: Request, res: Response) {
    try {
      const { orderId, productId, price, count } = req.body

      const item = await itemService.create({
        orderId,
        productId,
        price: Number(price),
        count: Number(count)
      })

      return res.status(201).json(item)
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Erro ao criar item',
        error
      })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id

      const data = req.body

      const item = await itemService.update(id, {
        orderId: data.orderId,
        productId: data.productId,
        price: data.price ? Number(data.price) : undefined,
        count: data.count ? Number(data.count) : undefined
      })

      return res.status(200).json(item)
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Erro ao atualizar item',
        error
      })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id

      await itemService.delete(id)

      return res.status(204).send()
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Erro ao deletar item',
        error
      })
    }
  }
}
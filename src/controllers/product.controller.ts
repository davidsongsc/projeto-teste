import { Request, Response } from 'express'
import { ProductService } from '@/services/product.service'

const productService = new ProductService()

export class ProductController {
  async index(req: Request, res: Response) {
    try {
      const page = req.query.page as string
      const limit = req.query.limit as string
      const search = req.query.search as string
      const status = req.query.status as string

      const result = await productService.findAll({
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
        search,
        status: status !== undefined ? status === 'true' : undefined
      })

      return res.status(200).json(result)
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Erro ao buscar produtos',
        error
      })
    }
  }

  async show(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id

      const product = await productService.findById(id)

      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Produto não encontrado'
        })
      }

      return res.status(200).json(product)
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Erro ao buscar produto',
        error
      })
    }
  }

  async store(req: Request, res: Response) {
    try {
      const { name, price } = req.body

      const product = await productService.create({
        name,
        price: Number(price)
      })

      return res.status(201).json(product)
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Erro ao criar produto',
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

      const product = await productService.update(id, {
        name: data.name,
        price: data.price ? Number(data.price) : undefined,
        status: data.status
      })

      return res.status(200).json(product)
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Erro ao atualizar produto',
        error
      })
    }
  }

  async updateStatus(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id

      const { status } = req.body

      const product = await productService.updateStatus(id, status)

      return res.status(200).json(product)
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Erro ao atualizar status do produto',
        error
      })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id

      await productService.delete(id)

      return res.status(204).send()
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Erro ao deletar produto',
        error
      })
    }
  }
}
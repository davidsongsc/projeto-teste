import { Request, Response } from 'express'
import { CustomerService } from '../services/customer.service'

const customerService = new CustomerService()

export class CustomerController {

  async index(req: Request, res: Response) {
    try {
      const page = req.query.page as string
      const limit = req.query.limit as string
      const search = req.query.search as string
      const status = req.query.status as string

      const result = await customerService.findAll({
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
        search: search,
        status: status !== undefined ? status === 'true' : undefined
      })

      return res.status(200).json(result)
    } catch (error) {
      return res.status(400).json({ success: false, message: 'Erro ao buscar clientes', error })
    }
  }

  async show(req: Request, res: Response) {
    try {
      // Tratamento para garantir que o id seja uma string única
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id

      const customer = await customerService.findById(id)

      if (!customer) {
        return res.status(404).json({ success: false, message: 'Cliente não encontrado' })
      }

      return res.status(200).json(customer)
    } catch (error) {
      return res.status(400).json({ success: false, message: 'Erro ao buscar cliente', error })
    }
  }

  async store(req: Request, res: Response) {
    try {
      const { name, profileId, userId } = req.body
      const customer = await customerService.create({ name, profileId, userId })

      return res.status(201).json(customer)
    } catch (error) {
      return res.status(400).json({ success: false, message: 'Erro ao criar cliente', error })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
      const data = req.body

      const customer = await customerService.update(id, data)

      return res.status(200).json(customer)
    } catch (error) {
      return res.status(400).json({ success: false, message: 'Erro ao atualizar cliente', error })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id

      await customerService.delete(id)

      return res.status(204).send()
    } catch (error) {
      return res.status(400).json({ success: false, message: 'Erro ao deletar cliente', error })
    }
  }

  async updateStatus(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id

      const { status } = req.body

      const customer = await customerService.updateStatus(id, status)

      return res.status(200).json(customer)
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Erro ao atualizar status do cliente',
        error
      })
    }
  }
}
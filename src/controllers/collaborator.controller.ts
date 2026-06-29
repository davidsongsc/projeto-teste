import { Request, Response } from 'express'
import { CollaboratorService } from '../services/collaborator.service'

const collaboratorService = new CollaboratorService()

export class CollaboratorController {

  async index(req: Request, res: Response) {
    try {
      const page = req.query.page as string
      const limit = req.query.limit as string
      const search = req.query.search as string
      const status = req.query.status as string

      const result = await collaboratorService.findAll({
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

      const collaborator = await collaboratorService.findById(id)

      if (!collaborator) {
        return res.status(404).json({ success: false, message: 'Colaborador não encontrado' })
      }

      return res.status(200).json(collaborator)
    } catch (error) {
      return res.status(400).json({ success: false, message: 'Erro ao buscar colaborador', error })
    }
  }

  async store(req: Request, res: Response) {
    try {
      const { name, profileId, userId } = req.body
      const collaborator = await collaboratorService.create({ name, profileId, userId })

      return res.status(201).json(collaborator)
    } catch (error) {
      return res.status(400).json({ success: false, message: 'Erro ao criar colaborador', error })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
      const data = req.body

      const collaborator = await collaboratorService.update(id, data)

      return res.status(200).json(collaborator)
    } catch (error) {
      return res.status(400).json({ success: false, message: 'Erro ao atualizar colaborador', error })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id

      await collaboratorService.delete(id)

      return res.status(204).send()
    } catch (error) {
      return res.status(400).json({ success: false, message: 'Erro ao deletar colaborador', error })
    }
  }

  async updateStatus(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id

      const { status } = req.body

      const collaborator = await collaboratorService.updateStatus(id, status)

      return res.status(200).json(collaborator)
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Erro ao atualizar status do colaborador',
        error
      })
    }
  }
}
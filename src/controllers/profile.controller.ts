import { Request, Response } from 'express'
import { ProfileService } from '@/services/profile.service'

const profileService = new ProfileService()

export class ProfileController {
  async index(req: Request, res: Response) {
    try {
      const page = req.query.page as string
      const limit = req.query.limit as string
      const search = req.query.search as string
      const status = req.query.status as string

      const result = await profileService.findAll({
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
        search,
        status: status !== undefined ? status === 'true' : undefined
      })

      return res.status(200).json(result)
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Erro ao listar perfis',
        error
      })
    }
  }

  async show(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id

      const profile = await profileService.findById(id)

      if (!profile) {
        return res.status(404).json({
          success: false,
          message: 'Perfil não encontrado'
        })
      }

      return res.status(200).json(profile)
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Erro ao buscar perfil',
        error
      })
    }
  }

  async store(req: Request, res: Response) {
    try {
      const { name, role, description } = req.body

      const profile = await profileService.create({
        name,
        role,
        description
      })

      return res.status(201).json(profile)
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Erro ao criar perfil',
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

      const profile = await profileService.update(id, data)

      return res.status(200).json(profile)
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Erro ao atualizar perfil',
        error
      })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id

      await profileService.delete(id)

      return res.status(204).send()
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Erro ao deletar perfil',
        error
      })
    }
  }
}
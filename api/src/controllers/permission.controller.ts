import { Request, Response } from 'express'
import { PermissionService } from '@/services/permission.service'

const permissionService = new PermissionService()

export class PermissionController {
  async index(req: Request, res: Response) {
    try {
      const page = req.query.page as string
      const limit = req.query.limit as string
      const search = req.query.search as string
      const module = req.query.module as string

      const result = await permissionService.findAll({
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
        search,
        module
      })

      return res.status(200).json(result)
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Erro ao listar permissões',
        error
      })
    }
  }
  async findByProfile(req: Request, res: Response) {
    try {
      const profileId = Array.isArray(req.params.profileId)
        ? req.params.profileId[0]
        : req.params.profileId

      const permissions = await permissionService.findByProfileId(profileId)

      return res.status(200).json(permissions)
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Erro ao buscar permissões do perfil',
        error
      })
    }
  }
  async show(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id

      const permission = await permissionService.findById(id)

      if (!permission) {
        return res.status(404).json({
          success: false,
          message: 'Permissão não encontrada'
        })
      }

      return res.status(200).json(permission)
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Erro ao buscar permissão',
        error
      })
    }
  }

  async store(req: Request, res: Response) {
    try {
      const { key, module, action, description } = req.body

      const permission = await permissionService.create({
        key,
        module,
        action,
        description
      })

      return res.status(201).json(permission)
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Erro ao criar permissão',
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

      const permission = await permissionService.update(id, data)

      return res.status(200).json(permission)
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Erro ao atualizar permissão',
        error
      })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id

      await permissionService.delete(id)

      return res.status(204).send()
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Erro ao deletar permissão',
        error
      })
    }
  }
}
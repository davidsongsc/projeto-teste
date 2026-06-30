import { Request, Response } from 'express'
import { UserService } from '../services/user.service'

const service = new UserService()

export class UserController {
  async index(_: Request, res: Response) {
    try {
      const users = await service.findAll()
      return res.status(200).json(users)
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao listar usuários.' })
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (typeof id !== 'string') {
        return res.status(400).json({ message: 'ID inválido.' });
      }

      const user = await service.findById(id);

      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }

      return res.status(200).json(user); // Retorno direto
    } catch (error) {
      return res.status(500).json({ message: 'Erro interno ao buscar usuário.' });
    }
  }

  async store(req: Request, res: Response) {
    try {
      const user = await service.create(req.body)
      return res.status(201).json(user) // Retorno direto
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao criar usuário.' })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params

      if (Array.isArray(id)) {
        return res.status(400).json({ message: 'ID inválido.' })
      }

      const user = await service.update(id, req.body)
      return res.status(200).json(user) // Retorno direto
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao atualizar usuário.' })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params

      if (Array.isArray(id)) {
        return res.status(400).json({ message: 'ID inválido.' })
      }

      await service.delete(id)
      return res.sendStatus(204) // Sucesso sem corpo
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao remover usuário.' })
    }
  }
}
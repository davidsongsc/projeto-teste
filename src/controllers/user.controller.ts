import { Request, Response } from 'express'
import { UserService } from '../services/user.service'

const service = new UserService()

export class UserController {
  async index(_: Request, res: Response) {
    const users = await service.findAll()

    return res.json(users)
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;

      // 1. Validação de tipo (já feita, mas mantida)
      if (typeof id !== 'string') {
        return res.status(400).json({ success: false, message: 'ID inválido.' });
      }

      // 2. Chamada ao service
      const user = await service.findById(id);

      // 3. Verificação de existência
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado.'
        });
      }

      // 4. Resposta de sucesso
      return res.status(200).json({ success: true, data: user });

    } catch (error) {
      // 5. Tratamento de erros inesperados
      return res.status(500).json({
        success: false,
        message: 'Erro interno ao buscar usuário.'
      });
    }
  }

  async store(req: Request, res: Response) {
    const user = await service.create(req.body)

    return res.status(201).json(user)
  }

  async update(req: Request, res: Response) {
    const { id } = req.params

    if (Array.isArray(id)) {
      return res.status(400).json({
        message: 'ID inválido.'
      })
    }

    const user = await service.update(id, req.body)

    return res.json(user)
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params

    if (Array.isArray(id)) {
      return res.status(400).json({
        message: 'ID inválido.'
      })
    }

    await service.delete(id)

    return res.sendStatus(204)
  }
}
import { Request, Response } from 'express';
import { CollaboratorService } from '../services/collaborator.service';

const collaboratorService = new CollaboratorService();

export class CollaboratorController {
  // O constructor com bind não é mais necessário se usarmos arrow functions no controller
  // ou se o express for chamado corretamente. Mantive a estrutura.

  private getId(req: Request): string {
    const id = req.params.id;
    if (!id) throw new Error('ID não informado.');
    return Array.isArray(id) ? id[0] : id;
  }

  async index(req: Request, res: Response) {

    try {
      // O 'user' já está disponível em req.user (injetado pelo middleware)
      const user = (req as any).user;

      const result = await collaboratorService.findAll(user, {
        page: req.query.page ? Number(req.query.page) : undefined,
        limit: req.query.limit ? Number(req.query.limit) : undefined,
        search: req.query.search as string,
        status: req.query.status !== undefined ? req.query.status === 'true' : undefined
      });

      return res.json(result);
    } catch (error: any) {
      return res.status(403).json({ success: false, message: error.message });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const user = (req as any).user;
      const collaborator = await collaboratorService.findById(user, this.getId(req));

      if (!collaborator) {
        return res.status(404).json({ success: false, message: 'Colaborador não encontrado.' });
      }

      return res.json(collaborator);
    } catch (error: any) {
      return res.status(403).json({ success: false, message: error.message });
    }
  }

  async store(req: Request, res: Response) {
    try {
      const user = (req as any).user;
      const collaborator = await collaboratorService.create(user, req.body);
      return res.status(201).json(collaborator);
    } catch (error: any) {
      return res.status(403).json({ success: false, message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const user = (req as any).user;
      const collaborator = await collaboratorService.update(user, this.getId(req), req.body);
      return res.json(collaborator);
    } catch (error: any) {
      return res.status(403).json({ success: false, message: error.message });
    }
  }

  async updateStatus(req: Request, res: Response) {
    try {
      const user = (req as any).user;
      const collaborator = await collaboratorService.updateStatus(user, this.getId(req), req.body.status);
      return res.json(collaborator);
    } catch (error: any) {
      return res.status(403).json({ success: false, message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const user = (req as any).user;
      await collaboratorService.delete(user, this.getId(req));
      return res.sendStatus(204);
    } catch (error: any) {
      return res.status(403).json({ success: false, message: error.message });
    }
  }
}
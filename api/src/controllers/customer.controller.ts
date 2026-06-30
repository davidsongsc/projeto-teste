import { Request, Response } from 'express'
import { CustomerService } from '../services/customer.service'

const service = new CustomerService()

export class CustomerController {
  private getId(req: Request): string {
    const id = req.params.id;
    return Array.isArray(id) ? id[0] : id;
  }

  index = async (req: Request, res: Response) => {
    try {
      const { page, limit, search, status } = req.query;

      const result = await service.findAll({
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
        search: search as string,
        status: status === 'true' ? true : status === 'false' ? false : undefined
      });

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao listar clientes.' });
    }
  };

  show = async (req: Request, res: Response) => {
    try {
      const customer = await service.findById(this.getId(req))

      if (!customer) {
        return res.status(404).json({ message: 'Cliente não encontrado.' })
      }

      return res.status(200).json(customer)
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar cliente.' })
    }
  };

  store = async (req: Request, res: Response) => {
    try {
      const customer = await service.create(req.body)
      return res.status(201).json(customer)
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao criar cliente.' })
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const customer = await service.update(this.getId(req), req.body)

      return res.status(200).json(customer)
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao atualizar cliente.' })
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      await service.delete(this.getId(req))

      return res.sendStatus(204)
    } catch (error) {
      return res.status(400).json({ message: 'Erro ao remover cliente.' })
    }
  };
}
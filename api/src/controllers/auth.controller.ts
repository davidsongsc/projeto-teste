import { Request, Response, NextFunction } from 'express'
import { AuthService } from '@/services/auth.service'

const authService = new AuthService()

export class AuthController {
  // Adicionamos NextFunction para permitir o uso do errorMiddleware
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body

      const result = await authService.login(email, password)

      return res.status(200).json(result)
    } catch (error) {
      // Passamos o erro para o middleware global, eliminando o código repetitivo
      next(error)
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      await authService.logout()

      return res.status(200).json({
        success: true,
        message: 'Logout realizado com sucesso'
      })
    } catch (error) {
      next(error)
    }
  }
}
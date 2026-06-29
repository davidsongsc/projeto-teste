import { Request, Response, NextFunction } from 'express';
import { AppError } from '@/errors/AppError';

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Erro inesperado (não previsto)
  console.error(err);
  return res.status(500).json({
    success: false,
    message: 'Erro interno no servidor. Tente novamente mais tarde.',
  });
};
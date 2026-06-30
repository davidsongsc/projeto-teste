import { Request, Response, NextFunction } from 'express';
import { prisma } from '@/lib/prisma';
import { AppError } from '@/errors/AppError';

export const authorizeMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = (req.user as any)?.id;

  if (!userId) {
    throw new AppError('Usuário não autenticado.', 401);
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      profile: {
        include: { permissions: true }
      }
    }
  });

  if (!user) {
    throw new AppError('Usuário não encontrado no banco de dados.', 401);
  }

  req.user = {
    ...req.user,
    data: {
      id: user.id,
      profile: {
        permissions: user.profile?.permissions || []
      }
    }
  };

  next();
};
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const { verify } = jwt;
import { prisma } from '@/lib/prisma';

export const ensureAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ success: false, message: 'Token não fornecido.' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, process.env.JWT_SECRET as string) as { id: string };

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: {
        profile: {
          include: { permissions: true }
        }
      }
    });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Usuário não encontrado.' });
    }

    req.user = {
      data: {
        id: user.id,
        profile: {
          permissions: user.profile?.permissions.map(p => ({ key: p.key })) || []
        }
      }
    };

    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Token inválido.' });
  }
};
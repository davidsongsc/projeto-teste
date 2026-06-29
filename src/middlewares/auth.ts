import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const { verify } = jwt;
import { prisma } from '@/lib/prisma'; // Certifique-se que o caminho está correto

export const ensureAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ success: false, message: 'Token não fornecido.' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, process.env.JWT_SECRET as string) as { id: string };

    // AQUI ESTÁ O SEGREDO: Buscar o usuário com perfil e permissões no banco
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

    // Injetamos o objeto completo do usuário com perfil/permissões
    req.user = { data: user };

    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Token inválido.' });
  }
};
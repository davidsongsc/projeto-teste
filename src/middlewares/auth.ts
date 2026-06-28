import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'; 
const { verify } = jwt;        
import { AppError } from '@/errors/AppError';

// Interface para estender o Request e salvar os dados do usuário após autenticado
interface TokenPayload {
  id: string;
  role: string;
}

export const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('Usuario nao autenticado.', 401);
  }

  // O formato esperado é "Bearer <token>"
  const [, token] = authHeader.split(' ');

  try {
    // Verifica se o token é válido usando sua chave secreta
    const decoded = verify(token, process.env.JWT_SECRET || 'secret');

    const { id, role } = decoded as TokenPayload;

    // Injeta o ID e role do usuário no objeto Request para uso nos próximos controllers
    req.user = { id, role };

    return next();
  } catch (err) {
    throw new AppError('Sessao expirada.', 401);
  }
};
import { Request, Response, NextFunction } from 'express';
import { prisma } from '@/lib/prisma';
import { AppError } from '@/errors/AppError';

export const authorizeMiddleware = async (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  const { id } = req.user; 
  
  console.log(`[DEBUG] Autorizando usuário ID: ${id} na rota: ${req.method} ${req.originalUrl}`);

  const user = await prisma.user.findUnique({
    where: { id },
    include: { 
      profile: { 
        include: { permissions: true } 
      } 
    }
  });

  if (!user) {
    console.error(`[DEBUG] Erro: Usuário ${id} não encontrado no banco.`);
    throw new AppError('Usuário não encontrado no banco de dados.', 401);
  }

  // Debug das permissões carregadas
  const permissions = user.profile?.permissions || [];
  console.log(`[DEBUG] Permissões carregadas para o perfil '${user.profile?.name}':`, 
    permissions.map(p => p.key)
  );

  req.user.data = user; 

  next();
};
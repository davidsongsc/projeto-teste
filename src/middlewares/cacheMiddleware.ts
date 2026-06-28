import { Request, Response, NextFunction } from 'express';
import { cacheService } from '@/lib/redis/cache';

export const cacheMiddleware = (keyPrefix: string, ttl: number = 3600) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // 1. Só aplica cache em métodos GET
    if (req.method !== 'GET') return next();

    const cacheKey = `${keyPrefix}:${req.originalUrl}`;

    try {
      const cachedData = await cacheService.get(cacheKey);
      
      if (cachedData) {
        return res.status(200).json(cachedData);
      }

      // 2. Não sobrescreve o res.json aqui para evitar conflitos com Swagger/OpenAPI
      // Apenas prossegue para o Controller buscar do banco
      next();
    } catch (error) {
      console.error('Cache Middleware Error:', error);
      next();
    }
  };
};
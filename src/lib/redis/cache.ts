import { redisClient } from './client';

export const cacheService = {
  async get(key: string) {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  },

  async set(key: string, value: any, ttl: number = 60) {
    await redisClient.setEx(key, ttl, JSON.stringify(value));
  },

  async invalidate(keyPrefix: string) {
    // Busca todas as chaves que começam com o prefixo
    const keys = await redisClient.keys(`${keyPrefix}:*`);
    if (keys.length > 0) {
      await redisClient.del(keys);
    }
  }
};
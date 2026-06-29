import { createClient } from 'redis';

const redisClient = createClient({
  url: process.env.REDIS_URL
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

// Conecta automaticamente ao subir o servidor
(async () => {
  await redisClient.connect();
})();

export { redisClient };
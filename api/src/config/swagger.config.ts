import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'Teste Full Stack API', version: '1.0.0' },
    servers: [
      { 
        url: 'http://localhost:3000/api',
        description: 'Servidor Local' 
      }
    ],
  },
  apis: ['./src/routes/*.ts'], 
};

export const swaggerSpec = swaggerJsdoc(options);
import swaggerJsdoc from 'swagger-jsdoc'

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Teste Full Stack API',
      version: '1.0.0'
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production'
          ? 'http://localhost:3030/api' // Produção
          : 'http://localhost:3030/api'
      }
    ]
  },

  apis: [
    process.env.NODE_ENV === 'production'
      ? './dist/routes/**/*.js'
      : './src/routes/**/*.ts',

    process.env.NODE_ENV === 'production'
      ? './dist/controllers/**/*.js'
      : './src/controllers/**/*.ts'
  ]
})
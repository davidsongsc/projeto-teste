import express from 'express'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './config/swagger.js'
const app = express()

app.use(express.json())

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.get('/', (_, res) => {
  return res.status(200).json({
    success: true,
    message: 'API em execução',
    version: '1.0.0',
    documentation: '/docs',
    timestamp: new Date().toISOString()
  })
})

const PORT = Number(process.env.PORT) || 3000

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor iniciado em http://localhost:${PORT}`)
  console.log(`📖 Swagger disponível em http://localhost:${PORT}/docs`)
})
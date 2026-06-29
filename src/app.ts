import express, { Application } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './config/swagger'
import routes from '@/routes'
import { errorMiddleware } from './middlewares/errorMiddleware'

const app: Application = express()

// 1. Middlewares de Segurança e Parsing
app.use(helmet()) // Protege contra vulnerabilidades comuns de cabeçalhos HTTP
app.use(cors())   // Gerencia o compartilhamento de recursos entre origens
app.use(express.json({ limit: '10mb' })) // Limita o tamanho do body para evitar DoS

// 2. Documentação
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// 3. Rotas - O prefixo /api aqui organiza toda a sua aplicação
app.use('/api', routes)


// 4. Middleware de erro global (Profissional)
app.use(errorMiddleware)

// Em vez de apenas uma rota 404, tratamos erros de forma centralizada
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: 'Recurso não encontrado'
  })
})

export default app
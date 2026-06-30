import express, { Application } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './config/swagger.js'
import routes from '@/routes';
import { errorMiddleware } from './middlewares/errorMiddleware'

const app: Application = express()
const swaggerOptions = {
  swaggerOptions: {
    supportedSubmitMethods: process.env.NODE_ENV === 'production' ? [] : ['get', 'post', 'put', 'delete']
  }
};
// 1. Middlewares de Segurança e Parsing
app.use(helmet()) // Protege contra vulnerabilidades comuns de cabeçalhos HTTP
app.use(cors({
  origin: '*', // Ou o domínio do seu front-end
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' })) // Limita o tamanho do body para evitar DoS

// 2. Documentação
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerOptions));
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
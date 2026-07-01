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
    supportedSubmitMethods: [
      'get',
      'post',
      'put',
      'patch',
      'delete'
    ],
    persistAuthorization: true 
  }
}

app.use(helmet()) 
app.use(cors({
  origin: '*',
  methods: [
    'GET',
    'POST',
    'PUT',
    'PATCH',
    'DELETE',
    'OPTIONS'
  ],
  allowedHeaders: [
    'Content-Type',
    'Authorization'
  ]
}))

app.use(express.json({ limit: '10mb' }))

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerOptions));
app.use('/api', routes)
app.use(errorMiddleware)

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: 'Recurso não encontrado'
  })
})

export default app
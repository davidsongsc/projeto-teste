import express from 'express'

const app = express()

app.use(express.json())

app.get('/', (_, res) => {
  return res.status(200).json({
    success: true,
    message: 'API em execução',
    timestamp: new Date().toISOString()
  })
})

const PORT = Number(process.env.PORT) || 3000

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor iniciado na porta ${PORT}`)
})
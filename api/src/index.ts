import 'dotenv/config';
import app from './app.js' // Importa a configuração do Express que fizemos anteriormente

const port = process.env.PORT || 3030

app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`)
  console.log(`📚 Documentação disponível em http://localhost:${port}/docs`)
})
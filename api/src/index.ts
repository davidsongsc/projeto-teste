import 'dotenv/config';
import app from './app.js' // Importa a configuração do Express que fizemos anteriormente

const port = Number(process.env.PORT) || 3030;
const host = '0.0.0.0';

app.listen(port, host, () => {
  console.log(`🚀 Servidor rodando em http://${host}:${port}`);
});
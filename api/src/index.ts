import app from './app.js'

const port = Number(process.env.PORT) || 3030;
const host = '0.0.0.0';

app.listen(port, host, () => {
  console.log(`🚀 Servidor rodando em http://${host}:${port}`);
});
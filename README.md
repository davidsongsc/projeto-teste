# Mini ERP - Clientes e Pedidos

## Descrição

Aplicação Full Stack desenvolvida como teste técnico para simular um módulo simplificado de um ERP. 

### Modulos:
- Usuario
- Cliente
- Pedidos
- Itens

## Stack Utilizada

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Antd
* Zustand
* JWT (Autenticação)

### Backend

* Node.js
* Express
* TypeScript
* Prisma ORM
* PostgreSQL
* Redis (Cache)
* JWT (Autenticação)
* bcryptjs (Hash seguro de senhas)

## DevOps

- Docker
- Docker Compose
- Git

## IA 
* Chatgpt Free
* Windsurf (plung vscode)

##  Como rodar localmente

Para rodar este projeto em sua máquina local, certifique-se de ter o **Docker** e o **Docker Compose** instalados.

### 1. Pré-requisitos
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) (ou Docker Engine + Docker Compose).
* Git instalado.

### 2. Clonando o Repositório
Abra o seu terminal e execute os comandos abaixo:

```bash
# Clone o repositório
git clone git@github.com:davidsongsc/projeto-teste.git

# Entre na pasta do projeto
cd projeto-teste
```

### 3. Configuração de Variáveis de Ambiente
projeto-teste/.env
- Certifique-se de **criar um arquivo** (__.env__) na mesma pasta do  **.env.exemple**, exemplo:

```
# Configurações do Banco de Dados
DB_USER=user
DB_PASSWORD=password
DB_NAME=logistic_order
DB_HOST=localhost
DB_PORT=5432

# URL de conexão do Prisma (utilizando as variáveis acima)
DATABASE_URL="postgresql://user:password@localhost:5432/logistic_order?schema=public"

REDIS_HOST=redis
REDIS_PORT=6379
REDIS_URL=redis://redis:6379
PORT=3030

JWT_SECRET=sUperSecret123

```
### 4. Configuração de Variáveis de Ambiente FrontEnd
 projeto-teste/web/.env
- - Certifique-se de **criar um arquivo** (__.env__) na mesma pasta web  **.env.exemple**, exemplo:
```
NEXT_PUBLIC_API_URL=http://localhost:3030/api
```

### 5. Iniciando o Projeto com Docker
Com tudo pronto, suba os containers da aplicação (incluindo o banco de dados e o Redis):
```
# Subir os serviços em background
docker-compose up -d
```
Após subir os containers, verifique se tudo está rodando corretamente com o comando:
```
docker-compose ps
```
Caso a migração Automatica não funcione. passos __6, 7 e 8__
### 6. PrismaClient
Necessário para gerar a base do schema.prisma
```
npx prisma generate
```
### 7. Migração com prisma
```
npx prisma migrate dev --name initial_schema
```

### 8. Seed inicial
```
npx prisma db seed
```

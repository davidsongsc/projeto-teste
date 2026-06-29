# Mini ERP - Clientes e Pedidos

## Descrição

Aplicação Full Stack desenvolvida como teste técnico para simular um módulo simplificado de um ERP.

O sistema possui autenticação baseada em perfis de acesso, gerenciamento de clientes e pedidos, aplicação de regras de negócio no backend e utilização de Redis para cache.

##  Guia de Instalação e Execução

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

# Tecnologias utilizadas

## Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Antd
* Zustand

## Backend

* Node.js
* Express
* TypeScript
* Prisma ORM
* PostgreSQL
* Redis

## DevOps

- Docker
- Docker Compose
- Git

## Testes

* Vitest

---

# Arquitetura

O projeto foi dividido em duas aplicações independentes.

```text
├── .env.exemple
├── .gitignore
├── Dockerfile
├── README.md
├── docker-compose.yml
├── package-lock.json
├── package.json
├── prisma
│   ├── migrations
│   │   ├── 20260627163136_init
│   │   │   └── migration.sql
│   │   ├── 20260627222350_add_password_column
│   │   │   └── migration.sql
│   │   ├── 20260628072614_relation_profile_and_permission
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   ├── schema.prisma
│   └── seed.ts
├── prisma.config.ts
├── src
│   ├── @types
│   │   └── express.d.ts
│   ├── app.ts
│   ├── config
│   │   ├── prisma.ts
│   │   ├── swagger.config.ts
│   │   └── swagger.ts
│   ├── controllers
│   │   ├── auth.controller.ts
│   │   ├── collaborator.controller.ts
│   │   ├── item.controller.ts
│   │   ├── order.controller.ts
│   │   ├── permission.controller.ts
│   │   ├── product.controller.ts
│   │   ├── profile.controller.ts
│   │   └── user.controller.ts
│   ├── errors
│   │   └── AppError.ts
│   ├── index.ts
│   ├── lib
│   │   ├── prisma.ts
│   │   └── redis
│   │       ├── cache.ts
│   │       └── client.ts
│   ├── middlewares
│   │   ├── auth.ts
│   │   ├── cacheMiddleware.ts
│   │   └── errorMiddleware.ts
│   ├── routes
│   │   ├── auth.routes.ts
│   │   ├── collaborator.routes.ts
│   │   ├── index.ts
│   │   ├── item.routes.ts
│   │   ├── order.routes.ts
│   │   ├── permission.routes.ts
│   │   ├── product.routes.ts
│   │   ├── profile.routes.ts
│   │   └── user.routes.ts
│   └── services
│       ├── auth.service.ts
│       ├── collaborator.service.ts
│       ├── item.service.ts
│       ├── order.service.ts
│       ├── permission.service.ts
│       ├── product.service.ts
│       ├── profile.service.ts
│       └── user.service.ts
├── tsconfig.json
├── vitest.config.ts
└── web
    ├── .gitignore
    ├── AGENTS.md
    ├── CLAUDE.md
    ├── Dockerfile
    ├── README.md
    ├── app
    │   ├── customers
    │   │   └── page.tsx
    │   ├── favicon.ico
    │   ├── globals.css
    │   ├── layout.tsx
    │   ├── orders
    │   │   ├── create
    │   │   │   └── page.tsx
    │   │   └── page.tsx
    │   ├── page.tsx
    │   └── users
    │       └── page.tsx
    ├── eslint.config.mjs
    ├── next.config.ts
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.mjs
    ├── public
    │   ├── file.svg
    │   ├── globe.svg
    │   ├── next.svg
    │   ├── vercel.svg
    │   └── window.svg
    ├── src
    │   ├── components
    │   │   ├── Auth
    │   │   │   ├── AuthModal
    │   │   │   │   └── index.tsx
    │   │   │   ├── LoginForm
    │   │   │   │   └── index.tsx
    │   │   │   └── UnauthorizedAccess
    │   │   │       └── index.tsx
    │   │   ├── Buttons
    │   │   │   └── DeleteButton
    │   │   │       └── index.tsx
    │   │   ├── Customer
    │   │   │   ├── Actions
    │   │   │   │   └── index.tsx
    │   │   │   ├── Create
    │   │   │   │   └── index.tsx
    │   │   │   ├── Edit
    │   │   │   │   └── index.tsx
    │   │   │   ├── Form
    │   │   │   │   └── index.tsx
    │   │   │   └── List
    │   │   │       ├── columns.tsx
    │   │   │       └── index.tsx
    │   │   ├── Header
    │   │   │   └── index.tsx
    │   │   ├── Notification
    │   │   │   ├── Binder
    │   │   │   │   └── index.tsx
    │   │   │   └── notification.ts
    │   │   ├── Order
    │   │   │   ├── Create
    │   │   │   │   └── index.tsx
    │   │   │   ├── Edit
    │   │   │   │   └── index.tsx
    │   │   │   ├── Form
    │   │   │   │   └── index.tsx
    │   │   │   └── List
    │   │   │       ├── columns.tsx
    │   │   │       └── index.tsx
    │   │   └── User
    │   │       ├── Actions
    │   │       │   └── index.tsx
    │   │       ├── Create
    │   │       │   └── index.tsx
    │   │       ├── Edit
    │   │       │   └── index.tsx
    │   │       ├── Form
    │   │       │   └── index.tsx
    │   │       └── List
    │   │           ├── columns.tsx
    │   │           └── index.tsx
    │   ├── hooks
    │   │   ├── useAuth.ts
    │   │   ├── useCustomer.ts
    │   │   ├── useDebounce.ts
    │   │   ├── useOrders.ts
    │   │   └── useUsers.ts
    │   ├── interfaces
    │   │   ├── customers.ts
    │   │   ├── filters.ts
    │   │   ├── listResponse.ts
    │   │   ├── order.ts
    │   │   ├── profile.ts
    │   │   └── user.ts
    │   ├── services
    │   │   ├── api.ts
    │   │   ├── auth.service.ts
    │   │   ├── customers.service.ts
    │   │   ├── order.service.ts
    │   │   ├── profiles.service.ts
    │   │   └── users.service.ts
    │   ├── store
    │   │   ├── useAuthStore.ts
    │   │   ├── useCustomerStore.ts
    │   │   ├── useOrderStore.ts
    │   │   └── useUsersStore.ts
    │   └── theme
    │       ├── antd.ts
    │       ├── colors.ts
    │       ├── index.ts
    │       ├── providers
    │       │   ├── NotificationProvider.tsx
    │       │   └── ThemeProvider.tsx
    │       └── types.ts
    └── tsconfig.json
```

A arquitetura foi organizada em camadas, separando responsabilidades entre rotas, controladores, regras de negócio, acesso ao banco de dados e infraestrutura.

---
# Estratégia de versionamento

O projeto adota uma estratégia de versionamento inspirada no GitFlow, focada na organização e previsibilidade do fluxo de desenvolvimento.

A abordagem utilizada prioriza:

- branch principal (`main`) como versão estável;
- branches de feature para desenvolvimento isolado de funcionalidades;
- commits pequenos e descritivos;
- integração contínua via merge controlado;
- histórico linear e rastreável.

Não foi utilizado o GitFlow oficial com todas as branches intermediárias (como `develop` e `release`), mas sim uma adaptação simplificada da sua filosofia, adequada ao escopo e tempo do projeto.

## Convenção de commits

- feat: novas funcionalidades
- fix: correções
- test: testes
- docs: documentação
- refactor: refatorações
- chore: tarefas gerais

Exemplo:

- feat(auth): implement login and role handling
- feat(customers): add customer CRUD
- test(orders): add business rules validation
# Funcionalidades

## Autenticação

* Login
* Logout
* Perfil Admin
* Perfil Operador

## Clientes

* Cadastro
* Listagem
* Filtro por nome
* Filtro por status
* Ativação
* Inativação

## Pedidos

* Criação
* Listagem
* Consulta por ID
* Cálculo automático do valor total
* Associação de múltiplos itens

---

# Regras de negócio

* Cliente inativo não pode receber pedidos.
* Pedido deve possuir pelo menos um item.
* Quantidade deve ser maior que zero.
* Valor unitário deve ser maior que zero.
* Valor total é calculado exclusivamente pelo backend.
* Apenas administradores podem ativar ou inativar clientes.

---

# Banco de Dados

O banco de dados foi modelado utilizando PostgreSQL com Prisma ORM, com foco em escalabilidade e separação de responsabilidades.

## Entidades principais do escopo do teste

- User
- Customer
- Order
- Item (OrderItems)

Essas entidades atendem diretamente aos requisitos funcionais do sistema.

## Extensões arquiteturais (não exigidas pelo teste)

Além do escopo obrigatório, o modelo foi expandido para suportar evolução futura do sistema:

- Profile (controle de perfis e permissões)
- Permission (controle granular de acessos)
- Product (catálogo de produtos reutilizáveis)
- Collaborator (estrutura de vínculo usuário/perfil)

Essa separação foi pensada para permitir evolução para um ERP mais completo sem refatoração estrutural.

---

## Principais características do banco

- Uso de UUID como chave primária
- Relacionamentos 1:N e N:N
- Uso de Decimal para precisão financeira
- Controle de timestamps (`created_at`, `updated_at`)
- Relacionamentos com chaves estrangeiras explícitas
- Seeds para dados iniciais

---

## Regras importantes implementadas no modelo

- Um pedido pertence a um usuário
- Um pedido contém múltiplos itens
- Cada item referencia um produto
- Permissões podem ser associadas a perfis (estrutura preparada para RBAC)
---

# Cache com Redis

Para otimizar a performance e a escalabilidade da API, implementamos uma camada de cache utilizando Redis. Esta estratégia é fundamental para reduzir o tempo de resposta das requisições e diminuir a carga sobre o banco de dados principal em operações de leitura frequentes


## Principais Benefícios:
- Redução da Latência: Respostas de requisições GET são servidas diretamente da memória, eliminando a necessidade de novas consultas pesadas ao banco de dados.

- Eficiência de Recursos: Ao servir dados em cache, liberamos recursos do banco para operações de escrita e transações críticas.

- Configuração Dinâmica (TTL por Rota): Implementamos um cacheMiddleware customizado que permite definir tempos de expiração (TTL - Time to Live) distintos para cada recurso. Isso nos permite manter dados voláteis por curtos períodos e dados estáveis por períodos longos, aumentando a eficácia do cache.

- Resiliência: Em caso de falha na conexão com o Redis, o sistema foi desenhado para seguir o fluxo normal, garantindo que a aplicação não pare de funcionar (Graceful Degradation).

### Arquitetura do Middleware
Foi desenvolvido um Middleware de Cache Customizado **(cacheMiddleware)** utilizando Redis para otimizar a performance das requisições GET da API.

- Padrão Cache-Aside: A estratégia implementada garante que, caso o dado solicitado não esteja no Redis (Cache Miss), a aplicação processe a requisição normalmente e, posteriormente, alimente o cache para consultas futuras.

- Controle Granular de TTL: O middleware é altamente configurável, permitindo a definição de tempos de expiração (TTL) específicos por rota. Isso oferece a flexibilidade necessária para tratar diferentes tipos de dados conforme sua taxa de mutabilidade:

- - Dados Voláteis: TTL reduzido para garantir a consistência com atualizações frequentes.

- - Dados Estáticos: TTL estendido para reduzir drasticamente a carga de leitura no banco.

__cacheMiddleware.ts__ 
```
export const cacheMiddleware = (keyPrefix: string, ttl: number = 3600) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // 1. Só aplica cache em métodos GET
    if (req.method !== 'GET') return next();

    const cacheKey = `${keyPrefix}:${req.originalUrl}`;

    try {
      const cachedData = await cacheService.get(cacheKey);
      
      if (cachedData) {
        return res.status(200).json(cachedData);
      }

      // 2. Não sobrescreve o res.json aqui para evitar conflitos com Swagger/OpenAPI
      // Apenas prossegue para o Controller buscar do banco
      next();
    } catch (error) {
      console.error('Cache Middleware Error:', error);
      next();
    }
  };
};

```
Exemplo de uso em rotas:
```
router.get('/', cacheMiddleware('profiles', 60), controller.index)
```

## 🗺️ Estrutura de Rotas e Endpoints

A API foi estruturada seguindo princípios RESTful, com autenticação centralizada e endpoints otimizados via Redis.

### 🔐 Autenticação
* `POST /api/auth/login`: Autentica o usuário e retorna o token de acesso.
* `POST /api/auth/logout`: Invalida a sessão atual do usuário.

### 👥 Clientes (Customers)
* `GET /api/customers`: Lista todos os clientes cadastrados.
* `POST /api/customers`: Cria um novo registro de cliente.
* `PATCH /api/customers/:id/status`: Atualiza o status de um cliente específico.

### 📦 Pedidos (Orders)
* `GET /api/orders`: Lista todos os pedidos. (Cache: 60s)
* `POST /api/orders`: Cria um novo pedido.
* `GET /api/orders/:id`: Retorna detalhes de um pedido específico. (Cache: 60s)
* `PATCH /api/orders/:id/status`: **Endpoint Diferencial:** Atualiza o status do pedido (ex: pendente, processando, concluído).

---

## 📚 Documentação da API (Swagger)

Toda a nossa documentação está disponível via **Swagger UI**. Você pode explorar os endpoints, visualizar os modelos de dados e realizar testes diretamente pelo navegador enquanto a aplicação estiver rodando localmente:

👉 **[Acesse a Documentação em: http://localhost:3030/docs](http://localhost:3030/docs/#/Auth/post_auth_login)**

*(Certifique-se de que a aplicação esteja em execução na porta 3030 para acessar o link acima).*
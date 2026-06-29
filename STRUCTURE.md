## Estrutura do Projeto (Arquivos Versionados)

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

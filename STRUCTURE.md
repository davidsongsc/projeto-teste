# Project Structure

> Automatically generated.

```text
.
├── api
│   ├── prisma
│   │   ├── migrations
│   │   │   ├── 20260629070341_migration_initial
│   │   │   │   └── migration.sql
│   │   │   └── 20260629131208_migration_test_update_models
│   │   │       └── migration.sql
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── src
│   │   ├── @types
│   │   │   └── express.d.ts
│   │   ├── config
│   │   │   ├── permissions.ts
│   │   │   ├── prisma.ts
│   │   │   ├── swagger.config.ts
│   │   │   └── swagger.ts
│   │   ├── controllers
│   │   │   ├── auth.controller.ts
│   │   │   ├── collaborator.controller.ts
│   │   │   ├── customer.controller.ts
│   │   │   ├── item.controller.ts
│   │   │   ├── order.controller.ts
│   │   │   ├── permission.controller.ts
│   │   │   ├── profile.controller.ts
│   │   │   └── user.controller.ts
│   │   ├── errors
│   │   │   └── AppError.ts
│   │   ├── lib
│   │   │   ├── redis
│   │   │   │   ├── cache.ts
│   │   │   │   └── client.ts
│   │   │   └── prisma.ts
│   │   ├── middlewares
│   │   │   ├── auth.ts
│   │   │   ├── authorizeMiddleware.ts
│   │   │   ├── cacheMiddleware.ts
│   │   │   ├── checkPermissionMiddleware.ts
│   │   │   └── errorMiddleware.ts
│   │   ├── routes
│   │   │   ├── auth.routes.ts
│   │   │   ├── collaborator.routes.ts
│   │   │   ├── customer.routes.ts
│   │   │   ├── index.ts
│   │   │   ├── item.routes.ts
│   │   │   ├── order.routes.ts
│   │   │   ├── permission.routes.ts
│   │   │   ├── profile.routes.ts
│   │   │   └── user.routes.ts
│   │   ├── services
│   │   │   ├── auth.service.ts
│   │   │   ├── collaborator.service.ts
│   │   │   ├── customer.service.ts
│   │   │   ├── item.service.ts
│   │   │   ├── order.service.test.ts
│   │   │   ├── order.service.ts
│   │   │   ├── permission.service.ts
│   │   │   ├── profile.service.ts
│   │   │   └── user.service.ts
│   │   ├── app.ts
│   │   └── index.ts
│   ├── .env
│   ├── .gitignore
│   ├── .npmrc
│   ├── Dockerfile
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── prisma.config.ts
│   ├── tsconfig.json
│   └── vitest.config.ts
├── web
│   ├── app
│   │   ├── customers
│   │   │   └── page.tsx
│   │   ├── orders
│   │   │   ├── create
│   │   │   │   ├── [userId]
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── users
│   │   │   └── page.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── public
│   │   ├── file.svg
│   │   ├── globe.svg
│   │   ├── next.svg
│   │   ├── vercel.svg
│   │   └── window.svg
│   ├── src
│   │   ├── components
│   │   │   ├── Auth
│   │   │   │   ├── AuthModal
│   │   │   │   │   └── index.tsx
│   │   │   │   ├── LoginForm
│   │   │   │   │   └── index.tsx
│   │   │   │   └── UnauthorizedAccess
│   │   │   │       └── index.tsx
│   │   │   ├── Buttons
│   │   │   │   └── DeleteButton
│   │   │   │       └── index.tsx
│   │   │   ├── Collaborator
│   │   │   │   ├── Actions
│   │   │   │   │   └── index.tsx
│   │   │   │   ├── Create
│   │   │   │   │   └── index.tsx
│   │   │   │   ├── Edit
│   │   │   │   │   └── index.tsx
│   │   │   │   ├── Form
│   │   │   │   │   └── index.tsx
│   │   │   │   └── List
│   │   │   │       ├── columns.tsx
│   │   │   │       └── index.tsx
│   │   │   ├── Customer
│   │   │   │   ├── Actions
│   │   │   │   │   └── index.tsx
│   │   │   │   ├── Create
│   │   │   │   │   └── index.tsx
│   │   │   │   ├── Edit
│   │   │   │   │   └── index.tsx
│   │   │   │   ├── Form
│   │   │   │   │   └── index.tsx
│   │   │   │   └── List
│   │   │   │       ├── columns.tsx
│   │   │   │       └── index.tsx
│   │   │   ├── Header
│   │   │   │   └── index.tsx
│   │   │   ├── Notification
│   │   │   │   ├── Binder
│   │   │   │   │   └── index.tsx
│   │   │   │   └── notification.ts
│   │   │   ├── Order
│   │   │   │   ├── Create
│   │   │   │   │   └── index.tsx
│   │   │   │   ├── Edit
│   │   │   │   │   └── index.tsx
│   │   │   │   ├── Form
│   │   │   │   │   └── index.tsx
│   │   │   │   ├── FormSimple
│   │   │   │   │   └── index.tsx
│   │   │   │   ├── List
│   │   │   │   │   ├── columns.tsx
│   │   │   │   │   └── index.tsx
│   │   │   │   └── Modal
│   │   │   │       ├── CreateOrder
│   │   │   │       │   └── index.tsx
│   │   │   │       └── Sales
│   │   │   │           └── index.tsx
│   │   │   └── User
│   │   │       ├── Actions
│   │   │       │   └── index.tsx
│   │   │       ├── Create
│   │   │       │   └── index.tsx
│   │   │       ├── Edit
│   │   │       │   └── index.tsx
│   │   │       ├── Form
│   │   │       │   └── index.tsx
│   │   │       └── List
│   │   │           ├── columns.tsx
│   │   │           └── index.tsx
│   │   ├── hooks
│   │   │   ├── useAuth.ts
│   │   │   ├── useCollaborator.ts
│   │   │   ├── useCustomers.ts
│   │   │   ├── useDebounce.ts
│   │   │   ├── useOrders.ts
│   │   │   ├── useProfiles.ts
│   │   │   └── useUsers.ts
│   │   ├── interfaces
│   │   │   ├── collaborator.ts
│   │   │   ├── customer.ts
│   │   │   ├── filters.ts
│   │   │   ├── listResponse.ts
│   │   │   ├── order.ts
│   │   │   ├── profile.ts
│   │   │   └── user.ts
│   │   ├── services
│   │   │   ├── api.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── collaborator.service.ts
│   │   │   ├── customers.serivce.ts
│   │   │   ├── order.service.ts
│   │   │   ├── profiles.service.ts
│   │   │   └── users.service.ts
│   │   ├── store
│   │   │   ├── useAuthStore.ts
│   │   │   ├── useCollaboratorStore.ts
│   │   │   ├── useCustomerStore.ts
│   │   │   ├── useOrderStore.ts
│   │   │   └── useUsersStore.ts
│   │   └── theme
│   │       ├── providers
│   │       │   ├── NotificationProvider.tsx
│   │       │   └── ThemeProvider.tsx
│   │       ├── antd.ts
│   │       ├── colors.ts
│   │       ├── index.ts
│   │       └── types.ts
│   ├── .dockerignore
│   ├── .env
│   ├── .gitignore
│   ├── AGENTS.md
│   ├── CLAUDE.md
│   ├── Dockerfile
│   ├── eslint.config.mjs
│   ├── next-env.d.ts
│   ├── next.config.ts
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── postcss.config.mjs
│   ├── README.md
│   └── tsconfig.json
├── .dockerignore
├── docker-compose.yml
├── README.md
├── STRUCTURE.md
└── structure.py
```

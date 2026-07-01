# Project Structure

> Automatically generated.

```text
.
├── api
│   ├── prisma
│   │   ├── migrations
│   │   ├── prisma.config.ts
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
│   │   │   ├── orderItems.controller.ts
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
│   │   │   ├── cacheMiddleware.test.ts
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
│   │   │   ├── orderItem.routes.ts
│   │   │   ├── permission.routes.ts
│   │   │   ├── profile.routes.test.ts
│   │   │   ├── profile.routes.ts
│   │   │   └── user.routes.ts
│   │   ├── services
│   │   │   ├── auth.service.test.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── collaborator.service.test.ts
│   │   │   ├── collaborator.service.ts
│   │   │   ├── customer.service.test.ts
│   │   │   ├── customer.service.ts
│   │   │   ├── item.service.test.ts
│   │   │   ├── item.service.ts
│   │   │   ├── order.service.test.ts
│   │   │   ├── order.service.ts
│   │   │   ├── orderItems.service.test.ts
│   │   │   ├── orderItems.service.ts
│   │   │   ├── permission.service.test.ts
│   │   │   ├── permission.service.ts
│   │   │   ├── profile.service.test.ts
│   │   │   ├── profile.service.ts
│   │   │   ├── user.service.test.ts
│   │   │   └── user.service.ts
│   │   ├── utils
│   │   │   └── OrderInclude.ts
│   │   ├── app.ts
│   │   └── index.ts
│   ├── .dockerignore
│   ├── .env
│   ├── .gitignore
│   ├── .npmrc
│   ├── .tscaliasrc
│   ├── Dockerfile
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── pnpm-workspace.yaml
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
│   │   ├── profilers
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
│   │   │   │   ├── DeleteButton
│   │   │   │   │   └── index.tsx
│   │   │   │   └── EditButton
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
│   │   │   │   ├── AutoComplete
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
│   │   │   ├── Profiler
│   │   │   │   ├── Actions
│   │   │   │   │   └── index.tsx
│   │   │   │   ├── Create
│   │   │   │   │   └── index.tsx
│   │   │   │   ├── Details
│   │   │   │   │   └── index.tsx
│   │   │   │   ├── Edit
│   │   │   │   │   └── index.tsx
│   │   │   │   ├── Form
│   │   │   │   │   └── index.tsx
│   │   │   │   └── List
│   │   │   │       ├── columns.tsx
│   │   │   │       └── index.tsx
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
│   │   ├── enum
│   │   │   └── role.enum.ts
│   │   ├── hooks
│   │   │   ├── useAuth.ts
│   │   │   ├── useCollaborator.ts
│   │   │   ├── useCustomers.ts
│   │   │   ├── useDebounce.ts
│   │   │   ├── useItems.ts
│   │   │   ├── useOrders.ts
│   │   │   ├── usePermissions.ts
│   │   │   ├── useProfilers.ts
│   │   │   └── useUsers.ts
│   │   ├── interfaces
│   │   │   ├── collaborator.ts
│   │   │   ├── customer.ts
│   │   │   ├── filters.ts
│   │   │   ├── item.ts
│   │   │   ├── listResponse.ts
│   │   │   ├── order.ts
│   │   │   ├── pagination.ts
│   │   │   ├── permission.ts
│   │   │   ├── profile.ts
│   │   │   └── user.ts
│   │   ├── services
│   │   │   ├── api.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── collaborator.service.ts
│   │   │   ├── customers.serivce.ts
│   │   │   ├── item.service.ts
│   │   │   ├── order.service.ts
│   │   │   ├── permission.service.ts
│   │   │   ├── profiles.service.ts
│   │   │   └── users.service.ts
│   │   ├── store
│   │   │   ├── useAuthStore.ts
│   │   │   ├── useCollaboratorStore.ts
│   │   │   ├── useCustomerStore.ts
│   │   │   ├── useItemStore.ts
│   │   │   ├── useOrderStore.ts
│   │   │   ├── usePermissionsStore.ts
│   │   │   ├── useProfilerStore.ts
│   │   │   └── useUsersStore.ts
│   │   ├── theme
│   │   │   ├── providers
│   │   │   │   ├── NotificationProvider.tsx
│   │   │   │   └── ThemeProvider.tsx
│   │   │   ├── antd.ts
│   │   │   ├── colors.ts
│   │   │   ├── index.ts
│   │   │   └── types.ts
│   │   └── utils
│   │       ├── hasPermission.test.ts
│   │       └── hasPermission.ts
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
├── .env
├── .gitignore
├── docker-compose.yml
├── package-lock.json
├── README.md
├── STRUCTURE.md
└── structure.py
```

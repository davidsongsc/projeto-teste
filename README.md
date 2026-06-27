# Sistema ERP
## Fonte e Pesquisa de documentação
1. https://markdownlivepreview.com/
2. https://www.prisma.io/docs 
3. https://www.postgresql.org/docs/
5. https://swagger.io/
6. https://redis.io/

# Para instalação do ambiente
1. Crie uma nova pasta
```
mkdir teste-full-stack
cd teste-full-stack
```
2. Inicialize o Projeto TypeScript
```
npm init
npm install typescript tsx @types/node --save-dev
npx tsc --init
```
3. Configure o ESM Supporte alterando o arquivo **tsconfig.json**
```
{
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "bundler",
    "target": "ES2023",
    "strict": true,
    "esModuleInterop": true,
    "ignoreDeprecations": "6.0"
  }
}
```
4. Em **package.json**, altere a linha __type__
```
  "type": "module",
```

5. Inicialize o Prisma ORM
```
npx prisma
```
6. configure o projeto Prisma ORM criando seu arquivo de esquema Prisma com o seguinte comando:
```
npx prisma init --output ../generated/prisma
```

# Arquivos importantes
Confirme se o arquivo **prisma.config.ts** esta igual a este:
```
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
```

Modifique o **prisma/schema.prisma** utilizando o modelo a abaixo.:
```
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
}

model User {
  id         String     @id @default(uuid())
  name       String
  document   String?    @unique
  email      String     @unique
  status     String
  customers  Customer[]
  orders     Order[]
  created_at DateTime   @default(now())
  updated_at DateTime   @updatedAt
}

model Customer {
  id         String   @id @default(uuid())
  profile    Profile  @relation(fields: [profileId], references: [id])
  profileId  String
  user       User     @relation(fields: [userId], references: [id])
  userId     String
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt
}

model Profile {
  id          String     @id @default(uuid())
  name        String
  description String?
  customers   Customer[]
  created_at  DateTime   @default(now())
  updated_at  DateTime   @updatedAt
}

model Product {
  id         String   @id @default(uuid())
  name       String
  price      Decimal  @db.Decimal(10, 2)
  status     String
  items      Item[]
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt
}

model Order {
  id         String   @id @default(uuid())
  user       User     @relation(fields: [userId], references: [id])
  userId     String
  items      Item[]
  totalPrice Decimal  @db.Decimal(10, 2)
  status     String   // "DRAFT", "CONFIRMED", "CANCELLED"
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt
}

model Item {
  id         String   @id @default(uuid())
  order      Order    @relation(fields: [orderId], references: [id])
  orderId    String
  product    Product  @relation(fields: [productId], references: [id])
  productId  String
  price      Decimal  @db.Decimal(10, 2)
  count      Int
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt
}

model Permission {
  id          String   @id @default(uuid())
  key         String   @unique
  module      String
  action      String
  description String?
  created_at  DateTime @default(now())
  updated_at  DateTime @updatedAt
}
```
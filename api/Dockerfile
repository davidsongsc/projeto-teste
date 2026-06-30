# Estágio de Build
FROM node:22-alpine AS builder

WORKDIR /usr/src/app

# Dependências de sistema necessárias
RUN apk add --no-cache libc6-compat openssl

# Gerenciamento de pacotes
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml* .npmrc* pnpm-workspace.yaml* ./
RUN pnpm install --frozen-lockfile

COPY . .

# Placeholder para o generate não falhar sem acesso ao banco
RUN DATABASE_URL="postgresql://fake:fake@localhost:5432/fake" npx prisma generate

RUN CI=true pnpm test

ARG BUILD_APP=true
RUN if [ "$BUILD_APP" = "true" ]; then pnpm build; fi

# Estágio de Execução (Runner)
FROM node:22-alpine AS runner

WORKDIR /usr/src/app

RUN apk add --no-cache openssl

ENV NODE_ENV=production

# Copia apenas o necessário para rodar
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/dist ./dist 
COPY --from=builder /usr/src/app/prisma ./prisma

# Porta padrão (ajuste se necessário)
EXPOSE 3000

CMD ["node", "dist/index.js"]
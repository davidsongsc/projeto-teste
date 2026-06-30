# Estágio de Build
FROM node:22-alpine AS builder

WORKDIR /usr/src/app

RUN apk add --no-cache openssl libc6-compat
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml* ./
RUN apk add --no-cache openssl libc6-compat python3 make g++
COPY . .

RUN pnpm add dotenv

RUN DATABASE_URL="postgresql://fake:fake@localhost:5432/fake" npx prisma generate

RUN CI=true pnpm test

RUN pnpm build

RUN pnpm prune --prod

# Estágio de Execução (Runner)
FROM node:22-alpine AS runner

WORKDIR /usr/src/app

RUN apk add --no-cache openssl

ENV NODE_ENV=production

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma

RUN addgroup -S nodejs && adduser -S nodejs -G nodejs
USER nodejs

EXPOSE 3030

CMD ["node", "dist/index.mjs"]
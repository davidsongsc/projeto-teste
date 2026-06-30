FROM node:22-alpine AS builder

WORKDIR /usr/src/app
RUN apk add --no-cache libc6-compat openssl
RUN corepack enable

COPY .npmrc package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --unsafe-perm=true

COPY . .

RUN pnpm prisma generate
RUN pnpm test
RUN pnpm build

FROM node:22-alpine AS runner
WORKDIR /usr/src/app

RUN apk add --no-cache openssl
ENV NODE_ENV=production
RUN corepack enable

# Copie o .npmrc também para o runner
COPY .npmrc package.json pnpm-lock.yaml ./
RUN pnpm install \
    --prod \
    --frozen-lockfile \
    --unsafe-perm=true

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /usr/src/app/prisma ./prisma

RUN addgroup -S nodejs && adduser -S node -G nodejs

USER node

EXPOSE 3030
CMD ["pnpm", "start"]
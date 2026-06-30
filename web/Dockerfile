FROM node:20-slim AS builder

WORKDIR /app

RUN corepack enable
RUN pnpm config set allow-builds "prisma,@prisma/engines,@scarf/scarf,esbuild"

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build


FROM node:20-slim AS runner

ENV NODE_ENV=production

WORKDIR /app

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]
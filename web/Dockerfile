FROM node:22-slim AS builder

WORKDIR /app

RUN corepack enable \
    && corepack prepare pnpm@10.12.4 --activate

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN pnpm build


FROM node:22-slim AS runner
ENV HOSTNAME=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production

WORKDIR /app

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]
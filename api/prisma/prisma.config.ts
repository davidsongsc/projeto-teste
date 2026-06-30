
import { defineConfig } from 'prisma'

export default defineConfig({
    adapter: 'postgresql',
    url: process.env.DATABASE_URL,
})
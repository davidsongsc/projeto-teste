import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
async function main() {
  await prisma.user.createMany({
    data: [
      { name: 'Alice', email: 'alice@prisma.io' },
      { name: 'Bob', email: 'bob@prisma.io' },
      { name: 'Carlos', email: 'carlos@prisma.io' },
      { name: 'Ana', email: 'ana@prisma.io' },
      { name: 'Maria', email: 'maria@prisma.io' },
      { name: 'Pedro', email: 'pedro@prisma.io' }
    ],
    skipDuplicates: true
  })

  console.log('Seed executado com sucesso')
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
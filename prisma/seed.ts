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
      { name: 'Alice', document: '123.456.789-00', email: 'alice@prisma.io' },
      { name: 'Bob', document: '234.567.890-11', email: 'bob@prisma.io' },
      { name: 'Carlos', document: '345.678.901-22', email: 'carlos@prisma.io' },
      { name: 'Ana', document: '456.789.012-33', email: 'ana@prisma.io' },
      { name: 'Maria', document: '567.890.123-44', email: 'maria@prisma.io' },
      { name: 'Pedro', document: '678.901.234-55', email: 'pedro@prisma.io' }
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
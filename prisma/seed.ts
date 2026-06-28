import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { randomUUID } from 'node:crypto';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Iniciando seed completo...');

  // 1. Criar Permissões Base
  const keys = ['READ_ORDER', 'READ_USER', 'READ_PRODUCT', 'WRITE_ALL', 'MANAGE_PERMS'];
  for (const key of keys) {
    await prisma.permission.upsert({
      where: { key },
      update: {},
      create: { key, module: 'System', action: 'ANY', description: `Permissão ${key}` }
    });
  }

  // 2. Definir IDs fixos
  const OP_ID = 'b2a62432-d57c-4adb-a214-83efe2181384';
  const ADMIN_ID = 'ea379182-ea0d-4913-a47a-6651e7fd43d6';
  const SUPER_ADMIN_ID = '7332e6f4-7fa5-4830-8b71-9ae491e4caf1';
  const PRODUCT_ID = randomUUID();

  // 3. Criar Produto
  await prisma.product.upsert({
    where: { id: PRODUCT_ID },
    update: {},
    create: { id: PRODUCT_ID, name: 'Serviço de Frete Express', price: 10.5 }
  });

  // 4. Criar Perfis
  const profiles = [
    { id: OP_ID, name: 'Operador', role: 'OPERATOR' },
    { id: ADMIN_ID, name: 'Administrador', role: 'ADMIN' },
    { id: SUPER_ADMIN_ID, name: 'Admin Superior', role: 'SUPER_ADMIN' }
  ];

  for (const p of profiles) {
    await prisma.profile.upsert({
      where: { id: p.id },
      update: {},
      create: p
    });
  }

  // 5. Conectar Permissões
  await prisma.profile.update({
    where: { id: OP_ID },
    data: { permissions: { connect: [{ key: 'READ_ORDER' }, { key: 'READ_USER' }, { key: 'READ_PRODUCT' }] } }
  });

  await prisma.profile.update({
    where: { id: ADMIN_ID },
    data: { permissions: { connect: [{ key: 'WRITE_ALL' }] } }
  });

  await prisma.profile.update({
    where: { id: SUPER_ADMIN_ID },
    data: { permissions: { connect: [{ key: 'WRITE_ALL' }, { key: 'MANAGE_PERMS' }] } }
  });

  // 6. Criar Usuários Fixos (Operador e Admin)
  const fixedUsers = [
    { name: 'Operador Padrão', email: 'operador@op.com', password: 'segredo123', profileId: OP_ID },
    { name: 'Admin Padrão', email: 'admin@op.com', password: 'segredo123', profileId: ADMIN_ID }
  ];

  for (const u of fixedUsers) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: { profileId: u.profileId },
      create: u
    });
  }

  // 7. Gerar Volume de Dados
  console.log('Gerando massa de dados...');
  for (let i = 0; i < 50; i++) {
    const email = `user${i}@logistics.com`;
    const user = await prisma.user.upsert({
      where: { email },
      update: { name: `Usuario ${i}` },
      create: { 
        name: `Usuario ${i}`, 
        email: email, 
        profileId: i % 2 === 0 ? OP_ID : ADMIN_ID 
      }
    });

    const orderCount = await prisma.order.count({ where: { userId: user.id } });
    if (orderCount === 0) {
      for (let j = 0; j < 2; j++) {
        await prisma.order.create({
          data: {
            userId: user.id,
            totalPrice: (i + j) * 10.5,
            status: 'CONFIRMED',
            items: { create: [{ productId: PRODUCT_ID, price: 10.5, count: 1 }] }
          }
        });
      }
    }
  }

  console.log('Seed completo com sucesso!');
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
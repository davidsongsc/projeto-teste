import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter }); // Instância global

async function main() {
  console.log('--- Iniciando Seed Completo ---');

  // 1. Limpeza do banco (respeitando a ordem de chaves estrangeiras)
  await prisma.item.deleteMany();
  await prisma.order.deleteMany();
  await prisma.user.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.permission.deleteMany();
  await prisma.product.deleteMany();

  // 2. Criar Permissões Base
  const permissionsData = [
    { key: 'READ_USER', description: 'Visualizar clientes' },
    { key: 'WRITE_ORDER', description: 'Criar pedidos' },
    { key: 'READ_ORDER', description: 'Visualizar pedidos' },
    { key: 'MANAGE_ALL', description: 'Acesso total ao sistema' }
  ];

  for (const p of permissionsData) {
    await prisma.permission.create({
      data: { key: p.key, module: 'System', action: 'ANY', description: p.description }
    });
  }

  // 3. Criar Perfis
  const adminProfile = await prisma.profile.create({
    data: {
      name: 'Administrador',
      role: 'ADMIN',
      permissions: { connect: [{ key: 'MANAGE_ALL' }] }
    }
  });

  const operatorProfile = await prisma.profile.create({
    data: {
      name: 'Operador',
      role: 'OPERATOR',
      permissions: {
        connect: [{ key: 'READ_USER' }, { key: 'WRITE_ORDER' }, { key: 'READ_ORDER' }]
      }
    }
  });

  // 4. Criar Usuários Específicos (Admin e Operador)
  await prisma.user.createMany({
    data: [
      { name: 'Administrador', email: 'admin@loja.com', password: 'senha123', profileId: adminProfile.id },
      { name: 'Operador', email: 'operador@loja.com', password: 'senha123', profileId: operatorProfile.id }
    ]
  });

  // 5. Criar 10 Customers (Usuários comuns, sem profileId)
  const nomesAleatorios = ['Alice', 'Bruno', 'Carla', 'Diego', 'Elena', 'Fabio', 'Gabi', 'Hugo', 'Iara', 'Joao'];

  for (let i = 0; i < 10; i++) {
    await prisma.user.create({
      data: {
        name: nomesAleatorios[i],
        email: `cliente${i}@loja.com`,
        password: 'senha123',
        profileId: null // Usuário comum (Customer)
      }
    });
  }

  console.log('--- Seed finalizado com sucesso! ---');
  console.log('Total: 2 usuários privilegiados + 10 clientes.');
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
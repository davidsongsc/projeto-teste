import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { hash } from 'bcryptjs';
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
const PASSWORD = await hash('senha123', 8);
async function main() {
  console.log('--- Iniciando Seed Completo ---');

  // 1. Limpeza
  await prisma.item.deleteMany();
  await prisma.order.deleteMany();
  await prisma.collaborator.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.user.deleteMany();
  await prisma.permission.deleteMany();
  await prisma.profile.deleteMany();

  // 2. Permissões
  await prisma.permission.createMany({
    data: [
      { key: 'customer:read', module: 'Customer', action: 'READ', description: 'Visualizar clientes' },
      { key: 'customer:create', module: 'Customer', action: 'CREATE', description: 'Cadastrar clientes' },
      { key: 'customer:delete', module: 'Customer', action: 'DELETE', description: 'Deletar clientes' },
      { key: 'customer:update', module: 'Customer', action: 'UPDATE', description: 'Atualizar clientes' },

      { key: 'order:read', module: 'Order', action: 'READ', description: 'Visualizar pedidos' },
      { key: 'order:create', module: 'Order', action: 'CREATE', description: 'Criar pedidos' },
      { key: 'order:update', module: 'Order', action: 'UPDATE', description: 'Atualizar pedidos' },
      { key: 'order:delete', module: 'Order', action: 'DELETE', description: 'Deletar pedidos' },

      { key: 'collaborator:read', module: 'Collaborator', action: 'READ', description: 'Visualizar colaboradores' },
      { key: 'collaborator:create', module: 'Collaborator', action: 'CREATE', description: 'Criar colaboradores' },
      { key: 'collaborator:update', module: 'Collaborator', action: 'UPDATE', description: 'Atualizar colaboradores' },
      { key: 'collaborator:delete', module: 'Collaborator', action: 'DELETE', description: 'Deletar colaboradores' },

      { key: 'item:read', module: 'Item', action: 'READ', description: 'Visualizar itens' },
      { key: 'item:create', module: 'Item', action: 'CREATE', description: 'Criar itens' },
      { key: 'item:update', module: 'Item', action: 'UPDATE', description: 'Atualizar itens' },
      { key: 'item:delete', module: 'Item', action: 'DELETE', description: 'Deletar itens' },

      { key: 'user:read', module: 'User', action: 'READ', description: 'Visualizar usuários' },
      { key: 'user:create', module: 'User', action: 'CREATE', description: 'Criar usuários' },
      { key: 'user:update', module: 'User', action: 'UPDATE', description: 'Atualizar usuários' },
      { key: 'user:delete', module: 'User', action: 'DELETE', description: 'Deletar usuários' }
    ]
  });

  // Recupera todas as permissões para o Admin
  const allPermissions = await prisma.permission.findMany();

  // 3. Perfis
  // Administrador: tem todas as permissões de model
  const adminProfile = await prisma.profile.create({
    data: {
      name: 'Administrador',
      role: 'ADMIN',
      permissions: { connect: allPermissions.map(p => ({ key: p.key })) }
    }
  });

  // Operador: leitor de cliente, leitor/criador de pedido
  const operatorProfile = await prisma.profile.create({
    data: {
      name: 'Operador',
      role: 'OPERATOR',
      permissions: {
        connect: [
          { key: 'customer:read' },
          { key: 'order:read' },
          { key: 'order:create' }
        ]
      }
    }
  });

  const prods = await prisma.product.findMany();

  const customers = [];
  for (let i = 1; i <= 5; i++) {
    const customer = await prisma.customer.create({
      data: {
        name: `Cliente ${i}`,
        email: `cliente${i}@email.com`,
        document: `1234567890${i}`,
        status: Math.random() > 0.3 // 70% de chance de ser true
      }
    });
    customers.push(customer);
  }
  // 4. Criar Usuários Principais (Admin e Operador)
  const usersToCreate = [
    { name: 'Administrador', email: 'admin@loja.com', password: PASSWORD, profileId: adminProfile.id },
    { name: 'Operador', email: 'operador@loja.com', password: PASSWORD, profileId: operatorProfile.id }
  ];

  for (const userData of usersToCreate) {
    const user = await prisma.user.create({ data: userData });
    await prisma.collaborator.create({ data: { name: user.name, userId: user.id, profileId: user.profileId! } });
  }

  // 5. Criar 8 Colaboradores adicionais
  for (let i = 1; i <= 8; i++) {
    const user = await prisma.user.create({
      data: {
        name: `Colaborador ${i}`,
        email: `colab${i}@empresa.com`,
        password: PASSWORD,
        profileId: operatorProfile.id
      }
    });

    await prisma.collaborator.create({
      data: { name: user.name, userId: user.id, profileId: user.profileId! }
    });

    // Seleciona um cliente aleatório para o pedido
    const randomCustomer = customers[Math.floor(Math.random() * customers.length)];

    // Pedido de exemplo vinculado ao cliente
    const itemPrice = 100;
    const itemCount = 1;
    const itemTotal = itemPrice * itemCount;

    const order = await prisma.order.create({
      data: {
        userId: user.id,
        customerId: randomCustomer.id,
        totalPrice: itemTotal,
        status: 'CONFIRMED'
      }
    });

    await prisma.item.create({
      data: {
        orderId: order.id,
        name: 'Produto A',
        price: itemPrice,
        total: itemTotal,
        count: itemCount,
        description: 'Item criado pelo seed'
      }
    })
  }

  console.log('--- Seed Finalizado com sucesso! ---');
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
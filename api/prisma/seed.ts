import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { hash } from 'bcryptjs';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('--- Iniciando Seed Completo ---');

  const PASSWORD = await hash('senha123', 8);

  // 1. Limpeza (Atenção à ordem: OrderItem deve ser apagado primeiro devido à FK)
  await prisma.orderItem.deleteMany();
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
      { key: 'customer:update', module: 'Customer', action: 'UPDATE', description: 'Atualizar clientes' },
      { key: 'customer:delete', module: 'Customer', action: 'DELETE', description: 'Deletar clientes' },

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

      { key: 'user:read', module: 'User', action: 'READ', description: 'Visualizar usuários' },
      { key: 'user:create', module: 'User', action: 'CREATE', description: 'Criar usuários' },
      { key: 'user:update', module: 'User', action: 'UPDATE', description: 'Atualizar usuários' },
      { key: 'user:delete', module: 'User', action: 'DELETE', description: 'Deletar usuários' },

      { key: 'profile:read', module: 'Profile', action: 'READ', description: 'Visualizar perfis' },
      { key: 'profile:create', module: 'Profile', action: 'CREATE', description: 'Criar perfis' },
      { key: 'profile:update', module: 'Profile', action: 'UPDATE', description: 'Atualizar perfis' },
      { key: 'profile:delete', module: 'Profile', action: 'DELETE', description: 'Deletar perfis' },

      { key: 'permission:read', module: 'Permission', action: 'READ', description: 'Visualizar permissões' },
      { key: 'permission:create', module: 'Permission', action: 'CREATE', description: 'Criar permissões' },
      { key: 'permission:update', module: 'Permission', action: 'UPDATE', description: 'Atualizar permissões' },
      { key: 'permission:delete', module: 'Permission', action: 'DELETE', description: 'Deletar permissões' },

      { key: 'orderitem:read', module: 'OrderItem', action: 'READ', description: 'Visualizar itens do pedido' },
      { key: 'orderitem:create', module: 'OrderItem', action: 'CREATE', description: 'Criar itens do pedido' },
      { key: 'orderitem:update', module: 'OrderItem', action: 'UPDATE', description: 'Atualizar itens do pedido' },
      { key: 'orderitem:delete', module: 'OrderItem', action: 'DELETE', description: 'Deletar itens do pedido' }
    ],
    skipDuplicates: true
  });
  // Recupera todas as permissões para o Admin
  const allPermissions = await prisma.permission.findMany();

  // 3. Perfis
  const adminProfile = await prisma.profile.create({
    data: {
      name: 'Administrador',
      role: 'ADMIN',
      permissions: { connect: allPermissions.map(p => ({ key: p.key })) }
    }
  });

  const operatorProfile = await prisma.profile.create({
    data: {
      name: 'Operador',
      role: 'OPERATOR',
      permissions: {
        connect: [
          { key: 'customer:read' },
          { key: 'order:read' },
          { key: 'order:create' },
          { key: 'item:read' },
        ]
      }
    }
  });

  const customers = [];
  for (let i = 1; i <= 5; i++) {
    const customer = await prisma.customer.create({
      data: {
        name: `Cliente ${i}`,
        email: `cliente${i}@email.com`,
        document: `1234567890${i}`,
        status: Math.random() > 0.3
      }
    });
    customers.push(customer);
  }

  // 4. Criar Usuários Principais
  const usersToCreate = [
    { name: 'Administrador', email: 'admin@loja.com', password: PASSWORD, profileId: adminProfile.id },
    { name: 'Operador', email: 'operador@loja.com', password: PASSWORD, profileId: operatorProfile.id }
  ];

  for (const userData of usersToCreate) {
    const user = await prisma.user.create({ data: userData });
    await prisma.collaborator.create({ data: { name: user.name, userId: user.id, profileId: user.profileId! } });
  }

  // 5. Criar no mínimo 5 itens (Catálogo de Produtos Global)
  const items = [];
  for (let i = 1; i <= 5; i++) {
    const item = await prisma.item.create({
      data: {
        name: `Produto ${String.fromCharCode(64 + i)}`, // Produto A, B, C, D, E
        price: i * 25.50, // Preços: 25.50, 51.00, 76.50...
        description: `Descrição do Produto ${String.fromCharCode(64 + i)} no catálogo`
      }
    });
    items.push(item);
  }

  // 6. Criar 8 Colaboradores e 8 Pedidos (Cumpre a regra de no mínimo 3 orders)
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

    const randomCustomer = customers[Math.floor(Math.random() * customers.length)];
    const randomItem = items[Math.floor(Math.random() * items.length)];

    const itemCount = 2; // Quantidade fictícia vendida
    const itemTotal = Number(randomItem.price) * itemCount;

    // Criando o pedido e inserindo o OrderItem na mesma operação
    await prisma.order.create({
      data: {
        userId: user.id,
        customerId: randomCustomer.id,
        totalPrice: itemTotal,
        status: 'CONFIRMED',
        items: {
          create: [
            {
              itemId: randomItem.id,
              count: itemCount,
              total: itemTotal
            }
          ]
        }
      }
    });
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
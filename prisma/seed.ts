import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.createMany({
    data: [
      { name: 'Administrador', email: 'admin@freelafacil.com' },
      { name: 'João Silva', email: 'joao.silva@freelafacil.com' },
      { name: 'Maria Oliveira', email: 'maria.oliveira@freelafacil.com' },
      { name: 'Carlos Santos', email: 'carlos.santos@freelafacil.com' },
      { name: 'Ana Costa', email: 'ana.costa@freelafacil.com' },
      { name: 'Pedro Almeida', email: 'pedro.almeida@freelafacil.com' }
    ]
  })

  console.log('Seed executado com sucesso!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
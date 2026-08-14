import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const roles = [
    {
      name: 'OWNER',
      description: 'Organization owner',
    },
    {
      name: 'ADMIN',
      description: 'Organization administrator',
    },
    {
      name: 'MEMBER',
      description: 'Regular organization member',
    },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: {
        name: role.name,
      },
      update: {},
      create: role,
    });
  }

  console.log('Roles seeded');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
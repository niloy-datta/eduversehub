import { PrismaClient } from '@prisma/client';
import { seedBadges } from '../lib/badges';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Seed Badges first
  await seedBadges();

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
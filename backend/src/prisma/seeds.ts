import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Создание админа
  const adminPasswordHash = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@ktsh.shop' },
    update: {},
    create: {
      email: 'admin@ktsh.shop',
      username: 'Admin',
      passwordHash: adminPasswordHash,
      role: Role.ADMIN,
      balance: 10000,
      isActive: true,
    },
  });
  console.log(`✅ Created admin: ${admin.email}`);

  // Создание тестового пользователя
  const userPasswordHash = await bcrypt.hash('user123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      username: 'TestUser',
      passwordHash: userPasswordHash,
      role: Role.USER,
      balance: 1247.50,
      isActive: true,
    },
  });
  console.log(`✅ Created test user: ${user.email}`);

  // Создание тестовых аккаунтов (товаров)
  const bgImages = [
    '/background.png',
    '/photos/plo.png',
    '/photos/samurai.png',
    '/photos/ten.png'
  ];

  const accounts = [
    { title: 'CS2 Pro Account', price: 180.99, originalPrice: 212.21, rating: '20.000', hours: '2.000', faceitElo: '1890elo', matches: '238', variant: 'STANDARD', backgroundImage: bgImages[0] },
    { title: 'Faceit Elite', price: 195.50, originalPrice: 212.21, rating: '20.000', hours: '2.000', faceitElo: '1890elo', matches: '238', variant: 'STANDARD', backgroundImage: bgImages[1] },
    { title: 'Compact Gaming', price: 169.99, originalPrice: 212.21, rating: '20.000', faceitElo: '1890elo', variant: 'COMPACT', backgroundImage: bgImages[2] },
    { title: 'Premium Level 10', price: 499.99, faceitElo: '2470elo', level: '10', variant: 'PREMIUM', backgroundImage: bgImages[3] },
    { title: 'High ELO Account', price: 249.99, rating: '22.000', hours: '3.500', faceitElo: '2100elo', matches: '450', variant: 'STANDARD', backgroundImage: bgImages[0] },
    { title: 'Faceit God', price: 389.99, faceitElo: '2350elo', level: '10', variant: 'PREMIUM', backgroundImage: bgImages[1] },
  ];

  for (const account of accounts) {
    await prisma.account.upsert({
      where: { id: account.title },
      update: {},
      create: {
        ...account,
        sellerId: admin.id,
        isAvailable: true,
        vacStatus: 'VAC отсутствует',
      },
    });
  }
  console.log(`✅ Created ${accounts.length} test accounts`);

  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
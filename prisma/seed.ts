import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const projects = [
  {
    title: 'Neon Commerce Dashboard',
    slug: 'neon-commerce-dashboard',
    summary: 'Analytics-first storefront interface with conversion-focused product flows.',
    description:
      'A polished admin and storefront concept built around fast merchandising, KPI monitoring, and conversion-friendly UI patterns.',
    repoUrl: 'https://github.com/yourname/neon-commerce-dashboard',
    liveUrl: 'https://example.com',
    coverImage: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1200&q=80',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
    impact: 'Improved readability and made the product story feel premium.',
    sortOrder: 1,
    featured: true,
    visible: true,
  },
];

async function main() {
  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

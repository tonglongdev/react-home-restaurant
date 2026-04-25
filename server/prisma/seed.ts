import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categories = [
  { name: 'Drinks' },
  { name: 'Main Dishes' },
  { name: 'Desserts' },
];

const foods = [
  {
    name: 'Classic Mojito',
    description: 'Fresh mint, lime juice, cane sugar, and sparkling water. A refreshing classic for any time of day.',
    price: 8.50,
    imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=400',
    categoryName: 'Drinks'
  },
  {
    name: 'Grilled Salmon',
    description: 'Atlantic salmon fillet grilled to perfection, served with roasted seasonal vegetables and lemon butter sauce.',
    price: 24.00,
    imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=400',
    categoryName: 'Main Dishes'
  },
  {
    name: 'Truffle Pasta',
    description: 'Homemade tagliatelle with creamy black truffle sauce, parmesan shavings, and fresh parsley.',
    price: 21.50,
    imageUrl: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&q=80&w=400',
    categoryName: 'Main Dishes'
  },
  {
    name: 'New York Cheesecake',
    description: 'Rich and creamy cheesecake on a buttery graham cracker crust, topped with fresh strawberry coulis.',
    price: 9.00,
    imageUrl: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=400',
    categoryName: 'Desserts'
  },
  {
    name: 'Beef Burger Deluxe',
    description: 'Premium beef patty, aged cheddar, caramelized onions, secret sauce, served on a toasted brioche bun.',
    price: 18.00,
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400',
    categoryName: 'Main Dishes'
  },
  {
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a molten core, served with vanilla bean gelato and hazelnut crumble.',
    price: 10.50,
    imageUrl: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&q=80&w=400',
    categoryName: 'Desserts'
  },
  {
    name: 'Iced Matcha Latte',
    description: 'Ceremonial grade matcha whisked with creamy oat milk and a hint of organic honey over ice.',
    price: 7.00,
    imageUrl: 'https://images.unsplash.com/photo-1515823662273-0b7880588ef3?auto=format&fit=crop&q=80&w=400',
    categoryName: 'Drinks'
  }
];

async function main() {
  console.log('Start seeding...');

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { name: cat.name },
      update: {},
      create: cat,
    });
  }

  const allCategories = await prisma.category.findMany();

  for (const food of foods) {
    const category = allCategories.find(c => c.name === food.categoryName);
    if (category) {
      await prisma.food.create({
        data: {
          name: food.name,
          description: food.description,
          price: food.price,
          imageUrl: food.imageUrl,
          categoryId: category.id,
        },
      });
    }
  }

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

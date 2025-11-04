import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@ecommerce.com' },
    update: {},
    create: {
      email: 'admin@ecommerce.com',
      password: hashedPassword,
      name: 'Admin',
      role: 'ADMIN',
    },
  });

  console.log('✅ Admin user created:', admin.email);
  console.log('   Email: admin@ecommerce.com');
  console.log('   Password: admin123');

  // Create sample products
  const products = await Promise.all([
    // T-Shirts - NEW ARRIVALS
    prisma.product.create({
      data: {
        name: 'Black Graphic T-Shirt',
        description: 'Modern black t-shirt with stylish graphic print. Made from premium cotton for maximum comfort.',
        price: 120000,
        discount: 0,
        image: '/images/pic1.png',
        images: ['/images/pic1.png', '/images/pic10.png', '/images/pic11.png'],
        category: 'T-Shirts',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black'],
        rating: 4.5,
        stock: 50,
        isNewArrival: true,
        isTopSelling: false,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Striped Orange T-Shirt',
        description: 'Eye-catching orange t-shirt with vertical black stripes. Perfect for casual outings.',
        price: 160000,
        discount: 30,
        image: '/images/pic4.png',
        images: ['/images/pic4.png', '/images/pic10.png', '/images/pic11.png'],
        category: 'T-Shirts',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Orange', 'Black'],
        rating: 4.5,
        stock: 45,
        isNewArrival: true,
        isTopSelling: false,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Courage Orange T-Shirt',
        description: 'Bold orange t-shirt with "COURAGE" graphic design. Stand out with confidence.',
        price: 145000,
        discount: 0,
        image: '/images/pic6.png',
        images: ['/images/pic6.png', '/images/pic10.png', '/images/pic11.png'],
        category: 'T-Shirts',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Orange'],
        rating: 4.0,
        stock: 60,
        isNewArrival: false,
        isTopSelling: true,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Olive Graphic T-Shirt',
        description: 'Trendy olive green t-shirt with unique graphic print. Comfortable and stylish.',
        price: 135000,
        discount: 15,
        image: '/images/pic9.png',
        images: ['/images/pic9.png'],
        category: 'T-Shirts',
        sizes: ['M', 'L', 'XL'],
        colors: ['Olive'],
        rating: 4.7,
        stock: 40,
        isNewArrival: false,
        isTopSelling: false,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Heavy Metal T-Shirt',
        description: 'Edgy olive t-shirt with "HEAVY" metal-inspired graphic. For the bold and daring.',
        price: 140000,
        discount: 0,
        image: '/images/pic10.png',
        images: ['/images/pic10.png'],
        category: 'T-Shirts',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Olive'],
        rating: 4.4,
        stock: 35,
        isNewArrival: false,
        isTopSelling: false,
      },
    }),

    // Jeans & Shorts
    prisma.product.create({
      data: {
        name: 'Skinny Fit Jeans',
        description: 'Classic blue skinny fit jeans with distressed details. Perfect fit and comfort.',
        price: 260000,
        discount: 20,
        image: '/images/pic2.png',
        images: ['/images/pic2.png'],
        category: 'Jeans',
        sizes: ['28', '30', '32', '34', '36'],
        colors: ['Blue'],
        rating: 3.5,
        stock: 70,
        isNewArrival: true,
        isTopSelling: false,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Black Skinny Jeans',
        description: 'Sleek black skinny jeans with premium denim fabric. Versatile and stylish.',
        price: 210000,
        discount: 0,
        image: '/images/pic8.png',
        images: ['/images/pic8.png'],
        category: 'Jeans',
        sizes: ['28', '30', '32', '34', '36'],
        colors: ['Black'],
        rating: 4.5,
        stock: 55,
        isNewArrival: false,
        isTopSelling: true,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Denim Shorts',
        description: 'Comfortable denim shorts with distressed finish. Perfect for summer.',
        price: 80000,
        discount: 0,
        image: '/images/pic7.png',
        images: ['/images/pic7.png'],
        category: 'Shorts',
        sizes: ['28', '30', '32', '34'],
        colors: ['Blue'],
        rating: 3.0,
        stock: 45,
        isNewArrival: false,
        isTopSelling: true,
      },
    }),

    // Shirts
    prisma.product.create({
      data: {
        name: 'Checkered Shirt',
        description: 'Classic checkered shirt in red and blue pattern. Perfect for casual and semi-formal occasions.',
        price: 180000,
        discount: 0,
        image: '/images/pic3.png',
        images: ['/images/pic3.png'],
        category: 'Shirts',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Red', 'Blue'],
        rating: 4.5,
        stock: 50,
        isNewArrival: true,
        isTopSelling: false,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Vertical Striped Shirt',
        description: 'Elegant vertical striped shirt with button-down collar. Professional and comfortable.',
        price: 232000,
        discount: 20,
        image: '/images/pic5.png',
        images: ['/images/pic5.png', '/images/pic10.png', '/images/pic11.png'],
        category: 'Shirts',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Green', 'White'],
        rating: 5.0,
        stock: 40,
        isNewArrival: false,
        isTopSelling: true,
      },
    }),

    // Polo Shirts
    prisma.product.create({
      data: {
        name: 'Blue Polo Shirt',
        description: 'Classic blue polo shirt with white collar. Perfect for casual and smart casual occasions.',
        price: 160000,
        discount: 0,
        image: '/images/pic12.png',
        images: ['/images/pic12.png'],
        category: 'Polo',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Blue', 'White'],
        rating: 4.5,
        stock: 50,
        isNewArrival: false,
        isTopSelling: false,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Pink Striped Polo',
        description: 'Stylish pink striped polo shirt with embroidered logo. Comfortable and trendy.',
        price: 170000,
        discount: 10,
        image: '/images/pic14.png',
        images: ['/images/pic14.png'],
        category: 'Polo',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Pink'],
        rating: 4.4,
        stock: 45,
        isNewArrival: false,
        isTopSelling: false,
      },
    }),

    // More T-Shirts
    prisma.product.create({
      data: {
        name: 'Olive Rights T-Shirt',
        description: 'Comfortable olive t-shirt with "RIGHTS" graphic. Modern and casual style.',
        price: 125000,
        discount: 0,
        image: '/images/pic11.png',
        images: ['/images/pic11.png'],
        category: 'T-Shirts',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Olive'],
        rating: 4.6,
        stock: 55,
        isNewArrival: false,
        isTopSelling: false,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Rainbow Art T-Shirt',
        description: 'Unique white t-shirt with colorful rainbow art print. Express your creativity.',
        price: 150000,
        discount: 15,
        image: '/images/pic13.png',
        images: ['/images/pic13.png'],
        category: 'T-Shirts',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['White'],
        rating: 4.8,
        stock: 40,
        isNewArrival: false,
        isTopSelling: false,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Baseball Striped T-Shirt',
        description: 'Classic baseball-style t-shirt with vertical stripes. Sporty and comfortable.',
        price: 135000,
        discount: 0,
        image: '/images/pic15.png',
        images: ['/images/pic15.png'],
        category: 'T-Shirts',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['White', 'Black'],
        rating: 4.5,
        stock: 60,
        isNewArrival: false,
        isTopSelling: false,
      },
    }),
  ]);

  console.log(`✅ Created ${products.length} sample products`);

  // Create settings
  const settings = await Promise.all([
    prisma.settings.upsert({
      where: { key: 'site_name' },
      update: {},
      create: {
        key: 'site_name',
        value: 'Shop.co',
        type: 'text',
      },
    }),
    prisma.settings.upsert({
      where: { key: 'site_description' },
      update: {},
      create: {
        key: 'site_description',
        value: 'Your one-stop shop for fashion',
        type: 'text',
      },
    }),
  ]);

  console.log(`✅ Created ${settings.length} settings`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

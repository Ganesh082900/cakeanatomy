import dotenv from 'dotenv';
import connectDatabase from '../config/database';
import User from '../models/User';
import Category from '../models/Category';
import Product from '../models/Product';

dotenv.config();

const categories = [
  {
    name: 'Cakes',
    description: 'Delicious freshly baked cakes for all occasions',
    order: 1
  },
  {
    name: 'Pastries',
    description: 'Delightful pastries made with premium ingredients',
    order: 2
  },
  {
    name: 'Confections',
    description: 'Sweet confections and desserts',
    order: 3
  },
  {
    name: 'Bakery',
    description: 'Fresh bakery items baked daily',
    order: 4
  }
];

const products = [
  // Cakes
  {
    name: 'Chocolate Truffle Cake',
    description: 'Rich chocolate cake with chocolate truffle filling and ganache topping. A chocolate lover\'s dream!',
    shortDescription: 'Rich chocolate cake with truffle filling',
    type: 'cake',
    price: 899,
    compareAtPrice: 1099,
    weight: 1000,
    weightUnit: 'g',
    stock: 20,
    images: ['https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800'],
    tags: ['chocolate', 'truffle', 'premium', 'bestseller'],
    allergens: ['milk', 'eggs', 'gluten'],
    ingredients: ['chocolate', 'butter', 'eggs', 'flour', 'sugar', 'cocoa'],
    isFeatured: true,
    isAvailable: true
  },
  {
    name: 'Black Forest Cake',
    description: 'Classic black forest cake with layers of chocolate sponge, whipped cream, and cherries.',
    shortDescription: 'Classic chocolate cherry cake',
    type: 'cake',
    price: 799,
    compareAtPrice: 999,
    weight: 1000,
    weightUnit: 'g',
    stock: 15,
    images: ['https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800'],
    tags: ['chocolate', 'cherry', 'classic'],
    allergens: ['milk', 'eggs', 'gluten'],
    ingredients: ['chocolate', 'cream', 'cherries', 'eggs', 'flour', 'sugar'],
    isFeatured: true,
    isAvailable: true
  },
  {
    name: 'Red Velvet Cake',
    description: 'Moist red velvet layers with cream cheese frosting. Perfect for celebrations.',
    shortDescription: 'Red velvet with cream cheese frosting',
    type: 'cake',
    price: 849,
    weight: 1000,
    weightUnit: 'g',
    stock: 18,
    images: ['https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800'],
    tags: ['red velvet', 'cream cheese', 'celebration'],
    allergens: ['milk', 'eggs', 'gluten'],
    ingredients: ['flour', 'cocoa', 'buttermilk', 'cream cheese', 'eggs', 'sugar'],
    isFeatured: true,
    isAvailable: true
  },

  // Pastries
  {
    name: 'Croissant',
    description: 'Buttery, flaky French croissant baked fresh daily.',
    shortDescription: 'Classic French croissant',
    type: 'pastry',
    price: 80,
    weight: 70,
    weightUnit: 'g',
    stock: 50,
    images: ['https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800'],
    tags: ['french', 'breakfast', 'buttery'],
    allergens: ['gluten', 'milk'],
    ingredients: ['flour', 'butter', 'yeast', 'milk', 'salt'],
    isAvailable: true
  },
  {
    name: 'Chocolate Eclair',
    description: 'Light choux pastry filled with vanilla cream and topped with chocolate glaze.',
    shortDescription: 'Cream-filled chocolate eclair',
    type: 'pastry',
    price: 120,
    weight: 100,
    weightUnit: 'g',
    stock: 30,
    images: ['https://images.unsplash.com/photo-1612201142855-c2aa8b939a07?w=800'],
    tags: ['eclair', 'chocolate', 'cream'],
    allergens: ['milk', 'eggs', 'gluten'],
    ingredients: ['flour', 'butter', 'eggs', 'milk', 'chocolate', 'vanilla'],
    isFeatured: true,
    isAvailable: true
  },
  {
    name: 'Fruit Danish',
    description: 'Sweet Danish pastry topped with seasonal fruits and custard.',
    shortDescription: 'Fruit-topped Danish pastry',
    type: 'pastry',
    price: 100,
    weight: 90,
    weightUnit: 'g',
    stock: 25,
    images: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800'],
    tags: ['danish', 'fruit', 'breakfast'],
    allergens: ['gluten', 'milk', 'eggs'],
    ingredients: ['flour', 'butter', 'fruits', 'custard', 'sugar'],
    isAvailable: true
  },

  // Confections
  {
    name: 'Assorted Macarons',
    description: 'Box of 6 French macarons in assorted flavors including vanilla, chocolate, and raspberry.',
    shortDescription: 'Box of 6 French macarons',
    type: 'confection',
    price: 399,
    weight: 120,
    weightUnit: 'g',
    stock: 40,
    images: ['https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=800'],
    tags: ['macarons', 'french', 'assorted', 'gift'],
    allergens: ['almonds', 'eggs'],
    ingredients: ['almond flour', 'sugar', 'egg whites', 'various flavors'],
    isFeatured: true,
    isAvailable: true
  },
  {
    name: 'Tiramisu Cup',
    description: 'Individual serving of classic Italian tiramisu with mascarpone and coffee.',
    shortDescription: 'Classic tiramisu dessert cup',
    type: 'confection',
    price: 180,
    weight: 150,
    weightUnit: 'g',
    stock: 20,
    images: ['https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800'],
    tags: ['tiramisu', 'italian', 'coffee'],
    allergens: ['milk', 'eggs', 'gluten'],
    ingredients: ['mascarpone', 'coffee', 'ladyfingers', 'cocoa', 'eggs'],
    isAvailable: true
  },

  // Bakery
  {
    name: 'Artisan Sourdough Bread',
    description: 'Traditional sourdough bread with crispy crust and soft interior.',
    shortDescription: 'Traditional sourdough loaf',
    type: 'bakery',
    price: 150,
    weight: 500,
    weightUnit: 'g',
    stock: 30,
    images: ['https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=800'],
    tags: ['sourdough', 'bread', 'artisan'],
    allergens: ['gluten'],
    ingredients: ['flour', 'water', 'salt', 'sourdough starter'],
    isAvailable: true
  },
  {
    name: 'Chocolate Chip Cookies',
    description: 'Pack of 6 freshly baked chocolate chip cookies.',
    shortDescription: 'Pack of 6 chocolate chip cookies',
    type: 'bakery',
    price: 120,
    weight: 180,
    weightUnit: 'g',
    stock: 50,
    images: ['https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800'],
    tags: ['cookies', 'chocolate chip', 'snack'],
    allergens: ['gluten', 'milk', 'eggs'],
    ingredients: ['flour', 'butter', 'chocolate chips', 'eggs', 'sugar'],
    isFeatured: true,
    isAvailable: true
  }
];

const seedDatabase = async () => {
  try {
    await connectDatabase();

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Category.deleteMany({});
    await Product.deleteMany({});

    // Create admin user
    const adminExists = await User.findOne({ email: 'admin@cakeanatomy.com' });
    if (!adminExists) {
      await User.create({
        name: 'Admin User',
        email: 'admin@cakeanatomy.com',
        password: 'admin123',
        role: 'admin',
        isEmailVerified: true
      });
      console.log('✅ Admin user created (email: admin@cakeanatomy.com, password: admin123)');
    }

    // Create categories
    console.log('📁 Creating categories...');
    const createdCategories = await Category.insertMany(categories);
    console.log(`✅ ${createdCategories.length} categories created`);

    // Map category names to IDs
    const categoryMap: { [key: string]: any } = {};
    createdCategories.forEach(cat => {
      categoryMap[cat.name] = cat._id;
    });

    // Assign categories to products
    const productsWithCategories = products.map(product => {
      let categoryName = 'Cakes';
      if (product.type === 'pastry') categoryName = 'Pastries';
      if (product.type === 'confection') categoryName = 'Confections';
      if (product.type === 'bakery') categoryName = 'Bakery';

      return {
        ...product,
        category: categoryMap[categoryName]
      };
    });

    // Create products
    console.log('🍰 Creating products...');
    const createdProducts = await Product.insertMany(productsWithCategories);
    console.log(`✅ ${createdProducts.length} products created`);

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Categories: ${createdCategories.length}`);
    console.log(`   Products: ${createdProducts.length}`);
    console.log('\n👤 Admin Credentials:');
    console.log('   Email: admin@cakeanatomy.com');
    console.log('   Password: admin123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeder
seedDatabase();

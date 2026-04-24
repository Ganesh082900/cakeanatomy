import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { subDays, addDays } from 'date-fns';

// Models
import User from '../models/User';
import Staff from '../models/Staff';
import Category from '../models/Category';
import RawMaterial from '../models/RawMaterial';
import Recipe from '../models/Recipe';
import Product from '../models/Product';
import Order from '../models/Order';
import Coupon from '../models/Coupon';
import GiftCard from '../models/GiftCard';
import Campaign from '../models/Campaign';
import Production from '../models/Production';
import Attendance from '../models/Attendance';

dotenv.config();

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cakeanatomy';
  await mongoose.connect(mongoURI);
  console.log('✅ MongoDB Connected');
};

const clearDatabase = async () => {
  await User.deleteMany({});
  await Staff.deleteMany({});
  await Category.deleteMany({});
  await RawMaterial.deleteMany({});
  await Recipe.deleteMany({});
  await Product.deleteMany({});
  await Order.deleteMany({});
  await Coupon.deleteMany({});
  await GiftCard.deleteMany({});
  await Campaign.deleteMany({});
  await Production.deleteMany({});
  await Attendance.deleteMany({});
  console.log('🗑️  Database cleared');
};

const seedData = async () => {
  try {
    await connectDB();
    await clearDatabase();

    // 1. Create Admin and Staff
    console.log('👥 Creating staff...');
    const adminStaff = await Staff.create({
      name: 'Admin User',
      email: 'admin@cakeanatomy.com',
      phone: '+91-9876543210',
      role: 'admin',
      department: 'management',
      employeeId: 'CA001',
      dateOfJoining: subDays(new Date(), 365),
      salary: 50000,
      isActive: true
    });

    const staff = await Staff.insertMany([
      {
        name: 'Rajesh Kumar',
        email: 'rajesh@cakeanatomy.com',
        phone: '+91-9876543211',
        role: 'baker',
        department: 'production',
        employeeId: 'CA002',
        dateOfJoining: subDays(new Date(), 180),
        salary: 30000,
        isActive: true
      },
      {
        name: 'Priya Sharma',
        email: 'priya@cakeanatomy.com',
        phone: '+91-9876543212',
        role: 'cashier',
        department: 'sales',
        employeeId: 'CA003',
        dateOfJoining: subDays(new Date(), 120),
        salary: 25000,
        isActive: true
      },
      {
        name: 'Amit Patel',
        email: 'amit@cakeanatomy.com',
        phone: '+91-9876543213',
        role: 'delivery',
        department: 'delivery',
        employeeId: 'CA004',
        dateOfJoining: subDays(new Date(), 90),
        salary: 20000,
        isActive: true
      },
      {
        name: 'Sneha Reddy',
        email: 'sneha@cakeanatomy.com',
        phone: '+91-9876543214',
        role: 'baker',
        department: 'production',
        employeeId: 'CA005',
        dateOfJoining: subDays(new Date(), 60),
        salary: 28000,
        isActive: true
      }
    ]);

    // 2. Create Attendance Records (Last 30 days)
    console.log('📅 Creating attendance records...');
    const attendanceRecords = [];
    for (let i = 0; i < 30; i++) {
      const date = subDays(new Date(), i);
      for (const s of [adminStaff, ...staff]) {
        const isPresent = Math.random() > 0.1; // 90% attendance
        if (isPresent) {
          attendanceRecords.push({
            staff: s._id,
            date,
            clockIn: new Date(date.setHours(9, 0, 0)),
            clockOut: new Date(date.setHours(18, 0, 0)),
            status: 'present'
          });
        }
      }
    }
    await Attendance.insertMany(attendanceRecords);

    // 3. Create Categories
    console.log('📁 Creating categories...');
    const categories = await Category.insertMany([
      { name: 'Cakes', slug: 'cakes', description: 'Fresh baked cakes', displayOrder: 1, isActive: true },
      { name: 'Pastries', slug: 'pastries', description: 'Delicious pastries', displayOrder: 2, isActive: true },
      { name: 'Cookies', slug: 'cookies', description: 'Crunchy cookies', displayOrder: 3, isActive: true },
      { name: 'Breads', slug: 'breads', description: 'Fresh breads', displayOrder: 4, isActive: true },
      { name: 'Custom Cakes', slug: 'custom-cakes', description: 'Personalized cakes', displayOrder: 5, isActive: true }
    ]);

    // 4. Create Raw Materials
    console.log('🥫 Creating raw materials...');
    const rawMaterials = await RawMaterial.insertMany([
      {
        name: 'All Purpose Flour',
        category: 'flour',
        unit: 'kg',
        currentStock: 150,
        minStockLevel: 50,
        maxStockLevel: 300,
        unitPrice: 45,
        isPerishable: false,
        storageLocation: 'Pantry A'
      },
      {
        name: 'Milk',
        category: 'dairy',
        unit: 'L',
        currentStock: 40,
        minStockLevel: 20,
        maxStockLevel: 100,
        unitPrice: 60,
        isPerishable: true,
        shelfLife: 7,
        expiryDate: addDays(new Date(), 5),
        storageLocation: 'Refrigerator 1'
      },
      {
        name: 'Sugar',
        category: 'sweetener',
        unit: 'kg',
        currentStock: 80,
        minStockLevel: 30,
        maxStockLevel: 200,
        unitPrice: 50,
        isPerishable: false,
        storageLocation: 'Pantry A'
      },
      {
        name: 'Eggs',
        category: 'dairy',
        unit: 'dozen',
        currentStock: 30,
        minStockLevel: 15,
        maxStockLevel: 100,
        unitPrice: 70,
        isPerishable: true,
        shelfLife: 14,
        expiryDate: addDays(new Date(), 10),
        storageLocation: 'Refrigerator 2'
      },
      {
        name: 'Butter',
        category: 'dairy',
        unit: 'kg',
        currentStock: 25,
        minStockLevel: 10,
        maxStockLevel: 50,
        unitPrice: 450,
        isPerishable: true,
        shelfLife: 30,
        expiryDate: addDays(new Date(), 20),
        storageLocation: 'Refrigerator 1'
      },
      {
        name: 'Vanilla Extract',
        category: 'flavoring',
        unit: 'ml',
        currentStock: 500,
        minStockLevel: 200,
        maxStockLevel: 1000,
        unitPrice: 2,
        isPerishable: false,
        storageLocation: 'Pantry B'
      },
      {
        name: 'Cocoa Powder',
        category: 'flavoring',
        unit: 'kg',
        currentStock: 15,
        minStockLevel: 5,
        maxStockLevel: 30,
        unitPrice: 350,
        isPerishable: false,
        storageLocation: 'Pantry B'
      },
      {
        name: 'Cream Cheese',
        category: 'dairy',
        unit: 'kg',
        currentStock: 8,
        minStockLevel: 10,
        maxStockLevel: 25,
        unitPrice: 520,
        isPerishable: true,
        shelfLife: 21,
        expiryDate: addDays(new Date(), 3),
        storageLocation: 'Refrigerator 1'
      },
      {
        name: 'Food Coloring Set',
        category: 'decoration',
        unit: 'pieces',
        currentStock: 25,
        minStockLevel: 10,
        maxStockLevel: 50,
        unitPrice: 150,
        isPerishable: false,
        storageLocation: 'Pantry C'
      },
      {
        name: 'Cake Boxes (Medium)',
        category: 'packaging',
        unit: 'pieces',
        currentStock: 100,
        minStockLevel: 50,
        maxStockLevel: 300,
        unitPrice: 25,
        isPerishable: false,
        storageLocation: 'Storage Room'
      }
    ]);

    // 5. Create Recipes
    console.log('📖 Creating recipes...');
    const recipes = await Recipe.insertMany([
      {
        name: 'Vanilla Sponge Cake',
        category: 'Cakes',
        ingredients: [
          { material: rawMaterials[0]._id, quantity: 2, unit: 'kg' },
          { material: rawMaterials[2]._id, quantity: 1.5, unit: 'kg' },
          { material: rawMaterials[3]._id, quantity: 2, unit: 'dozen' },
          { material: rawMaterials[4]._id, quantity: 0.5, unit: 'kg' },
          { material: rawMaterials[1]._id, quantity: 1, unit: 'L' },
          { material: rawMaterials[5]._id, quantity: 50, unit: 'ml' }
        ],
        prepTime: 30,
        cookTime: 45,
        servings: 12,
        difficulty: 'medium',
        costPerUnit: 280,
        sellingPrice: 650,
        isActive: true
      },
      {
        name: 'Chocolate Fudge Cake',
        category: 'Cakes',
        ingredients: [
          { material: rawMaterials[0]._id, quantity: 1.8, unit: 'kg' },
          { material: rawMaterials[6]._id, quantity: 0.4, unit: 'kg' },
          { material: rawMaterials[2]._id, quantity: 1.2, unit: 'kg' },
          { material: rawMaterials[3]._id, quantity: 2, unit: 'dozen' },
          { material: rawMaterials[4]._id, quantity: 0.6, unit: 'kg' },
          { material: rawMaterials[1]._id, quantity: 1.2, unit: 'L' }
        ],
        prepTime: 40,
        cookTime: 50,
        servings: 12,
        difficulty: 'medium',
        costPerUnit: 350,
        sellingPrice: 850,
        isActive: true
      },
      {
        name: 'Chocolate Chip Cookies',
        category: 'Cookies',
        ingredients: [
          { material: rawMaterials[0]._id, quantity: 1, unit: 'kg' },
          { material: rawMaterials[2]._id, quantity: 0.5, unit: 'kg' },
          { material: rawMaterials[4]._id, quantity: 0.4, unit: 'kg' },
          { material: rawMaterials[3]._id, quantity: 0.5, unit: 'dozen' }
        ],
        prepTime: 20,
        cookTime: 15,
        servings: 24,
        difficulty: 'easy',
        costPerUnit: 120,
        sellingPrice: 350,
        isActive: true
      },
      {
        name: 'Cheese Cake',
        category: 'Cakes',
        ingredients: [
          { material: rawMaterials[7]._id, quantity: 1.5, unit: 'kg' },
          { material: rawMaterials[2]._id, quantity: 0.8, unit: 'kg' },
          { material: rawMaterials[3]._id, quantity: 1, unit: 'dozen' },
          { material: rawMaterials[5]._id, quantity: 30, unit: 'ml' }
        ],
        prepTime: 45,
        cookTime: 60,
        servings: 10,
        difficulty: 'hard',
        costPerUnit: 480,
        sellingPrice: 1200,
        isActive: true
      }
    ]);

    // 6. Create Products
    console.log('🎂 Creating products...');
    const products = await Product.insertMany([
      {
        name: 'Classic Vanilla Cake',
        slug: 'classic-vanilla-cake',
        description: 'Moist vanilla sponge with cream frosting',
        category: categories[0]._id,
        recipe: recipes[0]._id,
        price: 650,
        compareAtPrice: 750,
        costPrice: 280,
        images: ['/images/vanilla-cake.jpg'],
        stock: 15,
        lowStockThreshold: 5,
        sku: 'CAKE-VAN-001',
        tags: ['bestseller', 'birthday'],
        isActive: true,
        isFeatured: true,
        isCustomizable: true,
        customizableOptions: {
          flavors: ['Vanilla', 'Strawberry', 'Butterscotch'],
          sizes: [
            { name: '500g', price: 650 },
            { name: '1kg', price: 1200 },
            { name: '2kg', price: 2200 }
          ]
        },
        rating: 4.7,
        reviewCount: 156,
        shelfLife: 48,
        productionTime: 75,
        weight: 1000
      },
      {
        name: 'Chocolate Fudge Cake',
        slug: 'chocolate-fudge-cake',
        description: 'Rich chocolate cake with fudge frosting',
        category: categories[0]._id,
        recipe: recipes[1]._id,
        price: 850,
        compareAtPrice: 950,
        costPrice: 350,
        images: ['/images/chocolate-cake.jpg'],
        stock: 12,
        lowStockThreshold: 5,
        sku: 'CAKE-CHO-001',
        tags: ['bestseller', 'chocolate'],
        isActive: true,
        isFeatured: true,
        isCustomizable: true,
        customizableOptions: {
          sizes: [
            { name: '500g', price: 850 },
            { name: '1kg', price: 1500 },
            { name: '2kg', price: 2800 }
          ],
          addons: [
            { name: 'Extra Chocolate Chips', price: 100 },
            { name: 'Chocolate Ganache', price: 150 }
          ]
        },
        rating: 4.9,
        reviewCount: 203,
        shelfLife: 48,
        productionTime: 90,
        weight: 1000
      },
      {
        name: 'Premium Cheese Cake',
        slug: 'premium-cheese-cake',
        description: 'Creamy New York style cheesecake',
        category: categories[0]._id,
        recipe: recipes[3]._id,
        price: 1200,
        compareAtPrice: 1400,
        costPrice: 480,
        images: ['/images/cheesecake.jpg'],
        stock: 8,
        lowStockThreshold: 3,
        sku: 'CAKE-CHE-001',
        tags: ['premium', 'cheese'],
        isActive: true,
        isFeatured: true,
        rating: 4.8,
        reviewCount: 89,
        shelfLife: 72,
        productionTime: 105,
        weight: 1000
      },
      {
        name: 'Chocolate Chip Cookies (Pack of 6)',
        slug: 'chocolate-chip-cookies',
        description: 'Crispy chocolate chip cookies',
        category: categories[2]._id,
        recipe: recipes[2]._id,
        price: 180,
        costPrice: 60,
        images: ['/images/cookies.jpg'],
        stock: 45,
        lowStockThreshold: 15,
        sku: 'COOK-CHO-001',
        tags: ['snack', 'cookies'],
        isActive: true,
        rating: 4.5,
        reviewCount: 234,
        shelfLife: 168,
        productionTime: 35,
        weight: 200
      },
      {
        name: 'Butter Croissant',
        slug: 'butter-croissant',
        description: 'Flaky butter croissant',
        category: categories[1]._id,
        price: 80,
        costPrice: 25,
        images: ['/images/croissant.jpg'],
        stock: 30,
        lowStockThreshold: 10,
        sku: 'PAST-CRO-001',
        tags: ['breakfast', 'pastry'],
        isActive: true,
        rating: 4.6,
        reviewCount: 167,
        shelfLife: 24,
        productionTime: 120,
        weight: 80
      },
      {
        name: 'Red Velvet Cake',
        slug: 'red-velvet-cake',
        description: 'Classic red velvet with cream cheese frosting',
        category: categories[0]._id,
        price: 950,
        costPrice: 380,
        images: ['/images/red-velvet.jpg'],
        stock: 10,
        lowStockThreshold: 4,
        sku: 'CAKE-RED-001',
        tags: ['bestseller', 'red-velvet'],
        isActive: true,
        isFeatured: true,
        isCustomizable: true,
        customizableOptions: {
          sizes: [
            { name: '500g', price: 950 },
            { name: '1kg', price: 1700 }
          ]
        },
        rating: 4.8,
        reviewCount: 142,
        shelfLife: 48,
        productionTime: 85
      }
    ]);

    // 7. Create Customers
    console.log('👤 Creating customers...');
    const customers = await User.insertMany([
      {
        name: 'Arjun Mehta',
        email: 'arjun.mehta@email.com',
        phone: '+91-9988776655',
        password: 'password123',
        role: 'customer',
        dateOfBirth: new Date('1990-05-15'),
        loyaltyPoints: 250,
        totalOrders: 8,
        totalSpent: 6500,
        addresses: [{
          type: 'home',
          street: '123 MG Road',
          city: 'Bangalore',
          state: 'Karnataka',
          zipCode: '560001',
          isDefault: true
        }]
      },
      {
        name: 'Priya Nair',
        email: 'priya.nair@email.com',
        phone: '+91-9988776656',
        password: 'password123',
        role: 'customer',
        dateOfBirth: new Date('1988-08-22'),
        anniversary: new Date('2015-12-10'),
        loyaltyPoints: 180,
        totalOrders: 5,
        totalSpent: 4200,
        addresses: [{
          type: 'home',
          street: '456 Koramangala',
          city: 'Bangalore',
          state: 'Karnataka',
          zipCode: '560034',
          isDefault: true
        }]
      },
      {
        name: 'Vikram Singh',
        email: 'vikram.singh@email.com',
        phone: '+91-9988776657',
        password: 'password123',
        role: 'customer',
        loyaltyPoints: 320,
        totalOrders: 12,
        totalSpent: 9800
      },
      {
        name: 'Anita Desai',
        email: 'anita.desai@email.com',
        phone: '+91-9988776658',
        password: 'password123',
        role: 'customer',
        dateOfBirth: new Date('1995-03-10'),
        loyaltyPoints: 95,
        totalOrders: 3,
        totalSpent: 2100
      }
    ]);

    // 8. Create Orders (mix of sources)
    console.log('📦 Creating orders...');
    const orderSources = ['platform', 'swiggy', 'zomato', 'in-store', 'phone', 'whatsapp'];
    const orderStatuses = ['delivered', 'completed', 'in-production', 'ready', 'pending', 'cancelled'];
    
    const orders = [];
    for (let i = 0; i < 50; i++) {
      const daysAgo = Math.floor(Math.random() * 30);
      const customer = customers[Math.floor(Math.random() * customers.length)];
      const product = products[Math.floor(Math.random() * products.length)];
      const quantity = Math.floor(Math.random() * 3) + 1;
      const source = orderSources[Math.floor(Math.random() * orderSources.length)];
      
      const subtotal = product.price * quantity;
      const tax = subtotal * 0.05;
      const deliveryFee = source !== 'in-store' ? 50 : 0;
      const discount = Math.random() > 0.7 ? 100 : 0;
      const total = subtotal + tax + deliveryFee - discount;
      
      orders.push({
        customer: customer._id,
        source,
        items: [{
          product: product._id,
          name: product.name,
          quantity,
          price: product.price
        }],
        subtotal,
        tax,
        deliveryFee,
        discount,
        total,
        status: i < 5 ? 'pending' : orderStatuses[Math.floor(Math.random() * orderStatuses.length)],
        paymentStatus: i < 3 ? 'pending' : 'paid',
        paymentMethod: ['cash', 'card', 'upi', 'online'][Math.floor(Math.random() * 4)],
        orderType: source === 'in-store' ? 'pickup' : 'delivery',
        deliveryAddress: source !== 'in-store' ? {
          street: '123 Sample Street',
          city: 'Bangalore',
          state: 'Karnataka',
          zipCode: '560001'
        } : undefined,
        createdAt: subDays(new Date(), daysAgo),
        isCustomCake: Math.random() > 0.9
      });
    }
    await Order.insertMany(orders);

    // 9. Create Coupons
    console.log('🎟️  Creating coupons...');
    await Coupon.insertMany([
      {
        code: 'WELCOME10',
        description: 'Welcome offer - 10% off on first order',
        discountType: 'percentage',
        discountValue: 10,
        minOrderValue: 500,
        maxDiscountAmount: 200,
        validFrom: subDays(new Date(), 30),
        validUntil: addDays(new Date(), 60),
        usageCount: 45,
        isActive: true,
        userRestrictions: { firstOrderOnly: true },
        createdBy: adminStaff._id
      },
      {
        code: 'BIRTHDAY50',
        description: 'Birthday special - ₹50 off',
        discountType: 'fixed',
        discountValue: 50,
        minOrderValue: 300,
        validFrom: subDays(new Date(), 10),
        validUntil: addDays(new Date(), 90),
        usageLimit: 100,
        usageCount: 23,
        isActive: true,
        createdBy: adminStaff._id
      },
      {
        code: 'MEGA20',
        description: 'Mega sale - 20% off on orders above ₹1000',
        discountType: 'percentage',
        discountValue: 20,
        minOrderValue: 1000,
        maxDiscountAmount: 500,
        validFrom: new Date(),
        validUntil: addDays(new Date(), 30),
        usageCount: 67,
        isActive: true,
        createdBy: adminStaff._id
      }
    ]);

    // 10. Create Gift Cards
    console.log('🎁 Creating gift cards...');
    await GiftCard.insertMany([
      {
        code: 'GC2024001',
        initialValue: 1000,
        currentValue: 1000,
        purchasedBy: {
          name: 'Rohit Sharma',
          email: 'rohit@email.com',
          phone: '+91-9876543220'
        },
        recipientEmail: 'recipient1@email.com',
        purchaseDate: subDays(new Date(), 5),
        expiryDate: addDays(new Date(), 365),
        status: 'active'
      },
      {
        code: 'GC2024002',
        initialValue: 500,
        currentValue: 250,
        purchasedBy: {
          name: 'Neha Kapoor',
          email: 'neha@email.com',
          phone: '+91-9876543221'
        },
        purchaseDate: subDays(new Date(), 15),
        expiryDate: addDays(new Date(), 350),
        status: 'partially-used',
        transactions: [{
          date: subDays(new Date(), 10),
          amount: 250,
          orderId: orders[0]._id
        }]
      }
    ]);

    // 11. Create Campaigns
    console.log('📧 Creating campaigns...');
    await Campaign.insertMany([
      {
        name: 'Birthday Wishes Campaign - May 2026',
        type: 'whatsapp',
        status: 'sent',
        eventTrigger: 'birthday',
        message: '🎂 Happy Birthday! Enjoy 15% off on your special day. Use code BDAY15',
        targetAudience: {
          type: 'segment',
          segment: 'birthday-customers'
        },
        sentDate: subDays(new Date(), 2),
        statistics: {
          sent: 45,
          delivered: 43,
          failed: 2
        },
        couponCode: 'BDAY15',
        createdBy: adminStaff._id
      },
      {
        name: 'Weekend Special Offer',
        type: 'sms',
        status: 'scheduled',
        message: 'Weekend treat! Get 20% off on all cakes this Saturday & Sunday. Order now!',
        targetAudience: {
          type: 'all'
        },
        scheduledDate: addDays(new Date(), 3),
        createdBy: adminStaff._id
      },
      {
        name: 'New Product Launch - Red Velvet',
        type: 'email',
        status: 'draft',
        subject: 'Introducing our Premium Red Velvet Cake!',
        message: 'We are excited to launch our new Premium Red Velvet Cake. Try it today!',
        targetAudience: {
          type: 'segment',
          segment: 'loyal-customers'
        },
        createdBy: adminStaff._id
      }
    ]);

    // 12. Create Production Records
    console.log('🏭 Creating production records...');
    await Production.insertMany([
      {
        recipe: recipes[0]._id,
        quantity: 10,
        scheduledDate: new Date(),
        status: 'scheduled',
        assignedTo: staff[0]._id,
        cost: {
          materialCost: 2800,
          laborCost: 500,
          overheadCost: 200,
          totalCost: 3500
        }
      },
      {
        recipe: recipes[1]._id,
        quantity: 8,
        scheduledDate: addDays(new Date(), 1),
        status: 'scheduled',
        assignedTo: staff[3]._id,
        cost: {
          materialCost: 2800,
          laborCost: 600,
          totalCost: 3400
        }
      },
      {
        recipe: recipes[0]._id,
        quantity: 12,
        scheduledDate: subDays(new Date(), 1),
        startTime: subDays(new Date(), 1),
        endTime: subDays(new Date(), 1),
        status: 'completed',
        assignedTo: staff[0]._id,
        actualQuantityProduced: 11,
        wastage: 1,
        wastageReason: 'Burnt during baking',
        qualityCheck: {
          passed: true,
          checkedBy: adminStaff._id,
          checkDate: subDays(new Date(), 1)
        },
        cost: {
          materialCost: 3360,
          laborCost: 600,
          totalCost: 3960
        }
      }
    ]);

    console.log('✅ Seed data created successfully!');
    console.log('\n📊 Summary:');
    console.log(`- ${await Staff.countDocuments()} Staff members`);
    console.log(`- ${await Attendance.countDocuments()} Attendance records`);
    console.log(`- ${await Category.countDocuments()} Categories`);
    console.log(`- ${await RawMaterial.countDocuments()} Raw materials`);
    console.log(`- ${await Recipe.countDocuments()} Recipes`);
    console.log(`- ${await Product.countDocuments()} Products`);
    console.log(`- ${await User.countDocuments()} Customers`);
    console.log(`- ${await Order.countDocuments()} Orders`);
    console.log(`- ${await Coupon.countDocuments()} Coupons`);
    console.log(`- ${await GiftCard.countDocuments()} Gift cards`);
    console.log(`- ${await Campaign.countDocuments()} Campaigns`);
    console.log(`- ${await Production.countDocuments()} Production records`);
    
    console.log('\n🔑 Admin Credentials:');
    console.log('Email: admin@cakeanatomy.com');
    console.log('Employee ID: CA001');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedData();

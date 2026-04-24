# CakeAnatomy Backend API

Complete backend system for the CakeAnatomy dashboard with multi-channel order management, inventory tracking, staff management, and analytics.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB (v6+)

### Installation

```bash
# Install dependencies
npm install

# Create .env file (already created)
# Edit .env with your MongoDB URI if needed

# Seed the database with sample data
npm run seed

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📊 Database Models

### Core Models
- **User** - Customer data with loyalty points
- **Staff** - Employee information and roles
- **Product** - Product catalog
- **Category** - Product categories
- **Order** - Orders with multi-source tracking (Platform, Swiggy, Zomato, In-store, Phone, WhatsApp)

### Inventory Management
- **RawMaterial** - Raw materials with expiry tracking
- **Recipe** - Recipes with ingredient lists
- **Production** - Production scheduling and tracking

### Marketing & Promotions
- **Coupon** - Discount coupons
- **GiftCard** - Gift card management
- **Campaign** - Email/SMS/WhatsApp campaigns

### Operations
- **Attendance** - Staff attendance tracking

## 🔌 API Endpoints

### Analytics
- `GET /api/analytics/dashboard-overview` - Dashboard metrics
- `GET /api/analytics/sales-by-source` - Sales breakdown by source
- `GET /api/analytics/product-performance` - Top products
- `GET /api/analytics/inventory-status` - Inventory overview
- `GET /api/analytics/staff-performance` - Staff metrics
- `GET /api/analytics/financial-report` - Financial summary

### Orders
- `GET /api/orders` - All orders (with pagination)
- `GET /api/orders/source/:source` - Orders by source (swiggy, zomato, etc.)
- `GET /api/orders/cancelled` - Cancelled orders
- `GET /api/orders/custom-cakes` - Custom cake orders
- `GET /api/orders/:id` - Order details
- `POST /api/orders` - Create order
- `PATCH /api/orders/:id/status` - Update order status

### Staff
- `GET /api/staff` - All staff
- `GET /api/staff/:id` - Staff details
- `POST /api/staff` - Create staff
- `PUT /api/staff/:id` - Update staff
- `GET /api/staff/:id/attendance` - Staff attendance
- `POST /api/staff/:id/clock-in` - Clock in
- `POST /api/staff/:id/clock-out` - Clock out
- `POST /api/staff/:id/leave` - Mark leave

### Inventory
- `GET /api/inventory/materials` - All raw materials
- `GET /api/inventory/materials/low-stock` - Low stock items
- `GET /api/inventory/materials/expiring` - Expiring items
- `GET /api/inventory/recipes` - All recipes
- `POST /api/inventory/materials` - Add material
- `POST /api/inventory/recipes` - Add recipe

### Products
- `GET /api/products` - All products
- `GET /api/products/featured` - Featured products
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product

### Coupons & Gift Cards
- `GET /api/coupons/coupons` - All coupons
- `POST /api/coupons/coupons` - Create coupon
- `POST /api/coupons/coupons/validate` - Validate coupon
- `GET /api/coupons/gift-cards` - All gift cards
- `POST /api/coupons/gift-cards` - Create gift card

### Campaigns
- `GET /api/campaigns` - All campaigns
- `POST /api/campaigns` - Create campaign
- `POST /api/campaigns/:id/send` - Send campaign
- `POST /api/campaigns/:id/schedule` - Schedule campaign

### Production
- `GET /api/production` - All production records
- `GET /api/production/today` - Today's production
- `POST /api/production` - Schedule production
- `POST /api/production/:id/start` - Start production
- `POST /api/production/:id/complete` - Complete production

### Users
- `GET /api/users` - All customers
- `GET /api/users/:id/orders` - Customer orders
- `POST /api/users/:id/loyalty-points` - Add loyalty points

## 📦 Seed Data

The seed script creates:
- 5 Staff members (1 admin, 4 employees)
- 30 days of attendance records
- 5 Product categories
- 10 Raw materials with realistic stock levels
- 4 Recipes with ingredients
- 6 Products (cakes, cookies, pastries)
- 4 Customers
- 50 Orders across different sources
- 3 Active coupons
- 2 Gift cards
- 3 Marketing campaigns
- 3 Production records

### Seed Command
```bash
npm run seed
```

## 🔐 Security Features

- Helmet.js for HTTP headers
- CORS protection
- Rate limiting (100 requests / 15 min)
- Password hashing with bcrypt
- Input validation

## 🌐 Environment Variables

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cakeanatomy
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
COOKIE_EXPIRE=7
FRONTEND_URL=http://localhost:3000
```

## 📝 Notes

- All routes return JSON responses
- Timestamps are automatically added to all documents
- Soft delete implemented for Staff and Products (isActive flag)
- Order numbers auto-generated with source prefix
- Inventory status auto-calculated based on stock levels and expiry dates
- Production batch numbers auto-generated

## 🔄 Development Workflow

1. Start MongoDB
2. Run `npm run seed` to populate database
3. Run `npm run dev` to start server
4. Access API at `http://localhost:5000`
5. Check health at `http://localhost:5000/health`

## 📊 Dashboard Integration

Frontend dashboard connects to these endpoints for:
- Real-time order tracking
- Inventory alerts
- Staff management
- Sales analytics
- Campaign management
- Production scheduling

## 🛠️ Tech Stack

- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Language**: TypeScript
- **Security**: Helmet, CORS, bcryptjs
- **Utilities**: date-fns for date operations

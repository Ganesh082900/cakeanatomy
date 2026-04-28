# CakeAnatomy Backend API

Complete backend system for the CakeAnatomy e-commerce platform built with Node.js, Express, TypeScript, and MongoDB.

## Features

- ✅ User Authentication & Authorization (JWT)
- ✅ Product Management (CRUD operations)
- ✅ Category Management
- ✅ Shopping Cart System
- ✅ Order Processing & Management
- ✅ Address Management
- ✅ Admin Dashboard APIs
- ✅ Review & Rating System
- ✅ Security (Helmet, Rate Limiting, CORS)
- ✅ Input Validation
- ✅ Error Handling
- ✅ Database Seeding

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Express Validator
- **Security**: Helmet, CORS, Rate Limiting
- **Password Hashing**: bcryptjs

## Quick Start

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Environment Setup

Create a `.env` file in the backend directory:

```env
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/cakeanatomy

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d
JWT_COOKIE_EXPIRES_IN=7

# Frontend
FRONTEND_URL=http://localhost:3000
```

### 3. Start MongoDB

Make sure MongoDB is running locally or use MongoDB Atlas.

```bash
# For local MongoDB
mongod
```

### 4. Seed the Database

Populate the database with sample data:

```bash
npm run seed
# or
ts-node src/utils/seeder.ts
```

This will create:
- Admin user (email: admin@cakeanatomy.com, password: admin123)
- 4 Categories (Cakes, Pastries, Confections, Bakery)
- 10 Sample products

### 5. Start Development Server

```bash
npm run dev
```

The server will start on `http://localhost:5000`

### 6. Test the API

```bash
# Health check
curl http://localhost:5000/health

# Get all products
curl http://localhost:5000/api/products

# Get all categories
curl http://localhost:5000/api/categories
```

## API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/register` | Register new user | Public |
| POST | `/login` | Login user | Public |
| GET | `/me` | Get current user | Private |
| PUT | `/updatedetails` | Update user details | Private |
| PUT | `/updatepassword` | Change password | Private |
| GET | `/logout` | Logout user | Private |
| POST | `/addresses` | Add new address | Private |
| PUT | `/addresses/:id` | Update address | Private |
| DELETE | `/addresses/:id` | Delete address | Private |

### Products (`/api/products`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/` | Get all products (with filters) | Public |
| GET | `/featured` | Get featured products | Public |
| GET | `/:id` | Get product by ID | Public |
| GET | `/slug/:slug` | Get product by slug | Public |
| POST | `/` | Create product | Admin |
| PUT | `/:id` | Update product | Admin |
| DELETE | `/:id` | Delete product | Admin |

**Query Parameters for GET /products:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 12)
- `category` - Filter by category ID
- `type` - Filter by type (cake, pastry, confection, bakery)
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `search` - Search by name/description
- `featured` - Filter featured products
- `sort` - Sort by (price-asc, price-desc, name, rating)

### Categories (`/api/categories`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/` | Get all categories | Public |
| GET | `/:id` | Get category by ID | Public |
| GET | `/slug/:slug` | Get category by slug | Public |
| POST | `/` | Create category | Admin |
| PUT | `/:id` | Update category | Admin |
| DELETE | `/:id` | Delete category | Admin |

### Cart (`/api/cart`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/` | Get user's cart | Private |
| GET | `/session/:sessionId` | Get cart by session | Public |
| POST | `/items` | Add item to cart | Private |
| PUT | `/items/:productId` | Update cart item | Private |
| DELETE | `/items/:productId` | Remove from cart | Private |
| DELETE | `/` | Clear cart | Private |
| POST | `/coupon` | Apply coupon | Private |
| POST | `/merge` | Merge guest cart | Private |

### Orders (`/api/orders`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/` | Create new order | Private |
| GET | `/` | Get user's orders | Private |
| GET | `/:id` | Get order by ID | Private |
| PUT | `/:id/pay` | Mark order as paid | Private |
| PUT | `/:id/cancel` | Cancel order | Private |
| GET | `/admin/all` | Get all orders | Admin |
| PUT | `/:id/deliver` | Mark as delivered | Admin |
| PUT | `/:id/status` | Update order status | Admin |

## Data Models

### User
- Personal info (name, email, password)
- Multiple addresses
- Role (customer/admin)
- Email verification status

### Product
- Basic info (name, description, images)
- Pricing (price, compare at price, cost)
- Categorization (category, type, tags)
- Stock management
- Variants support
- Nutritional information
- Allergens & ingredients
- Ratings & reviews

### Category
- Hierarchical structure
- Slug-based URLs
- Active/inactive status
- Custom ordering

### Cart
- User or session-based
- Multiple items with variants
- Auto-calculated totals (subtotal, tax, discount)
- Coupon support
- Auto-expiry

### Order
- Complete order information
- Shipping & billing addresses
- Payment tracking
- Order status workflow
- Tracking number support
- Cancellation handling

## Scripts

```bash
npm run dev          # Start development server with hot reload
npm run build        # Compile TypeScript to JavaScript
npm start            # Start production server
npm run seed         # Seed database with sample data
npm run lint         # Run ESLint
```

## Error Handling

The API uses consistent error responses:

```json
{
  "success": false,
  "status": "fail",
  "message": "Error message here"
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Security Features

- **Helmet**: Sets security HTTP headers
- **CORS**: Configured for frontend origin
- **Rate Limiting**: 100 requests per 15 minutes
- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: bcrypt with salt rounds
- **Input Validation**: Express Validator
- **Cookie Security**: HTTP-only, secure cookies in production

## Development

### Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   │   └── database.ts  # MongoDB connection
│   ├── controllers/     # Request handlers
│   │   ├── authController.ts
│   │   ├── productController.ts
│   │   ├── categoryController.ts
│   │   ├── cartController.ts
│   │   └── orderController.ts
│   ├── middleware/      # Express middleware
│   │   ├── auth.ts
│   │   ├── errorHandler.ts
│   │   └── validate.ts
│   ├── models/          # Mongoose models
│   │   ├── User.ts
│   │   ├── Product.ts
│   │   ├── Category.ts
│   │   ├── Cart.ts
│   │   ├── Order.ts
│   │   └── Review.ts
│   ├── routes/          # API routes
│   │   ├── authRoutes.ts
│   │   ├── productRoutes.ts
│   │   ├── categoryRoutes.ts
│   │   ├── cartRoutes.ts
│   │   └── orderRoutes.ts
│   ├── utils/           # Utility functions
│   │   ├── AppError.ts
│   │   ├── asyncHandler.ts
│   │   ├── jwt.ts
│   │   └── seeder.ts
│   └── server.ts        # App entry point
├── .env.example         # Environment variables template
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## Production Deployment

1. Set `NODE_ENV=production`
2. Use strong `JWT_SECRET`
3. Use MongoDB Atlas or managed database
4. Set up proper CORS origins
5. Enable HTTPS
6. Configure environment variables
7. Set up process manager (PM2)

```bash
npm run build
pm2 start dist/server.js --name cakeanatomy-api
```

## License

MIT

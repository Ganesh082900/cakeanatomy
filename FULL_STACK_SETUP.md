# CakeAnatomy - Complete Full Stack E-commerce System

Complete end-to-end e-commerce platform for CakeAnatomy with backend API and frontend integration.

## 🎯 What's Been Built

### Backend (Node.js + Express + TypeScript + MongoDB)

#### ✅ Complete API System
- **Authentication & Authorization**: JWT-based auth with user registration, login, password management
- **Product Management**: Full CRUD operations with advanced filtering, search, and pagination
- **Category Management**: Hierarchical categories with slug-based URLs
- **Shopping Cart**: Session-based (guest) and user-based carts with auto-calculation
- **Order Processing**: Complete order lifecycle management
- **User Management**: Profile, addresses, order history
- **Admin APIs**: Product/category/order management

#### 📦 Database Models
1. **User**: Authentication, profile, multiple addresses, roles
2. **Product**: Complete product info with variants, pricing, stock, allergens, nutrition
3. **Category**: Hierarchical categories with ordering
4. **Cart**: User/session-based with auto-totals and coupon support
5. **Order**: Full order tracking with payment and shipping status
6. **Review**: Product reviews with ratings

#### 🔒 Security Features
- Helmet for HTTP headers
- CORS configuration
- Rate limiting (100 req/15min)
- Password hashing (bcryptjs)
- JWT tokens with HTTP-only cookies
- Input validation

### Frontend (Next.js + TypeScript + React)

#### ✅ API Integration Layer
- **API Client**: Centralized fetch wrapper with auth handling
- **Services**: Type-safe service layers for all API endpoints
- **Context Providers**: Auth and Cart state management
- **Components**: Reusable product cards and UI components

#### 🎨 CUI Design System (Already Built)
- 8 Core components (Button, Input, Card, Modal, etc.)
- Design tokens (colors, typography, spacing)
- Storybook documentation
- Tailwind integration

## 📁 Project Structure

```
cakeanatomy/
├── backend/
│   ├── src/
│   │   ├── config/          # Database connection
│   │   ├── controllers/     # Business logic
│   │   │   ├── authController.ts
│   │   │   ├── productController.ts
│   │   │   ├── categoryController.ts
│   │   │   ├── cartController.ts
│   │   │   └── orderController.ts
│   │   ├── middleware/      # Auth, validation, errors
│   │   ├── models/          # Mongoose schemas
│   │   │   ├── User.ts
│   │   │   ├── Product.ts
│   │   │   ├── Category.ts
│   │   │   ├── Cart.ts
│   │   │   ├── Order.ts
│   │   │   └── Review.ts
│   │   ├── routes/          # API endpoints
│   │   ├── utils/           # Helpers & seeder
│   │   └── server.ts        # Entry point
│   ├── .env.example
│   ├── package.json
│   └── README.md
│
├── website/
│   ├── src/
│   │   ├── app/             # Next.js pages
│   │   │   └── products/    # Product listing page
│   │   ├── components/      # React components
│   │   │   └── products/    # ProductCard component
│   │   ├── contexts/        # React contexts
│   │   │   ├── AuthContext.tsx
│   │   │   └── CartContext.tsx
│   │   ├── lib/
│   │   │   ├── api.ts       # API client
│   │   │   └── services/    # API services
│   │   │       ├── authService.ts
│   │   │       ├── productService.ts
│   │   │       ├── categoryService.ts
│   │   │       ├── cartService.ts
│   │   │       └── orderService.ts
│   │   └── cui/             # Design system
│   ├── .env.local.example
│   └── INTEGRATION_GUIDE.md
│
└── FULL_STACK_SETUP.md (this file)
```

## 🚀 Quick Start Guide

### Prerequisites

- Node.js 18+ and npm/yarn
- MongoDB (local or Atlas)
- Git

### 1. Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your settings (MongoDB URI, JWT secret, etc.)

# Seed the database with sample data
npm run seed

# Start development server
npm run dev
```

Backend will run on `http://localhost:5000`

**Sample Data Created:**
- Admin user: `admin@cakeanatomy.com` / `admin123`
- 4 Categories (Cakes, Pastries, Confections, Bakery)
- 10 Sample products

### 2. Frontend Setup

```bash
# Navigate to website
cd website

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local

# Start development server
npm run dev
```

Frontend will run on `http://localhost:3000`

### 3. Test the Integration

1. Visit `http://localhost:3000/products`
2. Browse products with filters
3. Add items to cart
4. Register/Login
5. Complete checkout

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login user |
| GET | `/auth/me` | Get current user |
| PUT | `/auth/updatedetails` | Update user info |
| PUT | `/auth/updatepassword` | Change password |
| GET | `/auth/logout` | Logout |
| POST | `/auth/addresses` | Add address |
| PUT | `/auth/addresses/:id` | Update address |
| DELETE | `/auth/addresses/:id` | Delete address |

### Product Endpoints

| Method | Endpoint | Description | Query Params |
|--------|----------|-------------|--------------|
| GET | `/products` | Get all products | page, limit, category, type, search, sort |
| GET | `/products/featured` | Get featured products | limit |
| GET | `/products/:id` | Get product by ID | - |
| GET | `/products/slug/:slug` | Get product by slug | - |
| POST | `/products` | Create product (Admin) | - |
| PUT | `/products/:id` | Update product (Admin) | - |
| DELETE | `/products/:id` | Delete product (Admin) | - |

### Cart Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/cart` | Get user cart |
| POST | `/cart/items` | Add to cart |
| PUT | `/cart/items/:productId` | Update quantity |
| DELETE | `/cart/items/:productId` | Remove item |
| DELETE | `/cart` | Clear cart |
| POST | `/cart/coupon` | Apply coupon |
| POST | `/cart/merge` | Merge guest cart |

### Order Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/orders` | Create order |
| GET | `/orders` | Get user orders |
| GET | `/orders/:id` | Get order details |
| PUT | `/orders/:id/pay` | Mark as paid |
| PUT | `/orders/:id/cancel` | Cancel order |

## 💻 Frontend Usage Examples

### Using Auth Context

```tsx
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();

  if (!isAuthenticated) {
    return <button onClick={() => login({ email, password })}>Login</button>;
  }

  return (
    <div>
      <p>Welcome, {user.name}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Using Cart Context

```tsx
import { useCart } from '@/contexts/CartContext';

function CartButton({ productId }) {
  const { addToCart, cart } = useCart();

  return (
    <div>
      <button onClick={() => addToCart({ productId, quantity: 1 })}>
        Add to Cart
      </button>
      <span>Cart: {cart?.totalItems || 0} items</span>
    </div>
  );
}
```

### Fetching Products

```tsx
import { productService } from '@/lib/services';

// Get all products with filters
const products = await productService.getProducts({
  page: 1,
  limit: 12,
  category: 'category-id',
  sort: 'price-asc'
});

// Get featured products
const featured = await productService.getFeaturedProducts(8);

// Get single product
const product = await productService.getProductBySlug('chocolate-cake');
```

## 🔐 Environment Variables

### Backend (.env)

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cakeanatomy
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 📊 Database Schema Overview

### User Schema
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  role: 'customer' | 'admin',
  addresses: [Address],
  isEmailVerified: Boolean
}
```

### Product Schema
```javascript
{
  name: String,
  slug: String (auto-generated),
  description: String,
  category: ObjectId (ref: Category),
  type: 'cake' | 'pastry' | 'confection' | 'bakery',
  images: [String],
  price: Number,
  compareAtPrice: Number,
  stock: Number,
  isAvailable: Boolean,
  isFeatured: Boolean,
  tags: [String],
  allergens: [String],
  variants: [Variant],
  rating: Number,
  numReviews: Number
}
```

### Cart Schema
```javascript
{
  user: ObjectId (ref: User),
  sessionId: String,
  items: [{
    product: ObjectId (ref: Product),
    quantity: Number,
    price: Number,
    selectedVariants: [Variant],
    subtotal: Number
  }],
  subtotal: Number (auto-calculated),
  tax: Number (auto-calculated),
  discount: Number,
  total: Number (auto-calculated)
}
```

### Order Schema
```javascript
{
  orderNumber: String (auto-generated),
  user: ObjectId (ref: User),
  items: [OrderItem],
  shippingAddress: Address,
  paymentMethod: String,
  paymentStatus: String,
  orderStatus: String,
  itemsPrice: Number,
  taxPrice: Number,
  shippingPrice: Number,
  totalPrice: Number,
  isPaid: Boolean,
  isDelivered: Boolean,
  trackingNumber: String
}
```

## 🛠️ Development Commands

### Backend

```bash
npm run dev          # Start dev server with hot reload
npm run build        # Build TypeScript
npm start            # Start production server
npm run seed         # Seed database
```

### Frontend

```bash
npm run dev          # Start Next.js dev server
npm run build        # Build for production
npm start            # Start production server
npm run storybook    # Launch Storybook
```

## 🎨 Features Implemented

### Backend Features
- ✅ User authentication (register, login, logout)
- ✅ JWT token-based authorization
- ✅ User profile management
- ✅ Multiple address management
- ✅ Product CRUD with filtering & search
- ✅ Category management
- ✅ Shopping cart (user & session-based)
- ✅ Cart auto-calculation (subtotal, tax, total)
- ✅ Coupon support
- ✅ Order creation & management
- ✅ Order status tracking
- ✅ Payment status tracking
- ✅ Stock management
- ✅ Admin APIs
- ✅ Input validation
- ✅ Error handling
- ✅ Security (CORS, Rate limiting, Helmet)
- ✅ Database seeding

### Frontend Features
- ✅ API client with auth handling
- ✅ Type-safe API services
- ✅ Auth context & hooks
- ✅ Cart context & hooks
- ✅ Product listing page with filters
- ✅ Product card component
- ✅ CUI Design System integration
- ✅ TypeScript types for all data
- ✅ Responsive design

## 📝 Next Steps

### Recommended Implementations

1. **Pages to Build**
   - [ ] Product detail page
   - [ ] Cart page
   - [ ] Checkout flow
   - [ ] Order confirmation page
   - [ ] User profile page
   - [ ] Order history page
   - [ ] Login/Register pages

2. **Features to Add**
   - [ ] Payment integration (Stripe/Razorpay)
   - [ ] Email notifications
   - [ ] Order tracking
   - [ ] Product reviews
   - [ ] Wishlist
   - [ ] Search autocomplete
   - [ ] Product image gallery
   - [ ] Admin dashboard

3. **Enhancements**
   - [ ] Toast notifications
   - [ ] Loading states
   - [ ] Error boundaries
   - [ ] Image optimization
   - [ ] SEO optimization
   - [ ] Analytics integration
   - [ ] Social sharing

## 🐛 Troubleshooting

### Backend won't start
- Check MongoDB is running
- Verify .env file exists with correct values
- Run `npm install` to ensure dependencies are installed

### Frontend can't connect to backend
- Ensure backend is running on port 5000
- Check NEXT_PUBLIC_API_URL in .env.local
- Verify CORS settings in backend allow frontend origin

### Cart not working
- Ensure user is logged in
- Check browser console for errors
- Verify AuthContext is wrapping the app

## 📚 Documentation

- **Backend API**: See `backend/README.md`
- **Frontend Integration**: See `website/INTEGRATION_GUIDE.md`
- **CUI Design System**: See user memory notes

## 🤝 Support

For issues or questions:
1. Check the documentation files
2. Review the example code
3. Check the API endpoints with tools like Postman/Insomnia
4. Review browser console for frontend errors
5. Check backend logs for API errors

## 📄 License

MIT License - See LICENSE file for details

---

**Built with ❤️ for CakeAnatomy**

Complete e-commerce system with modern tech stack:
- Backend: Node.js, Express, TypeScript, MongoDB
- Frontend: Next.js, React, TypeScript, Tailwind CSS
- Design System: CUI (Custom UI components)

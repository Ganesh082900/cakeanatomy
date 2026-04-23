# 🎂 CakeAnatomy - Full-Stack E-Commerce Platform

A complete production-ready e-commerce platform for a bakery/cake shop, built with modern technologies and best practices.

## 🚀 Features

### Customer Features
- ✅ Browse products with advanced filtering (category, type, price, rating)
- ✅ Search products by name, description, tags
- ✅ View detailed product information with images, variants, nutritional info
- ✅ User authentication (register, login, logout)
- ✅ Shopping cart (add, update, remove items)
- ✅ Guest checkout support
- ✅ Multi-step checkout process
- ✅ Multiple payment methods (UPI, Credit/Debit Card, Cash on Delivery)
- ✅ Address management (add, edit, delete, set default)
- ✅ Order history and tracking
- ✅ User profile management
- ✅ Password change functionality
- ✅ Responsive design (mobile, tablet, desktop)

### Admin Features (Backend APIs Ready)
- ✅ Product management (CRUD operations)
- ✅ Category management
- ✅ Order management
- ✅ User management
- ✅ Inventory tracking

### Technical Features
- ✅ JWT-based authentication
- ✅ Session-based cart for guests
- ✅ Automatic cart merging on login
- ✅ Stock validation
- ✅ Coupon code support
- ✅ Auto-calculated totals (subtotal, tax, shipping)
- ✅ Rate limiting
- ✅ Input validation
- ✅ Error handling
- ✅ Loading states

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (React 18)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom CUI Design System
- **State Management**: React Context API
- **HTTP Client**: Fetch API

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + HTTP-only Cookies
- **Security**: Helmet, CORS, Rate Limiting, Bcrypt

## 📁 Project Structure

```
cakeanatomy/
├── backend/                 # Backend API
│   ├── src/
│   │   ├── models/         # Mongoose schemas
│   │   ├── controllers/    # Business logic
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Auth, validation, errors
│   │   ├── utils/          # Helpers, seeder
│   │   └── server.ts       # Express app
│   ├── package.json
│   └── README.md
│
├── website/                # Frontend Next.js app
│   ├── src/
│   │   ├── app/           # Pages (Next.js 14 app router)
│   │   ├── components/    # React components
│   │   ├── contexts/      # Auth & Cart contexts
│   │   ├── lib/           # API services, utilities
│   │   └── cui/           # Design system
│   ├── package.json
│   └── README.md
│
├── dashboard/             # Admin dashboard (separate app)
└── docs/                  # Documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or higher
- MongoDB installed and running
- npm or yarn package manager

### Backend Setup

1. **Navigate to backend folder**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```

4. **Edit .env file**
   ```env
   MONGODB_URI=mongodb://localhost:27017/cakeanatomy
   JWT_SECRET=your_super_secret_jwt_key_change_this
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:3000
   PORT=5000
   ```

5. **Seed the database**
   ```bash
   npm run seed
   ```
   This creates:
   - Admin user: `admin@cakeanatomy.com` / `admin123`
   - 4 Categories
   - 10 Sample products

6. **Start the server**
   ```bash
   npm run dev
   ```
   Backend runs on http://localhost:5000

### Frontend Setup

1. **Navigate to website folder**
   ```bash
   cd website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.local.example .env.local
   ```
   Default content:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   Frontend runs on http://localhost:3000

### Access the Application

- **Website**: http://localhost:3000
- **API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/health

## 📚 Documentation

- **[Backend API Documentation](backend/README.md)** - Complete API reference
- **[Frontend Integration Guide](website/INTEGRATION_GUIDE.md)** - How to use APIs
- **[Full Stack Setup](FULL_STACK_SETUP.md)** - Detailed architecture
- **[Quick Start Guide](QUICK_START.md)** - Get running in 5 minutes
- **[Deployment Guide](website/DEPLOYMENT_GUIDE.md)** - Production deployment
- **[Production Checklist](PRODUCTION_READY_CHECKLIST.md)** - Pre-launch tasks

## 🎨 Design System (CUI)

The project includes a complete design system with:
- **Tokens**: Colors, typography, spacing, effects
- **Components**: Button, Input, Card, Modal, Select, Checkbox, Radio, Textarea
- **Documentation**: Storybook stories for all components

Run Storybook:
```bash
cd website
npm run storybook
```

## 🔐 Authentication Flow

1. User registers/logs in
2. Backend returns JWT token
3. Token stored in HTTP-only cookie
4. Frontend sends token with each request
5. Backend validates token using middleware
6. Protected routes require authentication

## 🛒 Cart Flow

1. **Guest User**: Cart stored with session ID
2. **Logged In User**: Cart stored with user ID
3. **On Login**: Guest cart merges with user cart
4. Auto-calculation of totals (subtotal, tax, shipping)
5. Stock validation on add/update

## 💳 Checkout Flow

1. **Address Step**: Select or add delivery address
2. **Payment Step**: Choose payment method (UPI/Card/COD)
3. **Review Step**: Review order details
4. **Place Order**: Create order, process payment
5. **Confirmation**: Order confirmation with tracking

## 📦 Key Features Explained

### Product Management
- Hierarchical categories
- Product variants (size, flavor, etc.)
- Stock management
- Featured products
- Allergen and nutritional information
- Multiple images per product

### Order Management
- Order tracking
- Payment status
- Delivery status
- Order history
- Order cancellation
- Invoice generation ready

### User Management
- Profile management
- Multiple delivery addresses
- Default address setting
- Password change
- Order history

## 🧪 Testing

### Backend
```bash
cd backend
npm test
```

### Frontend
```bash
cd website
npm test
```

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- HTTP-only cookies
- Rate limiting (100 requests/15 minutes)
- Input validation
- CORS configuration
- Helmet.js security headers
- SQL injection prevention
- XSS protection

## 📊 Database Schema

### Main Collections
1. **Users**: User accounts, profiles, addresses
2. **Products**: Product catalog with variants
3. **Categories**: Hierarchical categories
4. **Carts**: Shopping carts (user and session-based)
5. **Orders**: Order history and tracking
6. **Reviews**: Product reviews (ready for implementation)

## 🚢 Deployment

### Backend Deployment
- Recommended: Heroku, Railway, DigitalOcean
- Configure MongoDB Atlas
- Set environment variables
- Enable HTTPS

### Frontend Deployment
- Recommended: Vercel (optimized for Next.js)
- Set `NEXT_PUBLIC_API_URL` environment variable
- Configure domain
- Enable automatic deployments

See [DEPLOYMENT_GUIDE.md](website/DEPLOYMENT_GUIDE.md) for detailed instructions.

## 🐳 Docker Support

Build and run with Docker:

```bash
# Backend
cd backend
docker build -t cakeanatomy-backend .
docker run -p 5000:5000 cakeanatomy-backend

# Frontend
cd website
docker build -t cakeanatomy-website .
docker run -p 3000:3000 cakeanatomy-website
```

## 📈 Performance Optimizations

- Image optimization with Next.js Image component
- Automatic code splitting
- Server-side rendering (SSR)
- Static generation where possible
- Database indexing
- API response caching
- CDN ready

## 🔄 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/slug/:slug` - Get product by slug
- `GET /api/products/featured` - Get featured products

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/items` - Add item to cart
- `PUT /api/cart/items/:productId` - Update cart item
- `DELETE /api/cart/items/:productId` - Remove from cart
- `DELETE /api/cart` - Clear cart

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/cancel` - Cancel order

See [backend/README.md](backend/README.md) for complete API documentation.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/cakeanatomy
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
PORT=5000
NODE_ENV=development
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 🐛 Troubleshooting

### Backend won't start
- Check MongoDB is running
- Verify `.env` file exists
- Check port 5000 is available

### Frontend can't connect to backend
- Verify backend is running
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Check CORS configuration

### Cart not persisting
- Check cookies are enabled
- Verify session ID generation
- Check localStorage for session ID

## 📞 Support

For issues and questions:
- Check documentation files
- Review error logs
- Create an issue on GitHub

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🎯 Project Status

**Status**: ✅ Production Ready (with minor integrations pending)

### Ready to Use
- ✅ Complete authentication system
- ✅ Full product catalog
- ✅ Working cart and checkout
- ✅ Order management
- ✅ User profiles
- ✅ Responsive UI

### Needs Integration
- ⚠️ Real payment gateway (currently simulated)
- ⚠️ Email notifications (service ready, needs config)
- ⚠️ Admin dashboard UI (APIs ready)

## 🙏 Acknowledgments

- Built with Next.js, Express, and MongoDB
- UI inspired by modern e-commerce best practices
- Security practices follow OWASP guidelines

---

**Built with ❤️ for CakeAnatomy**

**Last Updated**: April 23, 2026

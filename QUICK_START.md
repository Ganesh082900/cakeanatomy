# CakeAnatomy - Quick Start Guide

Get your full-stack e-commerce platform running in minutes!

## Prerequisites

- Node.js 18+ installed
- MongoDB installed and running (or use MongoDB Atlas)
- A terminal/command prompt

## Step-by-Step Setup

### Step 1: Backend Setup (5 minutes)

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

**Edit `.env` file** with your settings:
```env
MONGODB_URI=mongodb://localhost:27017/cakeanatomy
JWT_SECRET=change_this_to_a_secure_random_string
FRONTEND_URL=http://localhost:3000
```

```bash
# Seed the database with sample data
npm run seed

# Start the backend server
npm run dev
```

✅ Backend is now running on **http://localhost:5000**

**Sample data created:**
- Admin user: `admin@cakeanatomy.com` / `admin123`
- 4 Categories
- 10 Products

### Step 2: Frontend Setup (3 minutes)

Open a **new terminal window**:

```bash
# Navigate to website folder
cd website

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local
```

The default `.env.local` should work as-is:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

```bash
# Start the frontend server
npm run dev
```

✅ Frontend is now running on **http://localhost:3000**

### Step 3: Test the Application

1. Open browser and visit: **http://localhost:3000/products**
2. You should see a product listing page with 10 sample products
3. Try filtering by category, type, or searching
4. Click on a product to view details
5. Try adding a product to cart (requires login)

## Test Accounts

### Admin Account
- Email: `admin@cakeanatomy.com`
- Password: `admin123`
- Can manage products, categories, and orders

### Create Customer Account
Register a new account through the frontend to test customer features.

## What's Available

### Backend API Endpoints

**Health Check**: http://localhost:5000/health

**Products**:
- GET http://localhost:5000/api/products
- GET http://localhost:5000/api/products/featured

**Categories**:
- GET http://localhost:5000/api/categories

**Auth** (POST with JSON body):
- POST http://localhost:5000/api/auth/register
- POST http://localhost:5000/api/auth/login

### Frontend Pages

- **Products**: http://localhost:3000/products
- **Home**: http://localhost:3000

## Common Issues

### MongoDB Connection Error

**Error**: `Error connecting to MongoDB`

**Solution**:
- Ensure MongoDB is running: `mongod` (or `brew services start mongodb-community` on Mac)
- Or use MongoDB Atlas cloud database (update MONGODB_URI in .env)

### Port Already in Use

**Error**: `Port 5000 is already in use`

**Solution**:
- Stop the existing process using port 5000
- Or change PORT in backend/.env to a different port (e.g., 5001)

### Frontend Can't Connect to Backend

**Error**: Network errors in browser console

**Solution**:
- Verify backend is running on port 5000
- Check NEXT_PUBLIC_API_URL in website/.env.local
- Ensure no firewall is blocking the connection

### Missing Dependencies

**Error**: `Cannot find module 'xyz'`

**Solution**:
```bash
# In backend folder
npm install

# In website folder
npm install
```

## Next Steps

Now that everything is running, you can:

1. **Explore the Product Page**
   - Filter products by category
   - Search for products
   - Sort by price, name, rating
   - View product details

2. **Test Authentication**
   - Create pages for login/register
   - Use the AuthContext in your components
   - Access protected routes

3. **Build Cart Functionality**
   - Create a cart page
   - Use CartContext to manage cart state
   - Implement add/remove items

4. **Create Checkout Flow**
   - Build checkout page
   - Integrate with order API
   - Add payment processing

5. **View Full Documentation**
   - Backend API: See `backend/README.md`
   - Frontend Guide: See `website/INTEGRATION_GUIDE.md`
   - Full Setup: See `FULL_STACK_SETUP.md`

## Development Workflow

### Making Changes

**Backend Changes**:
- Edit files in `backend/src/`
- Server auto-restarts with nodemon
- Check terminal for compilation errors

**Frontend Changes**:
- Edit files in `website/src/`
- Hot reload happens automatically
- Check browser console for errors

### Testing API with Postman/Insomnia

Import these endpoints to test:

```
GET  http://localhost:5000/api/products
GET  http://localhost:5000/api/categories
POST http://localhost:5000/api/auth/register
POST http://localhost:5000/api/auth/login
GET  http://localhost:5000/api/cart (requires auth token)
POST http://localhost:5000/api/cart/items (requires auth token)
```

## Stopping the Servers

Press `Ctrl + C` in each terminal window to stop the servers.

## Resetting the Database

To start fresh with sample data:

```bash
cd backend
npm run seed
```

This will clear all data and recreate sample products and admin user.

## Need Help?

- Check the detailed guides in the docs folder
- Review the example code in `website/src/`
- Look at the API documentation in `backend/README.md`
- Check browser console for frontend errors
- Check backend terminal for API errors

---

**You're all set! Happy coding! 🎉**

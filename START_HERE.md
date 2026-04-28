# 🚀 START HERE - CakeAnatomy Quick Launch Guide

Welcome to CakeAnatomy! This guide will get you up and running in under 5 minutes.

## ⚡ Quick Start (5 Minutes)

### Step 1: Prerequisites Check (30 seconds)

Make sure you have:
- [ ] Node.js 18+ installed ([Download](https://nodejs.org/))
- [ ] MongoDB installed and running ([Download](https://www.mongodb.com/try/download/community))
- [ ] A code editor (VS Code recommended)
- [ ] A terminal/command prompt

**Check your Node.js version:**
```bash
node --version  # Should be 18 or higher
```

**Check if MongoDB is running:**
```bash
# On Windows
net start | findstr MongoDB

# On Mac/Linux
ps aux | grep mongod
```

### Step 2: Backend Setup (2 minutes)

Open your terminal and run:

```bash
# Navigate to backend folder
cd backend

# Install dependencies (this may take a minute)
npm install

# Copy environment file
copy .env.example .env     # Windows
# OR
cp .env.example .env       # Mac/Linux

# Seed the database with sample data
npm run seed

# Start the backend server
npm run dev
```

✅ You should see: `Server is running on port 5000`

**Leave this terminal open!**

### Step 3: Frontend Setup (2 minutes)

Open a **NEW** terminal window and run:

```bash
# Navigate to frontend folder
cd website

# Install dependencies
npm install

# Start the development server
npm run dev
```

✅ You should see: `Ready - started server on http://localhost:3000`

### Step 4: Open the Website (30 seconds)

Open your browser and go to:
**http://localhost:3000**

🎉 **Congratulations! Your application is now running!**

## 🎯 What to Do Next

### 1. Explore the Website
- Browse products: http://localhost:3000/products
- Try the search and filters
- View a product detail page

### 2. Create an Account
- Click "Sign Up" in the top navigation
- Register with your details
- Or use the demo account:
  - Email: `admin@cakeanatomy.com`
  - Password: `admin123`

### 3. Test the Shopping Cart
- Add a product to cart
- View cart page
- Update quantities
- Apply a coupon code (if available)

### 4. Complete a Test Order
- Go to cart and click "Proceed to Checkout"
- Add a delivery address
- Select a payment method
- Place an order
- View your order in "My Orders"

## 📁 Project Structure

```
cakeanatomy/
├── backend/           ← Your backend API (Port 5000)
├── website/           ← Your frontend website (Port 3000)
├── dashboard/         ← Admin dashboard (not started yet)
└── docs/             ← Documentation files
```

## 🔑 Demo Credentials

**Admin Account:**
- Email: `admin@cakeanatomy.com`
- Password: `admin123`

**Sample Products:**
- 10 different cakes, pastries, and confections
- 4 categories: Cakes, Pastries, Confections, Bakery

## 🛠️ Useful Commands

### Backend
```bash
cd backend
npm run dev        # Start development server
npm run build      # Build for production
npm run seed       # Reseed database with sample data
```

### Frontend
```bash
cd website
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run storybook  # View component library
```

## 🐛 Common Issues & Solutions

### ❌ "MongoDB connection error"
**Solution:**
1. Make sure MongoDB is running
2. On Windows: `net start MongoDB`
3. On Mac: `brew services start mongodb-community`

### ❌ "Port 5000 already in use"
**Solution:**
1. Stop the process using port 5000
2. Or change PORT in `backend/.env` to another port (e.g., 5001)

### ❌ "Cannot connect to backend"
**Solution:**
1. Make sure backend is running (check terminal)
2. Check `website/.env.local` has `NEXT_PUBLIC_API_URL=http://localhost:5000/api`
3. Clear browser cache and reload

### ❌ "Cart is empty after login"
**Solution:**
This is normal! Add items to cart as a logged-in user.

## 📚 Learn More

Once you're comfortable with the basics, check out:

1. **[README.md](README.md)** - Complete project overview
2. **[QUICK_START.md](QUICK_START.md)** - Detailed setup guide
3. **[backend/README.md](backend/README.md)** - API documentation
4. **[PRODUCTION_READY_CHECKLIST.md](PRODUCTION_READY_CHECKLIST.md)** - Pre-launch checklist

## 🎨 Customize Your Store

### Change Store Name
1. Edit `website/src/app/layout.tsx` - Update metadata title
2. Update logo in `website/src/components/shared/Logo.tsx`

### Add Your Products
1. Use the seeder as a template: `backend/src/utils/seeder.ts`
2. Or use the API to add products programmatically
3. Admin dashboard coming soon for easy product management

### Customize Colors
Edit `website/cui/tokens/colors.ts` to change your brand colors.

## 🚀 Ready for Production?

When you're ready to deploy:

1. **Check the checklist**: [PRODUCTION_READY_CHECKLIST.md](PRODUCTION_READY_CHECKLIST.md)
2. **Read deployment guide**: [website/DEPLOYMENT_GUIDE.md](website/DEPLOYMENT_GUIDE.md)
3. **Set up real payment gateway** (Razorpay, Stripe)
4. **Configure email service** (SendGrid, Mailgun)
5. **Deploy to Vercel** (frontend) and **Railway/Heroku** (backend)

## 💡 Tips for Success

- ✨ **Test everything** - Try all features before going live
- 🔒 **Change default passwords** - Update admin credentials
- 📸 **Add real images** - Replace placeholder product images
- 📝 **Write descriptions** - Add compelling product descriptions
- 🎯 **Set real prices** - Update product prices
- 📧 **Configure emails** - Set up transactional emails
- 🔐 **Enable HTTPS** - Use SSL certificates in production

## 🆘 Need Help?

1. Check the documentation files
2. Review error messages in the terminal
3. Check browser console for frontend errors
4. Check backend terminal for API errors

## 🎉 You're All Set!

Your e-commerce platform is ready to customize and launch!

**What's working out of the box:**
✅ User authentication
✅ Product browsing and search
✅ Shopping cart
✅ Checkout process
✅ Order management
✅ User profiles
✅ Responsive design

**Start exploring and building your dream bakery website!** 🎂

---

**Happy Coding!** 🚀

Have questions? Check the docs or create an issue on GitHub.

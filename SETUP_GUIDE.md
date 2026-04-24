# 🚀 Complete Setup Guide - CakeAnatomy Dashboard

## Prerequisites

Before starting, ensure you have:
- ✅ Node.js 18+ installed
- ❌ MongoDB installed (we'll install this)
- ✅ npm or yarn package manager

## Step 1: Install MongoDB on Windows

### Option A: Using Chocolatey (Recommended)

```bash
# Install Chocolatey if not already installed (run in PowerShell as Admin)
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Install MongoDB
choco install mongodb
```

### Option B: Manual Installation

1. Download MongoDB Community Server from: https://www.mongodb.com/try/download/community
2. Run the installer (choose "Complete" setup)
3. Install as a Windows Service (check the box during installation)
4. Verify installation:
   ```bash
   mongod --version
   ```

### Option C: Using MongoDB Atlas (Cloud - No local install needed)

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create free account and cluster
3. Get connection string
4. Update `backend/.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cakeanatomy
   ```

## Step 2: Start MongoDB (If installed locally)

```bash
# Windows - Start MongoDB service
net start MongoDB

# Or run MongoDB manually
mongod --dbpath="C:\data\db"
```

## Step 3: Setup Backend

```bash
# Navigate to backend
cd d:\cakeanatomy\cakeanatomy\backend

# Install dependencies (if not already done)
npm install

# Verify .env file exists and is configured
# Should contain:
# MONGODB_URI=mongodb://localhost:27017/cakeanatomy
# NODE_ENV=development
# PORT=5000
# JWT_SECRET=your-secret-key-here

# Populate database with seed data
npm run seed

# Start backend server
npm run dev
```

**Expected output:**
```
✅ Connected to MongoDB
✅ Seeder: Created 5 staff members
✅ Seeder: Created 30 days of attendance
✅ Seeder: Created 5 categories
✅ Seeder: Created 10 raw materials
✅ Seeder: Created 4 recipes
✅ Seeder: Created 6 products
✅ Seeder: Created 4 customers
✅ Seeder: Created 50 orders
✅ Seeder: Created 3 coupons
✅ Seeder: Created 2 gift cards
✅ Seeder: Created 3 campaigns
✅ Seeder: Created 3 production records
🚀 Server running on http://localhost:5000
```

## Step 4: Setup Dashboard Frontend

```bash
# Open new terminal
cd d:\cakeanatomy\cakeanatomy\dashboard

# Install dependencies (if needed)
npm install

# Verify .env.local exists
# Should contain:
# NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Replace demo homepage with dashboard
rm app/page.tsx
mv app/page_new.tsx app/page.tsx

# Start development server
npm run dev
```

**Expected output:**
```
  ▲ Next.js 15.x.x
  - Local:        http://localhost:3000
  - Network:      http://192.168.x.x:3000

  ✓ Ready in 2.5s
```

## Step 5: Access Dashboard

1. Open browser: http://localhost:3000
2. You should see the dashboard with:
   - Today's metrics (Orders, Revenue, etc.)
   - Sales by source breakdown
   - Inventory alerts
   - Staff attendance
   - Recent orders table

## Step 6: Test API Endpoints

Open another terminal and test endpoints:

```bash
# Test dashboard overview
curl http://localhost:5000/api/analytics/dashboard-overview

# Test orders endpoint
curl http://localhost:5000/api/orders

# Test inventory endpoint
curl http://localhost:5000/api/inventory/materials

# Test staff endpoint
curl http://localhost:5000/api/staff
```

## 🎯 Quick Verification Checklist

- [ ] MongoDB is running (service or manual)
- [ ] Backend started on port 5000
- [ ] Seed data created successfully
- [ ] Dashboard running on port 3000
- [ ] Dashboard shows real data (not "Loading..." or errors)
- [ ] API endpoints return data

## 🐛 Common Issues & Solutions

### Issue: "Cannot connect to MongoDB"
**Solution:**
```bash
# Check if MongoDB is running
net start MongoDB

# Or start manually
mongod --dbpath="C:\data\db"

# Check backend .env has correct MONGODB_URI
```

### Issue: "Port 5000 already in use"
**Solution:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process
taskkill /PID <process_id> /F

# Or change port in backend/.env
PORT=5001
```

### Issue: "Dashboard shows 'Failed to load dashboard data'"
**Solution:**
1. Verify backend is running: http://localhost:5000/health
2. Check browser console for errors
3. Verify .env.local has correct API URL
4. Check CORS settings in backend/src/server.ts

### Issue: "No data showing in dashboard"
**Solution:**
```bash
# Re-run seed script
cd backend
npm run seed
```

### Issue: Page shows old demo content
**Solution:**
```bash
# Make sure you replaced page.tsx
cd dashboard/app
rm page.tsx
mv page_new.tsx page.tsx

# Restart Next.js dev server
# Ctrl+C to stop
npm run dev
```

## 📁 Project Structure Verification

Your structure should look like:
```
cakeanatomy/
├── backend/
│   ├── src/
│   │   ├── models/ (12 files)
│   │   ├── routes/ (8 files)
│   │   ├── controllers/ (8 files)
│   │   ├── scripts/
│   │   │   └── seed.ts
│   │   └── server.ts
│   ├── .env
│   └── package.json
│
├── dashboard/
│   ├── app/
│   │   ├── page.tsx (should be dashboard overview)
│   │   ├── layout.tsx (with DashboardLayout)
│   │   ├── orders/
│   │   │   └── page.tsx
│   │   └── inventory/
│   │       └── materials/
│   │           └── page.tsx
│   ├── components/
│   │   └── DashboardLayout.tsx
│   ├── lib/
│   │   ├── api.ts
│   │   └── services/ (6 files)
│   ├── .env.local
│   └── package.json
│
├── DASHBOARD_COMPLETE.md
└── SETUP_GUIDE.md (this file)
```

## 🎨 Features Available After Setup

### 1. Dashboard Overview (/)
- Real-time metrics
- Sales breakdown by source
- Inventory status
- Staff attendance
- Recent orders

### 2. Orders Module (/orders)
- All orders list with filters
- Multi-source tracking (Swiggy, Zomato, Platform, etc.)
- Order status management

### 3. Inventory (/inventory/materials)
- Raw materials tracking
- Stock level alerts
- Expiry date monitoring

### 4. API Access
All endpoints at: http://localhost:5000/api/
- Analytics: `/analytics/*`
- Orders: `/orders/*`
- Inventory: `/inventory/*`
- Staff: `/staff/*`
- Coupons: `/coupons/*`
- Campaigns: `/campaigns/*`
- Production: `/production/*`
- Users: `/users/*`

## 🔐 Test Credentials

**Admin Account:**
- Email: admin@cakeanatomy.com
- Password: admin123

**Customer Accounts:**
Created by seeder with random data

## 🚀 Next Steps After Setup

1. **Test the dashboard** - Click through all sections
2. **Explore the API** - Test endpoints with Postman or curl
3. **Check the data** - Review seeded orders, inventory, staff
4. **Build remaining pages**:
   - Order details page
   - Analytics with charts
   - Staff management
   - Production scheduling
   - Marketing campaigns
   - POS interface

## 📚 Additional Resources

- **API Documentation**: See DASHBOARD_COMPLETE.md
- **Backend Models**: Check backend/src/models/
- **Service Layer**: Review dashboard/lib/services/
- **Component Library**: dashboard/cui/

---

**Need Help?**
1. Check backend logs in terminal
2. Check browser console for frontend errors
3. Verify MongoDB connection: `mongo` command
4. Test API: http://localhost:5000/health

**Ready to go!** 🎉
Once everything is running, you'll have a fully functional bakery management dashboard with real-time data!

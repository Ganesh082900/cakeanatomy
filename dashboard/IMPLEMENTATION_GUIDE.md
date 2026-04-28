# CakeAnatomy Dashboard - Implementation Guide

**Start Date**: TBD | **Target MVP Launch**: 2-3 months from start

---

## 📋 PRE-DEVELOPMENT CHECKLIST

### 1. Requirements Gathering
- [ ] Review competitor analysis with stakeholders
- [ ] Interview bakery staff (bakers, cashiers, managers)
- [ ] Document current pain points in operations
- [ ] Prioritize features based on business needs
- [ ] Define success metrics

### 2. Technical Preparation
- [ ] Review existing backend APIs
- [ ] Extend database models (see schema below)
- [ ] Set up dashboard project structure
- [ ] Configure development environment
- [ ] Set up CI/CD pipeline

### 3. Third-Party Account Setup
- [ ] Create Razorpay merchant account
- [ ] Register for WhatsApp Business API (via Gupshup/WATI)
- [ ] Set up SMS gateway account (MSG91)
- [ ] Configure email service (SendGrid)
- [ ] Research Swiggy/Zomato integration options
- [ ] Set up cloud storage (Cloudinary)

---

## 🗄️ DATABASE SCHEMA EXTENSIONS

### New Collections to Add

#### 1. **recipes** Collection
```javascript
{
  _id: ObjectId,
  name: String,
  category: String, // cake, pastry, bread, etc.
  ingredients: [{
    inventoryItemId: ObjectId, // ref to inventory
    name: String,
    quantity: Number,
    unit: String, // kg, grams, liters, ml, pieces
    cost: Number
  }],
  instructions: [String],
  prepTime: Number, // minutes
  yieldQuantity: Number,
  yieldUnit: String,
  images: [String],
  allergens: [String],
  dietaryInfo: {
    isVegan: Boolean,
    isEggless: Boolean,
    isSugarFree: Boolean,
    isGlutenFree: Boolean
  },
  nutritionalInfo: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number
  },
  totalCost: Number, // auto-calculated
  costPerUnit: Number,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

#### 2. **inventory** Collection
```javascript
{
  _id: ObjectId,
  type: String, // raw_material, finished_product, packaging
  name: String,
  category: String,
  sku: String,
  currentStock: Number,
  unit: String,
  reorderLevel: Number,
  reorderQuantity: Number,
  costPerUnit: Number,
  supplierId: ObjectId,
  storageLocation: String,
  expiryTracking: {
    enabled: Boolean,
    batches: [{
      batchNumber: String,
      quantity: Number,
      purchaseDate: Date,
      expiryDate: Date,
      cost: Number
    }]
  },
  lastRestocked: Date,
  totalValue: Number, // auto-calculated
  createdAt: Date,
  updatedAt: Date
}
```

#### 3. **orders** Collection (Extend existing)
```javascript
{
  // ... existing fields
  
  // ADD these fields:
  orderSource: String, // in-store, website, phone, whatsapp, swiggy, zomato
  orderType: String, // immediate, scheduled, custom_cake, catering
  scheduledDate: Date,
  scheduledTime: String,
  
  customCakeDetails: {
    isCustom: Boolean,
    size: String,
    tiers: Number,
    flavor: String,
    filling: String,
    frosting: String,
    designDescription: String,
    referenceImages: [String],
    designerNotes: String,
    assignedDesigner: ObjectId,
    designApproved: Boolean,
    approvalDate: Date
  },
  
  dietaryRequirements: {
    isEggless: Boolean,
    isSugarFree: Boolean,
    isVegan: Boolean,
    isGlutenFree: Boolean,
    allergies: [String]
  },
  
  delivery: {
    required: Boolean,
    address: Object,
    zone: String,
    fee: Number,
    driverId: ObjectId,
    status: String, // pending, assigned, in_transit, delivered
    deliveredAt: Date,
    deliveryProof: String // image URL
  },
  
  production: {
    status: String, // pending, in_queue, in_progress, completed
    assignedBaker: ObjectId,
    startedAt: Date,
    completedAt: Date,
    qualityChecked: Boolean,
    qualityCheckedBy: ObjectId
  },
  
  notifications: [{
    type: String, // sms, whatsapp, email
    sentAt: Date,
    status: String,
    message: String
  }]
}
```

#### 4. **staff** Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  phone: String,
  role: String, // baker, decorator, cashier, delivery, manager, admin
  employeeId: String,
  joiningDate: Date,
  isActive: Boolean,
  
  attendance: [{
    date: Date,
    clockIn: Date,
    clockOut: Date,
    hoursWorked: Number,
    status: String // present, absent, half_day, leave
  }],
  
  leaves: [{
    type: String, // casual, sick, earned
    startDate: Date,
    endDate: Date,
    reason: String,
    status: String, // pending, approved, rejected
    approvedBy: ObjectId
  }],
  
  shifts: [{
    date: Date,
    shiftType: String, // morning, evening, night
    startTime: String,
    endTime: String
  }],
  
  salary: {
    basicSalary: Number,
    allowances: Number,
    deductions: Number,
    paymentFrequency: String // monthly, weekly
  },
  
  performance: {
    ordersCompleted: Number,
    averageRating: Number,
    customerFeedback: [ObjectId]
  },
  
  createdAt: Date,
  updatedAt: Date
}
```

#### 5. **coupons** Collection
```javascript
{
  _id: ObjectId,
  code: String, // unique
  name: String,
  description: String,
  type: String, // percentage, flat_amount, free_delivery, bogo
  value: Number,
  
  conditions: {
    minOrderValue: Number,
    maxDiscount: Number,
    applicableProducts: [ObjectId],
    applicableCategories: [String],
    firstTimeUser: Boolean,
    channels: [String] // all, website, in-store
  },
  
  validity: {
    startDate: Date,
    endDate: Date,
    isActive: Boolean
  },
  
  usage: {
    totalLimit: Number,
    perUserLimit: Number,
    currentUsage: Number,
    usedBy: [{
      userId: ObjectId,
      orderId: ObjectId,
      usedAt: Date
    }]
  },
  
  createdAt: Date,
  updatedAt: Date
}
```

#### 6. **suppliers** Collection
```javascript
{
  _id: ObjectId,
  name: String,
  contactPerson: String,
  phone: String,
  email: String,
  address: Object,
  gstNumber: String,
  
  productsSupplied: [String],
  
  paymentTerms: {
    creditDays: Number,
    paymentMode: String
  },
  
  performance: {
    totalOrders: Number,
    onTimeDelivery: Number,
    qualityRating: Number
  },
  
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

#### 7. **purchase_orders** Collection
```javascript
{
  _id: ObjectId,
  poNumber: String,
  supplierId: ObjectId,
  orderDate: Date,
  expectedDelivery: Date,
  
  items: [{
    inventoryItemId: ObjectId,
    name: String,
    quantity: Number,
    unit: String,
    ratePerUnit: Number,
    amount: Number,
    expiryDate: Date
  }],
  
  totalAmount: Number,
  gstAmount: Number,
  grandTotal: Number,
  
  status: String, // draft, sent, received, cancelled
  receivedDate: Date,
  receivedBy: ObjectId,
  
  invoiceNumber: String,
  invoiceDate: Date,
  invoiceAmount: Number,
  
  payment: {
    status: String, // pending, partial, paid
    paidAmount: Number,
    dueAmount: Number,
    paidDate: Date,
    paymentMode: String
  },
  
  createdBy: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

#### 8. **wastage** Collection
```javascript
{
  _id: ObjectId,
  date: Date,
  itemType: String, // raw_material, finished_product
  itemId: ObjectId,
  itemName: String,
  quantity: Number,
  unit: String,
  cost: Number,
  
  reason: String, // expired, damaged, quality_issue, sample, donation
  notes: String,
  
  recordedBy: ObjectId,
  approvedBy: ObjectId,
  
  createdAt: Date
}
```

#### 9. **marketing_campaigns** Collection
```javascript
{
  _id: ObjectId,
  name: String,
  type: String, // sms, email, whatsapp
  status: String, // draft, scheduled, sent, completed
  
  target: {
    segmentType: String, // all, birthday_this_month, inactive, vip
    customerIds: [ObjectId],
    totalRecipients: Number
  },
  
  content: {
    subject: String,
    message: String,
    imageUrl: String,
    ctaText: String,
    ctaLink: String
  },
  
  scheduling: {
    sendAt: Date,
    timezone: String
  },
  
  results: {
    sent: Number,
    delivered: Number,
    opened: Number,
    clicked: Number,
    conversions: Number,
    revenue: Number
  },
  
  createdBy: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🎨 DASHBOARD UI STRUCTURE

### Page Hierarchy

```
/dashboard
├── /overview (Dashboard Home)
│   ├── Today's sales summary
│   ├── Order count (pending, in-progress, completed)
│   ├── Low stock alerts
│   ├── Items expiring soon
│   ├── Top selling products (today)
│   └── Quick actions (new order, add inventory, view reports)
│
├── /orders
│   ├── /list (All orders with filters)
│   ├── /new (Create new order - in-store)
│   ├── /custom-cake (Custom cake order form)
│   ├── /{orderId} (Order details)
│   └── /kitchen-display (KDS view for bakers)
│
├── /inventory
│   ├── /raw-materials (Stock levels, expiry tracking)
│   ├── /finished-products (Daily production, current stock)
│   ├── /recipes (Recipe database)
│   ├── /suppliers (Supplier management)
│   ├── /purchase-orders (PO creation & tracking)
│   └── /wastage (Wastage logging & reports)
│
├── /pos
│   ├── Product selection
│   ├── Cart & checkout
│   ├── Payment processing
│   └── Receipt generation
│
├── /customers
│   ├── /list (Customer database)
│   ├── /{customerId} (Customer details & history)
│   ├── /loyalty (Loyalty program management)
│   └── /feedback (Customer reviews)
│
├── /marketing
│   ├── /campaigns (SMS, Email, WhatsApp campaigns)
│   ├── /coupons (Coupon management)
│   ├── /gift-cards (Gift card system)
│   └── /analytics (Campaign performance)
│
├── /staff
│   ├── /list (Employee directory)
│   ├── /attendance (Clock in/out tracking)
│   ├── /shifts (Shift scheduling)
│   ├── /leaves (Leave management)
│   └── /performance (Staff metrics)
│
├── /analytics
│   ├── /sales (Sales reports & trends)
│   ├── /products (Product performance)
│   ├── /inventory (Inventory reports)
│   ├── /customers (Customer analytics)
│   └── /financial (P&L, cash flow)
│
├── /financials
│   ├── /daily-summary (Cash register reconciliation)
│   ├── /expenses (Expense tracking)
│   ├── /invoices (GST invoices)
│   ├── /reports (P&L, balance sheet)
│   └── /gst (GST reports)
│
└── /settings
    ├── /general (Business info, locations)
    ├── /products (Product catalog management)
    ├── /categories (Category management)
    ├── /taxes (GST rates, HSN codes)
    ├── /payment-methods (Configure payment gateways)
    ├── /notifications (SMS, Email, WhatsApp settings)
    ├── /integrations (Swiggy, Zomato, Tally)
    └── /users (Admin user management)
```

---

## 🏗️ IMPLEMENTATION PHASES

### PHASE 1: MVP (Weeks 1-8)

#### Week 1-2: Setup & Foundation
**Backend:**
- [ ] Extend existing models (recipes, inventory, staff, coupons)
- [ ] Create new API endpoints
  - `/api/recipes` CRUD
  - `/api/inventory` CRUD + batch tracking
  - `/api/staff` CRUD + attendance
  - `/api/wastage` CRUD
- [ ] Add real-time support (Socket.io setup)

**Frontend:**
- [ ] Set up dashboard project in `/dashboard` folder
- [ ] Install dependencies (Next.js, TanStack Query, Recharts)
- [ ] Configure CUI design system
- [ ] Create layout components (Sidebar, Header, Footer)
- [ ] Set up routing structure

#### Week 3-4: Order Management
**Features:**
- [ ] Order list view (table with filters)
- [ ] Order detail modal/page
- [ ] New order form (in-store)
- [ ] Order status workflow (status change buttons)
- [ ] Custom cake order form
- [ ] Real-time order updates (Socket.io)

**Components:**
- [ ] OrderTable
- [ ] OrderDetailsModal
- [ ] OrderStatusBadge
- [ ] NewOrderForm
- [ ] CustomCakeForm

#### Week 5-6: Inventory & POS
**Inventory:**
- [ ] Raw materials list
- [ ] Finished products list
- [ ] Stock level indicators
- [ ] Expiry alerts
- [ ] Recipe management
- [ ] Add stock / Remove stock forms

**POS:**
- [ ] Product grid/list
- [ ] Cart component
- [ ] Checkout flow
- [ ] Payment method selection
- [ ] Receipt generation (print preview)

#### Week 7-8: Core Analytics & Polish
**Analytics:**
- [ ] Dashboard overview (widgets)
- [ ] Daily sales summary
- [ ] Best selling products chart
- [ ] Sales by channel chart
- [ ] Stock levels report

**Polish:**
- [ ] Responsive design testing
- [ ] Loading states
- [ ] Error handling
- [ ] Form validations
- [ ] User testing with staff
- [ ] Bug fixes

---

### PHASE 2: Integrations (Weeks 9-16)

#### Week 9-10: WhatsApp & SMS
- [ ] WhatsApp Business API integration
  - Order confirmations
  - Order ready notifications
  - Payment reminders
- [ ] SMS gateway integration
- [ ] Notification settings page
- [ ] Message templates management

#### Week 11-12: Customer & Marketing
- [ ] Customer database
- [ ] Loyalty points system
- [ ] Coupon management
- [ ] Campaign creation (SMS, Email)
- [ ] Customer segmentation
- [ ] Birthday/anniversary automation

#### Week 13-14: Aggregator Integration
- [ ] Swiggy integration (webhook/API)
- [ ] Zomato integration (webhook/API)
- [ ] Auto-import orders
- [ ] Menu sync (if available)
- [ ] Order reconciliation

#### Week 15-16: Production Planning
- [ ] Kitchen Display System (KDS)
- [ ] Production dashboard
- [ ] Daily production planning
- [ ] Batch planning
- [ ] Ingredient requirement calculator
- [ ] Production time tracking

---

### PHASE 3: Advanced Features (Weeks 17-24)

#### Week 17-18: Advanced Analytics
- [ ] Custom report builder
- [ ] Trend analysis
- [ ] Forecasting (basic)
- [ ] Customer lifetime value
- [ ] Product profitability
- [ ] Export reports (PDF, Excel)

#### Week 19-20: Staff & Financial
- [ ] Advanced shift scheduling
- [ ] Payroll summary
- [ ] Performance tracking
- [ ] Financial reports (P&L, Balance Sheet)
- [ ] GST reports (GSTR-1, GSTR-3B)
- [ ] Expense management

#### Week 21-22: Multi-location (Optional)
- [ ] Location selection
- [ ] Centralized dashboard
- [ ] Inter-branch transfers
- [ ] Location-wise reports
- [ ] Role-based access by location

#### Week 23-24: Optimization & Launch
- [ ] Performance optimization
- [ ] Security audit
- [ ] Complete user documentation
- [ ] Staff training
- [ ] Production deployment
- [ ] Monitoring setup

---

## 🧪 TESTING STRATEGY

### Unit Testing
- [ ] API endpoint tests (Jest + Supertest)
- [ ] Component tests (React Testing Library)
- [ ] Utility function tests

### Integration Testing
- [ ] Order workflow end-to-end
- [ ] Payment processing
- [ ] Inventory deduction
- [ ] Notification sending

### User Acceptance Testing (UAT)
- [ ] Staff testing (cashiers, bakers)
- [ ] Manager testing
- [ ] Real-world scenarios
- [ ] Feedback collection

### Performance Testing
- [ ] Load testing (100+ concurrent orders)
- [ ] Database query optimization
- [ ] Frontend bundle size
- [ ] Page load times

---

## 🚀 DEPLOYMENT CHECKLIST

### Pre-deployment
- [ ] Environment variables configured
- [ ] Database backups set up
- [ ] SSL certificates installed
- [ ] Domain configured
- [ ] CDN set up (if needed)

### Production Deployment
- [ ] Deploy backend to server (AWS/DigitalOcean)
- [ ] Deploy frontend to Vercel/Netlify
- [ ] Configure MongoDB Atlas (production cluster)
- [ ] Set up monitoring (Sentry, LogRocket)
- [ ] Set up analytics (Google Analytics)

### Post-deployment
- [ ] Smoke testing
- [ ] Monitor error logs
- [ ] Performance monitoring
- [ ] User feedback collection
- [ ] Iterate based on feedback

---

## 📊 SUCCESS METRICS

### Track These KPIs Weekly

**User Adoption:**
- Daily active users (staff)
- Feature usage rate
- Time spent in system
- Training completion rate

**Business Impact:**
- Order processing time (target: <2 min avg)
- Inventory accuracy (target: >95%)
- Wastage reduction (target: 20% reduction)
- Customer retention (target: 15% improvement)

**Technical:**
- System uptime (target: 99.5%+)
- Page load time (target: <2 sec)
- Error rate (target: <1%)
- API response time (target: <500ms)

---

## 🛠️ DEVELOPMENT TOOLS

### Required Tools
- VS Code with extensions (ESLint, Prettier, TypeScript)
- Node.js v18+ and npm
- MongoDB Compass (database GUI)
- Postman (API testing)
- Git & GitHub

### Recommended Extensions
- Thunder Client (API testing in VS Code)
- MongoDB for VS Code
- GitLens
- Tailwind CSS IntelliSense

---

## 📞 INTEGRATION GUIDES

### WhatsApp Business API Setup
1. Choose provider: Gupshup, WATI, or Interakt
2. Register business and get API credentials
3. Create message templates (requires Meta approval)
4. Implement webhook for incoming messages
5. Test notifications

### Payment Gateway Integration
1. Create Razorpay account
2. Get API keys (test + live)
3. Implement payment flow
4. Handle webhooks for payment confirmations
5. Test with test cards

### Swiggy/Zomato Integration
1. Contact Swiggy/Zomato for API access (if available)
2. Alternative: Set up email parsing (orders come via email)
3. Implement webhook receiver
4. Map external order IDs to internal system
5. Test order import flow

---

## 🎯 READY TO START?

### First Steps:
1. Clone repository: `git clone <repo-url>`
2. Install dependencies: `npm install` (in both backend & dashboard)
3. Set up environment variables (`.env` files)
4. Run database migrations/seeders
5. Start backend: `npm run dev` (in /backend)
6. Start dashboard: `npm run dev` (in /dashboard)
7. Access: http://localhost:3000/dashboard

### Questions?
- Backend API docs: `/backend/README.md`
- CUI components: Run `npm run storybook` in /dashboard
- Architecture: See diagrams in `BAKERY_DASHBOARD_COMPETITOR_ANALYSIS.md`

---

**Let's build something amazing! 🎂✨**

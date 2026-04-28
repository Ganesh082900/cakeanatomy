# CakeAnatomy - Backend Integration Guide

This guide explains how the frontend integrates with the backend API.

## Setup

### 1. Environment Variables

Create `.env.local` in the website root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 2. Install Additional Dependencies

```bash
cd website
npm install uuid
npm install --save-dev @types/uuid
```

### 3. Update Root Layout

Wrap your app with context providers in `src/app/layout.tsx`:

```tsx
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
```

## API Services

All API services are located in `src/lib/services/`:

### Authentication (`authService`)

```tsx
import { authService, useAuth } from '@/lib/services';

// In a component
function LoginForm() {
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({
        email: 'user@example.com',
        password: 'password123'
      });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
}
```

### Products (`productService`)

```tsx
import { productService } from '@/lib/services';

// Get all products with filters
const response = await productService.getProducts({
  page: 1,
  limit: 12,
  category: 'category-id',
  type: 'cake',
  search: 'chocolate',
  sort: 'price-asc'
});

// Get featured products
const featured = await productService.getFeaturedProducts(8);

// Get single product
const product = await productService.getProductBySlug('chocolate-cake');
```

### Cart (`cartService`)

```tsx
import { useCart } from '@/contexts/CartContext';

function AddToCartButton({ productId }) {
  const { addToCart } = useCart();

  const handleClick = async () => {
    try {
      await addToCart({
        productId,
        quantity: 1,
        selectedVariants: []
      });
      alert('Added to cart!');
    } catch (error) {
      alert('Failed to add to cart');
    }
  };

  return <button onClick={handleClick}>Add to Cart</button>;
}
```

### Orders (`orderService`)

```tsx
import { orderService } from '@/lib/services';
import { useAuth } from '@/contexts/AuthContext';

function CheckoutForm() {
  const { token } = useAuth();

  const handleCheckout = async () => {
    try {
      const order = await orderService.createOrder({
        shippingAddress: {
          street: '123 Main St',
          city: 'Mumbai',
          state: 'Maharashtra',
          zipCode: '400001',
          country: 'India',
          phone: '9876543210'
        },
        paymentMethod: 'card',
        notes: 'Please ring the doorbell'
      }, token!);

      console.log('Order created:', order.data);
    } catch (error) {
      console.error('Checkout failed:', error);
    }
  };

  return <button onClick={handleCheckout}>Place Order</button>;
}
```

## Context Providers

### AuthContext

Manages user authentication state:

```tsx
import { useAuth } from '@/contexts/AuthContext';

function UserProfile() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <div>Please login</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### CartContext

Manages shopping cart state:

```tsx
import { useCart } from '@/contexts/CartContext';

function CartSummary() {
  const { cart, removeItem, updateQuantity } = useCart();

  if (!cart || cart.items.length === 0) {
    return <div>Your cart is empty</div>;
  }

  return (
    <div>
      <h2>Cart ({cart.totalItems} items)</h2>
      {cart.items.map((item) => (
        <div key={item.product._id}>
          <h3>{item.product.name}</h3>
          <p>₹{item.price} x {item.quantity}</p>
          <button onClick={() => updateQuantity(item.product._id, item.quantity + 1)}>
            +
          </button>
          <button onClick={() => updateQuantity(item.product._id, item.quantity - 1)}>
            -
          </button>
          <button onClick={() => removeItem(item.product._id)}>Remove</button>
        </div>
      ))}
      <div>
        <p>Subtotal: ₹{cart.subtotal}</p>
        <p>Tax: ₹{cart.tax}</p>
        <p>Total: ₹{cart.total}</p>
      </div>
    </div>
  );
}
```

## Example Pages

### Product Listing Page

See `src/app/products/page.tsx` for a complete example with:
- Product grid
- Filters (search, category, type, sort)
- Pagination
- Loading states

### Product Detail Page

Create `src/app/products/[slug]/page.tsx`:

```tsx
'use client';

import { useEffect, useState } from 'react';
import { productService, Product } from '@/lib/services';
import { useCart } from '@/contexts/CartContext';

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [params.slug]);

  const fetchProduct = async () => {
    try {
      const response = await productService.getProductBySlug(params.slug);
      setProduct(response.data);
    } catch (error) {
      console.error('Failed to fetch product:', error);
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ₹{product.price}</p>
      <button onClick={() => addToCart({ productId: product._id, quantity: 1 })}>
        Add to Cart
      </button>
    </div>
  );
}
```

## Running the Full Stack

### 1. Start Backend

```bash
cd backend
npm install
npm run seed  # Populate database
npm run dev   # Runs on http://localhost:5000
```

### 2. Start Frontend

```bash
cd website
npm install
npm run dev   # Runs on http://localhost:3000
```

### 3. Test the Integration

1. Visit http://localhost:3000/products
2. View product listings
3. Click on a product
4. Add to cart
5. Register/Login
6. Complete checkout

## API Response Types

All services use TypeScript types for type safety:

```tsx
// Product type
interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  category: Category;
  stock: number;
  isAvailable: boolean;
  // ... more fields
}

// Cart type
interface Cart {
  _id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  // ... more fields
}

// Order type
interface Order {
  _id: string;
  orderNumber: string;
  items: OrderItem[];
  totalPrice: number;
  orderStatus: string;
  // ... more fields
}
```

## Error Handling

All API calls throw errors that should be caught:

```tsx
try {
  await productService.getProducts();
} catch (error) {
  if (error instanceof Error) {
    console.error('Error message:', error.message);
  }
  // Show error toast/notification
}
```

## Next Steps

1. Create login/register pages
2. Build cart page
3. Create checkout flow
4. Add order history page
5. Implement user profile page
6. Add payment integration (Stripe/Razorpay)
7. Add toast notifications
8. Implement search functionality
9. Add product reviews
10. Create admin dashboard

## Resources

- Backend API Documentation: `backend/README.md`
- API Base URL: `http://localhost:5000/api`
- Health Check: `http://localhost:5000/health`
- Sample Admin: email: `admin@cakeanatomy.com`, password: `admin123`

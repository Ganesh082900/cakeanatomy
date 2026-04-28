'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import { Button, Card, Input } from '@/cui';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

export default function CartPage() {
  const router = useRouter();
  const { cart, isLoading, updateQuantity, removeItem, clearCart, applyCoupon } = useCart();
  const { isAuthenticated } = useAuth();
  const [couponCode, setCouponCode] = React.useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = React.useState(false);

  const handleQuantityChange = async (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      await updateQuantity(productId, newQuantity);
    } catch (error: any) {
      alert(error.message || 'Failed to update quantity');
    }
  };

  const handleRemoveItem = async (productId: string) => {
    if (confirm('Remove this item from cart?')) {
      try {
        await removeItem(productId);
      } catch (error: any) {
        alert(error.message || 'Failed to remove item');
      }
    }
  };

  const handleClearCart = async () => {
    if (confirm('Clear all items from cart?')) {
      try {
        await clearCart();
      } catch (error: any) {
        alert(error.message || 'Failed to clear cart');
      }
    }
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    
    setIsApplyingCoupon(true);
    try {
      await applyCoupon(couponCode);
      alert('Coupon applied successfully!');
    } catch (error: any) {
      alert(error.message || 'Invalid coupon code');
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/checkout');
    } else {
      router.push('/checkout');
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-neutral-600">Loading cart...</p>
        </div>
      </Layout>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-16">
          <Card>
            <Card.Body>
              <div className="text-center py-12">
                <svg className="mx-auto h-24 w-24 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h2 className="mt-6 text-2xl font-bold text-neutral-900">Your cart is empty</h2>
                <p className="mt-2 text-neutral-600">Add some delicious cakes to get started!</p>
                <Link href="/products">
                  <Button color="primary" size="lg" className="mt-8">
                    Browse Products
                  </Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-display font-bold text-neutral-900 mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <Card.Body>
                <div className="divide-y divide-neutral-200">
                  {cart.items.map((item) => (
                    <div key={item._id} className="py-6 first:pt-0 last:pb-0">
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-neutral-100">
                          <Image
                            src={item.product.images[0] || '/placeholder.jpg'}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between">
                            <div>
                              <Link href={`/products/${item.product.slug}`}>
                                <h3 className="text-lg font-semibold text-neutral-900 hover:text-primary-600">
                                  {item.product.name}
                                </h3>
                              </Link>
                              <p className="text-sm text-neutral-600 mt-1">
                                {item.product.category.name}
                              </p>
                              {item.selectedVariants && item.selectedVariants.length > 0 && (
                                <div className="mt-2 space-y-1">
                                  {item.selectedVariants.map((variant, idx) => (
                                    <p key={idx} className="text-xs text-neutral-500">
                                      {variant.name}: {variant.value}
                                    </p>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-semibold text-neutral-900">
                                ₹{item.price.toFixed(2)}
                              </p>
                              <p className="text-sm text-neutral-500">
                                ₹{item.subtotal.toFixed(2)} total
                              </p>
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                                className="w-8 h-8 rounded-lg border border-neutral-300 flex items-center justify-center hover:bg-neutral-100 disabled:opacity-50"
                                disabled={item.quantity <= 1}
                              >
                                -
                              </button>
                              <span className="w-12 text-center font-medium">{item.quantity}</span>
                              <button
                                onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                                className="w-8 h-8 rounded-lg border border-neutral-300 flex items-center justify-center hover:bg-neutral-100 disabled:opacity-50"
                                disabled={item.quantity >= item.product.stock}
                              >
                                +
                              </button>
                              {item.product.stock && (
                                <span className="text-xs text-neutral-500 ml-2">
                                  ({item.product.stock} in stock)
                                </span>
                              )}
                            </div>
                            <button
                              onClick={() => handleRemoveItem(item.product._id)}
                              className="text-sm text-error-600 hover:text-error-700 font-medium"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-neutral-200">
                  <button
                    onClick={handleClearCart}
                    className="text-sm text-error-600 hover:text-error-700 font-medium"
                  >
                    Clear Cart
                  </button>
                </div>
              </Card.Body>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card>
              <Card.Header>
                <h2 className="text-xl font-bold">Order Summary</h2>
              </Card.Header>
              <Card.Body>
                <div className="space-y-4">
                  {/* Coupon Code */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Coupon Code
                    </label>
                    <div className="flex gap-2">
                      <Input
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter code"
                      />
                      <Button
                        onClick={handleApplyCoupon}
                        variant="outline"
                        isLoading={isApplyingCoupon}
                      >
                        Apply
                      </Button>
                    </div>
                    {cart.couponCode && (
                      <p className="text-sm text-success-600 mt-2">
                        ✓ Coupon "{cart.couponCode}" applied
                      </p>
                    )}
                  </div>

                  <div className="border-t border-neutral-200 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600">Subtotal</span>
                      <span className="font-medium">₹{cart.subtotal.toFixed(2)}</span>
                    </div>
                    {cart.discount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-600">Discount</span>
                        <span className="font-medium text-success-600">
                          -₹{cart.discount.toFixed(2)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600">Tax (GST)</span>
                      <span className="font-medium">₹{cart.tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-neutral-200 pt-2 flex justify-between">
                      <span className="text-lg font-bold">Total</span>
                      <span className="text-lg font-bold text-primary-600">
                        ₹{cart.total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <Button
                    color="primary"
                    size="lg"
                    fullWidth
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </Button>

                  <Link href="/products">
                    <Button variant="outline" size="lg" fullWidth>
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>

            {/* Delivery Info */}
            <Card className="mt-4">
              <Card.Body>
                <div className="text-sm space-y-3">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-success-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <p className="font-medium text-neutral-900">Free Delivery</p>
                      <p className="text-neutral-600">On orders above ₹1,000</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-success-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-medium text-neutral-900">Same Day Delivery</p>
                      <p className="text-neutral-600">Order before 2 PM</p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}

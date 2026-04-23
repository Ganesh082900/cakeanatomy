'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import { Button, Card } from '@/cui';
import { useAuth } from '@/contexts/AuthContext';
import { getMyOrders, Order } from '@/lib/services/orderService';

export default function OrdersPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/orders');
      return;
    }

    fetchOrders();
  }, [isAuthenticated]);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const data = await getMyOrders();
      setOrders(data.orders);
    } catch (err: any) {
      setError(err.message || 'Failed to load orders');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-success-100 text-success-800',
      cancelled: 'bg-error-100 text-error-800',
    };
    return colors[status] || 'bg-neutral-100 text-neutral-800';
  };

  const getPaymentStatusColor = (status: string) => {
    return status === 'paid'
      ? 'bg-success-100 text-success-800'
      : status === 'failed'
      ? 'bg-error-100 text-error-800'
      : 'bg-yellow-100 text-yellow-800';
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-neutral-600">Loading orders...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-display font-bold text-neutral-900">My Orders</h1>
          <Link href="/products">
            <Button color="primary">Continue Shopping</Button>
          </Link>
        </div>

        {error && (
          <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {orders.length === 0 ? (
          <Card>
            <Card.Body>
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-24 w-24 text-neutral-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <h2 className="mt-6 text-2xl font-bold text-neutral-900">No orders yet</h2>
                <p className="mt-2 text-neutral-600">
                  Start shopping to see your orders here!
                </p>
                <Link href="/products">
                  <Button color="primary" size="lg" className="mt-8">
                    Browse Products
                  </Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order._id}>
                <Card.Body>
                  {/* Order Header */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-neutral-200">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold text-neutral-900">
                          Order #{order.orderNumber}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                            order.orderStatus
                          )}`}
                        >
                          {order.orderStatus.toUpperCase()}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getPaymentStatusColor(
                            order.paymentStatus
                          )}`}
                        >
                          {order.paymentStatus.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-600 mt-1">
                        Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary-600">
                        ₹{order.totalPrice.toFixed(2)}
                      </p>
                      <Link href={`/orders/${order._id}`}>
                        <Button variant="outline" size="sm" className="mt-2">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="mt-4 space-y-4">
                    {order.items.map((item) => (
                      <div key={item._id} className="flex gap-4">
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0">
                          <Image
                            src={item.product.images[0] || '/placeholder.jpg'}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <Link href={`/products/${item.product.slug}`}>
                            <h4 className="font-semibold text-neutral-900 hover:text-primary-600">
                              {item.product.name}
                            </h4>
                          </Link>
                          <p className="text-sm text-neutral-600 mt-1">
                            Quantity: {item.quantity} × ₹{item.price.toFixed(2)}
                          </p>
                          {item.selectedVariants && item.selectedVariants.length > 0 && (
                            <div className="mt-1 space-y-0.5">
                              {item.selectedVariants.map((variant, idx) => (
                                <p key={idx} className="text-xs text-neutral-500">
                                  {variant.name}: {variant.value}
                                </p>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-neutral-900">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Delivery Info */}
                  <div className="mt-4 pt-4 border-t border-neutral-200">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-neutral-900 mb-2">
                          Delivery Address
                        </h4>
                        <p className="text-sm text-neutral-600">
                          {order.shippingAddress.fullName}
                        </p>
                        <p className="text-sm text-neutral-600">
                          {order.shippingAddress.addressLine1}
                          {order.shippingAddress.addressLine2 &&
                            `, ${order.shippingAddress.addressLine2}`}
                        </p>
                        <p className="text-sm text-neutral-600">
                          {order.shippingAddress.city}, {order.shippingAddress.state} -{' '}
                          {order.shippingAddress.zipCode}
                        </p>
                        <p className="text-sm text-neutral-600">
                          Phone: {order.shippingAddress.phone}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-neutral-900 mb-2">Payment Info</h4>
                        <p className="text-sm text-neutral-600 capitalize">
                          Method: {order.paymentMethod.replace('-', ' ')}
                        </p>
                        {order.isPaid && order.paidAt && (
                          <p className="text-sm text-success-600">
                            Paid on{' '}
                            {new Date(order.paidAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </p>
                        )}
                        {order.trackingNumber && (
                          <p className="text-sm text-neutral-600 mt-2">
                            Tracking: <span className="font-mono">{order.trackingNumber}</span>
                          </p>
                        )}
                        {order.estimatedDelivery && (
                          <p className="text-sm text-neutral-600">
                            Expected by{' '}
                            {new Date(order.estimatedDelivery).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'long',
                            })}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

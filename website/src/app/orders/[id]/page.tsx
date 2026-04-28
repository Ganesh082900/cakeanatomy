'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/layout/Layout';
import { Button, Card } from '@/cui';
import { useAuth } from '@/contexts/AuthContext';
import { getOrder, cancelOrder, Order } from '@/lib/services/orderService';

export default function OrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const { isAuthenticated } = useAuth();
  const orderId = params.id as string;
  const isSuccess = searchParams.get('success') === 'true';

  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCancelling, setIsCancelling] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login?redirect=/orders');
      return;
    }

    fetchOrder();
  }, [isAuthenticated, orderId]);

  const fetchOrder = async () => {
    try {
      setIsLoading(true);
      const data = await getOrder(orderId);
      setOrder(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load order');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    if (!confirm('Are you sure you want to cancel this order?')) return;

    try {
      setIsCancelling(true);
      const updatedOrder = await cancelOrder(orderId);
      setOrder(updatedOrder);
    } catch (err: any) {
      alert(err.message || 'Failed to cancel order');
    } finally {
      setIsCancelling(false);
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

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-neutral-600">Loading order...</p>
        </div>
      </Layout>
    );
  }

  if (error || !order) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Order not found</h2>
          <p className="text-neutral-600 mb-8">{error || 'This order does not exist'}</p>
          <Link href="/orders">
            <Button color="primary">View All Orders</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Message */}
        {isSuccess && (
          <div className="bg-success-50 border border-success-200 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-3">
              <svg className="w-8 h-8 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-success-900">Order Placed Successfully!</h3>
                <p className="text-success-700">
                  Your order #{order.orderNumber} has been confirmed. We'll send you updates via email.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Link href="/orders" className="text-neutral-600 hover:text-primary-600">
                ← Back to Orders
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-display font-bold text-neutral-900">
                Order #{order.orderNumber}
              </h1>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                  order.orderStatus
                )}`}
              >
                {order.orderStatus.toUpperCase()}
              </span>
            </div>
            <p className="text-neutral-600 mt-1">
              Placed on{' '}
              {new Date(order.createdAt).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
          {order.orderStatus === 'pending' && !order.isCancelled && (
            <Button variant="outline" onClick={handleCancelOrder} isLoading={isCancelling}>
              Cancel Order
            </Button>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <Card>
              <Card.Header>
                <h2 className="text-xl font-bold">Order Items</h2>
              </Card.Header>
              <Card.Body>
                <div className="divide-y divide-neutral-200">
                  {order.items.map((item) => (
                    <div key={item._id} className="py-4 first:pt-0 last:pb-0">
                      <div className="flex gap-4">
                        <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0">
                          <Image
                            src={item.product.images[0] || '/placeholder.jpg'}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <Link href={`/products/${item.product.slug}`}>
                            <h3 className="font-semibold text-neutral-900 hover:text-primary-600">
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
                          <p className="text-sm text-neutral-600 mt-2">
                            Quantity: {item.quantity} × ₹{item.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-neutral-900">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>

            {/* Shipping Address */}
            <Card>
              <Card.Header>
                <h2 className="text-xl font-bold">Delivery Address</h2>
              </Card.Header>
              <Card.Body>
                <div className="text-neutral-900">
                  <p className="font-semibold">{order.shippingAddress.fullName}</p>
                  <p className="text-neutral-600 mt-1">{order.shippingAddress.addressLine1}</p>
                  {order.shippingAddress.addressLine2 && (
                    <p className="text-neutral-600">{order.shippingAddress.addressLine2}</p>
                  )}
                  <p className="text-neutral-600">
                    {order.shippingAddress.city}, {order.shippingAddress.state} -{' '}
                    {order.shippingAddress.zipCode}
                  </p>
                  <p className="text-neutral-600">{order.shippingAddress.country}</p>
                  <p className="text-neutral-600 mt-2">Phone: {order.shippingAddress.phone}</p>
                </div>
              </Card.Body>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Order Summary */}
            <Card>
              <Card.Header>
                <h2 className="text-xl font-bold">Order Summary</h2>
              </Card.Header>
              <Card.Body>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Items Price</span>
                    <span className="font-medium">₹{order.itemsPrice.toFixed(2)}</span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600">Discount</span>
                      <span className="font-medium text-success-600">
                        -₹{order.discount.toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Tax (GST)</span>
                    <span className="font-medium">₹{order.taxPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Shipping</span>
                    <span className="font-medium">
                      {order.shippingPrice === 0 ? (
                        <span className="text-success-600">FREE</span>
                      ) : (
                        `₹${order.shippingPrice.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="border-t pt-3 flex justify-between">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-lg font-bold text-primary-600">
                      ₹{order.totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* Payment & Tracking */}
            <Card>
              <Card.Header>
                <h2 className="text-xl font-bold">Payment & Delivery</h2>
              </Card.Header>
              <Card.Body>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-neutral-600 mb-1">Payment Method</p>
                    <p className="font-medium capitalize">
                      {order.paymentMethod.replace('-', ' ')}
                    </p>
                  </div>
                  <div>
                    <p className="text-neutral-600 mb-1">Payment Status</p>
                    <p
                      className={`font-medium ${
                        order.isPaid ? 'text-success-600' : 'text-yellow-600'
                      }`}
                    >
                      {order.isPaid ? 'Paid' : 'Pending'}
                    </p>
                    {order.isPaid && order.paidAt && (
                      <p className="text-xs text-neutral-500 mt-1">
                        {new Date(order.paidAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    )}
                  </div>
                  {order.trackingNumber && (
                    <div>
                      <p className="text-neutral-600 mb-1">Tracking Number</p>
                      <p className="font-mono font-medium">{order.trackingNumber}</p>
                    </div>
                  )}
                  {order.estimatedDelivery && (
                    <div>
                      <p className="text-neutral-600 mb-1">Estimated Delivery</p>
                      <p className="font-medium">
                        {new Date(order.estimatedDelivery).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  )}
                  {order.isDelivered && order.deliveredAt && (
                    <div>
                      <p className="text-neutral-600 mb-1">Delivered On</p>
                      <p className="font-medium text-success-600">
                        {new Date(order.deliveredAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  )}
                </div>
              </Card.Body>
            </Card>

            {/* Actions */}
            <Card>
              <Card.Body>
                <div className="space-y-3">
                  <Button variant="outline" fullWidth>
                    Download Invoice
                  </Button>
                  <Link href="/contact">
                    <Button variant="outline" fullWidth>
                      Contact Support
                    </Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}

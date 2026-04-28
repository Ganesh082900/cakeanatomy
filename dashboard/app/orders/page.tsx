'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, Button } from '@/cui';
import { ordersService } from '@/lib/services/orders';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ status: '', source: '' });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await ordersService.getAllOrders({
          status: filter.status || undefined,
          source: filter.source || undefined,
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [filter]);

  const sources = ['all', 'platform', 'swiggy', 'zomato', 'in-store', 'phone', 'whatsapp'];
  const statuses = ['all', 'pending', 'confirmed', 'in-production', 'ready', 'delivered', 'cancelled'];

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <Card.Body>
          <div className="flex gap-4 flex-wrap">
            <div>
              <label className="text-sm font-medium text-neutral-700 mb-2 block">Source</label>
              <div className="flex gap-2">
                {sources.map((source) => (
                  <Button
                    key={source}
                    size="sm"
                    variant={filter.source === (source === 'all' ? '' : source) ? 'solid' : 'outline'}
                    color="primary"
                    onClick={() => setFilter(prev => ({ ...prev, source: source === 'all' ? '' : source }))}
                  >
                    {source === 'all' ? 'All' : source.charAt(0).toUpperCase() + source.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-700 mb-2 block">Status</label>
              <div className="flex gap-2">
                {statuses.slice(0, 4).map((status) => (
                  <Button
                    key={status}
                    size="sm"
                    variant={filter.status === (status === 'all' ? '' : status) ? 'solid' : 'outline'}
                    color="primary"
                    onClick={() => setFilter(prev => ({ ...prev, status: status === 'all' ? '' : status }))}
                  >
                    {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Orders Table */}
      <Card>
        <Card.Header>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">All Orders ({orders.length})</h2>
            <Button variant="solid" color="primary">Create Order</Button>
          </div>
        </Card.Header>
        <Card.Body>
          {loading ? (
            <div className="text-center py-12 text-neutral-500">Loading orders...</div>
          ) : orders.length === 0 ? (
            <div className="text-center py-12 text-neutral-500">No orders found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Order #</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Source</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Customer</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Items</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Amount</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border-b border-neutral-100 hover:bg-neutral-50">
                      <td className="py-3 px-4">
                        <Link 
                          href={`/orders/${order._id}`}
                          className="text-sm font-medium text-primary-600 hover:text-primary-700"
                        >
                          {order.orderNumber}
                        </Link>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-2">
                          <span className="text-lg">
                            {order.source === 'swiggy' && '🛵'}
                            {order.source === 'zomato' && '🍔'}
                            {order.source === 'platform' && '🌐'}
                            {order.source === 'in-store' && '🏪'}
                            {order.source === 'phone' && '📞'}
                            {order.source === 'whatsapp' && '💬'}
                          </span>
                          <span className="text-sm text-neutral-600 capitalize">{order.source}</span>
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-neutral-900">
                        {order.customer?.name || 'Guest'}
                      </td>
                      <td className="py-3 px-4 text-sm text-neutral-600">
                        {order.items?.length || 0} items
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-neutral-900">
                        ₹{order.total?.toFixed(0)}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            order.status === 'delivered' || order.status === 'completed'
                              ? 'bg-success-100 text-success-700'
                              : order.status === 'cancelled'
                              ? 'bg-error-100 text-error-700'
                              : order.status === 'pending'
                              ? 'bg-warning-100 text-warning-700'
                              : 'bg-info-100 text-info-700'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-neutral-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

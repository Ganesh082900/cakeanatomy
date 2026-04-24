'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/cui';
import { analyticsService, type DashboardOverview } from '@/lib/services/analytics';

export default function DashboardPage() {
  const [data, setData] = useState<DashboardOverview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await analyticsService.getDashboardOverview();
        setData(response.data);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-lg text-neutral-500">Loading dashboard...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-lg text-error-600">Failed to load dashboard data</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Today's Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card variant="elevated">
            <Card.Body>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600">Today's Orders</p>
                  <p className="text-3xl font-bold text-neutral-900 mt-1">
                    {data.overview.todaysOrders}
                  </p>
                </div>
                <div className="text-4xl">📦</div>
              </div>
            </Card.Body>
          </Card>

          <Card variant="elevated">
            <Card.Body>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600">Today's Revenue</p>
                  <p className="text-3xl font-bold text-success-600 mt-1">
                    ₹{data.overview.todaysRevenue.toFixed(0)}
                  </p>
                </div>
                <div className="text-4xl">💰</div>
              </div>
            </Card.Body>
          </Card>

          <Card variant="elevated">
            <Card.Body>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600">Monthly Revenue</p>
                  <p className="text-3xl font-bold text-primary-600 mt-1">
                    ₹{data.overview.monthlyRevenue.toFixed(0)}
                  </p>
                </div>
                <div className="text-4xl">📈</div>
              </div>
            </Card.Body>
          </Card>

          <Card variant="elevated">
            <Card.Body>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600">Pending Orders</p>
                  <p className="text-3xl font-bold text-warning-600 mt-1">
                    {data.overview.pendingOrders}
                  </p>
                </div>
                <div className="text-4xl">⏳</div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* Sales by Source */}
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Sales by Source</h3>
        <Card variant="elevated">
          <Card.Body>
            <div className="space-y-4">
              {data.overview.salesBySource.map((source) => (
                <div key={source.source} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">
                        {source.source === 'swiggy' && '🛵'}
                        {source.source === 'zomato' && '🍔'}
                        {source.source === 'platform' && '🌐'}
                        {source.source === 'in-store' && '🏪'}
                        {source.source === 'phone' && '📞'}
                        {source.source === 'whatsapp' && '💬'}
                      </span>
                      <div>
                        <p className="font-medium text-neutral-900 capitalize">{source.source}</p>
                        <p className="text-sm text-neutral-500">{source.count} orders</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-neutral-900">₹{source.revenue.toFixed(0)}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="outline">
          <Card.Body>
            <div className="flex items-center gap-3">
              <div className="text-3xl">⚠️</div>
              <div>
                <p className="text-sm text-neutral-600">Low Stock Items</p>
                <p className="text-2xl font-bold text-warning-600">{data.inventory.lowStock}</p>
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card variant="outline">
          <Card.Body>
            <div className="flex items-center gap-3">
              <div className="text-3xl">⏰</div>
              <div>
                <p className="text-sm text-neutral-600">Expiring Soon</p>
                <p className="text-2xl font-bold text-error-600">{data.inventory.expiring}</p>
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card variant="outline">
          <Card.Body>
            <div className="flex items-center gap-3">
              <div className="text-3xl">👥</div>
              <div>
                <p className="text-sm text-neutral-600">Staff Present</p>
                <p className="text-2xl font-bold text-success-600">
                  {data.staff.present}/{data.staff.total}
                  <span className="text-sm text-neutral-500 ml-2">
                    ({data.staff.attendanceRate}%)
                  </span>
                </p>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* Recent Orders */}
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Recent Orders</h3>
        <Card variant="elevated">
          <Card.Body>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">
                      Order #
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">
                      Source
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">
                      Customer
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">
                      Amount
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.recentOrders.map((order: any) => (
                    <tr key={order._id} className="border-b border-neutral-100 hover:bg-neutral-50">
                      <td className="py-3 px-4 text-sm font-medium text-neutral-900">
                        {order.orderNumber}
                      </td>
                      <td className="py-3 px-4 text-sm text-neutral-600 capitalize">
                        {order.source}
                      </td>
                      <td className="py-3 px-4 text-sm text-neutral-600">
                        {order.customer?.name || 'N/A'}
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-neutral-900">
                        ₹{order.total.toFixed(0)}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            order.status === 'delivered' || order.status === 'completed'
                              ? 'bg-success-100 text-success-700'
                              : order.status === 'cancelled'
                              ? 'bg-error-100 text-error-700'
                              : 'bg-warning-100 text-warning-700'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

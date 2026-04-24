'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Dashboard', href: '/', icon: '📊' },
  { 
    name: 'Orders', 
    href: '/orders', 
    icon: '📦',
    children: [
      { name: 'All Orders', href: '/orders' },
      { name: 'Platform Orders', href: '/orders/platform' },
      { name: 'Swiggy Orders', href: '/orders/swiggy' },
      { name: 'Zomato Orders', href: '/orders/zomato' },
      { name: 'In-Store Orders', href: '/orders/in-store' },
      { name: 'Phone Orders', href: '/orders/phone' },
      { name: 'WhatsApp Orders', href: '/orders/whatsapp' },
      { name: 'Custom Cakes', href: '/orders/custom-cakes' },
      { name: 'Cancelled Orders', href: '/orders/cancelled' },
    ]
  },
  { 
    name: 'Analytics', 
    href: '/analytics', 
    icon: '📈',
    children: [
      { name: 'Sales Analytics', href: '/analytics/sales' },
      { name: 'Product Performance', href: '/analytics/products' },
      { name: 'Financial Reports', href: '/analytics/financial' },
    ]
  },
  { 
    name: 'Inventory', 
    href: '/inventory', 
    icon: '📦',
    children: [
      { name: 'Raw Materials', href: '/inventory/materials' },
      { name: 'Finished Products', href: '/inventory/products' },
      { name: 'Expiry Tracker', href: '/inventory/expiry' },
      { name: 'Recipes', href: '/inventory/recipes' },
    ]
  },
  { name: 'Customers', href: '/customers', icon: '👥' },
  { 
    name: 'Omni-Channel Marketing', 
    href: '/marketing', 
    icon: '📢',
    children: [
      { name: 'Campaigns', href: '/marketing/campaigns' },
      { name: 'WhatsApp', href: '/marketing/whatsapp' },
      { name: 'SMS', href: '/marketing/sms' },
      { name: 'Email', href: '/marketing/email' },
    ]
  },
  { 
    name: 'Promotions', 
    href: '/promotions', 
    icon: '🎟️',
    children: [
      { name: 'Coupons', href: '/promotions/coupons' },
      { name: 'Gift Cards', href: '/promotions/gift-cards' },
    ]
  },
  { 
    name: 'Production', 
    href: '/production', 
    icon: '🏭',
    children: [
      { name: 'Schedule', href: '/production/schedule' },
      { name: 'Kitchen Display', href: '/production/kds' },
    ]
  },
  { 
    name: 'Staff', 
    href: '/staff', 
    icon: '👨‍🍳',
    children: [
      { name: 'Directory', href: '/staff' },
      { name: 'Attendance', href: '/staff/attendance' },
      { name: 'Shifts', href: '/staff/shifts' },
    ]
  },
  { name: 'POS', href: '/pos', icon: '💰' },
  { name: 'Settings', href: '/settings', icon: '⚙️' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (name: string) => {
    setExpandedItems(prev =>
      prev.includes(name) ? prev.filter(item => item !== name) : [...prev, name]
    );
  };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href);
  };

  return (
    <div className="flex h-screen bg-neutral-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-neutral-200 flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-neutral-200">
          <h1 className="text-xl font-bold text-primary-600">🎂 CakeAnatomy</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          {navigation.map((item) => (
            <div key={item.name}>
              {item.children ? (
                <div>
                  <button
                    onClick={() => toggleExpanded(item.name)}
                    className={`w-full flex items-center justify-between px-6 py-2.5 text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span>{item.icon}</span>
                      <span>{item.name}</span>
                    </span>
                    <span className="text-xs">
                      {expandedItems.includes(item.name) ? '▼' : '▶'}
                    </span>
                  </button>
                  {expandedItems.includes(item.name) && (
                    <div className="bg-neutral-50">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`block px-6 pl-14 py-2 text-sm transition-colors ${
                            pathname === child.href
                              ? 'text-primary-600 font-medium'
                              : 'text-neutral-600 hover:text-neutral-900'
                          }`}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-6 py-2.5 text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-semibold">
              A
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-neutral-900">Admin User</p>
              <p className="text-xs text-neutral-500">admin@cakeanatomy.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-8">
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">
              {navigation.find(item => isActive(item.href))?.name || 'Dashboard'}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
              🔔
            </button>
            <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
              ⚙️
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

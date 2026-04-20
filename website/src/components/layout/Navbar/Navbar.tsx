'use client';

import Link from 'next/link';
import { Button } from '@/cui';
import Logo from '@/components/shared/Logo';
import SearchBar from '@/components/shared/SearchBar';
import MobileMenu from '@/components/shared/MobileMenu';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Premium', href: '/premium' },
  { label: 'Classes (1:1)', href: '/classes' },
  { label: 'Recipe Book', href: '/recipe-book' },
  { label: 'Customised Cake', href: '/customised-cake' },
  { label: 'Products', href: '/products' },
  { label: 'Contact Us', href: '/contact' },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-neutral-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo size="md" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1 xl:space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Search & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <SearchBar className="w-64" />
            <Link href="/order-online">
              <Button color="primary" size="md">
                Order Online
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <MobileMenu navItems={navItems} />
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden pb-4">
          <SearchBar />
        </div>
      </div>
    </nav>
  );
}

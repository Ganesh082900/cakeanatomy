'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import { Card, Button, Input } from '@/cui';
import { ProductCard } from '@/components/products/ProductCard';
import { getProducts, getCategories, Product, Category } from '@/lib/services';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Filters
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'featured');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [search, selectedCategory, selectedType, sortBy, page]);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      console.error('Failed to load categories');
    }
  };

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const params: any = { page, limit: 12 };
      
      if (search) params.search = search;
      if (selectedCategory) params.category = selectedCategory;
      if (selectedType) params.type = selectedType;
      if (sortBy && sortBy !== 'featured') params.sort = sortBy;

      const data = await getProducts(params);
      setProducts(data.products);
      setTotalPages(data.pages);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchProducts();
  };

  const productTypes = ['All Types', 'pastry', 'confection', 'bakery', 'cake'];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-neutral-900 mb-6">
            Our Products
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Browse our delicious selection of handcrafted cakes, made fresh daily with premium ingredients.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-12">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
            <div className="flex gap-2">
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for cakes, pastries, confections..."
                className="flex-1"
              />
              <Button type="submit" color="primary">
                Search
              </Button>
            </div>
          </form>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <button
              onClick={() => {
                setSelectedCategory('');
                setPage(1);
              }}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === ''
                  ? 'bg-primary-600 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => {
                  setSelectedCategory(category._id);
                  setPage(1);
                }}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category._id
                    ? 'bg-primary-600 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          {/* Type & Sort Filters */}
          <div className="flex flex-wrap justify-center gap-4">
            <select
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value);
                setPage(1);
              }}
              className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {productTypes.map((type) => (
                <option key={type} value={type === 'All Types' ? '' : type}>
                  {type === 'All Types' ? type : type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setPage(1);
              }}
              className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg mb-8 text-center">
            {error}
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-neutral-600">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-neutral-600 mb-4">No products found</p>
            <Button
              onClick={() => {
                setSearch('');
                setSelectedCategory('');
                setSelectedType('');
                setSortBy('featured');
                setPage(1);
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <>
            {/* Products Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                        page === p
                          ? 'bg-primary-600 text-white'
                          : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}

        {/* CTA */}
        <Card className="bg-primary-600 text-white">
          <Card.Body className="text-center py-12">
            <h2 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
            <p className="text-lg mb-6 opacity-90">
              Create a custom cake designed exactly how you want it
            </p>
            <Button variant="outline" size="lg" className="bg-white text-primary-600 hover:bg-neutral-50">
              Design Custom Cake
            </Button>
          </Card.Body>
        </Card>
      </div>
    </Layout>
  );
}

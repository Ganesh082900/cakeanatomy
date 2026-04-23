'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { Button, Card } from '@/cui';
import { Product, getProductBySlug } from '@/lib/services';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  const fetchProduct = async () => {
    try {
      setIsLoading(true);
      const data = await getProductBySlug(slug);
      setProduct(data);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to load product');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;

    if (!isAuthenticated) {
      router.push(`/login?redirect=/products/${slug}`);
      return;
    }

    try {
      setIsAddingToCart(true);
      await addToCart({
        productId: product._id,
        quantity,
        selectedVariants: product.variants
          ?.filter((v) => selectedVariants[v.name])
          .map((v) => ({ name: v.name, value: selectedVariants[v.name] })),
      });
      alert('Added to cart!');
    } catch (error: any) {
      alert(error.message || 'Failed to add to cart');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    if (!product) return;
    
    if (!isAuthenticated) {
      router.push(`/login?redirect=/products/${slug}`);
      return;
    }

    await handleAddToCart();
    router.push('/checkout');
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-neutral-600">Loading product...</p>
        </div>
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Product not found</h2>
          <p className="text-neutral-600 mb-8">{error || 'This product does not exist'}</p>
          <Link href="/products">
            <Button color="primary">Browse Products</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const discountPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex text-sm mb-8">
          <Link href="/" className="text-neutral-600 hover:text-primary-600">
            Home
          </Link>
          <span className="mx-2 text-neutral-400">/</span>
          <Link href="/products" className="text-neutral-600 hover:text-primary-600">
            Products
          </Link>
          <span className="mx-2 text-neutral-400">/</span>
          <Link href={`/products?category=${product.category._id}`} className="text-neutral-600 hover:text-primary-600">
            {product.category.name}
          </Link>
          <span className="mx-2 text-neutral-400">/</span>
          <span className="text-neutral-900 font-medium">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            {/* Main Image */}
            <div className="relative aspect-square rounded-lg overflow-hidden bg-neutral-100 mb-4">
              <Image
                src={product.images[selectedImage] || '/placeholder.jpg'}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.isFeatured && (
                <div className="absolute left-4 top-4 bg-primary-600 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                  Featured
                </div>
              )}
              {discountPercent > 0 && (
                <div className="absolute right-4 top-4 bg-secondary-600 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                  {discountPercent}% OFF
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === idx
                        ? 'border-primary-600'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <Image src={image} alt={`${product.name} ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <span className="text-sm font-medium text-primary-600 uppercase tracking-wide">
                {product.category.name}
              </span>
            </div>

            <h1 className="text-4xl font-display font-bold text-neutral-900 mb-4">{product.name}</h1>

            {/* Rating */}
            {product.rating > 0 && (
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.round(product.rating) ? 'text-yellow-400' : 'text-neutral-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-neutral-600">
                  {product.rating.toFixed(1)} ({product.numReviews} reviews)
                </span>
              </div>
            )}

            <p className="text-neutral-700 mb-6 leading-relaxed">{product.description}</p>

            {/* Price */}
            <div className="mb-8">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-neutral-900">₹{product.price.toFixed(2)}</span>
                {product.compareAtPrice && (
                  <span className="text-xl text-neutral-400 line-through">
                    ₹{product.compareAtPrice.toFixed(2)}
                  </span>
                )}
              </div>
              <p className="text-sm text-neutral-600 mt-2">Inclusive of all taxes</p>
            </div>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-8 space-y-4">
                {product.variants.map((variant) => (
                  <div key={variant.name}>
                    <label className="block text-sm font-medium text-neutral-900 mb-2">
                      {variant.name}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {variant.options.map((option) => (
                        <button
                          key={option}
                          onClick={() =>
                            setSelectedVariants({ ...selectedVariants, [variant.name]: option })
                          }
                          className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                            selectedVariants[variant.name] === option
                              ? 'border-primary-600 bg-primary-50 text-primary-700 font-medium'
                              : 'border-neutral-200 hover:border-neutral-300'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-neutral-900 mb-2">Quantity</label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border-2 border-neutral-300 flex items-center justify-center hover:bg-neutral-100 disabled:opacity-50"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="w-16 text-center text-lg font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-10 h-10 rounded-lg border-2 border-neutral-300 flex items-center justify-center hover:bg-neutral-100 disabled:opacity-50"
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
                <span className="text-sm text-neutral-600">({product.stock} in stock)</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4 mb-8">
              {product.isAvailable ? (
                <>
                  <Button
                    color="primary"
                    size="xl"
                    fullWidth
                    onClick={handleBuyNow}
                    isLoading={isAddingToCart}
                  >
                    Buy Now
                  </Button>
                  <Button
                    variant="outline"
                    size="xl"
                    fullWidth
                    onClick={handleAddToCart}
                    isLoading={isAddingToCart}
                  >
                    Add to Cart
                  </Button>
                </>
              ) : (
                <Button size="xl" fullWidth disabled>
                  Out of Stock
                </Button>
              )}
            </div>

            {/* Additional Info */}
            <Card>
              <Card.Body>
                <div className="space-y-4 text-sm">
                  {product.allergens && product.allergens.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-2">Allergens:</h3>
                      <p className="text-neutral-600">{product.allergens.join(', ')}</p>
                    </div>
                  )}
                  {product.nutritionalInfo && (
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-2">Nutritional Info:</h3>
                      <div className="grid grid-cols-2 gap-2 text-neutral-600">
                        <div>Calories: {product.nutritionalInfo.calories}kcal</div>
                        <div>Protein: {product.nutritionalInfo.protein}g</div>
                        <div>Carbs: {product.nutritionalInfo.carbohydrates}g</div>
                        <div>Fat: {product.nutritionalInfo.fat}g</div>
                      </div>
                    </div>
                  )}
                  {product.tags && product.tags.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-2">Tags:</h3>
                      <div className="flex flex-wrap gap-2">
                        {product.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}

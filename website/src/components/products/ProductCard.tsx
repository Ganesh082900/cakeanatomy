'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/services';
import { Button } from '@/cui';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = React.useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setIsAdding(true);
      await addToCart({
        productId: product._id,
        quantity: 1,
      });
      // Show success toast/notification
      alert('Added to cart!');
    } catch (error: any) {
      alert(error.message || 'Failed to add to cart');
    } finally {
      setIsAdding(false);
    }
  };

  const discountPercent = product.compareAtPrice
    ? Math.round(
        ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
      )
    : 0;

  return (
    <Link href={`/products/${product.slug}`}>
      <div className="group relative overflow-hidden rounded-lg border border-neutral-200 bg-white transition-all hover:shadow-lg">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-neutral-100">
          <Image
            src={product.images[0] || '/placeholder.jpg'}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          {product.isFeatured && (
            <div className="absolute left-2 top-2 rounded bg-primary-600 px-2 py-1 text-xs font-semibold text-white">
              Featured
            </div>
          )}
          {discountPercent > 0 && (
            <div className="absolute right-2 top-2 rounded bg-secondary-600 px-2 py-1 text-xs font-semibold text-white">
              {discountPercent}% OFF
            </div>
          )}
          {!product.isAvailable && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <span className="text-lg font-semibold text-white">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <div className="mb-2">
            <span className="text-xs font-medium uppercase tracking-wide text-neutral-500">
              {product.category.name}
            </span>
          </div>

          <h3 className="mb-2 text-lg font-semibold text-neutral-900 line-clamp-2">
            {product.name}
          </h3>

          {product.shortDescription && (
            <p className="mb-3 text-sm text-neutral-600 line-clamp-2">
              {product.shortDescription}
            </p>
          )}

          {/* Rating */}
          {product.rating > 0 && (
            <div className="mb-3 flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.round(product.rating)
                        ? 'text-yellow-400'
                        : 'text-neutral-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-neutral-600">
                ({product.numReviews})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="mb-4 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-neutral-900">
              ₹{product.price}
            </span>
            {product.compareAtPrice && (
              <span className="text-sm text-neutral-500 line-through">
                ₹{product.compareAtPrice}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button
            variant="solid"
            color="primary"
            fullWidth
            disabled={!product.isAvailable || isAdding}
            onClick={handleAddToCart}
          >
            {isAdding ? 'Adding...' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </Link>
  );
}

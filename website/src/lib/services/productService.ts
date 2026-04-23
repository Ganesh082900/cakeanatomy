import { api } from '../api';

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  category: {
    _id: string;
    name: string;
    slug: string;
  };
  type: 'pastry' | 'confection' | 'bakery' | 'cake';
  images: string[];
  price: number;
  compareAtPrice?: number;
  weight?: number;
  weightUnit?: 'g' | 'kg' | 'lb';
  stock: number;
  sku?: string;
  isAvailable: boolean;
  isFeatured: boolean;
  tags: string[];
  allergens: string[];
  nutritionalInfo?: {
    calories?: number;
    protein?: number;
    carbohydrates?: number;
    fat?: number;
  };
  ingredients?: string[];
  variants?: Array<{
    name: string;
    options: Array<{
      value: string;
      priceModifier: number;
    }>;
  }>;
  rating: number;
  numReviews: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  success: boolean;
  count: number;
  total: number;
  page: number;
  pages: number;
  data: Product[];
}

export interface ProductQuery {
  page?: number;
  limit?: number;
  category?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  featured?: boolean;
  sort?: 'price-asc' | 'price-desc' | 'name' | 'rating';
}

export const productService = {
  async getProducts(query: ProductQuery = {}): Promise<ProductsResponse> {
    const params = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined) {
        params.append(key, value.toString());
      }
    });

    const queryString = params.toString();
    return api.get<ProductsResponse>(
      `/products${queryString ? `?${queryString}` : ''}`
    );
  },

  async getFeaturedProducts(
    limit = 8
  ): Promise<{ success: boolean; count: number; data: Product[] }> {
    return api.get<{ success: boolean; count: number; data: Product[] }>(
      `/products/featured?limit=${limit}`
    );
  },

  async getProduct(
    id: string
  ): Promise<{ success: boolean; data: Product }> {
    return api.get<{ success: boolean; data: Product }>(`/products/${id}`);
  },

  async getProductBySlug(
    slug: string
  ): Promise<{ success: boolean; data: Product }> {
    return api.get<{ success: boolean; data: Product }>(
      `/products/slug/${slug}`
    );
  },
};

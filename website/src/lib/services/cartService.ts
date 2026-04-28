import { api } from '../api';
import { Product } from './productService';

export interface CartItem {
  product: Product;
  quantity: number;
  price: number;
  selectedVariants?: Array<{
    name: string;
    value: string;
    priceModifier: number;
  }>;
  subtotal: number;
}

export interface Cart {
  _id: string;
  user?: string;
  sessionId?: string;
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  couponCode?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AddToCartData {
  productId: string;
  quantity: number;
  selectedVariants?: Array<{
    name: string;
    value: string;
    priceModifier: number;
  }>;
}

export const cartService = {
  async getCart(token: string): Promise<{ success: boolean; data: Cart }> {
    return api.get<{ success: boolean; data: Cart }>('/cart', token);
  },

  async getCartBySession(
    sessionId: string
  ): Promise<{ success: boolean; data: Cart }> {
    return api.get<{ success: boolean; data: Cart }>(
      `/cart/session/${sessionId}`
    );
  },

  async addToCart(
    data: AddToCartData,
    token: string
  ): Promise<{ success: boolean; data: Cart }> {
    return api.post<{ success: boolean; data: Cart }>(
      '/cart/items',
      data,
      token
    );
  },

  async updateCartItem(
    productId: string,
    quantity: number,
    token: string
  ): Promise<{ success: boolean; data: Cart }> {
    return api.put<{ success: boolean; data: Cart }>(
      `/cart/items/${productId}`,
      { quantity },
      token
    );
  },

  async removeFromCart(
    productId: string,
    token: string
  ): Promise<{ success: boolean; data: Cart }> {
    return api.delete<{ success: boolean; data: Cart }>(
      `/cart/items/${productId}`,
      token
    );
  },

  async clearCart(token: string): Promise<{ success: boolean; data: Cart }> {
    return api.delete<{ success: boolean; data: Cart }>('/cart', token);
  },

  async applyCoupon(
    couponCode: string,
    token: string
  ): Promise<{ success: boolean; data: Cart }> {
    return api.post<{ success: boolean; data: Cart }>(
      '/cart/coupon',
      { couponCode },
      token
    );
  },

  async mergeCart(
    sessionId: string,
    token: string
  ): Promise<{ success: boolean; data: Cart }> {
    return api.post<{ success: boolean; data: Cart }>(
      '/cart/merge',
      { sessionId },
      token
    );
  },
};

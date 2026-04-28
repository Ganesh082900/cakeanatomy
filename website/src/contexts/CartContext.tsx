'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { cartService, Cart, AddToCartData } from '@/lib/services';
import { useAuth } from './AuthContext';
import { v4 as uuidv4 } from 'uuid';

interface CartContextType {
  cart: Cart | null;
  isLoading: boolean;
  addToCart: (data: AddToCartData) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  applyCoupon: (code: string) => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { token, isAuthenticated } = useAuth();
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionId, setSessionId] = useState<string>('');

  useEffect(() => {
    // Get or create session ID for guest users
    let sid = localStorage.getItem('sessionId');
    if (!sid) {
      sid = uuidv4();
      localStorage.setItem('sessionId', sid);
    }
    setSessionId(sid);
  }, []);

  useEffect(() => {
    if (sessionId) {
      fetchCart();
    }
  }, [token, isAuthenticated, sessionId]);

  const fetchCart = async () => {
    try {
      setIsLoading(true);
      let response;

      if (isAuthenticated && token) {
        response = await cartService.getCart(token);
      } else if (sessionId) {
        response = await cartService.getCartBySession(sessionId);
      }

      if (response) {
        setCart(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (data: AddToCartData) => {
    if (!token) {
      throw new Error('Please login to add items to cart');
    }

    try {
      const response = await cartService.addToCart(data, token);
      setCart(response.data);
    } catch (error) {
      console.error('Failed to add to cart:', error);
      throw error;
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (!token) throw new Error('Not authenticated');

    try {
      const response = await cartService.updateCartItem(productId, quantity, token);
      setCart(response.data);
    } catch (error) {
      console.error('Failed to update cart:', error);
      throw error;
    }
  };

  const removeItem = async (productId: string) => {
    if (!token) throw new Error('Not authenticated');

    try {
      const response = await cartService.removeFromCart(productId, token);
      setCart(response.data);
    } catch (error) {
      console.error('Failed to remove item:', error);
      throw error;
    }
  };

  const clearCart = async () => {
    if (!token) throw new Error('Not authenticated');

    try {
      const response = await cartService.clearCart(token);
      setCart(response.data);
    } catch (error) {
      console.error('Failed to clear cart:', error);
      throw error;
    }
  };

  const applyCoupon = async (code: string) => {
    if (!token) throw new Error('Not authenticated');

    try {
      const response = await cartService.applyCoupon(code, token);
      setCart(response.data);
    } catch (error) {
      console.error('Failed to apply coupon:', error);
      throw error;
    }
  };

  const refreshCart = async () => {
    await fetchCart();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        applyCoupon,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

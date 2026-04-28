export { authService } from './authService';
export type { User, Address, RegisterData, LoginData, AuthResponse } from './authService';

export { productService } from './productService';
export type { Product, ProductsResponse, ProductQuery } from './productService';

export { categoryService } from './categoryService';
export type { Category } from './categoryService';

export { cartService } from './cartService';
export type { Cart, CartItem, AddToCartData } from './cartService';

export { orderService } from './orderService';
export type {
  Order,
  OrderItem,
  OrderAddress,
  CreateOrderData,
  OrdersResponse,
} from './orderService';

import { api } from '../api';

export interface OrderItem {
  product: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
  selectedVariants?: Array<{
    name: string;
    value: string;
    priceModifier: number;
  }>;
  subtotal: number;
}

export interface OrderAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
}

export interface Order {
  _id: string;
  orderNumber: string;
  user: string;
  items: OrderItem[];
  shippingAddress: OrderAddress;
  billingAddress?: OrderAddress;
  paymentMethod: 'card' | 'upi' | 'netbanking' | 'cod' | 'wallet';
  paymentStatus: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
  paymentResult?: {
    id: string;
    status: string;
    updateTime: string;
    emailAddress?: string;
  };
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  discount: number;
  totalPrice: number;
  couponCode?: string;
  orderStatus:
    | 'pending'
    | 'confirmed'
    | 'processing'
    | 'shipped'
    | 'delivered'
    | 'cancelled';
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
  cancelledAt?: string;
  cancellationReason?: string;
  notes?: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderData {
  shippingAddress: OrderAddress;
  billingAddress?: OrderAddress;
  paymentMethod: 'card' | 'upi' | 'netbanking' | 'cod' | 'wallet';
  notes?: string;
}

export interface OrdersResponse {
  success: boolean;
  count: number;
  total: number;
  page: number;
  pages: number;
  data: Order[];
}

export const orderService = {
  async createOrder(
    data: CreateOrderData,
    token: string
  ): Promise<{ success: boolean; data: Order }> {
    return api.post<{ success: boolean; data: Order }>('/orders', data, token);
  },

  async getMyOrders(
    page = 1,
    limit = 10,
    token: string
  ): Promise<OrdersResponse> {
    return api.get<OrdersResponse>(
      `/orders?page=${page}&limit=${limit}`,
      token
    );
  },

  async getOrder(
    orderId: string,
    token: string
  ): Promise<{ success: boolean; data: Order }> {
    return api.get<{ success: boolean; data: Order }>(
      `/orders/${orderId}`,
      token
    );
  },

  async updateOrderToPaid(
    orderId: string,
    paymentResult: {
      id: string;
      status: string;
      email_address?: string;
    },
    token: string
  ): Promise<{ success: boolean; data: Order }> {
    return api.put<{ success: boolean; data: Order }>(
      `/orders/${orderId}/pay`,
      paymentResult,
      token
    );
  },

  async cancelOrder(
    orderId: string,
    reason: string,
    token: string
  ): Promise<{ success: boolean; data: Order }> {
    return api.put<{ success: boolean; data: Order }>(
      `/orders/${orderId}/cancel`,
      { reason },
      token
    );
  },
};

import { api } from '../api';

export const ordersService = {
  getAllOrders: (params?: { page?: number; limit?: number; status?: string; source?: string }) => {
    const query = new URLSearchParams(params as any).toString();
    return api.get<{ success: boolean; data: any[]; pagination: any }>(
      `/orders${query ? `?${query}` : ''}`
    );
  },
  
  getOrderById: (id: string) =>
    api.get<{ success: boolean; data: any }>(`/orders/${id}`),
  
  getOrdersBySource: (source: string) =>
    api.get<{ success: boolean; data: any[]; count: number }>(`/orders/source/${source}`),
  
  getCancelledOrders: () =>
    api.get<{ success: boolean; data: any[]; count: number }>('/orders/cancelled'),
  
  getCustomCakeOrders: () =>
    api.get<{ success: boolean; data: any[] }>('/orders/custom-cakes'),
  
  createOrder: (data: any) =>
    api.post<{ success: boolean; data: any }>('/orders', data),
  
  updateOrderStatus: (id: string, status: string) =>
    api.patch<{ success: boolean; data: any }>(`/orders/${id}/status`, { status }),
};

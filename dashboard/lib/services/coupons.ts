import { api } from '../api';

export const couponsService = {
  // Coupons
  getAllCoupons: (isActive?: boolean) => {
    const query = isActive !== undefined ? `?isActive=${isActive}` : '';
    return api.get<{ success: boolean; data: any[] }>(`/coupons/coupons${query}`);
  },
  
  createCoupon: (data: any) =>
    api.post<{ success: boolean; data: any }>('/coupons/coupons', data),
  
  updateCoupon: (id: string, data: any) =>
    api.put<{ success: boolean; data: any }>(`/coupons/coupons/${id}`, data),
  
  validateCoupon: (code: string, orderValue: number) =>
    api.post<{ success: boolean; data: any }>('/coupons/coupons/validate', { code, orderValue }),
  
  // Gift Cards
  getAllGiftCards: (status?: string) => {
    const query = status ? `?status=${status}` : '';
    return api.get<{ success: boolean; data: any[] }>(`/coupons/gift-cards${query}`);
  },
  
  createGiftCard: (data: any) =>
    api.post<{ success: boolean; data: any }>('/coupons/gift-cards', data),
  
  validateGiftCard: (code: string) =>
    api.post<{ success: boolean; data: any }>('/coupons/gift-cards/validate', { code }),
};

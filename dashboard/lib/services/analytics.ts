import { api } from '../api';

export interface DashboardOverview {
  overview: {
    todaysOrders: number;
    todaysRevenue: number;
    monthlyRevenue: number;
    pendingOrders: number;
    salesBySource: {
      source: string;
      count: number;
      revenue: number;
    }[];
  };
  inventory: {
    lowStock: number;
    expiring: number;
  };
  staff: {
    present: number;
    total: number;
    attendanceRate: string;
  };
  recentOrders: any[];
}

export interface SalesBySource {
  source: string;
  totalOrders: number;
  totalRevenue: number;
  avgOrderValue: number;
}

export const analyticsService = {
  getDashboardOverview: () => 
    api.get<{ success: boolean; data: DashboardOverview }>('/analytics/dashboard-overview'),
  
  getSalesBySource: (params?: { startDate?: string; endDate?: string }) => {
    const query = new URLSearchParams(params as any).toString();
    return api.get<{ success: boolean; data: SalesBySource[] }>(
      `/analytics/sales-by-source${query ? `?${query}` : ''}`
    );
  },
  
  getProductPerformance: (limit = 10) =>
    api.get<{ success: boolean; data: any[] }>(`/analytics/product-performance?limit=${limit}`),
  
  getInventoryStatus: () =>
    api.get<{ success: boolean; data: any }>('/analytics/inventory-status'),
  
  getStaffPerformance: (params?: { month?: number; year?: number }) => {
    const query = new URLSearchParams(params as any).toString();
    return api.get<{ success: boolean; data: any[] }>(
      `/analytics/staff-performance${query ? `?${query}` : ''}`
    );
  },
  
  getFinancialReport: (params?: { startDate?: string; endDate?: string }) => {
    const query = new URLSearchParams(params as any).toString();
    return api.get<{ success: boolean; data: any }>(
      `/analytics/financial-report${query ? `?${query}` : ''}`
    );
  },
};

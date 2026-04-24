import { api } from '../api';

export const inventoryService = {
  // Raw Materials
  getAllMaterials: (params?: { category?: string; status?: string }) => {
    const query = new URLSearchParams(params as any).toString();
    return api.get<{ success: boolean; data: any[] }>(
      `/inventory/materials${query ? `?${query}` : ''}`
    );
  },
  
  getLowStockItems: () =>
    api.get<{ success: boolean; data: any[] }>('/inventory/materials/low-stock'),
  
  getExpiringItems: () =>
    api.get<{ success: boolean; data: any[] }>('/inventory/materials/expiring'),
  
  createMaterial: (data: any) =>
    api.post<{ success: boolean; data: any }>('/inventory/materials', data),
  
  updateMaterial: (id: string, data: any) =>
    api.put<{ success: boolean; data: any }>(`/inventory/materials/${id}`, data),
  
  // Recipes
  getAllRecipes: () =>
    api.get<{ success: boolean; data: any[] }>('/inventory/recipes'),
  
  getRecipeById: (id: string) =>
    api.get<{ success: boolean; data: any }>(`/inventory/recipes/${id}`),
  
  createRecipe: (data: any) =>
    api.post<{ success: boolean; data: any }>('/inventory/recipes', data),
  
  updateRecipe: (id: string, data: any) =>
    api.put<{ success: boolean; data: any }>(`/inventory/recipes/${id}`, data),
};

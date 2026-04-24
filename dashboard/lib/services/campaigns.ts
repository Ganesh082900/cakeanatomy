import { api } from '../api';

export const campaignsService = {
  getAllCampaigns: (params?: { status?: string; type?: string }) => {
    const query = new URLSearchParams(params as any).toString();
    return api.get<{ success: boolean; data: any[] }>(
      `/campaigns${query ? `?${query}` : ''}`
    );
  },
  
  getCampaignById: (id: string) =>
    api.get<{ success: boolean; data: any }>(`/campaigns/${id}`),
  
  createCampaign: (data: any) =>
    api.post<{ success: boolean; data: any }>('/campaigns', data),
  
  updateCampaign: (id: string, data: any) =>
    api.put<{ success: boolean; data: any }>(`/campaigns/${id}`, data),
  
  sendCampaign: (id: string) =>
    api.post<{ success: boolean; data: any }>(`/campaigns/${id}/send`),
  
  scheduleCampaign: (id: string, scheduledDate: string) =>
    api.post<{ success: boolean; data: any }>(`/campaigns/${id}/schedule`, { scheduledDate }),
};

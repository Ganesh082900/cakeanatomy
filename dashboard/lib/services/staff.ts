import { api } from '../api';

export const staffService = {
  getAllStaff: (isActive?: boolean) => {
    const query = isActive !== undefined ? `?isActive=${isActive}` : '';
    return api.get<{ success: boolean; data: any[] }>(`/staff${query}`);
  },
  
  getStaffById: (id: string) =>
    api.get<{ success: boolean; data: any }>(`/staff/${id}`),
  
  createStaff: (data: any) =>
    api.post<{ success: boolean; data: any }>('/staff', data),
  
  updateStaff: (id: string, data: any) =>
    api.put<{ success: boolean; data: any }>(`/staff/${id}`, data),
  
  getAttendance: (id: string, params?: { startDate?: string; endDate?: string }) => {
    const query = new URLSearchParams(params as any).toString();
    return api.get<{ success: boolean; data: any[] }>(
      `/staff/${id}/attendance${query ? `?${query}` : ''}`
    );
  },
  
  clockIn: (id: string) =>
    api.post<{ success: boolean; data: any }>(`/staff/${id}/clock-in`),
  
  clockOut: (id: string) =>
    api.post<{ success: boolean; data: any }>(`/staff/${id}/clock-out`),
  
  markLeave: (id: string, data: { date: string; leaveType: string; notes?: string }) =>
    api.post<{ success: boolean; data: any }>(`/staff/${id}/leave`, data),
};

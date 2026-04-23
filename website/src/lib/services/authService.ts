import { api } from '../api';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  addresses?: Address[];
}

export interface Address {
  _id?: string;
  label: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

export const authService = {
  async register(data: RegisterData): Promise<AuthResponse> {
    return api.post<AuthResponse>('/auth/register', data);
  },

  async login(data: LoginData): Promise<AuthResponse> {
    return api.post<AuthResponse>('/auth/login', data);
  },

  async logout(token: string): Promise<{ success: boolean }> {
    return api.get<{ success: boolean }>('/auth/logout', token);
  },

  async getMe(token: string): Promise<{ success: boolean; data: User }> {
    return api.get<{ success: boolean; data: User }>('/auth/me', token);
  },

  async updateDetails(
    data: Partial<User>,
    token: string
  ): Promise<{ success: boolean; data: User }> {
    return api.put<{ success: boolean; data: User }>(
      '/auth/updatedetails',
      data,
      token
    );
  },

  async updatePassword(
    data: { currentPassword: string; newPassword: string },
    token: string
  ): Promise<AuthResponse> {
    return api.put<AuthResponse>('/auth/updatepassword', data, token);
  },

  async addAddress(
    address: Address,
    token: string
  ): Promise<{ success: boolean; data: Address[] }> {
    return api.post<{ success: boolean; data: Address[] }>(
      '/auth/addresses',
      address,
      token
    );
  },

  async updateAddress(
    addressId: string,
    address: Partial<Address>,
    token: string
  ): Promise<{ success: boolean; data: Address[] }> {
    return api.put<{ success: boolean; data: Address[] }>(
      `/auth/addresses/${addressId}`,
      address,
      token
    );
  },

  async deleteAddress(
    addressId: string,
    token: string
  ): Promise<{ success: boolean; data: Address[] }> {
    return api.delete<{ success: boolean; data: Address[] }>(
      `/auth/addresses/${addressId}`,
      token
    );
  },
};

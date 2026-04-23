import { api } from '../api';

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parent?: {
    _id: string;
    name: string;
    slug: string;
  };
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export const categoryService = {
  async getCategories(): Promise<{
    success: boolean;
    count: number;
    data: Category[];
  }> {
    return api.get<{ success: boolean; count: number; data: Category[] }>(
      '/categories'
    );
  },

  async getCategory(
    id: string
  ): Promise<{ success: boolean; data: Category }> {
    return api.get<{ success: boolean; data: Category }>(
      `/categories/${id}`
    );
  },

  async getCategoryBySlug(
    slug: string
  ): Promise<{ success: boolean; data: Category }> {
    return api.get<{ success: boolean; data: Category }>(
      `/categories/slug/${slug}`
    );
  },
};

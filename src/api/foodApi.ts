import api from './axios';
import type { Category, FoodsResponse } from '../types/index';

export const fetchCategories = async (): Promise<Category[]> => {
  const { data } = await api.get('/categories');
  return data;
};

export const fetchFoods = async (
  categoryId?: string,
  page = 1,
  limit = 6
): Promise<FoodsResponse> => {
  const { data } = await api.get('/foods', {
    params: { categoryId, page, limit },
  });
  return data;
};

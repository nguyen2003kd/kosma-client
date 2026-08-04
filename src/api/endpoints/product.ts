/* eslint-disable */
/* Product API - Frontend */
import { mainInstance } from '../mutator/custom-instance';
import type { Product } from '../models/product';

export interface GetProductsParams {
  page?: number;
  pageSize?: number;
  category?: string;
  product_type?: string;
  status?: string;
  search?: string;
}

export const getProducts = (params?: GetProductsParams) => {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append('page', String(params.page));
  if (params?.pageSize) queryParams.append('pageSize', String(params.pageSize));
  if (params?.category) queryParams.append('category', params.category);
  if (params?.product_type) queryParams.append('product_type', params.product_type);
  if (params?.status) queryParams.append('status', params.status);
  if (params?.search) queryParams.append('search', params.search);

  return mainInstance<{
    success: boolean;
    data: { count: number; rows: Product[]; page?: number; pageSize?: number };
  }>({
    url: `/api/v1.0/product?${queryParams.toString()}`,
    method: 'GET',
  });
};

export const getProductById = (id: string) => {
  return mainInstance<{ success: boolean; data: Product }>({
    url: `/api/v1.0/product/${id}`,
    method: 'GET',
  });
};

export const getProductBySlug = (slug: string) => {
  return mainInstance<{ success: boolean; data: Product }>({
    url: `/api/v1.0/product/${slug}`,
    method: 'GET',
  });
};

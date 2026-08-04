/* eslint-disable */
/* Order API - Frontend (Public) */
import { mainInstance } from '../mutator/custom-instance';
import type { CreateOrderPayload, Order } from '../models/order';

export const createOrder = (payload: CreateOrderPayload) => {
  return mainInstance<{
    success: boolean;
    data: { order: Order };
    message?: string;
  }>({
    url: '/api/v1.0/order',
    method: 'POST',
    data: payload,
  });
};

export const getOrderById = (id: string) => {
  return mainInstance<{ success: boolean; data: Order }>({
    url: `/api/v1.0/order/${id}`,
    method: 'GET',
  });
};

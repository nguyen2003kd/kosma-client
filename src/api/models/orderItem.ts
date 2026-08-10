/* eslint-disable */
import type { OrderItemSpecifications } from './orderItemSpecifications';

export interface OrderItem {
  id?: string;
  order_id?: string;
  product_id?: string;
  product_name?: string;
  quantity?: number;
  unit_price?: string;
  total_price?: string;
  created_at?: string;
  updated_at?: string;
  specifications?: OrderItemSpecifications;
  product_sku?: string;
  product_image?: string;
}

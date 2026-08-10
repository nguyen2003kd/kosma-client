/* eslint-disable */
import type { OrderItemMutateSpecifications } from './orderItemMutateSpecifications';

export interface OrderItemMutate {
  order_id?: string;
  product_id?: string;
  product_name?: string;
  quantity?: number;
  unit_price?: string;
  total_price?: string;
  specifications?: OrderItemMutateSpecifications;
  product_sku?: string;
  product_image?: string;
}

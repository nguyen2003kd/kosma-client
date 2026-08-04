/* eslint-disable */
/* Order Model - Frontend */

export interface Order {
  id?: string;
  code?: string;
  customer_name?: string;
  customer_email?: string | null;
  customer_phone?: string;
  shipping_address?: string | null;
  shipping_city?: string | null;
  shipping_state?: string | null;
  shipping_zip?: string | null;
  subtotal?: number | null;
  shipping_fee?: number | null;
  tax?: number | null;
  total?: number | null;
  payment_method?: 'cod' | 'bank_transfer' | 'card' | null;
  payment_status?: string | null;
  notes?: string | null;
  status?: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | null;
  created_at?: string | null;
  order_items?: OrderItem[] | null;
}

export interface OrderItem {
  id?: string;
  product_id?: string | null;
  product_name?: string;
  product_sku?: string | null;
  product_image?: string | null;
  quantity?: number;
  unit_price?: number;
  total_price?: number;
}

export interface CreateOrderPayload {
  customer_name: string;
  customer_email?: string;
  customer_phone: string;
  shipping_address?: string;
  shipping_city?: string;
  shipping_state?: string;
  shipping_zip?: string;
  payment_method?: 'cod' | 'bank_transfer' | 'card';
  notes?: string;
  items: Array<{
    product_id?: string;
    product_name: string;
    product_sku?: string;
    product_image?: string;
    quantity: number;
    unit_price: number;
  }>;
}

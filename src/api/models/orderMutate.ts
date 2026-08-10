/* eslint-disable */

export interface OrderMutate {
  code?: string;
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  shipping_address?: string;
  shipping_city?: string;
  shipping_state?: string;
  shipping_zip?: string;
  subtotal?: string;
  shipping_fee?: string;
  tax?: string;
  total?: string;
  payment_method?: string;
  payment_status?: string;
  payment_id?: string;
  notes?: string;
  source?: string;
  is_guest?: boolean;
  user_id?: string;
  status?: string;
  confirmed_at?: string;
  shipped_at?: string;
  delivered_at?: string;
  cancelled_at?: string;
}

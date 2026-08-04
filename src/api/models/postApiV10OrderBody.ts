/* eslint-disable */
import type { PostApiV10OrderBodyPaymentMethod } from './postApiV10OrderBodyPaymentMethod';
import type { PostApiV10OrderBodyItemsItem } from './postApiV10OrderBodyItemsItem';

export type PostApiV10OrderBody = {
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  shipping_address?: string;
  shipping_city?: string;
  shipping_state?: string;
  shipping_zip?: string;
  payment_method?: PostApiV10OrderBodyPaymentMethod;
  notes?: string;
  items?: PostApiV10OrderBodyItemsItem[];
};

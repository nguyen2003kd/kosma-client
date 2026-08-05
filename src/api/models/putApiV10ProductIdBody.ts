/* eslint-disable */
import type { PutApiV10ProductIdBodyProductType } from './putApiV10ProductIdBodyProductType';
import type { PutApiV10ProductIdBodyStatus } from './putApiV10ProductIdBodyStatus';
import type { PutApiV10ProductIdBodyImagesItem } from './putApiV10ProductIdBodyImagesItem';

export type PutApiV10ProductIdBody = {
  sku?: string;
  name?: string;
  slug?: string;
  description?: string;
  price?: number;
  original_price?: number;
  stock?: number;
  category?: string;
  product_type?: PutApiV10ProductIdBodyProductType;
  brand?: string;
  status?: PutApiV10ProductIdBodyStatus;
  is_featured?: boolean;
  is_active?: boolean;
  /** Optional array of { file_id, position? }. If provided, all existing product images are replaced. */
  images?: PutApiV10ProductIdBodyImagesItem[];
};

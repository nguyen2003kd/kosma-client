/* eslint-disable */
import type { PostApiV10ProductBodyProductType } from './postApiV10ProductBodyProductType';
import type { PostApiV10ProductBodyImagesItem } from './postApiV10ProductBodyImagesItem';

export type PostApiV10ProductBody = {
  sku?: string;
  name?: string;
  slug?: string;
  price?: number;
  category?: string;
  product_type?: PostApiV10ProductBodyProductType;
  /** Optional array of { file_id, position? } to attach as product images */
  images?: PostApiV10ProductBodyImagesItem[];
};

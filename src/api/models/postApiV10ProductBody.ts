/* eslint-disable */
import type { PostApiV10ProductBodyProductType } from './postApiV10ProductBodyProductType';

export type PostApiV10ProductBody = {
  sku?: string;
  name?: string;
  slug?: string;
  price?: number;
  category?: string;
  product_type?: PostApiV10ProductBodyProductType;
};

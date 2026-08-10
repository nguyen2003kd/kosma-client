/* eslint-disable */
import type { ProductMutateSpecifications } from './productMutateSpecifications';

export interface ProductMutate {
  sku?: string;
  name?: string;
  slug?: string;
  description?: string;
  price?: string;
  original_price?: string;
  cost_price?: string;
  stock?: number;
  category?: string;
  product_type?: string;
  brand?: string;
  thumbnail_path?: string;
  specifications?: ProductMutateSpecifications;
  weight?: string;
  dimensions?: string;
  material?: string;
  is_featured?: boolean;
  is_active?: boolean;
  status?: string;
  meta_title?: string;
  meta_description?: string;
  position?: number;
}

/* eslint-disable */
import type { ProductThumbnailCompressInfo } from './productThumbnailCompressInfo';
import type { ProductSpecifications } from './productSpecifications';

export interface Product {
  id?: string;
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
  thumbnail_compress_info?: ProductThumbnailCompressInfo;
  specifications?: ProductSpecifications;
  weight?: string;
  dimensions?: string;
  material?: string;
  is_featured?: boolean;
  is_active?: boolean;
  status?: string;
  meta_title?: string;
  meta_description?: string;
  position?: number;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  updated_by?: string;
}

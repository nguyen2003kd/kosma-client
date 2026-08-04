/* eslint-disable */
/* Product Model - Frontend */

export interface Product {
  id?: string;
  sku?: string;
  name?: string;
  slug?: string;
  description?: string | null;
  price?: number | null;
  original_price?: number | null;
  cost_price?: number | null;
  stock?: number | null;
  category?: string | null;
  product_type?: 'furniture' | 'material' | null;
  brand?: string | null;
  thumbnail_path?: string | null;
  images?: string[] | null;
  specifications?: Record<string, unknown> | null;
  weight?: number | null;
  dimensions?: string | null;
  material?: string | null;
  is_featured?: boolean | null;
  is_active?: boolean | null;
  status?: 'active' | 'draft' | 'out_of_stock' | 'discontinued' | null;
  position?: number | null;
  created_at?: string | null;
  updated_at?: string | null;
}

/* eslint-disable */
import type { FooterLanguage } from './footerLanguage';
import type { FooterColumn } from './footerColumn';

export interface Footer {
  /** Unique identifier of the footer */
  id?: string;
  /** Language of the footer */
  language?: FooterLanguage;
  /**
   * Whether the footer is active
   * @nullable
   */
  is_active?: boolean | null;
  /** Creation timestamp */
  created_at?: string;
  /**
   * Last update timestamp
   * @nullable
   */
  updated_at?: string | null;
  /**
   * ID of the user who created the footer
   * @nullable
   */
  created_by?: string | null;
  /**
   * ID of the user who last updated the footer
   * @nullable
   */
  updated_by?: string | null;
  /** Columns of the footer */
  footer_columns?: FooterColumn[];
}

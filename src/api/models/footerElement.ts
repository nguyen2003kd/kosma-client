/* eslint-disable */
import type { FooterElementType } from './footerElementType';

export interface FooterElement {
  /** Unique identifier of the footer element */
  id?: string;
  /** ID of the parent footer row */
  row_id?: string;
  /** Type of the element */
  type?: FooterElementType;
  /**
   * Text content or image URL
   * @nullable
   */
  content?: string | null;
  /**
   * Optional link target
   * @nullable
   */
  link?: string | null;
  /**
   * Order within the row
   * @minimum 0
   */
  sort_order?: number;
  /** Creation timestamp */
  created_at?: string;
  /**
   * Last update timestamp
   * @nullable
   */
  updated_at?: string | null;
}

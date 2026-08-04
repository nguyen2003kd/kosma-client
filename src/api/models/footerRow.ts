/* eslint-disable */
import type { FooterElement } from './footerElement';

export interface FooterRow {
  /** Unique identifier of the footer row */
  id?: string;
  /** ID of the parent footer column */
  column_id?: string;
  /**
   * Order within the column
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
  /** Elements (small columns) inside this row */
  footer_elements?: FooterElement[];
}

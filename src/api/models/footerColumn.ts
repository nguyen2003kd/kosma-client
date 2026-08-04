/* eslint-disable */
import type { FooterRow } from './footerRow';

export interface FooterColumn {
  /** Unique identifier of the footer column */
  id?: string;
  /** ID of the parent footer */
  footer_id?: string;
  /**
   * Title of the column
   * @nullable
   */
  title?: string | null;
  /**
   * Order within the footer
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
  /** Rows inside this column */
  footer_rows?: FooterRow[];
}

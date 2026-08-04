/* eslint-disable */
import type { FooterMutateColumnsItemRowsItem } from './footerMutateColumnsItemRowsItem';

export type FooterMutateColumnsItem = {
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
  /** Rows inside this column */
  rows?: FooterMutateColumnsItemRowsItem[];
};

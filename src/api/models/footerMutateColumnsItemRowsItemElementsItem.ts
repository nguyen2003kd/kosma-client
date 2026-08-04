/* eslint-disable */
import type { FooterMutateColumnsItemRowsItemElementsItemType } from './footerMutateColumnsItemRowsItemElementsItemType';

export type FooterMutateColumnsItemRowsItemElementsItem = {
  /** Type of the element */
  type?: FooterMutateColumnsItemRowsItemElementsItemType;
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
};

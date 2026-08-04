/* eslint-disable */
import type { FooterMutateLanguage } from './footerMutateLanguage';
import type { FooterMutateColumnsItem } from './footerMutateColumnsItem';

export interface FooterMutate {
  /** Language of the footer */
  language: FooterMutateLanguage;
  /**
   * Whether the footer is active
   * @nullable
   */
  is_active?: boolean | null;
  /** Columns of the footer */
  columns?: FooterMutateColumnsItem[];
}

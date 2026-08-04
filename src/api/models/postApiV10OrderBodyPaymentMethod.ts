/* eslint-disable */

export type PostApiV10OrderBodyPaymentMethod = typeof PostApiV10OrderBodyPaymentMethod[keyof typeof PostApiV10OrderBodyPaymentMethod];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const PostApiV10OrderBodyPaymentMethod = {
  cod: 'cod',
  bank_transfer: 'bank_transfer',
  card: 'card',
} as const;

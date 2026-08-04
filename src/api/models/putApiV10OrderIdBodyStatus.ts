/* eslint-disable */

export type PutApiV10OrderIdBodyStatus = typeof PutApiV10OrderIdBodyStatus[keyof typeof PutApiV10OrderIdBodyStatus];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const PutApiV10OrderIdBodyStatus = {
  pending: 'pending',
  confirmed: 'confirmed',
  processing: 'processing',
  shipped: 'shipped',
  delivered: 'delivered',
  cancelled: 'cancelled',
} as const;

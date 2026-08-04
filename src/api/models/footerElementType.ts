/* eslint-disable */

/**
 * Type of the element
 */
export type FooterElementType = typeof FooterElementType[keyof typeof FooterElementType];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const FooterElementType = {
  text: 'text',
  image: 'image',
} as const;

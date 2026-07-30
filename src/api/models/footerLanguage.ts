/* eslint-disable */

/**
 * Language of the footer
 */
export type FooterLanguage = typeof FooterLanguage[keyof typeof FooterLanguage];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const FooterLanguage = {
  vi: 'vi',
  en: 'en',
} as const;

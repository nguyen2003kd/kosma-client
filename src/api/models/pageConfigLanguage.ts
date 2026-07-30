/* eslint-disable */

/**
 * Language of the configuration
 */
export type PageConfigLanguage = typeof PageConfigLanguage[keyof typeof PageConfigLanguage];


// eslint-disable-next-line @typescript-eslint/no-redeclare
export const PageConfigLanguage = {
  vi: 'vi',
  en: 'en',
} as const;

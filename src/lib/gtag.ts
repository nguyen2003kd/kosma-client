export const GA_ID = "G-S1WZBLT72V";

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: Gtag;
  }
}

export const pageview = (url: string) => {
  if (typeof window === "undefined" || !window.gtag) {
    return;
  }

  window.gtag("config", GA_ID, {
    page_path: url,
  });
};

"use client";

import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(
    resourcesToBackend(async (language: string, namespace: string) => {
      return await import(`./locales/${language}/${namespace}.json`);
    })
  )
  .init({
    fallbackLng: "vi",
    supportedLngs: ["vi", "en"],
    defaultNS: "header",
    load: "languageOnly",
    ns: [
      "header",
      "footer",
      "menu",
      "dates",
      "component/pagination",
      "pages/home",
      "pages/about",
      "pages/contact",
      "pages/news",
      "pages/services",
      "pages/search",
      "pages/login",
      "pages/register",
      "pages/forgot-password",
      "pages/quotation",
      "pages/quotation-form",
      "pages/user",
      "pages/careers",
      "pages/post-detail",
      "pages/work-schedule",
    ],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "cookie", "htmlTag"],
      lookupLocalStorage: "i18nextLng",
      caches: ["localStorage", "cookie"],
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;

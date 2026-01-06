import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import ko from "./locales/ko.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ko: { translation: ko },
    },

    fallbackLng: "en",

    /* 🔑 핵심 설정 */
    supportedLngs: ["ko", "en"],
    load: "languageOnly", // ko-KR → ko
    nonExplicitSupportedLngs: true, // 지역 코드 무시

    detection: {
      order: ["navigator", "htmlTag", "localStorage"],
      caches: ["localStorage"], // 개발 중이면 []로 비워도 됨
    },

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

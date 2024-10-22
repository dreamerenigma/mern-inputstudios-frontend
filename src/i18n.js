import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from 'i18next-http-backend';
import enTranslation from '../public/locales/en/translation.json';
import enTermsTranslation from '../public/locales/ru/terms.json';
import ruTranslation from '../public/locales/ru/translation.json';
import ruTermsTranslation from '../public/locales/ru/terms.json';

const resources = {
   en: { 
      translation: enTranslation,
      terms: enTermsTranslation,
   },
   ru: { 
      translation: ruTranslation, 
      terms: ruTermsTranslation,
   },
};

i18n
   .use(Backend)
   .use(LanguageDetector)
   .use(initReactI18next)
   .init({
      lng: 'ru',
      fallbackLng: 'en',
      resources,
      debug: true,
      detection: {
         order: ['queryString', 'cookie'],
         cache: ['cookie'],
      },
      interpolation: {
         escapeValue: false,
      },
      defaultNS: 'translation',
   });


export default i18n;

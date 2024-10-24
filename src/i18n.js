import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from 'i18next-http-backend';
import enTranslation from '../public/locales/en/translation.json';
import enTermsTranslation from '../public/locales/ru/terms.json';
import enDialogsTranslation from '../public/locales/ru/dialogs.json';
import enPostsTranslation from '../public/locales/en/posts.json';
import enCommentsTranslation from '../public/locales/en/comments.json';
import enFooterTranslation from '../public/locales/en/footer.json';
import enHeadersTranslation from '../public/locales/en/headers.json';
import enProfileTranslation from '../public/locales/en/profile.json';
import ruTranslation from '../public/locales/ru/translation.json';
import ruTermsTranslation from '../public/locales/ru/terms.json';
import ruDialogsTranslation from '../public/locales/ru/dialogs.json';
import ruPostsTranslation from '../public/locales/ru/posts.json';
import ruCommentsTranslation from '../public/locales/ru/comments.json';
import ruFooterTranslation from '../public/locales/ru/footer.json';
import ruHeadersTranslation from '../public/locales/ru/headers.json';
import ruProfileTranslation from '../public/locales/ru/profile.json';

const resources = {
   en: { 
      translation: enTranslation,
      terms: enTermsTranslation,
      dialogs: enDialogsTranslation,
      posts: enPostsTranslation,
      footer: enCommentsTranslation,
      comments: enFooterTranslation,
      header: enHeadersTranslation,
      profile: enProfileTranslation,
   },
   ru: { 
      translation: ruTranslation, 
      terms: ruTermsTranslation,
      dialogs: ruDialogsTranslation,
      posts: ruPostsTranslation,
      comments: ruCommentsTranslation,
      footer: ruFooterTranslation,
      header: ruHeadersTranslation,
      profile: ruProfileTranslation,
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

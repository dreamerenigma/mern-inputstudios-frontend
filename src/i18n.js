import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from 'i18next-http-backend';
import enTranslation from './locales/en/translation.json';
import enTermsTranslation from './locales/ru/terms.json';
import enDialogsTranslation from './locales/ru/dialogs.json';
import enPostsTranslation from './locales/en/posts.json';
import enCommentsTranslation from './locales/en/comments.json';
import enFooterTranslation from './locales/en/footer.json';
import enHeadersTranslation from './locales/en/headers.json';
import enProfileTranslation from './locales/en/profile.json';
import enTrademarksTranslation from './locales/en/trademarks.json';
import enPrivacyTranslation from './locales/en/privacy.json';
import enBrowserTranslation from './locales/en/browser.json';
import enForumTranslation from './locales/en/forum.json';
import enLegalTranslation from './locales/en/legal.json';
import ruTranslation from './locales/ru/translation.json';
import ruTermsTranslation from './locales/ru/terms.json';
import ruDialogsTranslation from './locales/ru/dialogs.json';
import ruPostsTranslation from './locales/ru/posts.json';
import ruCommentsTranslation from './locales/ru/comments.json';
import ruFooterTranslation from './locales/ru/footer.json';
import ruHeadersTranslation from './locales/ru/headers.json';
import ruProfileTranslation from './locales/ru/profile.json';
import ruTrademarksTranslation from './locales/ru/trademarks.json';
import ruPrivacyTranslation from './locales/ru/privacy.json';
import ruBrowserTranslation from './locales/ru/browser.json';
import ruForumTranslation from './locales/ru/forum.json';
import ruLegalTranslation from './locales/ru/legal.json';

const resources = {
   en: { 
      translation: enTranslation,
      terms: enTermsTranslation,
      dialogs: enDialogsTranslation,
      posts: enPostsTranslation,
      comments: enCommentsTranslation,
      footer: enFooterTranslation,
      headers: enHeadersTranslation,
      profile: enProfileTranslation,
      trademarks: enTrademarksTranslation,
      privacy: enPrivacyTranslation,
      browser: enBrowserTranslation,
      forum: enForumTranslation,
      legal: enLegalTranslation,
   },
   ru: { 
      translation: ruTranslation, 
      terms: ruTermsTranslation,
      dialogs: ruDialogsTranslation,
      posts: ruPostsTranslation,
      comments: ruCommentsTranslation,
      footer: ruFooterTranslation,
      headers: ruHeadersTranslation,
      profile: ruProfileTranslation,
      trademarks: ruTrademarksTranslation,
      privacy: ruPrivacyTranslation,
      browser: ruBrowserTranslation,
      forum: ruForumTranslation,
      legal: ruLegalTranslation,
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

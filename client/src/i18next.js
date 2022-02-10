import i18n from "i18next";
import {initReactI18next} from "react-i18next";

import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './assets/locales/en/translation.json';
import translationAMH from './assets/locales/amh/translation.json'

// the translations
const resources = {
  en: {
    translation: translationEN
  },
  amh:{
      translation: translationAMH
  }
};
console.log(resources)

i18n
.use(initReactI18next) 
.use(HttpApi)
.use(LanguageDetector)
  .init({
    resources,
    fallbackLng:'en',
    supportedLngs:['en','amh'],
    keySeparator: false, 
    interpolation: {
      escapeValue: false 
    },
    detection:{
      order:['cookie','localStorage','path'],
      caches:['cookie'],
    }

  });

export default i18n;
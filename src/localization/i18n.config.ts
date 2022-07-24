import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import translationEN from './en.json';
import translationTR from './tr.json';
import translationEST from './est.json';

const resources = {
  en: {
    translation: translationEN,
  },
  tr: {
    translation: translationTR,
  },
  est: {
    translation: translationEST,
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
});

export default i18n;

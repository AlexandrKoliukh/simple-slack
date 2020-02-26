import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/en';
import ru from './locales/ru/ru';

const lng = window.navigator.language;

i18next
  .use(initReactI18next)
  .init({
    lng,
    fallbackLng: 'en',
    resources: {
      en,
      ru,
    },
  });

export default i18next;

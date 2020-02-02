import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

const lng = window.navigator.language;

i18next
  .use(initReactI18next)
  .init({
    lng,
    resources: {
      en: {
        translation: {
          sendMessage: 'Send',
          inputMessagePlaceholder: 'Enter message',
        },
      },
      ru: {
        translation: {
          sendMessage: 'Отправить',
          inputMessagePlaceholder: 'Введите сообщение',
        },
      },
    },
  });

export default i18next;

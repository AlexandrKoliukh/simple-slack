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
          inputMessagePlaceholder: 'Enter message',
          channels: 'Channels',
          newChannel: 'New channel',
          errorMessages: {
            message: 'Required',
          },
        },
      },
      ru: {
        translation: {
          inputMessagePlaceholder: 'Введите сообщение',
          channels: 'Каналы',
          newChannel: 'Новый канал',
          errorMessages: {
            message: 'Обязательное поле',
          },
        },
      },
    },
  });

export default i18next;

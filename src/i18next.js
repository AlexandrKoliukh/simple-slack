import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { modalStateTypes } from './common/constants';

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
          modal: {
            [modalStateTypes.channelEdit]: {
              title: 'Rename channel {{name}}',
              button: 'Save',
            },
            [modalStateTypes.channelDelete]: {
              title: 'Delete channel {{name}}',
              button: 'Delete',
            },
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
          modal: {
            [modalStateTypes.channelEdit]: {
              title: 'Редактировать канал',
              button: 'Сохранить',
            },
            [modalStateTypes.channelDelete]: {
              title: 'Удалить канал',
              button: 'Удалить',
            },
          },
        },
      },
    },
  });

export default i18next;

import { modalStateTypes } from '../../common/constants';

export default {
  translation: {
    inputMessagePlaceholder: 'Введите сообщение',
    channels: 'Каналы',
    newChannel: 'Новый канал',
    close: 'Закрыть',
    errorMessages: {
      message: 'Обязательное поле',
    },
    modal: {
      [modalStateTypes.channelRename]: {
        title: 'Редактировать канал {{name}}',
        button: 'Сохранить',
      },
      [modalStateTypes.channelRemove]: {
        title: 'Удалить канал {{name}}',
        button: 'Удалить',
      },
    },
  },
};

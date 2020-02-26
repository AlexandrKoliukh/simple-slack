import { modalStateTypes } from '../../common/constants';

export default {
  translation: {
    inputMessagePlaceholder: 'Enter message',
    channels: 'Channels',
    newChannel: 'New channel',
    close: 'Close',
    errorMessages: {
      message: 'Required',
    },
    modal: {
      [modalStateTypes.channelRename]: {
        title: 'Rename channel {{name}}',
        button: 'Save',
      },
      [modalStateTypes.channelRemove]: {
        title: 'Delete channel {{name}}',
        button: 'Delete',
      },
    },
  },
};

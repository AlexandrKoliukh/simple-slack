import RenameChannel from './RenameChannel';
import RemoveChannel from './RemoveChannel';
import { modalStateTypes } from '../../common/constants';

const modals = {
  [modalStateTypes.channelRemove]: RemoveChannel,
  [modalStateTypes.channelRename]: RenameChannel,
};

export default (modalName) => modals[modalName];

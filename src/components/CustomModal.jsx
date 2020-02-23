import React from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { changeModalState as changeModalStateAction, close as closeAction } from '../store/uiSlice';
import { removeChannel as removeChannelAction } from '../store/channelsSlice';
import { modalStateTypes } from '../common/constants';
import EditChannelForm from './Channels/EditChannelForm';
import DeleteChannelForm from './Channels/DeleteChannelForm';

function CustomModal(props) {
  const { t } = useTranslation();
  const { modalState, close } = props;

  const {
    data, isOpen, type,
  } = modalState;

  if (type === 'default') return null;

  const channelsTranslation = (key) => t(`modal.${type}.${key}`, { name: data.name });

  const typesMapping = {
    [modalStateTypes.channelDelete]: {
      body: (
        <DeleteChannelForm
          channelsTranslation={channelsTranslation}
          id={data.id}
          close={close}
        />
      ),
    },
    [modalStateTypes.channelEdit]: {
      body: (
        <EditChannelForm
          name={data.name}
          id={data.id}
          close={close}
          channelsTranslation={channelsTranslation}
        />
      ),
    },
  };

  const modalData = typesMapping[type];

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      show={isOpen}
      onHide={close}
    >
      {modalData.body}
    </Modal>
  );
}

const mapStateToProps = (state) => ({
  modalState: state.ui.modalState,
});

const actionCreators = {
  changeModalState: changeModalStateAction,
  close: closeAction,
  removeChannel: removeChannelAction,
};

export default connect(mapStateToProps, actionCreators)(CustomModal);

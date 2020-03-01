import React from 'react';
import { useSelector } from 'react-redux';
import Channels from './Channels/Channels';
import Messages from './Messages/Messages';
import MessageForm from './Messages/MessageForm';
import NewChannelForm from './Channels/NewChannelForm';
import getModalComponent from './Modals';
import ModalWrapper from './Modals/ModalWrapper';

const App = () => {
  const { type: modalType } = useSelector((state) => state.ui.modalState);

  const renderModal = (type) => {
    if (!type) return null;

    const Component = getModalComponent(type);
    return <ModalWrapper WrappedComponent={Component} />;
  };

  return (
    <div className="container-lg h-100 overflow-hidden">
      <div className="row h-100 pb-3">
        <div className="col-3 border-right h-100">
          <div className="d-flex flex-column h-100">
            <Channels />
            <hr />
            <NewChannelForm />
          </div>
        </div>
        <div className="col-9 h-100">
          <div className="d-flex flex-column h-100">
            <Messages />
            <MessageForm />
          </div>
        </div>
      </div>
      {renderModal(modalType)}
    </div>
  );
};

export default App;

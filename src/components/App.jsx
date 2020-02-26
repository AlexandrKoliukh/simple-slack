import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Channels from './Channels/Channels';
import Messages from './Messages/Messages';
import MessageForm from './Messages/MessageForm';
import NewChannelForm from './Channels/NewChannelForm';
import getModalComponent from './Modals';
import ModalWrapper from './Modals/ModalContainer';

function App() {
  const { type: modalType } = useSelector((state) => state.ui.modalState);

  const renderModal = (type) => {
    if (!type) return null;

    const Component = getModalComponent(type);
    return <ModalWrapper WrappedComponent={Component} />;
  };

  return (
    <Container fluid className="h-100">
      <Row>
        <Col md={2} lg={2}>
          <Channels />
          <hr />
          <NewChannelForm />
        </Col>
        <Col md={10} lg={10}>
          <Row>
            <Messages />
          </Row>
          <Row>
            <MessageForm />
          </Row>
        </Col>
      </Row>
      {renderModal(modalType)}
    </Container>
  );
}

export default App;

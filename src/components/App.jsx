import React from 'react';
import { Container } from 'react-bootstrap';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/cjs/Row';
import Channels from './Channels/Channels';
import Messages from './Messages/Messages';
import MessageForm from './Messages/MessageForm';
import NewChannelForm from './Channels/NewChannelForm';

function App() {
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
    </Container>
  );
}

export default App;

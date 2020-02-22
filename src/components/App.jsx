import React from 'react';
import { Container } from 'react-bootstrap';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/cjs/Row';
import Channels from './Channels';
import Messages from './Messages';
import MessageForm from './MessageForm';

function App() {
  return (
    <Container>
      <Row>
        <Col md={2} lg={2}>
          <Channels />
        </Col>
        <Col md={10} lg={10}>
          <Messages />
          <MessageForm />
        </Col>
      </Row>
    </Container>
  );
}

export default App;

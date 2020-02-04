import React from 'react';
import Channels from './Channels';
import MessageForm from './MessageForm';
import ChatWindow from './ChatWindow';
import { Col, Container, Row } from 'react-bootstrap';

function App() {
  return (
    <Container fluid as="main" className="h-100">
      <Row as="article" className="h-100">
        <Col sl={12} md={2} lg={2} className="border-top m-0 p-0">
          <Channels />
        </Col>
        <Col sl={12} md={10} lg={10} className="m-0 p-0 h-100 w-100 border-top border-left">
          <ChatWindow />
          <MessageForm />
        </Col>
      </Row>
    </Container>
  );
}

export default App;

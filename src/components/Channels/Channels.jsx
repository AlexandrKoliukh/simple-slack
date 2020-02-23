import React from 'react';
import { connect } from 'react-redux';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import {
  Button, Nav, Row,
} from 'react-bootstrap';
import * as channelsActions from '../../store/channelsSlice';

function Channels(props) {
  const {
    changeCurrentChannel, currentChannelId, channels,
  } = props;

  const handleSelect = (id) => {
    changeCurrentChannel({ id: Number(id) });
  };

  return (
    <Nav
      variant="pills"
      className="flex-column"
      activeKey={currentChannelId}
      onSelect={handleSelect}
    >
      {channels.map((ch) => {
        const { id, name, removable } = ch;
        return (
          <Row key={`nav-${id}`} className="d-flex justify-content-between m-1 flex-nowrap">
            <div>
              <Nav.Item>
                <Nav.Link eventKey={id}>
                  {name}
                </Nav.Link>
              </Nav.Item>
            </div>
            {removable && (
              <div>
                <Button size="sm" variant="info">
                  <MdEdit />
                </Button>
                {' '}
                <Button size="sm" variant="danger">
                  <MdDeleteForever />
                </Button>
              </div>
            )}
          </Row>
        );
      })}
    </Nav>
  );
}

const mapStateToProps = (state) => ({
  currentChannelId: state.channels.currentChannelId,
  channels: state.channels.data,
});

const actionCreators = {
  ...channelsActions,
};

export default connect(mapStateToProps, actionCreators)(Channels);

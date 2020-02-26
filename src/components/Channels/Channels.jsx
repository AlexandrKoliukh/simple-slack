import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import {
  Button, Nav, Row,
} from 'react-bootstrap';
import { changeCurrentChannel } from '../../store/channelsSlice';
import { showModal } from '../../store/uiSlice';
import { modalStateTypes } from '../../common/constants';

function Channels() {
  const dispatch = useDispatch();
  const { data: channels, currentChannelId } = useSelector((state) => state.channels);

  const handleSelect = (id) => {
    dispatch(changeCurrentChannel({ id: Number(id) }));
  };

  const handleEdit = (id, name) => () => {
    dispatch(showModal({ type: modalStateTypes.channelRename, data: { id, name } }));
  };

  const handleDelete = (id, name) => () => {
    dispatch(showModal({ type: modalStateTypes.channelRemove, data: { id, name } }));
  };

  return (
    <div className="d-flex flex-column overflow-auto mb-3">
      <Nav
        variant="pills"
        className="d-flex flex-column"
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
                  <Button size="sm" variant="info" onClick={handleEdit(id, name)}>
                    <MdEdit />
                  </Button>
                  {' '}
                  <Button size="sm" variant="danger" onClick={handleDelete(id, name)}>
                    <MdDeleteForever />
                  </Button>
                </div>
              )}
            </Row>
          );
        })}
      </Nav>
    </div>
  );
}

export default Channels;

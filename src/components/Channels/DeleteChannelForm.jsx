import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { removeChannel as removeChannelAction } from '../../store/channelsSlice';

function DeleteChannelForm(props) {
  const {
    channelsTranslation, close, removeChannel, id,
  } = props;

  const handleRemove = () => {
    removeChannel(id).then(close);
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {channelsTranslation('title')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button onClick={handleRemove} variant="danger">
          {channelsTranslation('button')}
        </Button>
        <Button onClick={close}>Close</Button>
      </Modal.Footer>
    </>
  );
}

const mapStateToProps = (_state) => ({});

const actionCreators = {
  removeChannel: removeChannelAction,
};

export default connect(mapStateToProps, actionCreators)(DeleteChannelForm);

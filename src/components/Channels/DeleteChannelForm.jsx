import React from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { removeChannel as removeChannelAction } from '../../store/channelsSlice';
import { processStates } from '../../common/constants';

function DeleteChannelForm(props) {
  const {
    channelsTranslation, close, removeChannel, id,
    fetchingState,
  } = props;

  const handleRemove = () => {
    removeChannel(id).then(close);
  };

  const isFetching = fetchingState === processStates.fetching;

  return (
    <>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {channelsTranslation('title')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button onClick={handleRemove} variant="danger" disabled={isFetching}>
          {isFetching && (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )}
          {channelsTranslation('button')}
        </Button>
        <Button onClick={close}>Close</Button>
      </Modal.Footer>
    </>
  );
}

const mapStateToProps = (state) => ({
  fetchingState: state.channels.fetchingState,
});

const actionCreators = {
  removeChannel: removeChannelAction,
};

export default connect(mapStateToProps, actionCreators)(DeleteChannelForm);

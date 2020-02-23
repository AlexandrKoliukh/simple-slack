import React from 'react';
import {
  Button, Form, Modal, Spinner,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { connect } from 'react-redux';
import { patchChannel as patchChannelAction } from '../../store/channelsSlice';
import { processStates } from '../../common/constants';

function EditChannelForm(props) {
  const {
    id, name, patchChannel, close,
    channelsTranslation, fetchingState,
  } = props;

  const formik = useFormik({
    initialValues: {
      channel: name,
    },
    onSubmit({ channel }) {
      patchChannel(id, channel).then(close);
    },
  });

  const isFetching = fetchingState === processStates.fetching;

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {channelsTranslation('title')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          name="channel"
          value={formik.values.channel}
          onChange={formik.handleChange}
        />

      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" variant="success" disabled={isFetching}>
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
    </Form>
  );
}

const mapStateToProps = (state) => ({
  fetchingState: state.channels.fetchingState,
});

const actionCreators = {
  patchChannel: patchChannelAction,
};

export default connect(mapStateToProps, actionCreators)(EditChannelForm);

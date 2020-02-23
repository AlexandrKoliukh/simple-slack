import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import { connect } from 'react-redux';
import { patchChannel as patchChannelAction } from '../../store/channelsSlice';

function EditChannelForm(props) {
  const {
    id, name, patchChannel, close,
    channelsTranslation,
  } = props;

  const formik = useFormik({
    initialValues: {
      channel: name,
    },
    onSubmit({ channel }) {
      patchChannel(id, channel).then(close);
    },
  });

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
        <Button type="submit" variant="success">
          {channelsTranslation('button')}
        </Button>
        <Button onClick={close}>Close</Button>
      </Modal.Footer>
    </Form>
  );
}

const mapStateToProps = (_state) => ({});

const actionCreators = {
  patchChannel: patchChannelAction,
};

export default connect(mapStateToProps, actionCreators)(EditChannelForm);

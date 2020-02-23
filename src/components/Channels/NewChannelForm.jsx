import React from 'react';
import { connect } from 'react-redux';
import {
  Alert, Button, Form, Row, Spinner,
} from 'react-bootstrap';
import { MdAddBox } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { createChannel as createChannelAction } from '../../store/channelsSlice';
import { processStates } from '../../common/constants';

function NewChannelForm(props) {
  const { t } = useTranslation();

  const { createChannel, fetchingState, error } = props;

  const formik = useFormik({
    initialValues: {
      channel: '',
    },
    onSubmit(values) {
      const { channel: name } = values;
      createChannel(name)
        .then(() => {
          formik.resetForm();
        });
    },
  });

  const isFetching = fetchingState === processStates.fetching;

  return (
    <>
      {error && <Alert variant="danger">{error.message}</Alert>}
      <Form onSubmit={formik.handleSubmit}>
        <Row className="d-flex justify-content-between m-1 flex-nowrap">
          <div>
            <Form.Control
              placeholder={t('newChannel')}
              size="sm"
              name="channel"
              value={formik.values.channel}
              onChange={formik.handleChange}
            />
          </div>
          <div>
            <Button
              type="submit"
              disabled={isFetching}
              size="sm"
              variant="success"
              className="ml-1"
            >
              {isFetching ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : <MdAddBox />}
            </Button>
          </div>
        </Row>
      </Form>
    </>
  );
}

const mapStateToProps = (state) => ({
  fetchingState: state.channels.fetchingState,
  error: state.channels.error,
});

const actionCreators = {
  createChannel: createChannelAction,
};

export default connect(mapStateToProps, actionCreators)(NewChannelForm);

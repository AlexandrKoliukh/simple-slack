import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { connect } from 'react-redux';
import {
  Alert,
  Button, Form, Row, Spinner,
} from 'react-bootstrap';
import { MdSend } from 'react-icons/md';
import { postMessage as postMessageAction } from '../../store/messagesSlice';
import UsernameContext from '../../common/UserameContext';
import { processStates } from '../../common/constants';

function MessageForm(props) {
  const { t } = useTranslation();
  const username = useContext(UsernameContext);
  const {
    postMessage, currentChannelId, fetchingState, error,
  } = props;

  const formik = useFormik({
    initialValues: { message: '' },
    validate: (values) => {
      const errors = {};
      if (values.message === '') {
        errors.message = t('errorMessages.message');
      }
      return errors;
    },
    onSubmit: (values) => {
      const attributes = {
        text: values.message,
        username,
        date: new Date(),
      };
      postMessage(currentChannelId, attributes);
      formik.resetForm();
    },
  });

  const inputClasses = cn({
    'is-invalid': !!formik.errors.message,
  });

  const isFetching = fetchingState === processStates.fetching;

  const isSubmitButtonDisabled = isFetching
    || formik.values.message === '' || formik.errors.message;


  return (
    <>
      {error && <Alert variant="danger">{error.message}</Alert>}
      <form className="w-100" onSubmit={formik.handleSubmit}>
        <Row className="d-flex justify-content-between m-1">
          <div className="flex-grow-1">
            <Form.Control
              as="textarea"
              rows={1}
              name="message"
              className={inputClasses}
              value={formik.values.message}
              onChange={formik.handleChange}
              placeholder={t('inputMessagePlaceholder')}
            />
          </div>
          <div className="ml-1">
            <Button
              type="submit"
              disabled={isSubmitButtonDisabled}
            >
              {isFetching ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : <MdSend />}
            </Button>
          </div>
        </Row>
      </form>
    </>
  );
}

const mapStateToProps = (state) => ({
  fetchingState: state.messages.fetchingState,
  currentChannelId: state.channels.currentChannelId,
  error: state.messages.error,
});

const actionCreators = {
  postMessage: postMessageAction,
};

export default connect(mapStateToProps, actionCreators)(MessageForm);

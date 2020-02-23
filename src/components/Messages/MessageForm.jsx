import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { connect } from 'react-redux';
import {
  Button, Col, Form, Row,
} from 'react-bootstrap';
import { MdSend } from 'react-icons/md';
import { postMessage as postMessageAction } from '../../store/messagesSlice';
import UsernameContext from '../../common/UserameContext';
import { messagesStates } from '../../common/constants';

function MessageForm(props) {
  const { t } = useTranslation();
  const username = useContext(UsernameContext);
  const { postMessage, currentChannelId, postingState } = props;

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

  const isSubmitButtonDisabled = postingState === messagesStates.posting
    || formik.values.message === '' || formik.errors.message;

  return (
    <form className="w-100" onSubmit={formik.handleSubmit}>
      <Row>
        <Col md={11}>
          <Form.Control
            as="textarea"
            rows={1}
            name="message"
            className={inputClasses}
            value={formik.values.message}
            onChange={formik.handleChange}
            placeholder={t('inputMessagePlaceholder')}
          />
        </Col>
        <Col md={1}>
          <Button
            type="submit"
            disabled={isSubmitButtonDisabled}
          >
            <MdSend />
          </Button>
        </Col>
      </Row>
    </form>
  );
}

const mapStateToProps = (state) => ({
  postingState: state.messages.postingState,
  currentChannelId: state.channels.currentChannelId,
});

const actionCreators = {
  postMessage: postMessageAction,
};

export default connect(mapStateToProps, actionCreators)(MessageForm);

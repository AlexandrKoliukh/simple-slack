import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { connect } from 'react-redux';
import { Button, Col, Form } from 'react-bootstrap';
import { postMessage as postMessageAction } from '../store/messagesSlice';
import UsernameContext from '../common/UserameContext';

function MessageForm(props) {
  const { t } = useTranslation();
  const username = useContext(UsernameContext);
  const { postMessage, currentChannelId, postingState } = props;

  const formik = useFormik({
    initialValues: { message: '' },
    validate: (values) => {
      const errors = {};
      if (values.message === '') {
        errors.message = 'Required';
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

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Row>
        <Col>
          <Form.Control
            placeholder="First name"
            name="message"
            className={inputClasses}
            value={formik.values.message}
            onChange={formik.handleChange}
          />
        </Col>
        <Col>
          <Button variant="primary" type="submit" disabled={postingState === 'posting'}>
            {t('sendMessage')}
          </Button>
        </Col>
      </Form.Row>
    </Form>
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

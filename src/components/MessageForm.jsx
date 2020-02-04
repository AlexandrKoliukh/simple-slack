import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { Button, Col, Form } from 'react-bootstrap';
import * as messagesActions from '../store/messagesSlice';
import useActions from '../common/useActions';
import UsernameContext from '../common/UserameContext';

function MessageForm() {
  const { t } = useTranslation();
  const binnedMessagesActions = useActions(messagesActions);
  const { activeChannelId, isPostingMessages } = useSelector((state) => {
    const { channels, messages } = state;
    return {
      activeChannelId: channels.activeChannelId,
      isPostingMessages: messages.isPosting,
    };
  });

  const username = useContext(UsernameContext);

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
      binnedMessagesActions.postMessage(activeChannelId, attributes);
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
          <Button variant="primary" type="submit" disabled={isPostingMessages}>
            {t('sendMessage')}
          </Button>
        </Col>
      </Form.Row>
    </Form>
  );
}

export default MessageForm;

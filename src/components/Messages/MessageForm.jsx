import React, { useContext, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import {
  Alert, Button, Form, Spinner,
} from 'react-bootstrap';
import { MdSend } from 'react-icons/md';
import UsernameContext from '../../common/UserameContext';
import * as service from '../../service';

function MessageForm() {
  const { t } = useTranslation();
  const username = useContext(UsernameContext);
  const { currentChannelId } = useSelector((state) => state.channels);
  const messageInputRef = useRef(null);

  useEffect(() => {
    messageInputRef.current.focus();
  });

  const formik = useFormik({
    initialValues: { message: '' },
    validate: (values) => {
      const errors = {};
      if (values.message === '') {
        errors.message = t('errorMessages.message');
      }
      return errors;
    },
    onSubmit: async (values, actions) => {
      const attributes = {
        text: values.message,
        username,
        date: new Date(),
      };
      try {
        await service.postMessage(currentChannelId, attributes);
        formik.resetForm();
      } catch (e) {
        actions.setFieldError('async', e);
      }
    },
  });

  const inputClasses = cn({
    'is-invalid': !!formik.errors.message,
  });

  const isFetching = !formik.isValidating && formik.isSubmitting;
  const isSubmitButtonDisabled = isFetching
    || formik.values.message === '' || formik.errors.message;

  return (
    <div className="mt-auto">
      {formik.errors.async && <Alert variant="danger">{formik.errors.async.message}</Alert>}
      <form onSubmit={formik.handleSubmit}>
        <div className="w-100 d-flex justify-content-between p-1">
          <Form.Control
            name="message"
            className={inputClasses}
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={t('inputMessagePlaceholder')}
            ref={messageInputRef}
          />
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
        </div>
      </form>
    </div>
  );
}

export default MessageForm;

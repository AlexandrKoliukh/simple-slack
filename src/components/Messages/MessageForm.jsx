import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import {
  Alert, Button, Form, Row, Spinner,
} from 'react-bootstrap';
import { MdSend } from 'react-icons/md';
import UsernameContext from '../../common/UserameContext';
import * as service from '../../service';

function MessageForm() {
  const { t } = useTranslation();
  const username = useContext(UsernameContext);
  const { currentChannelId } = useSelector((state) => state.currentChannelId);

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
    <>
      {formik.errors.async && <Alert variant="danger">{formik.errors.async.message}</Alert>}
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
              onBlur={formik.handleBlur}
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

export default MessageForm;

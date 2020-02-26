import React from 'react';
import {
  Alert, Button, Form, Row, Spinner,
} from 'react-bootstrap';
import { MdAddBox } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { createChannel } from '../../service';

function NewChannelForm() {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      channel: '',
    },
    onSubmit: async (values, actions) => {
      const { channel: name } = values;
      try {
        await createChannel(name);
        actions.resetForm();
      } catch (e) {
        actions.setFieldError('async', e);
      }
    },
  });

  const isFetching = !formik.isValidating && formik.isSubmitting;

  return (
    <>
      {formik.errors.async && <Alert variant="danger">{formik.errors.async.message}</Alert>}
      <Form onSubmit={formik.handleSubmit}>
        <Row className="d-flex justify-content-between m-1 flex-nowrap">
          <div>
            <Form.Control
              placeholder={t('newChannel')}
              size="sm"
              name="channel"
              onBlur={formik.handleBlur}
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

export default NewChannelForm;

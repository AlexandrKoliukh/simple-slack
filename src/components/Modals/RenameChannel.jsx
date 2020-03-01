import React, { useEffect, useRef } from 'react';
import {
  Alert, Button, Form, Modal, Spinner,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { patchChannel } from '../../service';
import { modalStateTypes } from '../../common/constants';

const RenameChannel = (props) => {
  const { t } = useTranslation();
  const { data, hideModal } = props;
  const { id, name } = data;

  const formik = useFormik({
    initialValues: {
      channel: name,
    },
    onSubmit: async ({ channel }, actions) => {
      try {
        await patchChannel(id, channel);
        hideModal();
      } catch (e) {
        actions.setFieldError('async', e);
      }
    },
  });

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.select();
  }, [null]);

  const isFetching = !formik.isValidating && formik.isSubmitting;

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vtop">
          {t(`modal.${modalStateTypes.channelRename}.title`, { name })}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {formik.errors.async && <Alert variant="danger">{formik.errors.async.message}</Alert>}
        <Form.Control
          ref={inputRef}
          name="channel"
          onBlur={formik.handleBlur}
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
          {t(`modal.${modalStateTypes.channelRename}.button`)}
        </Button>
        <Button onClick={hideModal}>{t('close')}</Button>
      </Modal.Footer>
    </Form>
  );
};

export default RenameChannel;

import React from 'react';
import {
  Alert, Button, Modal, Spinner,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { removeChannel } from '../../service';
import { modalStateTypes } from '../../common/constants';

function RemoveChannel(props) {
  const { t } = useTranslation();
  const { hideModal, data } = props;
  const { id, name } = data;

  const formik = useFormik({
    initialValues: {},
    onSubmit: async (values, actions) => {
      try {
        await removeChannel(id);
        hideModal();
      } catch (e) {
        actions.setFieldError('async', e);
      }
    },
  });

  const isFetching = !formik.isValidating && formik.isSubmitting;

  return (
    <>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vtop">
          {t(`modal.${modalStateTypes.channelRemove}.title`, { name })}
        </Modal.Title>
      </Modal.Header>
      {formik.errors.async && <Alert variant="danger">{formik.errors.async.message}</Alert>}
      <Modal.Footer>
        <Button onClick={formik.handleSubmit} variant="danger" disabled={isFetching}>
          {isFetching && (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )}
          {t(`modal.${modalStateTypes.channelRemove}.button`)}
        </Button>
        <Button onClick={hideModal}>{t('close')}</Button>
      </Modal.Footer>
    </>
  );
}

export default RemoveChannel;

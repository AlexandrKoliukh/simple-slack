import React from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal as hideModalAction } from '../../store/uiSlice';

function ModalWrapper(props) {
  const dispatch = useDispatch();
  const { show, data } = useSelector((state) => state.ui.modalState);
  const hideModal = () => hideModalAction() |> dispatch;

  const { WrappedComponent } = props;

  return (
    <Modal
      size="md"
      aria-labelledby="contained-modal-title-vtop"
      onHide={hideModal}
      show={show}
    >
      <WrappedComponent data={data} hideModal={hideModal} />
    </Modal>
  );
}

export default ModalWrapper;

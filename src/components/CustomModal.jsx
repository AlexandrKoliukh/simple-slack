import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { changeModalState as changeModalStateAction } from '../store/uiSlice';

function CustomModal(props) {
  const { modalState } = props;
  const { isOpen } = modalState;

  // const handleClose = () => {
  //   changeModalState({
  //     isOpen: false,
  //     type: 'default',
  //     error: null,
  //   });
  // };

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={isOpen}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

const mapStateToProps = (state) => ({
  modalState: state.ui.modalState,
});

const actionCreators = {
  changeModalState: changeModalStateAction,
};

export default connect(mapStateToProps, actionCreators)(CustomModal);

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import ListGroup from 'react-bootstrap/cjs/ListGroup';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { Button, Modal } from 'react-bootstrap';
import * as channelsActions from '../store/channelsSlice';
import * as service from '../service';
import useActions from '../common/useActions';

function Channels() {
  const { t } = useTranslation();
  const binnedChannelsActions = useActions(channelsActions);
  const { channels, activeChannelId } = useSelector(({ channels: ch }) => ({
    channels: ch.data,
    activeChannelId: ch.activeChannelId,
  }));

  const [isAddFormOpen, changeOpenState] = useState(false);

  const handleClick = (id) => (e) => {
    e.preventDefault();
    binnedChannelsActions.changeActiveChannel({ id });
  };

  const handleAddChannel = () => {
    changeOpenState(true);
  };

  const handleRemoveChannel = (id) => () => {
    const yes = window.confirm('Yuo are sure');
    if (yes) binnedChannelsActions.removeChannel(id);
  };

  const getClasses = (id) => cn({
    active: activeChannelId === id,
  });
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  return (
    <div className="border-right h-100 p-0 m-0">
      <span className="d-flex flex-row justify-content-between p-2 border-bottom mb-2">
        <div>{t('channels')}</div>
        <div onClick={handleAddChannel}><i className="font-weight-bold">+</i></div>
      </span>
      <ListGroup as="div">
        {channels.map((channel) => {
          const { id, name, removable } = channel;
          return (
            <ListGroup.Item
              key={id}
              as="span"
              className={`d-flex flex-row justify-content-between ${getClasses(id)}`}
              onClick={handleClick(id)}
            >
              <div>{name}</div>
              {removable && <div onClick={handleRemoveChannel(id)}><i className="font-weight-bold">x</i></div>}
              {removable && <div onClick={handleShow}><i className="font-weight-bold">o</i></div>}
            </ListGroup.Item>
          );
        })}
        {isAddFormOpen && <AddForm changeOpenState={changeOpenState} />}
      </ListGroup>
      <ModalContainer show={show} setShow={setShow} />
    </div>
  );
}

function AddForm(props) {
  const formik = useFormik({
    initialValues: { channel: '' },
    validate: (values) => {
      const errors = {};
      if (values.channel === '') {
        errors.channel = 'Required';
      }
      return errors;
    },
    onSubmit: (values) => {
      service.postChannel(values.channel);
      props.changeOpenState(false);
      formik.resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <input type="text" onChange={formik.handleChange} name="channel" value={formik.values.channel} />
    </form>
  );
}

function ModalContainer(props) {
  const { show, setShow } = props;

  const handleClose = () => setShow(false);

  const formik = useFormik({
    initialValues: { newName: '' },
    validate: (values) => {
      const errors = {};
      if (values.newName === '') {
        errors.newName = 'Required';
      }
      return errors;
    },
    onSubmit: (values) => {
      console.log(values);
      formik.resetForm();
      handleClose();
    },
  });

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit</Modal.Title>
      </Modal.Header>
      <form onSubmit={formik.handleSubmit}>
        <input type="text" onChange={formik.handleChange} name="newName" value={formik.values.newName} />
      </form>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={formik.handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Channels;

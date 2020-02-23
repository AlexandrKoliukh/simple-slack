import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Row } from 'react-bootstrap';
import { MdAddBox } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { createChannel as createChannelAction } from '../../store/channelsSlice';

function NewChannelForm(props) {
  const { t } = useTranslation();

  const { createChannel } = props;

  const isSubmitButtonDisabled = false;

  const formik = useFormik({
    initialValues: {
      channel: '',
    },
    onSubmit(values) {
      const { channel: name } = values;
      createChannel(name);
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Row className="d-flex justify-content-between m-1 flex-nowrap">
        <div>
          <Form.Control
            placeholder={t('newChannel')}
            size="sm"
            name="channel"
            value={formik.values.channel}
            onChange={formik.handleChange}
          />
        </div>
        <div>
          <Button
            type="submit"
            disabled={isSubmitButtonDisabled}
            size="sm"
            variant="success"
            className="ml-1"
          >
            <MdAddBox />
          </Button>
        </div>
      </Row>
    </Form>
  );
}

const mapStateToProps = (_state) => ({});

const actionCreators = {
  createChannel: createChannelAction,
};

export default connect(mapStateToProps, actionCreators)(NewChannelForm);

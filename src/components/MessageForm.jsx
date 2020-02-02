import React from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import * as messagesActions from '../store/messagesSlice';
import useActions from '../common/useActions';

function MessageForm() {
  const { t } = useTranslation();
  const binnedMessagesActions = useActions(messagesActions);
  const { activeChannelId, isLoadingMessages, messagesError } = useSelector((state) => {
    const { channels, messages } = state;
    return {
      activeChannelId: channels.activeChannelId,
      isLoadingMessages: messages.isLoading,
      messagesError: messages.error,
    };
  });

  const validate = (values) => {
    const errors = {};
    if (values.message === '') {
      errors.message = 'Required';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: { message: '' },
    validate,
    onSubmit: (values) => {
      binnedMessagesActions.postMessage(activeChannelId, values.message);
      formik.resetForm();
    },
  });

  const inputClasses = cn({
    'form-control': true,
    'is-invalid': !!formik.errors.message,
  });

  return (
    <>
      {messagesError !== null && <div>{messagesError.message}</div>}
      <form onSubmit={formik.handleSubmit} className="row d-flex justify-content-between">
        <div className="form-group col-11">
        <textarea
          value={formik.values.message}
          onChange={formik.handleChange}
          className={inputClasses}
          id="message"
          aria-describedby="messageHelp"
          placeholder={t('inputMessagePlaceholder')}
        />
        </div>
        <button
          type="submit"
          className="btn btn-primary col-1"
          disabled={isLoadingMessages}
        >
          {t('sendMessage')}
        </button>
      </form>
    </>
  );
}

export default MessageForm;

import React from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import * as service from '../service';

function MessageForm() {
  const { t } = useTranslation();

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
      service.postMessage(1, values.message);
    }
  });

  const inputClasses = cn({
    'form-control': true,
    'is-invalid': !!formik.errors.message,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="row d-flex justify-content-between">
      <div className="form-group col-10">
        <textarea
          value={formik.values.message}
          onChange={formik.handleChange}
          className={inputClasses}
          id="message"
          aria-describedby="messageHelp"
          placeholder={t('inputMessagePlaceholder')}
        />
      </div>
      <button type="submit" className="btn btn-primary col-2">
        {t('sendMessage')}
      </button>
    </form>
  );
}

export default MessageForm;

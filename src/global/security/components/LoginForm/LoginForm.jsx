import React from 'react';

import PropTypes from 'prop-types';

import Form from '../../../components/Form';
import DataStateNotifier from '../../../components/DataStateNotifier';

import I18nSecurity from '../../utils/I18nSecurity';

import './LoginForm.css';

const LoginForm = ({
  title, login, loggingIn, loginError, resetLoginError,
}) => {
  const keys = [
    {
      name: 'username',
      title: I18nSecurity.t('en.login.attribute.username.title'),
      type: 'text',
      required: true,
      validationAlert: I18nSecurity.t('en.login.attribute.username.validationAlert'),
    },
    {
      name: 'password',
      title: I18nSecurity.t('en.login.attribute.password.title'),
      type: 'password',
      required: true,
      validationAlert: I18nSecurity.t('en.login.attribute.password.validationAlert'),
    },
  ];

  const formatData = data => ({ ...data });

  return (
    <DataStateNotifier
      dataLoading={loggingIn}
      dataError={loginError}
      resetDataError={resetLoginError}
    >
      <div className="LoginForm">
        <div className="LoginForm__header">
          <h3 className="LoginForm__title">{title}</h3>
        </div>
        <div className="LoginForm__container">
          <Form
            action="login"
            loading={loggingIn}
            keys={keys}
            data={null}
            className="LoginForm"
            title={title}
            handleSubmit={login}
            formatData={data => formatData(data)}
          />
        </div>
      </div>
    </DataStateNotifier>
  );
};

export default LoginForm;

LoginForm.propTypes = {
  title: PropTypes.string,
  login: PropTypes.func,
  loggingIn: PropTypes.string,
  loginError: PropTypes.string,
  resetLoginError: PropTypes.func,
};

LoginForm.defaultProps = {
  title: '',
  login: () => {},
  loggingIn: '',
  loginError: '',
  resetLoginError: () => {},
};

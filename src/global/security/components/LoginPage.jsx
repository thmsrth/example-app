import React from 'react';

import I18nSecurity from '../utils/I18nSecurity';

import LoginForm from './LoginForm';

const LoginPage = props => (
  <LoginForm
    {...props}
    title={I18nSecurity.t('en.login.title')}
  />
);

export default LoginPage;

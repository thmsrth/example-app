import React from 'react';
import { connect, Provider } from 'react-redux';

import store from '../../store/security';

import {
  login,
  resetSecurityError,
} from '../../actions/security';

import {
  getSecurityError,
  getLoggingIn,
} from '../../reducers/security';

import LoginForm from './LoginForm';

const mapStateToProps = state => ({
  securityError: getSecurityError(state),
  loggingIn: getLoggingIn(state),
});

const mapDispatchToProps = dispatch => ({
  login: params => dispatch(login(params)),
  resetSecurityError: () => dispatch(resetSecurityError()),
});

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginForm);

const LoginFormContainer = props => (
  <Provider store={store}>
    <ConnectedContainer {...props} />
  </Provider>
);

export default LoginFormContainer;

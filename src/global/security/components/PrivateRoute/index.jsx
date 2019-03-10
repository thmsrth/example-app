import React from 'react';
import { connect, Provider } from 'react-redux';

import securityStore from '../../store/security';

import {
  checkAuthorization,
  resetSecurityError,
} from '../../actions/security';

import {
  getPermissions,
  getSecurityError,
  getAuthorizing,
} from '../../reducers/security';

import PrivateRoute from './PrivateRoute';

const mapStateToProps = state => ({
  permissions: getPermissions(state),
  securityError: getSecurityError(state),
  authorizing: getAuthorizing(state),
});

const mapDispatchToProps = dispatch => ({
  checkAuthorization: params => dispatch(checkAuthorization(params)),
  resetSecurityError: () => dispatch(resetSecurityError()),
});

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PrivateRoute);

const PrivateRouteContainer = props => (
  <Provider store={securityStore}>
    <ConnectedContainer {...props} />
  </Provider>
);

export default PrivateRouteContainer;

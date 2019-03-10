import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { MAIN_PATH } from '../../../../../config/constants';

import DataStateNotifier from '../../../components/DataStateNotifier';

import SecurityUtil from '../../utils/SecurityUtil';

class PrivateRoute extends React.Component {
  componentDidMount() {
    const { checkAuthorization } = this.props;
    const authToken = SecurityUtil.getAuthToken();

    if (authToken) checkAuthorization(authToken);
  }

  render() {
    const {
      component: Component,
      permission,
      securityError,
      resetSecurityError,
      ...otherProps
    } = this.props;

    return (
      <DataStateNotifier
        dataError={securityError}
        resetDataError={resetSecurityError}
      >
        <Route
          {...otherProps}
          render={(props) => {
            if (SecurityUtil.isLoggedIn()) {
              if (SecurityUtil.hasAuthorized()) {
                return SecurityUtil.isGranted(permission)
                  ? <Component {...props} />
                  : <Redirect to={{ pathname: `${MAIN_PATH}/error403` }} />;
              }
              return <div />;
            }
            return <Redirect to={{ pathname: `${MAIN_PATH}/error401` }} />;
          }}
        />
      </DataStateNotifier>
    );
  }
}

export default PrivateRoute;

PrivateRoute.propTypes = {
  path: PropTypes.string,
  component: PropTypes.func,
  permission: PropTypes.string,
  securityError: PropTypes.string,
  resetSecurityError: PropTypes.func,
  checkAuthorization: PropTypes.func,
};

PrivateRoute.defaultProps = {
  path: '/',
  component: () => <div />,
  permission: '',
  securityError: '',
  resetSecurityError: () => {},
  checkAuthorization: () => {},
};

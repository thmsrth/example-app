import React from 'react';
import PropTypes from 'prop-types';

import Notification from '../../../components/Notification';

import I18nSecurity from '../../utils/I18nSecurity';

const NoAccess = ({ message }) => (
  <Notification
    message={message}
  />
);

export default NoAccess;

NoAccess.propTypes = {
  message: PropTypes.string,
};

NoAccess.defaultProps = {
  message: I18nSecurity.t('en.route.noAccess'),
};

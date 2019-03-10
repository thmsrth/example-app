import React from 'react';
import PropTypes from 'prop-types';

import Notification from '../../../components/Notification';

import I18nSecurity from '../../utils/I18nSecurity';

const NotFound = ({ message, loading }) => {
  if (!loading) {
    return (
      <Notification
        loading={loading}
        message={message}
      />
    );
  }
  return null;
};

export default NotFound;

NotFound.propTypes = {
  message: PropTypes.string,
  loading: PropTypes.string,
};

NotFound.defaultProps = {
  message: I18nSecurity.t('en.route.notFound'),
  loading: '',
};

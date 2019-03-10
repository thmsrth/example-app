import React from 'react';
import PropTypes from 'prop-types';

import { MAIN_PATH } from '../../../../../config/constants';

import { historyPush } from '../../../utils/UrlHelpers';
import Notification from '../../../components/Notification';

import I18nSecurity from '../../utils/I18nSecurity';

const NotLoggedIn = ({ message }) => (
  <Notification
    message={message}
    buttonText={I18nSecurity.t('en.route.goToLoginPage')}
    buttonAction={() => historyPush(`${MAIN_PATH}/login`)}
  />
);

export default NotLoggedIn;

NotLoggedIn.propTypes = {
  message: PropTypes.string,
};

NotLoggedIn.defaultProps = {
  message: I18nSecurity.t('en.route.notLoggedIn'),
};

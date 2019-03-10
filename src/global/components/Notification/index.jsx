import React from 'react';
import PropTypes from 'prop-types';

import { MAIN_PATH } from '../../../../config/constants';

import Button from '../Button';
import DataStateNotifier from '../DataStateNotifier';
import { historyPush } from '../../utils/UrlHelpers';

import I18nGlobal from '../../utils/I18nGlobal';

import './Notification.css';

const Notification = ({
  message, buttonText, buttonAction, loading, error, resetError,
}) => (
  <DataStateNotifier
    dataLoading={loading}
    dataError={error}
    resetDataError={resetError}
  >
    <div className="Notification">
      <div className="Notification__container">
        <h4 className="Notification__message">
          {message}
        </h4>
        <Button
          className="Notification__button"
          text={buttonText}
          onClick={buttonAction}
        />
      </div>
    </div>
  </DataStateNotifier>
);

export default Notification;

Notification.propTypes = {
  message: PropTypes.string,
  buttonText: PropTypes.string,
  buttonAction: PropTypes.func,
  loading: PropTypes.string,
  error: PropTypes.string,
  resetError: PropTypes.func,
};

Notification.defaultProps = {
  message: '',
  buttonText: I18nGlobal.t('en.actions.backToHome'),
  buttonAction: () => historyPush(MAIN_PATH),
  loading: '',
  error: '',
  resetError: () => {},
};

import React from 'react';
import PropTypes from 'prop-types';

import { bemCls } from '../../utils/ClassNameHelpers';
import I18nGlobal from '../../utils/I18nGlobal';

import Button from '../Button';
import Icon from '../Icon';

import './DataStateNotifier.css';

const DataStateNotifier = ({
  resetDataError, dataError, children,
  dataLoading, dataAdding, dataUpdating, dataDeleting,
}) => {
  if (dataError) {
    return (
      <div className="DataStateNotifier DataStateNotifier--error">
        <div className="DataStateNotifier__container">
          <div className="DataStateNotifier__states">
            <h4 className="DataStateNotifier__error">{dataError}</h4>
            <div className="DataStateNotifier__back">
              <Button
                className="DataStateNotifier__back__button"
                iconName="remove"
                text={I18nGlobal.t('en.actions.ok')}
                onClick={resetDataError}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="DataStateNotifier">
      {(dataLoading || dataAdding || dataUpdating || dataDeleting)
        && (
        <h4 className="DataStateNotifier__actions">
          <Icon name="spinner" className="DataStateNotifier__icon fa-spin" />
          {dataLoading || dataAdding || dataUpdating || dataDeleting}
        </h4>
        )
      }

      <div className={`DataStateNotifier__container ${
        bemCls('DataStateNotifier__container', '--loading', dataLoading)} ${
        bemCls('DataStateNotifier__container', '--adding', dataAdding)} ${
        bemCls('DataStateNotifier__container', '--updating', dataUpdating)} ${
        bemCls('DataStateNotifier__container', '--deleting', dataDeleting)}`}
      >
        {children}
      </div>
    </div>
  );
};

export default DataStateNotifier;

DataStateNotifier.propTypes = {
  resetDataError: PropTypes.func,
  dataError: PropTypes.string,
  dataLoading: PropTypes.string,
  dataAdding: PropTypes.string,
  dataUpdating: PropTypes.string,
  dataDeleting: PropTypes.string,
  children: PropTypes.node,
};

DataStateNotifier.defaultProps = {
  resetDataError: () => {},
  dataError: '',
  dataLoading: '',
  dataAdding: '',
  dataUpdating: '',
  dataDeleting: '',
  children: <div />,
};

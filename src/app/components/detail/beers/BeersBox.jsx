import React from 'react';
import PropTypes from 'prop-types';

import dataItemType from '../../types/dataItem';

import DataStateNotifier from '../../../../global/components/DataStateNotifier';

import I18n from '../../../utils/I18n';

import BeersListWrapper from './BeersListWrapper';

import './BeersBox.css';

const BeersBox = ({
  item, beersLoading, beersError, ...otherProps
}) => {
  if (item && item.id) {
    return (
      <div className="BeersBox">
        <DataStateNotifier
          {...otherProps}
          dataLoading={beersLoading}
          dataError={beersError}
        >
          <div className="BeersBox__container">
            <div className="BeersBox__header">
              <h3 className="BeersBox__title">
                {`${I18n.t('en.beers.title')} ${item.name}`}
              </h3>
            </div>
            <BeersListWrapper
              {...otherProps}
              item={item}
            />
          </div>
        </DataStateNotifier>
      </div>
    );
  }
  return null;
};


export default BeersBox;

BeersBox.propTypes = {
  item: dataItemType,
  beersLoading: PropTypes.string,
  beersError: PropTypes.string,
};

BeersBox.defaultProps = {
  item: {},
  beersLoading: '',
  beersError: '',
};

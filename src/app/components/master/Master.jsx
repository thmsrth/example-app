import React from 'react';

import PropTypes from 'prop-types';
import dataItemType from '../types/dataItem';

import I18n from '../../utils/I18n';

import DataStateNotifier from '../../../global/components/DataStateNotifier';

import MasterList from './MasterList';
import MasterFilter from './MasterFilter';
import MasterActions from './MasterActions';
import MasterPagination from './MasterPagination';

import './Master.css';

const Master = ({
  handleFilterItems, filteredData, ...otherProps
}) => (
  <DataStateNotifier {...otherProps}>
    <div className="Master">
      <div className="Master__header">
        <h3 className="Master__title">
          {I18n.t('en.data.title')}
        </h3>
      </div>
      <div className="Master__container">
        <MasterFilter
          {...otherProps}
          handleFilterItems={handleFilterItems}
        />
        <MasterActions
          {...otherProps}
        />
        <MasterList
          {...otherProps}
          data={filteredData}
        />
        <MasterPagination
          {...otherProps}
          data={filteredData}
        />
      </div>
    </div>
  </DataStateNotifier>
);

export default Master;

Master.propTypes = {
  filteredData: PropTypes.arrayOf(dataItemType),
  handleFilterItems: PropTypes.func,
};

Master.defaultProps = {
  filteredData: [],
  handleFilterItems: () => {},
};

import React from 'react';

import PropTypes from 'prop-types';
import Filter from '../../../global/components/Filter';
import dataItemType from '../types/dataItem';
import filterType from '../../../global/components/Filter/types/filter';
import filtersValuesType from '../../../global/components/Filter/types/filtersValues';

import I18n from '../../utils/I18n';

import './MasterFilter.css';

const MasterFilter = ({
  data, dataFilters, filters, handleFilterItems, fetchFilteredItems,
}) => (
  <Filter
    className="MasterFilter"
    items={data}
    filters={filters}
    dataFilters={dataFilters}
    handleFilterItems={handleFilterItems}
    fetchFilteredItems={fetchFilteredItems}
    serverSidedFiltering
  />
);

export default MasterFilter;

MasterFilter.propTypes = {
  data: PropTypes.arrayOf(dataItemType),
  dataFilters: filtersValuesType,
  filters: PropTypes.arrayOf(filterType),
  handleFilterItems: PropTypes.func,
  fetchFilteredItems: PropTypes.func,
};

MasterFilter.defaultProps = {
  data: [],
  dataFilters: {},
  filters: [
    {
      name: 'id',
      title: `${I18n.t('en.data.attribute.id.title')}:`,
      type: 'number',
    },
    {
      name: 'name',
      title: `${I18n.t('en.data.attribute.name.title')}:`,
      type: 'text',
    },
    {
      name: 'createdAt',
      title: 'Created At:',
      type: 'datetime',
      range: true,
      dateMin: I18n.t('en.filter.dateMin'),
      dateMax: I18n.t('en.filter.dateMax'),
      pattern: I18n.t('en.filter.datePattern'),
      placeholder: I18n.t('en.filter.dateFormat'),
    },
    {
      name: 'createdBy',
      title: 'Created by:',
      type: 'text',
    },
    {
      name: 'updatedAt',
      title: 'Updated At:',
      type: 'datetime',
      range: true,
      dateMin: I18n.t('en.filter.dateMin'),
      dateMax: I18n.t('en.filter.dateMax'),
      pattern: I18n.t('en.filter.datePattern'),
      placeholder: I18n.t('en.filter.dateFormat'),
    },
    {
      name: 'updatedBy',
      title: 'Updated by:',
      type: 'text',
    },
  ],
  handleFilterItems: () => {},
  fetchFilteredItems: () => {},
};

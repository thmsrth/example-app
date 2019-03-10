import React, { Component } from 'react';

import PropTypes from 'prop-types';
import filterType from './types/filter';
import filtersValuesType from './types/filtersValues';

import { getLastKeyValueFromObject } from '../../utils/FormatHelpers';

import {
  getMultipleValuesActivatedFilters,
  getSingleValuesActivatedFilters,
  matchEverySingleWordInStringAttribute,
  matchOneValueFromMultipleValuesAttribute,
  getFilters,
  initFiltersValues,
  formatDataFiltersParamsToValues,
  formatFiltersValuesToDataParams,
} from '../../utils/FilterHelpers';

import Filter from './Filter';

class FilterWrapper extends Component {
  constructor(props) {
    super(props);
    this.filters = getFilters(props.filters, props.items);

    const { dataFilters } = this.props;
    const filtersValues = {
      ...initFiltersValues(this.filters),
      ...formatDataFiltersParamsToValues(dataFilters, this.filters),
    };

    this.state = {
      filtersValues,
    };

    this.handleFiltersChange = this.handleFiltersChange.bind(this);
    this.handleClearFilters = this.handleClearFilters.bind(this);
    this.handleSubmitFilters = this.handleSubmitFilters.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { dataFilters } = this.props;
    const { filtersValues } = this.state;

    if (nextProps.dataFilters !== dataFilters) {
      const newFiltersValues = {
        ...filtersValues,
        ...(Object.keys(nextProps.dataFilters).length
          ? formatDataFiltersParamsToValues(nextProps.dataFilters, this.filters)
          : initFiltersValues(this.filters)),
      };

      this.setState({ filtersValues: newFiltersValues });
    }
  }

  handleFiltersChange(key, value) {
    const { serverSidedFiltering } = this.props;
    const { filtersValues } = this.state;
    const newFiltersValues = {
      ...filtersValues,
      [key]: value,
    };

    this.setState({ filtersValues: newFiltersValues });

    if (!serverSidedFiltering) {
      this.filter(newFiltersValues);
    }
  }

  handleSubmitFilters(event) {
    event.preventDefault();
    const { serverSidedFiltering, fetchFilteredItems } = this.props;
    const { filtersValues } = this.state;
    if (serverSidedFiltering) {
      const data = formatFiltersValuesToDataParams(filtersValues, this.filters);
      fetchFilteredItems(data);
    }
  }

  handleClearFilters() {
    const { serverSidedFiltering, fetchFilteredItems } = this.props;
    const filtersValues = initFiltersValues(this.filters);
    if (serverSidedFiltering) {
      const data = formatFiltersValuesToDataParams(filtersValues, this.filters);
      fetchFilteredItems(data);
    } else {
      this.filter(filtersValues);
    }

    this.setState({ filtersValues });
  }

  filterItems(filtersValues) {
    const { items, filters } = this.props;
    return items.filter((item) => {
      const results = [];

      filters.forEach((filter) => {
        let activatedFilters = [];
        const filterValues = filtersValues[filter.name];

        if (typeof filterValues === 'object') {
          activatedFilters = getMultipleValuesActivatedFilters(filterValues);
        } else if (typeof filterValues === 'string') {
          activatedFilters = getSingleValuesActivatedFilters(filterValues);
        }

        const [, itemLastKeyValue] = getLastKeyValueFromObject(filter.property
          || filter.name, item);

        // Case insensitive
        const itemAttribute = itemLastKeyValue && itemLastKeyValue.toString().toLowerCase();

        results.push(activatedFilters.some((value) => {
          if (typeof itemAttribute === 'string') {
            return matchEverySingleWordInStringAttribute(itemAttribute, value, filter);
          }
          return matchOneValueFromMultipleValuesAttribute(itemAttribute, value);
        }) || !activatedFilters.length); // No filtering
      });

      return results.every(value => !!value);
    });
  }

  filter(filtersValues) {
    const { handleFilterItems } = this.props;
    handleFilterItems(this.filterItems(filtersValues));
  }

  render() {
    const { filtersValues } = this.state;
    return (
      <Filter
        {...this.props}
        filters={this.filters}
        filtersValues={filtersValues}
        handleFiltersChange={this.handleFiltersChange}
        handleClearFilters={this.handleClearFilters}
        handleSubmitFilters={this.handleSubmitFilters}
      />
    );
  }
}

export default FilterWrapper;

FilterWrapper.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  items: PropTypes.arrayOf(PropTypes.object),
  filters: PropTypes.arrayOf(filterType),
  dataFilters: filtersValuesType,
  serverSidedFiltering: PropTypes.bool,
  handleFilterItems: PropTypes.func,
  fetchFilteredItems: PropTypes.func,
};

FilterWrapper.defaultProps = {
  items: [],
  filters: [],
  dataFilters: {},
  serverSidedFiltering: true,
  handleFilterItems: () => {},
  fetchFilteredItems: () => {},
};

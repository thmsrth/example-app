import React, { Component } from 'react';

import PropTypes from 'prop-types';
import dataItemType from '../types/dataItem';
import filtersValuesType from '../../../global/components/Filter/types/filtersValues';

import { MAIN_PATH } from '../../../../config/constants';

import { getDataSortParam } from '../../reducers/data';

import {
  historyOnPopState,
  historyPathname,
  historyPush,
  historyStateParams,
  serializeQueryParams,
  updateUrlQueryParams,
} from '../../../global/utils/UrlHelpers';

import Master from './Master';

class MasterWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredData: props.data,
    };
    this.handleFilterItems = this.handleFilterItems.bind(this);
    this.fetchSortedItems = this.fetchSortedItems.bind(this);
    this.fetchFilteredItems = this.fetchFilteredItems.bind(this);
    this.handleOnPageNumberChange = this.handleOnPageNumberChange.bind(this);
    this.handleOnSizeChange = this.handleOnSizeChange.bind(this);
    this.updateSortQueryParams = this.updateSortQueryParams.bind(this);
    this.handleHistoryOnPopState = this.handleHistoryOnPopState.bind(this);
  }

  componentDidMount() {
    const {
      fetchData, dataPageSize, dataPageNumber, dataSortParam, dataFilters,
    } = this.props;

    const defaultParams = {
      size: dataPageSize,
      page: dataPageNumber,
      sort: dataSortParam,
      ...dataFilters,
    };
    const queryParams = updateUrlQueryParams({}, defaultParams);

    fetchData(queryParams);
    historyOnPopState(this.handleHistoryOnPopState); // register onpopstate event

    if (historyPathname() === MAIN_PATH && !historyStateParams()) {
      historyPush(MAIN_PATH, queryParams);
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      fetchData, dataPageSize, dataPageNumber, dataSortParam, location,
    } = this.props;

    this.setState({ filteredData: nextProps.data });

    if (nextProps.location.search === '' && nextProps.location.search !== location.search) {
      const defaultParams = {
        size: dataPageSize,
        page: dataPageNumber,
        sort: dataSortParam,
      };
      const queryParams = updateUrlQueryParams({}, defaultParams);

      fetchData(queryParams);

      if (historyPathname() === MAIN_PATH && !historyStateParams()) {
        historyPush(MAIN_PATH, queryParams);
      }
    }
  }

  componentWillUnmount() {
    historyOnPopState(); // unregister onpopstate event
  }

  getSortQueryParams(property, direction) {
    const {
      dataPageSize, dataFilters,
    } = this.props;
    const sortParam = getDataSortParam({
      data: {
        sort: {
          property,
          direction,
        },
      },
    });
    return {
      size: dataPageSize,
      page: 0,
      sort: sortParam,
      ...dataFilters,
    };
  }

  handleHistoryOnPopState(historyStateObject) {
    const {
      fetchData, dataLoading, dataPageSize, dataPageNumber, dataSortParam, dataFilters,
    } = this.props;

    const historyQueryParams = historyStateParams(historyStateObject);

    const previousParams = {
      size: dataPageSize,
      page: dataPageNumber,
      sort: dataSortParam,
      ...dataFilters,
    };

    if (!dataLoading
      && historyQueryParams && Object.keys(historyQueryParams).length
      && serializeQueryParams(historyQueryParams) !== serializeQueryParams(previousParams)) {
      fetchData(historyQueryParams);
    }
  }

  handleFilterItems(filteredData) {
    this.setState({ filteredData });
  }

  handleOnPageNumberChange({ pageNumber }) {
    const {
      dataPageSize, dataSortParam, dataFilters, fetchData,
    } = this.props;
    const queryParams = {
      size: dataPageSize,
      page: pageNumber,
      sort: dataSortParam,
      ...dataFilters,
    };

    historyPush(MAIN_PATH, queryParams);
    fetchData(queryParams);
  }

  handleOnSizeChange(name, size) {
    const {
      dataSortParam, dataFilters, fetchData,
    } = this.props;
    const queryParams = {
      size,
      page: 0,
      sort: dataSortParam,
      ...dataFilters,
    };

    historyPush(MAIN_PATH, queryParams);
    fetchData(queryParams);
  }

  updateSortQueryParams(property, direction) {
    const { updateSortParams } = this.props;
    const queryParams = this.getSortQueryParams(property, direction);

    historyPush(MAIN_PATH, queryParams);
    updateSortParams({ property, direction });
  }

  fetchSortedItems(property, direction) {
    const { fetchData } = this.props;

    fetchData(this.getSortQueryParams(property, direction));
  }

  fetchFilteredItems(filtersValues) {
    const {
      dataPageSize, dataSortParam, fetchData,
    } = this.props;
    const queryParams = {
      size: dataPageSize,
      page: 0,
      sort: dataSortParam,
      ...filtersValues,
    };

    historyPush(MAIN_PATH, queryParams);
    fetchData(queryParams);
  }

  render() {
    const { filteredData } = this.state;
    return (
      <Master
        {...this.props}
        filteredData={filteredData}
        handleFilterItems={this.handleFilterItems}
        fetchSortedItems={this.fetchSortedItems}
        fetchFilteredItems={this.fetchFilteredItems}
        onPageNumberChange={this.handleOnPageNumberChange}
        onSizeChange={this.handleOnSizeChange}
        updateSortQueryParams={this.updateSortQueryParams}
      />
    );
  }
}

export default MasterWrapper;

MasterWrapper.propTypes = {
  data: PropTypes.arrayOf(dataItemType),
  dataPageSize: PropTypes.number,
  dataSortParam: PropTypes.string,
  dataFilters: filtersValuesType,
  fetchData: PropTypes.func,
  updateSortParams: PropTypes.func,
  dataPageNumber: PropTypes.number,
  dataLoading: PropTypes.string,
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
};

MasterWrapper.defaultProps = {
  dataLoading: '',
  data: [],
  dataPageNumber: 0,
  dataPageSize: 25,
  dataSortParam: 'id,ASC',
  dataFilters: {},
  fetchData: () => {},
  updateSortParams: () => {},
  location: {
    search: '',
  },
};

import React from 'react';
import { connect, Provider } from 'react-redux';

import store from '../../../app/store';

import {
  fetchDataById,
  resetDataError,
} from '../../../app/actions/data';

import {
  getData,
  getDataError,
  getDataLoading,
  getDataPagination,
  getDataPageSize,
  getDataPageNumber,
  getDataSort,
  getDataSortParam,
  getDataFilters,
} from '../../../app/reducers/data';

import ItemFetcher from './ItemFetcher';

const mapStateToProps = state => ({
  data: getData(state),
  dataError: getDataError(state),
  dataLoading: getDataLoading(state),
  dataPagination: getDataPagination(state),
  dataPageSize: getDataPageSize(state),
  dataPageNumber: getDataPageNumber(state),
  dataSort: getDataSort(state),
  dataSortParam: getDataSortParam(state),
  dataFilters: getDataFilters(state),
});

const mapDispatchToProps = dispatch => ({
  fetchDataById: params => dispatch(fetchDataById(params)),
  resetDataError: () => dispatch(resetDataError()),
});

const ConnectedItemFetcherContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ItemFetcher);

const ItemFetcherContainer = props => (
  <Provider store={store}>
    <ConnectedItemFetcherContainer {...props} />
  </Provider>
);

export default ItemFetcherContainer;

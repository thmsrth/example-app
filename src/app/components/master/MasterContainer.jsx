import React from 'react';
import { connect, Provider } from 'react-redux';

import store from '../../store';

import {
  fetchData,
  fetchDataById,
  resetDataError,
  updateSortParams,
} from '../../actions/data';

import {
  getData,
  getDataPagination,
  getDataPageSize,
  getDataPageNumber,
  getDataSort,
  getDataSortParam,
  getDataFilters,
  getDataError,
  getDataLoading,
} from '../../reducers/data';

import MasterWrapper from './MasterWrapper';

const mapStateToProps = state => ({
  data: getData(state),
  dataPagination: getDataPagination(state),
  dataPageSize: getDataPageSize(state),
  dataPageNumber: getDataPageNumber(state),
  dataSort: getDataSort(state),
  dataSortParam: getDataSortParam(state),
  dataFilters: getDataFilters(state),
  dataError: getDataError(state),
  dataLoading: getDataLoading(state),
});

const mapDispatchToProps = dispatch => ({
  fetchData: params => dispatch(fetchData(params)),
  fetchDataById: params => dispatch(fetchDataById(params)),
  resetDataError: () => dispatch(resetDataError()),
  updateSortParams: params => dispatch(updateSortParams(params)),
});

const ConnectedMasterContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MasterWrapper);

const MasterContainer = props => (
  <Provider store={store}>
    <ConnectedMasterContainer {...props} />
  </Provider>
);

export default MasterContainer;

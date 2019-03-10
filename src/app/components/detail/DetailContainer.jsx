import React from 'react';
import { connect, Provider } from 'react-redux';

import store from '../../store';

import {
  getDataPageSize,
  getDataPageNumber,
  getDataSortParam,
  getDataFilters,

  getDataDeleting,
} from '../../reducers/data';

import {
  deleteData,
} from '../../actions/data';

import {
  getBeers,
  getBeersError,
  getBeersLoading,
} from '../../reducers/beers';

import { fetchBeers } from '../../actions/beers';

import DetailWrapper from './DetailWrapper';

const mapStateToProps = state => ({
  dataPageSize: getDataPageSize(state),
  dataPageNumber: getDataPageNumber(state),
  dataSortParam: getDataSortParam(state),
  dataFilters: getDataFilters(state),

  dataDeleting: getDataDeleting(state),

  beers: getBeers(state),
  beersLoading: getBeersLoading(state),
  beersError: getBeersError(state),
});

const mapDispatchToProps = dispatch => ({
  deleteData: params => dispatch(deleteData(params)),
  fetchBeers: params => dispatch(fetchBeers(params)),
});

const ConnectedDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailWrapper);

const DetailContainer = props => (
  <Provider store={store}>
    <ConnectedDetailContainer {...props} />
  </Provider>
);

export default DetailContainer;

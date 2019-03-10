import React from 'react';
import { connect, Provider } from 'react-redux';

import {
  createData,
  updateData,
  resetDataError,
} from '../../../actions/data';

import {
  getDataPageSize,
  getDataPageNumber,
  getDataSortParam,
  getDataFilters,
  getDataError,
  getDataLoading,
  getDataAdding,
  getDataUpdating,
} from '../../../reducers/data';

import {
  getLanguages,
  getLanguagesError,
  getLanguagesLoading,
} from '../../../reducers/languages';

import { fetchLanguageDetection } from '../../../actions/languages';

import store from '../../../store';

import ExampleFormWrapper from './ExampleFormWrapper';

const mapStateToProps = state => ({
  dataPageSize: getDataPageSize(state),
  dataPageNumber: getDataPageNumber(state),
  dataSortParam: getDataSortParam(state),
  dataFilters: getDataFilters(state),
  dataError: getDataError(state),
  dataLoading: getDataLoading(state),
  dataAdding: getDataAdding(state),
  dataUpdating: getDataUpdating(state),

  languages: getLanguages(state),
  languagesLoading: getLanguagesLoading(state),
  languagesError: getLanguagesError(state),
});

const mapDispatchToProps = dispatch => ({
  createData: params => dispatch(createData(params)),
  updateData: params => dispatch(updateData(params)),
  resetDataError: () => dispatch(resetDataError()),

  fetchLanguageDetection: (params, onSuccess) => dispatch(fetchLanguageDetection(
    params, onSuccess,
  )),
});

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExampleFormWrapper);

const ExampleFormContainer = props => (
  <Provider store={store}>
    <ConnectedContainer {...props} />
  </Provider>);

export default ExampleFormContainer;

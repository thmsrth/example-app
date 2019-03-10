import React from 'react';
import { connect, Provider } from 'react-redux';

import store from '../store/index';

import {
  fetchImageById,
} from '../actions/imageUpload';

import {
  getImageLoading,
  getImage,
} from '../reducers/imageUpload';

import ImageByIdWrapper from './ImageByIdWrapper';

const mapStateToProps = (state, props) => ({
  loading: getImageLoading(state),
  image: getImage(state, props.value),
});

const mapDispatchToProps = dispatch => ({
  fetchImageById: params => dispatch(fetchImageById(params)),
});

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImageByIdWrapper);

const InputByIdContainer = props => (
  <Provider store={store}>
    <ConnectedContainer {...props} />
  </Provider>
);

export default InputByIdContainer;

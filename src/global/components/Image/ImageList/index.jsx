import React from 'react';
import { connect, Provider } from 'react-redux';

import store from '../store/index';

import {
  fetchImagesByIds,
  resetImageUploadError,
} from '../actions/imageUpload';

import {
  getImageLoading,
  getImageUploadError,
  getImage,
  getUploadedImages,
} from '../reducers/imageUpload';

import ImageListWrapper from './ImageListWrapper';

const mapStateToProps = (state, props) => ({
  uploadedImages: getUploadedImages(state),
  loading: getImageLoading(state),
  error: getImageUploadError(state),
  image: getImage(state, props.value),
});

const mapDispatchToProps = dispatch => ({
  fetchImagesByIds: params => dispatch(fetchImagesByIds(params)),
  resetImageUploadError: () => dispatch(resetImageUploadError()),
});

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ImageListWrapper);

const ImageListContainer = props => (
  <Provider store={store}>
    <ConnectedContainer {...props} />
  </Provider>
);

export default ImageListContainer;

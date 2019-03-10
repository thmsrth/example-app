import React from 'react';
import { connect, Provider } from 'react-redux';

import store from '../store/index';

import {
  uploadImage,
  fetchImageById,
  resetImageUploadError,
} from '../actions/imageUpload';

import {
  getUploadedImages,
  getImageLoading,
  getImageUploading,
  getImageUploadError,
  getImage,
} from '../reducers/imageUpload';

import InputImageWrapper from './InputImageWrapper';

const mapStateToProps = (state, props) => ({
  uploadedImages: getUploadedImages(state),
  uploading: getImageUploading(state, props.name),
  loading: getImageLoading(state),
  uploadError: getImageUploadError(state),
  image: getImage(state, props.value),
});

const mapDispatchToProps = dispatch => ({
  uploadImage: params => dispatch(uploadImage(params)),
  fetchImageById: params => dispatch(fetchImageById(params)),
  resetImageUploadError: () => dispatch(resetImageUploadError()),
});

const ConnectedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InputImageWrapper);

const InputImageContainer = props => (
  <Provider store={store}>
    <ConnectedContainer {...props} />
  </Provider>
);

export default InputImageContainer;

import I18n, { getErrorMessage } from '../../../utils/I18nGlobal';

import ApiClient from '../api/ApiClient';
import * as types from '../actionTypes/imageUpload';

export function uploadImage(params) {
  const { onSuccess, name } = params;

  return (dispatch) => {
    dispatch({
      type: types.IMAGE_UPLOAD,
      currentUploadingName: name,
      uploading: I18n.t('en.image.actions.uploading'),
    });
    ApiClient.uploadImage(params)
      .then((res) => {
        dispatch({
          type: types.IMAGE_UPLOAD_SUCCESS,
          data: res.data,
          currentUploadingName: '',
          uploading: '',
          error: '',
        });
        onSuccess(res.data.id);
      })
      .catch((e) => {
        dispatch({
          type: types.IMAGE_UPLOAD_ERROR,
          uploading: '',
          currentUploadingName: '',
          error: `${
            I18n.t('en.image.states.error.uploading')}: ${
            getErrorMessage(e, 'en.image.states.error')
          }`,
        });
      });
  };
}

export function fetchImageById(params) {
  return (dispatch) => {
    dispatch({
      type: types.IMAGES_GET,
      loading: I18n.t('en.image.actions.loading'),
    });
    ApiClient.fetchImageById(params)
      .then((res) => {
        dispatch({
          type: types.IMAGES_GET_SUCCESS,
          data: res.data,
          loading: '',
          error: '',
        });
      })
      .catch((e) => {
        dispatch({
          type: types.IMAGES_GET_ERROR,
          loading: '',
          error: `${
            I18n.t('en.image.states.error.loading')}: ${
            getErrorMessage(e, 'en.image.states.error')
          }`,
        });
      });
  };
}

export function fetchImagesByIds(params) {
  return (dispatch) => {
    dispatch({
      type: types.IMAGES_GET,
      loading: I18n.t('en.image.actions.loading'),
    });
    ApiClient.fetchImagesByIds(params)
      .then((res) => {
        dispatch({
          type: types.IMAGES_GET_SUCCESS,
          data: res.data,
          loading: '',
          error: '',
        });
      })
      .catch((e) => {
        dispatch({
          type: types.IMAGES_GET_ERROR,
          loading: '',
          error: `${
            I18n.t('en.image.states.error.loading')}: ${
            getErrorMessage(e, 'en.image.states.error')
          }`,
        });
      });
  };
}

export function resetImageUploadError() {
  return (dispatch) => {
    dispatch({
      type: types.IMAGE_UPLOAD_RESET_ERROR,
      error: '',
    });
  };
}

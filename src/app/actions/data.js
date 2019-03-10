import { MAIN_PATH } from '../../../config/constants';

import { historyGoBack, historyPush } from '../../global/utils/UrlHelpers';

import I18n, { getErrorMessage } from '../utils/I18n';
import ApiClient from '../api/ApiClient';

import * as types from '../actionTypes/data';

export function fetchData(params) {
  return (dispatch) => {
    dispatch({
      type: types.DATA_GET,
      loading: I18n.t('en.data.actions.loading'),
    });
    ApiClient.fetchData(params)
      .then((res) => {
        const {
          size, page, sort, ...filters
        } = params;
        dispatch({
          type: types.DATA_GET_SUCCESS,
          data: res.data,
          filters,
          sort,
          loading: '',
          error: '',
        });
      })
      .catch((e) => {
        dispatch({
          type: types.DATA_GET_ERROR,
          loading: '',
          error: `${
            I18n.t('en.data.states.error.loading')}: ${
            getErrorMessage(e, 'en.data.states.error')
          }`,
        });
      });
  };
}

export function fetchDataById(params) {
  return (dispatch) => {
    dispatch({
      type: types.DATA_GET,
      loading: I18n.t('en.data.actions.loading'),
    });
    ApiClient.fetchData(params)
      .then((res) => {
        const { sort } = params;
        dispatch({
          type: types.DATA_GET_SUCCESS,
          data: res.data,
          filters: {},
          sort,
          loading: '',
          error: '',
        });
      })
      .catch((e) => {
        dispatch({
          type: types.DATA_GET_ERROR,
          loading: '',
          error: `${
            I18n.t('en.data.states.error.loading')}: ${
            getErrorMessage(e, 'en.data.states.error')
          }`,
        });
      });
  };
}

export function updateSortParams(sort) {
  return (dispatch) => {
    dispatch({
      type: types.DATA_SORT_UPDATE,
      data: sort,
    });
  };
}

export function createData(params) {
  return (dispatch) => {
    dispatch({
      type: types.DATA_CREATE,
      adding: I18n.t('en.data.actions.adding'),
    });
    ApiClient.createData(params)
      .then((res) => {
        dispatch({
          type: types.DATA_CREATE_SUCCESS,
          data: res.data,
          adding: '',
          error: '',
        });
        historyPush(`${MAIN_PATH}/`, params.queryParams);
      })
      .catch((e) => {
        dispatch({
          type: types.DATA_CREATE_ERROR,
          adding: '',
          error: `${
            I18n.t('en.data.states.error.adding')}: ${
            getErrorMessage(e, 'en.data.states.error')
          }`,
        });
      });
  };
}

export function updateData(params) {
  return (dispatch) => {
    dispatch({
      type: types.DATA_UPDATE,
      updating: I18n.t('en.data.actions.updating'),
    });
    ApiClient.updateData(params)
      .then((res) => {
        dispatch({
          type: types.DATA_UPDATE_SUCCESS,
          data: res.data,
          updating: '',
          error: '',
        });
        historyGoBack();
      })
      .catch((e) => {
        dispatch({
          type: types.DATA_UPDATE_ERROR,
          updating: '',
          error: `${
            I18n.t('en.data.states.error.updating')}: ${
            getErrorMessage(e, 'en.data.states.error')
          }`,
        });
      });
  };
}

export function deleteData(params) {
  return (dispatch) => {
    dispatch({
      type: types.DATA_DELETE,
      deleting: I18n.t('en.data.actions.deleting'),
    });
    ApiClient.deleteData(params)
      .then(() => {
        dispatch({
          type: types.DATA_DELETE_SUCCESS,
          id: params.id,
          deleting: '',
          error: '',
        });
        historyGoBack();
      })
      .catch((e) => {
        dispatch({
          type: types.DATA_DELETE_ERROR,
          deleting: '',
          error: `${
            I18n.t('en.data.states.error.deleting')}: ${
            getErrorMessage(e, 'en.data.states.error')
          }`,
        });
      });
  };
}

export function resetDataError() {
  return (dispatch) => {
    dispatch({
      type: types.DATA_RESET_ERROR,
      error: '',
    });
  };
}

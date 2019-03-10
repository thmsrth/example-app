import { MAIN_PATH } from '../../../../config/constants';

import { historyPush, getUrlQueryParams } from '../../utils/UrlHelpers';

import SecurityUtil from '../utils/SecurityUtil';
import I18nSecurity, { getErrorMessage } from '../utils/I18nSecurity';
import ApiClientSecurity from '../api/ApiClientSecurity';
import * as types from '../actionTypes/security';

export function checkAuthorization(params) {
  return (dispatch) => {
    dispatch({
      type: types.AUTHORIZE,
      authorizing: I18nSecurity.t('en.login.actions.authorizing'),
    });
    ApiClientSecurity.authorize(params)
      .then((res) => {
        dispatch({
          type: types.AUTHORIZE_SUCCESS,
          data: res.data,
          authorizing: '',
          error: '',
        });
        const queryParams = getUrlQueryParams();
        if (params && params.authenticationData) historyPush(`${MAIN_PATH}/`, queryParams);
      })
      .catch((e) => {
        if (SecurityUtil.isTokenInvalid(e)) historyPush(`${MAIN_PATH}/error401`);

        dispatch({
          type: types.AUTHORIZE_ERROR,
          authorizing: '',
          error: `${
            I18nSecurity.t('en.login.states.error.authorize')}: ${
            getErrorMessage(e, 'en.login.states.error')
          }`,
        });
      });
  };
}

function setCookie(params) {
  return (dispatch) => {
    dispatch({
      type: types.SET_COOKIE,
      loggingIn: I18nSecurity.t('en.login.actions.login'),
    });
    ApiClientSecurity.saveToken(params.authenticationData)
      .then(() => {
        dispatch({
          type: types.LOGIN_SUCCESS,
          loggingIn: '',
          error: '',
        });
        dispatch(checkAuthorization(params));
      })
      .catch((e) => {
        dispatch({
          type: types.LOGIN_ERROR,
          loggingIn: '',
          error: `${
            I18nSecurity.t('en.login.states.error.login')}: ${
            getErrorMessage(e, 'en.login.states.error')
          }`,
        });
      });
  };
}

export function login(params) {
  return (dispatch) => {
    dispatch({
      type: types.LOGIN,
      loggingIn: I18nSecurity.t('en.login.actions.authenticating'),
    });
    ApiClientSecurity.authenticate(params)
      .then((res) => {
        dispatch({
          type: types.AUTHENTICATE_SUCCESS,
          loggingIn: '',
          error: '',
        });
        dispatch(setCookie({ ...params, authenticationData: res.data }));
      })
      .catch((e) => {
        dispatch({
          type: types.AUTHENTICATE_ERROR,
          loggingIn: '',
          error: `${
            I18nSecurity.t('en.login.states.error.authenticate')}: ${
            getErrorMessage(e, 'en.login.states.error')
          }`,
        });
      });
  };
}

export function resetSecurityError() {
  return (dispatch) => {
    dispatch({
      type: types.SECURITY_RESET_ERROR,
      error: '',
    });
  };
}

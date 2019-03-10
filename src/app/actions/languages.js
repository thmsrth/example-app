import I18n, { getErrorMessage } from '../utils/I18n';
import ApiClient from '../api/ApiClient';

import * as types from '../actionTypes/languages';
import { LANGUAGE_NONE } from '../utils/BusinessLogic';

export function fetchLanguageDetection(params, onSuccess) {
  return (dispatch) => {
    dispatch({
      type: types.LANGUAGES_GET,
      loading: I18n.t('en.languages.actions.loading'),
    });
    const { data, updateData, ...submitParams } = params;
    ApiClient.fetchLanguageDetection(submitParams)
      .then((res) => {
        dispatch({
          type: types.LANGUAGES_GET_SUCCESS,
          data: res.data,
          loading: '',
          error: '',
        });
        onSuccess(data, updateData, res.data.success
          ? res.data.results[0].language_code : LANGUAGE_NONE);
      })
      .catch((e) => {
        dispatch({
          type: types.LANGUAGES_GET_ERROR,
          loading: '',
          error: `${
            I18n.t('en.languages.states.error.loading')}: ${
            getErrorMessage(e, 'en.languages.states.error')
          }`,
        });
      });
  };
}

export function resetLanguagesError() {
  return (dispatch) => {
    dispatch({
      type: types.LANGUAGES_RESET_ERROR,
      error: '',
    });
  };
}

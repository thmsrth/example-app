import I18n, { getErrorMessage } from '../utils/I18n';
import ApiClient from '../api/ApiClient';

import * as types from '../actionTypes/beers';

export function fetchBeers(params) {
  return (dispatch) => {
    dispatch({
      type: types.BEERS_GET,
      loading: I18n.t('en.beers.actions.loading'),
    });
    ApiClient.fetchBeers(params)
      .then((res) => {
        dispatch({
          type: types.BEERS_GET_SUCCESS,
          data: res.data,
          loading: '',
          error: '',
        });
      })
      .catch((e) => {
        dispatch({
          type: types.BEERS_GET_ERROR,
          loading: '',
          error: `${
            I18n.t('en.beers.states.error.loading')}: ${
            getErrorMessage(e, 'en.beers.states.error')
          }`,
        });
      });
  };
}

export function resetLanguagesError() {
  return (dispatch) => {
    dispatch({
      type: types.BEERS_RESET_ERROR,
      error: '',
    });
  };
}

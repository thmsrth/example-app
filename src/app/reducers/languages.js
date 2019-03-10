import * as types from '../actionTypes/languages';
import { LANGUAGE_NONE } from '../utils/BusinessLogic';

import I18n from '../utils/I18n';

const noLangaugeDetected = {
  language_code: LANGUAGE_NONE,
  language_name: I18n.t('en.data.attribute.language.none'),
  percentage: 0,
};

const initialState = {
  data: [noLangaugeDetected],
  error: '',
  loading: '',
};

const languages = (state = initialState, action) => {
  switch (action.type) {
    case types.LANGUAGES_GET:
      return {
        ...state,
        loading: action.loading,
      };
    case types.LANGUAGES_GET_SUCCESS:
      return {
        ...state,
        data: action.data.success ? action.data.results : [noLangaugeDetected],
        error: action.error,
        loading: action.loading,
      };
    case types.LANGUAGES_GET_ERROR:
      return {
        ...state,
        error: action.error,
        loading: action.loading,
      };
    default:
      return state;
  }
};

export default languages;

export function getLanguages(state) {
  return state.languages && state.languages.data;
}

export function getLanguagesError(state) {
  return state.languages && state.languages.error;
}

export function getLanguagesLoading(state) {
  return state.languages && state.languages.loading;
}

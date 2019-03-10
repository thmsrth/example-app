import * as types from '../actionTypes/beers';

const initialState = {
  data: [],
  error: '',
  loading: '',
};

const beers = (state = initialState, action) => {
  switch (action.type) {
    case types.BEERS_GET:
      return {
        ...state,
        loading: action.loading,
      };
    case types.BEERS_GET_SUCCESS:
      return {
        ...state,
        data: action.data,
        error: action.error,
        loading: action.loading,
      };
    case types.BEERS_GET_ERROR:
      return {
        ...state,
        error: action.error,
        loading: action.loading,
      };
    default:
      return state;
  }
};

export default beers;

export function getBeers(state) {
  return state.beers && state.beers.data;
}

export function getBeersError(state) {
  return state.beers && state.beers.error;
}

export function getBeersLoading(state) {
  return state.beers && state.beers.loading;
}

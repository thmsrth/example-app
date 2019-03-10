import * as types from '../actionTypes/security';

const initialState = {
  data: {
    active: false,
    authorities: {},
    client_id: '',
    user_name: '',
  },
  error: '',
  loggingIn: '',
  authorizing: '',
};

function formatPermissions(authorities) {
  if (authorities && authorities.length) {
    return authorities.reduce((acc, permission) => {
      const permissions = { ...acc };
      permissions[permission.replace('ROLE_FE_', '')] = true;

      return permissions;
    }, {});
  }

  return {};
}

const security = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        loggingIn: action.loggingIn,
      };
    case types.AUTHENTICATE_SUCCESS:
      return {
        ...state,
        error: action.error,
        loggingIn: action.loggingIn,
      };
    case types.AUTHENTICATE_ERROR:
      return {
        ...state,
        error: action.error,
        loggingIn: action.loggingIn,
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        error: action.error,
        loggingIn: action.loggingIn,
      };
    case types.LOGIN_ERROR:
      return {
        ...state,
        error: action.error,
        loggingIn: action.loggingIn,
      };
    case types.AUTHORIZE:
      return {
        ...state,
        authorizing: action.authorizing,
      };
    case types.AUTHORIZE_SUCCESS:
      return {
        ...state,
        data: {
          ...action.data,
          authorities: formatPermissions(action.data && action.data.authorities),
        },
        error: action.error,
        authorizing: action.authorizing,
      };
    case types.AUTHORIZE_ERROR:
      return {
        ...state,
        error: action.error,
        authorizing: action.authorizing,
      };
    case types.SECURITY_RESET_ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default security;

export function getSecurityData(state) {
  return state.security && state.security.data;
}

export function getSecurityError(state) {
  return state.security && state.security.error;
}

export function getLoggingIn(state) {
  return state.security && state.security.loggingIn;
}

export function getAuthorizing(state) {
  return state.security && state.security.authorizing;
}

export function getPermissions(state) {
  return state.security && state.security.data && state.security.data.authorities;
}

export function getCurrentUserName(state) {
  return state.security && state.security.data && state.security.data.user_name;
}

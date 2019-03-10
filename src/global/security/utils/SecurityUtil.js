import store from '../store/security';

import {
  getPermissions as getStatePermissions,
  getCurrentUserName as getStateCurrentUserName,
} from '../reducers/security';

import { readCookie, writeCookie, deleteCookie } from './SessionHelpers';

const { NODE_ENV } = process.env;
const isTestEnvironment = NODE_ENV === 'test';

class SecurityUtil {
  static getAuthTokenValue(authenticationData) {
    return authenticationData
      ? authenticationData.access_token
      : readCookie('authorization_token') || '';
  }

  static getAuthToken() {
    if (isTestEnvironment) {
      return global.authToken; // fake authToken for test environment from global
    }
    const authToken = SecurityUtil.getAuthTokenValue();
    return authToken && `Bearer ${authToken}`;
  }

  static writeToken(tokenValue) {
    return writeCookie('authorization_token', tokenValue, 365);
  }

  static deleteToken() {
    return deleteCookie('authorization_token');
  }

  static isTokenInvalid(e) {
    return e && e.response && e.response.data && e.response.data.error === 'invalid_token';
  }

  static saveAuthTokenInSession(authenticationData) {
    const tokenValue = authenticationData && authenticationData.access_token;
    SecurityUtil.writeToken(tokenValue);
  }

  static saveToken(authenticationData) {
    return new Promise((resolve, reject) => {
      SecurityUtil.saveAuthTokenInSession(authenticationData);

      if (SecurityUtil.isLoggedIn()) {
        resolve();
      } else {
        reject(Error('error'));
      }
    });
  }

  static isLoggedIn() {
    return !!SecurityUtil.getAuthToken();
  }

  static getPermissions() {
    const storeState = store.getState();

    return isTestEnvironment
      ? global.permissions // fake permissions for test environment from global
      : getStatePermissions(storeState);
  }

  static getCurrentUserName() {
    const storeState = store.getState();

    return isTestEnvironment
      ? global.currentUserName // fake currentUserName for test environment from global
      : getStateCurrentUserName(storeState);
  }

  static hasAuthorized() {
    const permissions = SecurityUtil.getPermissions();

    return !!permissions && !!Object.keys(permissions).length;
  }

  static isGranted(permission) {
    const permissions = SecurityUtil.getPermissions();

    return !!permissions && Object.keys(permissions).some(key => (
      key === permission
    )) && permissions[permission];
  }

  /**
   * Returns boolean value if one of the users permissions is included in given array
   * @param {array} permissionArray
   * @returns {boolean}
   */
  static isGrantedArray(permissionArray) {
    return permissionArray.some(permission => SecurityUtil.isGranted(permission));
  }
}

export default SecurityUtil;

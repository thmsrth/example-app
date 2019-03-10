import history from '../../config/route/history';

export function deserializeQueryString(queryStr) {
  const params = {};
  const regExpStr = (match, key, value) => {
    params[decodeURIComponent(key)] = /^(?!0)[0-9]+$/.test(value) || value === '0'
      // return number or string type
      ? parseInt(value, 10)
      : decodeURIComponent(value);
  };
  if (queryStr && typeof queryStr === 'string') {
    queryStr.replace(/([^=?]+)=([^&]*)&?/g, regExpStr);
  }
  return params;
}

export function getUrlQueryParams(url) {
  if (url) {
    const [, queryString] = url.match(/\?(.*?)((#.*)|$)/); // get query string without anchor
    return deserializeQueryString(queryString);
  } if (window && window.location) {
    return deserializeQueryString(window.location.search || '');
  }
  return {};
}

export function serializeQueryParams(params) {
  return params
    && Object.keys(params).filter(key => params[key] !== '' && params[key] !== undefined)
      .map(key => `${key}=${encodeURIComponent(params[key])}`).join('&');
}

export function getRouteParams(routerProps, paramName, type) {
  const param = routerProps && routerProps.match.params[paramName];
  return type === 'number' ? parseInt(param, 10) : param;
}

export function historyPush(pathname = '', params = {}, hash = '') {
  if (history) {
    const { location } = history;
    const newPathname = pathname || (location && location.pathname);
    const newHash = hash || (location && location.hash);
    const newQueryString = serializeQueryParams(params);
    const newHistoryUrl = `${newPathname}?${newQueryString}${newHash}`;
    const newHistoryState = { params, hash };
    history.push(newHistoryUrl, newHistoryState);
  }
}

export function historyGoBack() {
  if (history) history.goBack();
}

export function historyOnPopState(callback = () => {}) {
  if (window) {
    window.onpopstate = event => callback(event.state);
  }
}

export function historyLocation() {
  return history && history.location;
}

export function historyPathname() {
  return historyLocation() && historyLocation().pathname;
}

export function historyState(stateObject = historyLocation()) {
  return stateObject && stateObject.state;
}

export function historyStateParams(stateObject = historyLocation()) {
  const queryParams = getUrlQueryParams();

  return historyState(stateObject)
    ? historyState(stateObject).params
    : queryParams;
}

export function updateUrlQueryParams(newParams = {}, defaultParams = {}) {
  const queryParams = getUrlQueryParams();
  const newQueryParams = {
    ...defaultParams,
    ...queryParams,
    ...newParams,
  };
  return newQueryParams;
}

const UrlHelpers = {
  deserializeQueryString,
  serializeQueryParams,
  getUrlQueryParams,
  updateUrlQueryParams,
  historyPush,
  historyGoBack,
  historyOnPopState,
};

export default UrlHelpers;

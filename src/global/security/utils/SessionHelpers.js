export function writeCookie(name, value, days) {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = `; expires=${date.toGMTString()}`;
  }
  const domain = window && window.location.hostname
    ? window.location.hostname.split('.').slice(-2).join('.')
    : '.goquarters.com';

  document.cookie = `${name}=${value}${expires}; domain=${domain}; path=/`;
}

export function readCookie(name) {
  const nameEq = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEq) === 0) {
      return c.substring(nameEq.length, c.length);
    }
  }
  return '';
}

export function deleteCookie(name) {
  writeCookie(name, '', -1);
}

const SessionHelpers = {
  writeCookie,
  readCookie,
  deleteCookie,
};

export default SessionHelpers;

const translations = {
  en: {
    actions: {
      login: 'Login',
    },
    login: {
      actions: {
        authenticating: 'Authentication in progress ...',
        authorizing: 'Checking permissions ...',
        login: 'Logging in ...',
      },
      attribute: {
        password: {
          title: 'Password',
          validationAlert: 'Please fill out the password field',
        },
        username: {
          title: 'Username',
          validationAlert: 'Please fill out the username field',
        },
      },
      states: {
        error: {
          400: 'Bad Request',
          401: 'Unauthorized',
          403: 'Access denied',
          404: 'Not found',
          422: 'Unprocessable Entities',
          500: 'Internal server error',
          authenticate: 'An error has occured while trying to authenticate the user',
          authorize: 'An error has occured while authorizing the user',
          login: 'An error has occured while logging in. Please make sure that the cookies are enabled in your browser and try to login again.',
        },
      },
      title: 'Login',
    },
    route: {
      goToLoginPage: 'Go to login page',
      noAccess: 'It seems that you do not have the necessary access for this page. Please check your permissions.',
      notFound: 'Unfortunately, the requested route does not exist :(',
      notLoggedIn: 'You are not logged in.',
    },
  },
};

class I18nSecurity {
  static t(keyString, options = {}) {
    function findTranslation(keys, translationObject, keyPath) {
      if (!keys.length) {
        // Replace options values in translation
        return Object.keys(options).reduce((translation, key) => {
          const option = new RegExp(`%{${key}}`, 'g');
          return translation.replace(option, options[key]);
        }, translationObject);
      }

      if (Object.keys(translationObject).some(key => key === keys[0])) {
        return findTranslation(keys.slice(1), translationObject[keys[0]], `${keyPath}.${keys[0]}`);
      }
      throw new Error(`Missing security translation "${keys[0]}" in key "${keyPath}"`);
    }

    return findTranslation(keyString.split('.'), translations, 'translations');
  }
}

export default I18nSecurity;


export function getErrorStatusTranslation(e, translationPath) {
  const status = e.request && e.request.status;
  const knownErrorsStatus = [400, 401, 403, 404, 422];
  if (status && knownErrorsStatus.some(errorStatus => errorStatus === status)) {
    return I18nSecurity.t(`${translationPath}.${status}`);
  }
  return I18nSecurity.t(`${translationPath}.500`);
}

export function getErrorMessage(e, translationPath) {
  if (e.response
    && e.response.data
    && Object.prototype.hasOwnProperty.call(e.response.data, 'errorMessage')) {
    return e.response.data.errorMessage;
  }
  return getErrorStatusTranslation(e, translationPath);
}

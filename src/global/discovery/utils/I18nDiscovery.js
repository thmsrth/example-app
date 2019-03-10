const translations = {
  en: {
    actions: {
      backToHome: 'Back to home',
    },
    discovery: {
      actions: {
        registering: 'Registering the application ...',
        deregistering: 'Deregistering the application ...',
      },
      states: {
        error: {
          400: 'Bad Request',
          401: 'Unauthorized',
          403: 'Access denied',
          404: 'Not found',
          422: 'Unprocessable Entities',
          500: 'Internal server error',
          register: 'An error has occured while registering the application',
          deregister: 'An error has occured while deregistering the application',
        },
        registered: 'Application successfully registered :)',
        deregistered: 'Application successfully deregistered :)',
      },
    },
  },
};

class I18nDiscovery {
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
      throw new Error(`Missing discovery translation "${keys[0]}" in key "${keyPath}"`);
    }

    return findTranslation(keyString.split('.'), translations, 'translations');
  }
}

export default I18nDiscovery;


export function getErrorStatusTranslation(e, translationPath) {
  const status = e.request && e.request.status;
  const knownErrorsStatus = [400, 401, 403, 404, 422];
  if (status && knownErrorsStatus.some(errorStatus => errorStatus === status)) {
    return I18nDiscovery.t(`${translationPath}.${status}`);
  }
  return I18nDiscovery.t(`${translationPath}.500`);
}

export function getErrorMessage(e, translationPath) {
  if (e.response
    && e.response.data
    && Object.prototype.hasOwnProperty.call(e.response.data, 'errorMessage')) {
    return e.response.data.errorMessage;
  }
  return getErrorStatusTranslation(e, translationPath);
}

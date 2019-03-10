const translations = {
  en: {
    actions: {
      add: 'Add',
      backToHome: 'Back to home',
      cancel: 'Cancel',
      changePassword: 'Change Password',
      close: 'Close',
      create: 'Create',
      edit: 'Save',
      login: 'Login',
      ok: 'OK',
      save: 'Save',
      selectAll: 'Select All',
      send: 'Send',
      upload: 'Upload',
    },
    answer: {
      yes: 'Yes',
      no: 'No',
    },
    app: {
      error: 'An error has occurred while rendering the application :(',
    },
    dateFormat: 'DD/MM/YYYY',
    filter: {
      all: 'All',
      from: 'From:',
      to: 'To:',
    },
    image: {
      actions: {
        loading: 'Loading...',
        uploading: 'Uploading...',
      },
      states: {
        error: {
          500: 'Internal server error',
          400: 'Bad Request',
          404: 'Not found',
          413: 'The selected file is too large',
          422: 'Unprocessable Entities',
          loading: 'An error has occurred while loading the picture',
          uploading: 'An error has occurred while uploading the picture',
        },
        uploaded: 'Uploaded',
        noImage: 'No image',
      },
    },
    inputSelect: {
      nothingSelected: 'Nothing selected',
      valueNotInOptions: 'Value not in options',
    },
    pagination: {
      next: 'Next',
      prev: 'Prev',
      total: '%{count} results',
    },
    route: {
      notFound: 'Unfortunately, the requested route does not exist :(',
    },
    suggestions: {
      loading: 'Loading suggestions ...',
    },
  },
};

class I18nGlobal {
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
      throw new Error(`Missing global translation "${keys[0]}" in key "${keyPath}"`);
    }

    return findTranslation(keyString.split('.'), translations, 'translations');
  }
}

export default I18nGlobal;

export function getErrorStatusTranslation(e, translationPath) {
  const status = e.request && e.request.status;
  const knownErrorsStatus = [400, 404, 413, 422];
  if (status && knownErrorsStatus.some(errorStatus => errorStatus === status)) {
    return I18nGlobal.t(`${translationPath}.${status}`);
  }
  return I18nGlobal.t(`${translationPath}.500`);
}

export function getErrorMessage(e, translationPath) {
  if (e.response && e.response.data
    && Object.prototype.hasOwnProperty.call(e.response.data, 'errorMessage')) {
    return e.response.data.errorMessage;
  }
  return getErrorStatusTranslation(e, translationPath);
}

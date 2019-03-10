const translations = {
  en: {
    answer: {
      no: 'No',
      yes: 'Yes',
    },
    actions: {
      back: 'Back',
      cancel: 'Cancel',
      create: 'Add',
      delete: 'Delete',
      detail: 'Detail',
      disabled: 'Disabled action',
      drink: 'Drink',
      edit: 'Edit',
      ok: 'OK',
      save: 'Save',
    },
    beers: {
      actions: {
        loading: 'Loading beers...',
      },
      states: {
        empty: 'No data available.',
        error: {
          400: 'Bad Request',
          404: 'Not found',
          422: 'Unprocessable Entities',
          500: 'Internal server error',
          loading: 'An error has occurred while fetching the beers.',
        },
      },
      title: 'Beers that go well with',
    },
    data: {
      actions: {
        adding: 'Creating a new food ...',
        deleting: 'Deleting food ...',
        loading: 'Loading data ...',
        updating: 'Updating food ...',
      },
      attribute: {
        checkbox: {
          title: 'Checkbox',
        },
        createdAt: {
          title: 'Created at',
        },
        createdBy: {
          title: 'Created by',
        },
        collection: {
          fields: {
            phone: {
              title: 'Phone',
              pattern: /^\+?\d*$/,
              validationAlert: 'Please enter a valid phone number',
            },
            date: {
              title: 'Date',
            },
          },
          title: 'Collection',
        },
        calories: {
          title: 'Calories',
        },
        fat: {
          title: 'Fat',
        },
        id: {
          title: 'ID',
        },
        language: {
          none: 'No language detected',
          title: 'Language',
        },
        name: {
          title: 'Name',
        },
        multiselect: {
          title: 'Multiselect',
        },
        nutritionalInformation: {
          title: 'Nutritional information',
        },
        protein: {
          title: 'Protein',
        },
        priceAmount: {
          pattern: /^[0-9]+(\.[0-9]{0,2})?$/,
          title: 'Amount',
          validationAlert: 'Please enter a valid amount (2 digits decimal)',
        },
        priceCurrencyCode: {
          title: 'Currency',
        },
        radio: {
          title: 'Radio',
        },
        status: {
          title: 'Status',
        },
        text: {
          title: 'Text',
        },
        updatedAt: {
          title: 'Updated at',
        },
        updatedBy: {
          title: 'Updated by',
        },
      },
      confirmDelete: 'Do you really want to delete this entry ?',
      confirmDrink: 'Do you really want to drink this beer ?',
      entity: 'Food',
      infos: {
        title: 'Infos',
      },
      pagination: {
        next: 'Next',
        prev: 'Prev',
        total: '%{count} results',
      },
      title: 'Food',
      states: {
        empty: 'No data available.',
        error: {
          400: 'Bad Request',
          404: 'Not found',
          422: 'Unprocessable Entities',
          500: 'Internal server error',
          adding: 'An error has occurred while adding a new food',
          deleting: 'An error has occurred while deleting the food',
          loading: 'An error has occurred while fetching the data',
          updating: 'An error has occurred while updating the food',
        },
      },
    },
    dateFormat: 'DD/MM/YYYY',
    filter: {
      all: 'All',
      dateFormat: 'yyyy-mm-dd',
      dateMin: '2012-01-01',
      dateMax: '2099-12-31',
      datePattern: '[0-9]{4}-[0-9]{2}-[0-9]{2}',
      from: 'From:',
      to: 'To:',
    },
    form: {
      validationAlert: 'The following entry must be valid',
      noOptionSelected: 'Nothing selected',
    },
    languages: {
      actions: {
        loading: 'Loading languages...',
      },
      states: {
        empty: 'No data available.',
        error: {
          400: 'Bad Request',
          404: 'Not found',
          422: 'Unprocessable Entities',
          500: 'Internal server error',
          loading: 'An error has occurred while fetching the languages.',
        },
      },
    },
    route: {
      noAccess: 'It seems that you do not have the necessary access for this page. Please check your permissions.',
      notFound: 'Unfortunately, the requested route does not exist.',
    },
  },
};

class I18n {
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
      throw new Error(`Missing translation "${keys[0]}" in key "${keyPath}"`);
    }

    return findTranslation(keyString.split('.'), translations, 'translations');
  }
}

export default I18n;


export function getErrorStatusTranslation(e, translationPath) {
  const status = e.request && e.request.status;
  const knownErrorsStatus = [400, 404, 422];
  if (status && knownErrorsStatus.some(errorStatus => errorStatus === status)) {
    return I18n.t(`${translationPath}.${status}`);
  }
  return I18n.t(`${translationPath}.500`);
}

export function getErrorMessage(e, translationPath) {
  if (e.response
    && e.response.data
    && Object.prototype.hasOwnProperty.call(e.response.data, 'errorMessage')) {
    return e.response.data.errorMessage;
  }
  return getErrorStatusTranslation(e, translationPath);
}

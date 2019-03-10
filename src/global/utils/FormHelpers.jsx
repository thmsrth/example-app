import React from 'react';

import { bemCls } from './ClassNameHelpers';

import InputText from '../components/Inputs/InputText';
import InputSelect from '../components/Inputs/InputSelect';
import InputHtml from '../components/Inputs/InputHtml';
import InputRichText from '../components/Inputs/InputRichText';
import InputCheckbox from '../components/Inputs/InputCheckbox';
import InputRadio from '../components/Inputs/InputRadio';
import InputCollection from '../components/Inputs/InputCollection';
import InputImage from '../components/Image/InputImage';
import InputMultiSelect from '../components/Inputs/InputMultiSelect';
import InputLocation from '../components/Inputs/InputLocation';

export function getValidationKeys(key, data) {
  return {
    required: key.required,
    pattern: key.pattern,
    validationAlert: data && !data.isValid ? key.validationAlert : '',
    onValidate: key.onValidate,
    warningAlert: data && data.showWarning ? key.warningAlert : '',
    onWarning: key.onWarning,
  };
}

export function getFormInputAttributes(key, data, className, handleChange, handleBlur, disabled) {
  return {
    key: key.name,
    className: bemCls(`Form ${className}`, 'Input'),
    name: key.name,
    label: key.title,
    onChange: handleChange,
    onBlur: handleBlur,
    value: data.value,
    validationKeys: getValidationKeys(key, data),
    disabled: disabled !== undefined ? disabled : key.disabled,
    min: key.min,
    max: key.max,
    step: key.step,
    hidden: key.hidden,
  };
}

export function getFormInputField(
  key,
  data,
  className,
  handleChange,
  handleBlur,
  optionsFromData,
  disabled,
) {
  const formInputAttributes = getFormInputAttributes(
    key,
    data,
    className,
    handleChange,
    handleBlur,
    disabled,
  );

  switch (key.type) {
    case 'text':
    case 'number':
    case 'textarea':
    case 'password':
    case 'date':
      return (
        <InputText
          {...formInputAttributes}
          type={key.type}
          placeholder={key.placeholder}
        />
      );

    case 'select':
      return (
        <InputSelect
          {...formInputAttributes}
          options={key.options}
          clearable={key.clearable}
          searchable={key.searchable}
          optionsFromData={optionsFromData}
          optionsFromDataKey={key.optionsFromDataKey}
          noResultsText={key.noResultsText}
          noResultsComponent={key.noResultsComponent}
        />
      );

    case 'multiselect':
      return (
        <InputMultiSelect
          {...formInputAttributes}
          options={key.options}
          clearable={key.clearable}
          searchable={key.searchable}
          selectAll={key.selectAll}
          optionsFromData={optionsFromData}
          optionsFromDataKey={key.optionsFromDataKey}
          noResultsText={key.noResultsText}
          noResultsComponent={key.noResultsComponent}
          closeOnSelect={key.closeOnSelect}
          onSelectResetsInput={key.onSelectResetsInput}
        />
      );

    case 'html':
      return (
        <InputHtml {...formInputAttributes} />
      );

    case 'richtext':
      return (
        <InputRichText {...formInputAttributes} />
      );

    case 'checkbox':
      return (
        <InputCheckbox
          {...formInputAttributes}
          options={key.options}
        />
      );

    case 'radio':
      return (
        <InputRadio
          {...formInputAttributes}
          options={key.options}
        />
      );

    case 'collection':
      return (
        <InputCollection
          {...formInputAttributes}
          className={bemCls(className, 'Collection')}
          fields={key.fields}
          optionsFromData={optionsFromData}
        />
      );

    case 'file':
      if (key.fileType === 'image') {
        return (
          <InputImage
            {...formInputAttributes}
            folderPath={key.folderPath}
            format={key.format}
            renderer={key.renderer}
            accept={key.accept}
          />
        );
      }
      return null;

    case 'location':
      return (
        <InputLocation
          {...formInputAttributes}
          type={key.type}
          placeholder={key.placeholder}
          optionsFromData={optionsFromData}
          fields={key.fields}
          withMap={key.withMap}
          zoom={key.zoom}
        />
      );

    default:
      return null;
  }
}

function getDefaultValueByType(type, options) {
  switch (type) {
    case 'text':
    case 'textarea':
    case 'richtext':
    case 'password':
    case 'radio':
    case 'select':
    case 'date':
      return '';

    case 'multiselect':
      return [];

    case 'file':
      return null;

    case 'number':
      return NaN;

    case 'checkbox':
      return options.reduce((d, option) => (
        {
          ...d,
          [option.value]: false,
        }
      ), {});

    case 'location':
      return {};

    default:
      return '';
  }
}

function getDefaultValues(key) {
  if (key.type === 'collection') {
    return key.fields.map(collectionKey => ({
      value: getDefaultValueByType(collectionKey.type, collectionKey.options),
      isValid: true,
      showWarning: false,
    }));
  }

  return getDefaultValueByType(key.type, key.options);
}

export function getFormInputData(data, key) {
  return {
    value: (data && data[key.name]) || getDefaultValues(key),
    isValid: true,
    showWarning: false,
  };
}

function getCollectionItemKeyFromFields(key, name) {
  return key.fields.find(f => f.name === name);
}

function getFormCollectionInputData(data, key) {
  const collectionData = data && data[key.name];
  return {
    value: collectionData && collectionData.length
      ? collectionData.map(collectionItemData => (
        Object.keys(collectionItemData).reduce((formCollectionItemData, inputName) => {
          const collectionItemKey = getCollectionItemKeyFromFields(key, inputName);
          if (collectionItemKey) {
            return {
              ...formCollectionItemData,
              [inputName]: getFormInputData(
                collectionItemData,
                collectionItemKey,
              ),
            };
          }
          return formCollectionItemData;
        }, {})
      ))
      : [],
    isValid: true,
    showWarning: false,
  };
}

function getFormLocationInputData(data, key) {
  const locationFields = key && key.fields;
  if (locationFields) {
    return {
      value: locationFields.reduce((dataValue, field) => ({
        ...dataValue,
        [field.name]: getFormInputData(data, field),
      }), {}),
      isValid: true,
      showWarning: false,
    };
  }

  return {
    value: {
      countryCode: '',
      address: '',
      latitude: 0,
      longitude: 0,
    },
    isValid: true,
    showWarning: false,
  };
}

function hasValueByType(value, type) {
  switch (type) {
    case 'text':
    case 'textarea':
    case 'password':
    case 'radio':
    case 'date':
    case 'file':
      return !!value;

    case 'select':
      return value !== undefined && value !== null && !Number.isNaN(value) && value !== '';

    case 'number':
      return value !== undefined && value !== null && !Number.isNaN(value);

    case 'multiselect':
      return value && !!value.length;

    case 'checkbox':
      return value && Object.keys(value)
        && Object.keys(value).map(key => value[key]).some(optionVal => !!optionVal);

    case 'richtext':
      return value && !/^(<(p|h1|h2)>(\s*|<br>)<\/(p|h1|h2)>)*$/.test(value);

    default:
      return !!value;
  }
}

function validateKeyValue(name, data, key, formData, type) {
  const { value } = data;
  const keyData = { ...data };

  const hasValue = hasValueByType(value, type);
  const regexValidation = key.pattern && key.pattern instanceof RegExp && hasValue;
  const isTestRegexValid = !!key.pattern && key.pattern.test(value);

  if (key.onValidate) {
    keyData.isValid = regexValidation
      ? isTestRegexValid && key.onValidate(value, formData)
      : key.onValidate(value, formData);
  } else if (regexValidation) {
    keyData.isValid = isTestRegexValid;
  } else if (key.required) {
    keyData.isValid = hasValue;
  } else {
    keyData.isValid = true;
  }
  if (key.onWarning) {
    keyData.showWarning = key.onWarning(value, formData);
  } else {
    keyData.showWarning = false;
  }

  return keyData;
}

export function getFormData(keys, data) {
  return keys.reduce((d, key) => {
    if (key.type === 'collection') {
      return {
        ...d,
        [key.name]: getFormCollectionInputData(data, key),
      };
    }

    if (key.type === 'location') {
      return {
        ...d,
        [key.name]: getFormLocationInputData(data, key),
      };
    }

    return {
      ...d,
      [key.name]: getFormInputData(data, key),
    };
  }, {});
}

export function getFormDataValues(data) {
  return Object.keys(data).reduce((d, key) => ({
    ...d,
    [key]: data[key].value,
  }), {});
}

export function isEveryKeyDataValid(data) {
  return data.reduce((acc, k) => acc && k.isValid, true);
}

export function getValidatedKeyData(name, data, validationKeys, options) {
  const type = options && options.type;
  const fields = options && options.fields;
  const index = options && options.index;

  // collection input field
  if (type === 'collection' && fields) {
    const dataValue = data[name].value.map((item, i) => {
      if (index !== undefined && i !== index) return item;

      return Object.keys(item).reduce((itemData, fieldName) => {
        const field = fields.find(f => f.name === fieldName);

        return {
          ...itemData,
          [fieldName]: field
            ? validateKeyValue(
              fieldName,
              item[fieldName],
              getValidationKeys(field, item[fieldName]),
              data,
              field.type,
            )
            : item[fieldName],
        };
      }, {});
    });

    return {
      ...data,
      [name]: {
        ...data[name],
        value: dataValue,
        isValid: dataValue.every(itemData => isEveryKeyDataValid(Object.values(itemData))),
      },
    };
  }

  // location input field
  if (type === 'location' && fields) {
    const locationDataValue = data[name].value;
    const dataValue = Object.keys(locationDataValue).reduce((locationData, fieldName) => {
      const field = fields.find(f => f.name === fieldName);
      if (!field) return locationData;

      return {
        ...locationData,
        [fieldName]: validateKeyValue(
          fieldName,
          locationDataValue[fieldName],
          getValidationKeys(field, locationDataValue[fieldName]),
          data,
          field.type,
        ),
      };
    }, {});

    return {
      ...data,
      [name]: {
        ...data[name],
        value: dataValue,
        isValid: isEveryKeyDataValid(Object.values(dataValue)),
      },
    };
  }

  // single input field
  return {
    ...data,
    [name]: validateKeyValue(name, data[name], validationKeys, data, type),
  };
}

export function getSubmitDataValues(keys, data) {
  return Object.keys(data).reduce((d, keyName) => {
    const currentKey = keys.find(k => k.name === keyName);

    // collection input data value
    if (currentKey && currentKey.type === 'collection') {
      return currentKey.return === false
        ? d
        : {
          ...d,
          [keyName]: data[keyName].value.map(item => (
            Object.keys(item).reduce((itemData, itemKeyName) => ({
              ...itemData,
              [itemKeyName]: item[itemKeyName].value,
            }), {})
          )),
        };
    }

    // location input data value
    if (currentKey && currentKey.type === 'location') {
      const { fields } = currentKey;

      return currentKey.return === false
        ? d
        : {
          ...d,
          ...Object.keys(data[keyName].value).reduce((props, locationKey) => {
            const locationProps = { ...props };
            const locationField = fields.find(field => field.name === locationKey);
            const locationFieldKeyName = locationField && locationField.name;
            if (locationField.return) {
              locationProps[locationFieldKeyName] = data[keyName].value[locationKey].value;
            }

            return locationProps;
          }, {}),
        };
    }

    // single input data value
    return currentKey.return === false
      ? d
      : {
        ...d,
        [keyName]: data[keyName].value,
      };
  }, {});
}

const FormHelpers = {
  getFormInputField,
  getFormInputData,
  getFormData,
  getFormDataValues,
  getValidationKeys,
  getValidatedKeyData,
  isEveryKeyDataValid,
  getSubmitDataValues,
};

export default FormHelpers;

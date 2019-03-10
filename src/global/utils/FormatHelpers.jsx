import React from 'react';
import { timestampToDate, datetimeToDate } from './DatetimeHelpers';
import I18n from './I18nGlobal';

export function capitalize(string) {
  if (string) {
    return string.toString().split(' ').map(str => (
      `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}`
    )).join(' ');
  }
  return '';
}

export function humanize(string) {
  return capitalize(string
    .replace(/^[\s_]+|[\s_]+$/g, '')
    .replace(/[._–\s]+/g, ' '));
}

export function camelize(string) {
  if (string && /^[a-z][a-zA-Z0-9]*$/.test(string)) return string; // Already camelCase or one word
  const stringArray = string.toLowerCase().split(/[ /–_&.]/g);
  return stringArray
    .slice(0, 1)
    .concat(stringArray.slice(1).map(word => capitalize(word)))
    .join('');
}

export function uppercase(string) {
  return string ? string.toUpperCase() : '';
}

export function formatKeyValue(value, key) {
  if (key) {
    switch (key.type) {
      case 'date':
        return value ? timestampToDate(value, key.format) : '';
      case 'datetime':
        return value ? datetimeToDate(value, key.format) : '';

      case 'text':
      case 'link':
        switch (key.format) {
          case 'capitalize':
            return capitalize(value);
          case 'humanize':
            return humanize(value);
          case 'uppercase':
            return uppercase(value);
          default:
            return value;
        }

      case 'html':
        // eslint-disable-next-line react/no-danger
        return <div dangerouslySetInnerHTML={{ __html: value }} />;

      case 'bool':
        return value
          ? (
            <span className="Main__light Main__light--green">
              {(key.translationPath && key.translationPath.yes) || I18n.t('en.answer.yes')}
            </span>
          )
          : (
            <span className="Main__light Main__light--red">
              {(key.translationPath && key.translationPath.no) || I18n.t('en.answer.no')}
            </span>
          );
      case 'image':
        return (
          <img
            alt={value}
            className={`Main__image Main__image--${key.format}`}
            src={value}
          />
        );

      default:
        return value;
    }
  }
  return value;
}

export function getLastKeyValueFromObject(key, item) {
  const keys = key && key.split('.');
  function getObjectPropertyKeyValue(keyNames, object) {
    if (keyNames && keyNames.length) {
      const keyName = keyNames.shift();
      const value = object && object[keyName];
      if (Array.isArray(value) || typeof value !== 'object' || value === null) {
        return [keyName, value];
      }
      return getObjectPropertyKeyValue(keyNames, value);
    }
    return [];
  }

  return getObjectPropertyKeyValue(keys, item);
}

export function getItemById(id, items) {
  return items && items.find(item => item.id === id);
}

export function getItemByKey(items, key) {
  return Object.prototype.hasOwnProperty.call(items, key) ? items[key] : null;
}

export function getOptionsFromData(filter, dataItems) {
  return dataItems.reduce((options, item) => {
    const isInOptions = options.some(option => option.value === item[filter.name]);
    if (!isInOptions) {
      options.push({
        value: item[filter.name],
        label: humanize(item[filter.name]),
      });
    }
    return options;
  }, []);
}

function titleFromProperties(titleProps, entry, separator = ' ', valueType) {
  if (Array.isArray(titleProps)) {
    if (valueType && valueType === 'collection') {
      return titleProps.map((titleProp) => {
        const [, title] = getLastKeyValueFromObject(titleProp, entry);
        return title;
      }).reduce(t => t);
    }
    return titleProps.map((titleProp) => {
      const [, title] = getLastKeyValueFromObject(titleProp, entry);
      return title;
    }).filter(t => t).join(separator);
  }
  const [, title] = getLastKeyValueFromObject(titleProps, entry);
  return title;
}

export function getSelectOptionsFromData(data, titleProps, valueProps, options = {}) {
  return data.map((entry) => {
    const flag = options.flag || '';
    const separator = options.separator || ' ';
    const valueSeparator = options.valueSeparator || ' ';
    const { valueType } = options;

    const title = titleFromProperties(titleProps, entry, separator);
    const value = titleFromProperties(valueProps, entry, valueSeparator, valueType);

    return {
      label: `${title} ${flag}`,
      value,
    };
  });
}

export function getSelectOptionsFromObject(object) {
  return Object.keys(object).map(key => ({
    label: object[key],
    value: key,
  })).sort((a, b) => a.label.localeCompare(b.label));
}

export function getPropertyFromDataItemById(item, data, dataKey) {
  const key = dataKey.replace(/s$/, ''); // singularize entity name
  return {
    [key]: getItemById(item[`${key}Id`], data[dataKey]),
  };
}

const FormatHelpers = {
  capitalize,
  humanize,
  uppercase,
  formatKeyValue,
  getLastKeyValueFromObject,
  getOptionsFromData,
  getSelectOptionsFromData,
  getSelectOptionsFromObject,
  getItemById,
  getItemByKey,
  getPropertyFromDataItemById,
};

export default FormatHelpers;

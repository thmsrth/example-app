import I18n from './I18nGlobal';
import { getOptionsFromData } from './FormatHelpers';

export function getMultipleValuesActivatedFilters(filterValues) {
  return Object.keys(filterValues).filter(key => !!filterValues[key]);
}

export function getSingleValuesActivatedFilters(filterValues) {
  return filterValues ? [filterValues] : [];
}

export function matchEverySingleWordInStringAttribute(attribute, value, filter) {
  const { matchAll, startWith } = filter;
  // Case insensitive
  const valueCI = value.toLowerCase();
  const attributeCI = attribute.toLowerCase();

  if (matchAll) {
    return startWith
      ? attributeCI.indexOf(valueCI) === 0
      : attributeCI.indexOf(valueCI) !== -1;
  }

  return attributeCI.split(' ').some(word => (
    valueCI.split(' ').some(keyWord => (
      startWith
        ? keyWord && word.indexOf(keyWord) === 0
        : keyWord && word.indexOf(keyWord) !== -1
    ))
  ));
}

export function matchOneValueFromMultipleValuesAttribute(attribute, value) {
  return attribute.indexOf(value.toLowerCase()) !== -1;
}

export function getFilters(filters, items) {
  const selectDefaultOptions = { value: '', title: I18n.t('en.filter.all') };

  return filters.map((filter) => {
    if (filter.optionsFromData) {
      const optionsFromData = getOptionsFromData(filter, items);

      if (filter.type === 'select') optionsFromData.unshift(selectDefaultOptions);

      return {
        ...filter,
        options: optionsFromData,
      };
    }
    return filter;
  });
}

export function initFiltersValues(filters) {
  return filters.reduce((filtersValues, filter) => {
    const values = { ...filtersValues };
    const filterKey = filter.property || filter.name;

    if (filter.range) {
      switch (filter.type) {
        case 'date':
        case 'datetime':
        case 'number':
          values[`${filterKey}From`] = '';
          values[`${filterKey}To`] = '';
          break;
        default:
          break;
      }
    } else {
      switch (filter.type) {
        case 'date':
        case 'datetime':
        case 'text':
        case 'select':
        case 'number':
          values[filterKey] = '';
          break;
        case 'checkbox':
          values[filterKey] = filter.options.reduce((options, option) => (
            { ...options, [option.value]: false }
          ), {});
          break;
        default:
          break;
      }
    }
    return values;
  }, {});
}

export function formatDataFiltersParamsToValues(params, filters) {
  return filters.reduce((filtersValues, filter) => {
    const values = { ...filtersValues };
    const filterName = filter.name;
    const filterKey = filter.property || filterName;

    if (filter.range) {
      const filterKeyFrom = `${filterKey}From`;
      const filterKeyTo = `${filterKey}To`;

      const paramFilterNameFrom = params[`${filterName}From`];
      const paramFilterNameTo = params[`${filterName}To`];

      switch (filter.type) {
        case 'datetime':
          if ([`${filterName}From`, `${filterName}To`].some(key => params[key])) {
            values[filterKeyFrom] = paramFilterNameFrom ? paramFilterNameFrom.slice(0, -6) : '';
            values[filterKeyTo] = paramFilterNameTo ? paramFilterNameTo.slice(0, -6) : '';
          }
          break;
        default:
          values[filterKeyFrom] = paramFilterNameFrom;
          values[filterKeyTo] = paramFilterNameTo;
          break;
      }
    } else {
      const paramFilterName = params[filterName];

      switch (filter.type) {
        case 'checkbox':
          if (paramFilterName !== undefined) {
            values[filterKey] = filter.options.reduce((options, option) => ({
              ...options,
              [option.value]: paramFilterName.split(',').some(key => option.value === key),
            }), {});
          }
          break;
        case 'datetime':
          if (paramFilterName) {
            values[filterKey] = paramFilterName ? paramFilterName.slice(0, -6) : '';
          }
          break;
        default:
          values[filterKey] = paramFilterName;
          break;
      }
    }
    return values;
  }, {});
}

export function formatFiltersValuesToDataParams(values, filters) {
  return filters.reduce((filtersParams, filter) => {
    const params = { ...filtersParams };
    const filterName = filter.name;
    const filterKey = filter.property || filterName;

    if (filter.range) {
      const filterNameFrom = `${filterName}From`;
      const filterNameTo = `${filterName}To`;

      const valueFilterKeyFrom = values[`${filterKey}From`];
      const valueFilterKeyTo = values[`${filterKey}To`];

      switch (filter.type) {
        case 'datetime':
          params[filterNameFrom] = valueFilterKeyFrom ? `${valueFilterKeyFrom}T00:00` : '';
          params[filterNameTo] = valueFilterKeyTo ? `${valueFilterKeyTo}T23:59` : '';
          break;
        default:
          params[filterNameFrom] = valueFilterKeyFrom;
          params[filterNameTo] = valueFilterKeyTo;
          break;
      }
    } else {
      const valueFilterKey = values[filterKey];

      switch (filter.type) {
        case 'checkbox':
          if (valueFilterKey !== undefined) {
            params[filterName] = Object.keys(valueFilterKey).filter(option => (
              valueFilterKey[option]
            )).join(',');
          }
          break;
        case 'datetime':
          if (valueFilterKey) {
            params[filterName] = valueFilterKey ? `${valueFilterKey}T00:00` : '';
          }
          break;
        case 'select':
          params[filterName] = Number.isNaN(valueFilterKey) ? '' : valueFilterKey;
          break;
        default:
          params[filterName] = valueFilterKey;
          break;
      }
    }
    return params;
  }, {});
}

const FilterHelpers = {
  getMultipleValuesActivatedFilters,
  getSingleValuesActivatedFilters,
  matchEverySingleWordInStringAttribute,
  matchOneValueFromMultipleValuesAttribute,
  initFiltersValues,
  formatDataFiltersParamsToValues,
  formatFiltersValuesToDataParams,
};

export default FilterHelpers;

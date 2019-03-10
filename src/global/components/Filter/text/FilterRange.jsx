import React from 'react';

import PropTypes from 'prop-types';
import filterType from '../types/filter';

import I18n from '../../../utils/I18nGlobal';
import { bemCls } from '../../../utils/ClassNameHelpers';

import InputText from '../../Inputs/InputText';

const FilterRange = ({
  filter, valueFrom, valueTo, handleFiltersChange, className,
}) => {
  if (filter) {
    const {
      name, title, placeholder, type, pattern, dateMin, dateMax,
    } = filter;
    return (
      <div className={`${`FilterRange ${className}`} ${
        bemCls(`FilterRange ${className}`, `__${name}`)}`}
      >
        <div
          className={`${bemCls(`FilterRange ${className}`, '__label')} ${
            bemCls(`FilterRange ${className}`, `__${name}__label`)}`}
        >
          {title}
        </div>
        <InputText
          className={`${`FilterText ${className}`} ${
            bemCls(`FilterText ${className}`, '__range')}`}
          name={`${name}From`}
          label={I18n.t('en.filter.from')}
          onChange={handleFiltersChange}
          value={valueFrom}
          min={dateMin}
          max={valueTo || dateMax}
          pattern={pattern}
          placeholder={placeholder}
          type={type}
          autocomplete={false}
        />
        <InputText
          className={`${`FilterText ${className}`} ${
            bemCls(`FilterText ${className}`, '__range')}`}
          name={`${name}To`}
          label={I18n.t('en.filter.to')}
          onChange={handleFiltersChange}
          value={valueTo}
          min={valueFrom || dateMin}
          max={dateMax}
          pattern={pattern}
          placeholder={placeholder}
          type={type}
          autocomplete={false}
        />
      </div>
    );
  }
  return null;
};

export default FilterRange;

FilterRange.propTypes = {
  filter: filterType,
  valueFrom: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  valueTo: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  handleFiltersChange: PropTypes.func,
  className: PropTypes.string,
};

FilterRange.defaultProps = {
  filter: {
    dateMin: '1970-01-01',
    dateMax: '3000-01-01',
  },
  valueFrom: '',
  valueTo: '',
  handleFiltersChange: () => {},
  className: '',
};

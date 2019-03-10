import React from 'react';

import PropTypes from 'prop-types';
import filterType from '../types/filter';

import { bemCls } from '../../../utils/ClassNameHelpers';
import FilterCheckboxItem from './FilterCheckboxItem';

const FilterCheckbox = ({
  filter, value, handleFiltersChange, className,
}) => {
  if (filter) {
    return (
      <ul className={`FilterCheckbox ${className}`}>
        <div className={bemCls(`FilterCheckbox ${className}`, '__title')}>
          {filter.title}
        </div>
        <div className={bemCls(`FilterCheckbox ${className}`, '__container')}>
          {filter.options.map(option => (
            <FilterCheckboxItem
              key={option.value}
              className={bemCls(className, 'Item')}
              filter={filter}
              option={option}
              value={value}
              handleFiltersChange={handleFiltersChange}
            />
          ))}
        </div>
      </ul>
    );
  }
  return null;
};

export default FilterCheckbox;

FilterCheckbox.propTypes = {
  filter: filterType,
  value: PropTypes.objectOf(PropTypes.bool),
  handleFiltersChange: PropTypes.func,
  className: PropTypes.string,
};

FilterCheckbox.defaultProps = {
  filter: null,
  value: null,
  handleFiltersChange: () => {},
  className: '',
};

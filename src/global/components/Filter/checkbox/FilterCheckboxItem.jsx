import React from 'react';

import PropTypes from 'prop-types';
import filterType from '../types/filter';

import { bemCls } from '../../../utils/ClassNameHelpers';
import InputCheckboxItemWrapper from '../../Inputs/InputCheckbox/InputCheckboxItemWrapper';

const FilterCheckboxItem = ({
  filter, value, option, handleFiltersChange, className,
}) => {
  if (filter.name && option) {
    return (
      <li
        key={option.value}
        className={`FilterCheckboxItem ${className} ${
          bemCls(`FilterCheckboxItem ${className}`, '--active', value)}`}
      >
        <div className={bemCls(`FilterCheckboxItem ${className}`, '__container')}>
          <InputCheckboxItemWrapper
            type="checkbox"
            className="FilterCheckboxItem"
            name={filter.name}
            label={option.title}
            value={value}
            placeholder={filter.placeholder}
            onChange={handleFiltersChange}
            option={option.value}
          />
        </div>
      </li>
    );
  }
  return null;
};

export default FilterCheckboxItem;

FilterCheckboxItem.propTypes = {
  option: PropTypes.shape({
    value: PropTypes.string,
    title: PropTypes.string,
  }),
  filter: filterType,
  value: PropTypes.objectOf(PropTypes.bool),
  handleFiltersChange: PropTypes.func,
  className: PropTypes.string,
};

FilterCheckboxItem.defaultProps = {
  filter: null,
  option: null,
  value: null,
  handleFiltersChange: () => {},
  className: '',
};

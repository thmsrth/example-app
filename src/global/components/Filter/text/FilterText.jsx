import React from 'react';

import PropTypes from 'prop-types';
import filterType from '../types/filter';

import InputText from '../../Inputs/InputText';

const FilterText = ({
  filter, value, handleFiltersChange, className,
}) => {
  if (filter) {
    return (
      <div className={`FilterText ${className}`}>
        <InputText
          className={`FilterText ${className}`}
          name={filter.name}
          label={filter.title}
          placeholder={filter.placeholder}
          htmlPattern={filter.htmlPattern}
          onChange={handleFiltersChange}
          value={value}
          type={filter.type}
        />
      </div>
    );
  }
  return null;
};

export default FilterText;

FilterText.propTypes = {
  filter: filterType,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  handleFiltersChange: PropTypes.func,
  className: PropTypes.string,
};

FilterText.defaultProps = {
  filter: null,
  value: '',
  handleFiltersChange: () => {},
  className: '',
};

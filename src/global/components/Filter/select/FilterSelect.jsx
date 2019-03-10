import React from 'react';

import PropTypes from 'prop-types';
import filterType from '../types/filter';

import InputSelect from '../../Inputs/InputSelect';

const FilterSelect = ({
  filter, value, handleFiltersChange, className, optionsFromData,
}) => {
  if (filter) {
    return (
      <div className={`FilterSelect ${className}`}>
        <InputSelect
          className={`FilterSelect ${className}`}
          name={filter.name}
          label={filter.title}
          options={filter.options}
          placeholder={filter.placeholder}
          clearable={filter.clearable}
          searchable={filter.searchable}
          onChange={handleFiltersChange}
          value={value}
          optionsFromData={optionsFromData}
          optionsFromDataKey={filter.optionsFromDataKey}
        />
      </div>
    );
  }
  return null;
};

export default FilterSelect;

FilterSelect.propTypes = {
  filter: filterType,
  // eslint-disable-next-line react/forbid-prop-types
  optionsFromData: PropTypes.object,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  handleFiltersChange: PropTypes.func,
  className: PropTypes.string,
};

FilterSelect.defaultProps = {
  filter: {},
  optionsFromData: null,
  value: '',
  handleFiltersChange: () => {},
  className: '',
};

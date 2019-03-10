import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';

import './FilterClearButton.css';

const FilterClearButton = ({ className, handleClearFilters }) => (
  <Button
    className={`FilterClearButton ${className}`}
    text="Reset Filters"
    iconName="remove"
    onClick={handleClearFilters}
  />
);

export default FilterClearButton;

FilterClearButton.propTypes = {
  className: PropTypes.string,
  handleClearFilters: PropTypes.func,
};

FilterClearButton.defaultProps = {
  className: '',
  handleClearFilters: () => {},
};

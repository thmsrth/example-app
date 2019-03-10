import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';

import './FilterSubmitButton.css';

const FilterSubmitButton = ({ className }) => (
  <Button
    className={`FilterSubmitButton ${className}`}
    text="Filter"
    iconName="filter"
    type="submit"
  />
);

export default FilterSubmitButton;

FilterSubmitButton.propTypes = {
  className: PropTypes.string,
};

FilterSubmitButton.defaultProps = {
  className: '',
};

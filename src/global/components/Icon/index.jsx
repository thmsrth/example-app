import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ name, className }) => {
  if (name) {
    return (
      <span
        aria-hidden="true"
        className={`fa fa-${name} ${className}`}
      />
    );
  }
  return null;
};

export default Icon;

Icon.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
};

Icon.defaultProps = {
  className: '',
  name: '',
};

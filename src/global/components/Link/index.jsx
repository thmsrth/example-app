import React from 'react';
import PropTypes from 'prop-types';

import Link from './Link';

const LinkWrapper = ({ disabled, ...otherProps }) => {
  const handleOnClick = (e) => {
    if (disabled) e.preventDefault();
  };

  return (
    <Link
      {...otherProps}
      disabled={disabled}
      onClick={handleOnClick}
    />
  );
};

export default LinkWrapper;

LinkWrapper.propTypes = {
  disabled: PropTypes.bool,
};

LinkWrapper.defaultProps = {
  disabled: false,
};

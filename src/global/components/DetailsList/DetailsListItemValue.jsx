import React from 'react';

import PropTypes from 'prop-types';
import keyType from './types/key';

import { formatKeyValue } from '../../utils/FormatHelpers';

const DetailsListItemValue = ({ className, value, keyProp }) => (
  <div className={`DetailsListItemValue ${className}`}>
    {formatKeyValue(value, keyProp)}
  </div>
);

export default DetailsListItemValue;

DetailsListItemValue.propTypes = {
  className: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.func,
    PropTypes.bool,
  ]),
  keyProp: keyType,
};

DetailsListItemValue.defaultProps = {
  className: '',
  value: '',
  keyProp: {},
};

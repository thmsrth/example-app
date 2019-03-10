import React from 'react';

import PropTypes from 'prop-types';
import keyType from './types/key';

import { bemCls } from '../../utils/ClassNameHelpers';

import DetailsListItemValue from './DetailsListItemValue';

import './DetailsListItem.css';

const DetailsListItem = ({ keyProp, className, ...otherProps }) => (
  <tr
    className={`DetailsListItem ${className}`}
    tabIndex="0"
  >
    <td className={`${bemCls(`DetailsListItem ${className}`, '__title')}`}>
      {keyProp.title}
    </td>
    <td className={`${bemCls(`DetailsListItem ${className}`, '__value')}`}>
      <DetailsListItemValue
        {...otherProps}
        className={bemCls(className, 'Value')}
        keyProp={keyProp}
      />
    </td>
  </tr>
);

export default DetailsListItem;

DetailsListItem.propTypes = {
  className: PropTypes.string,
  keyProp: keyType,
};

DetailsListItem.defaultProps = {
  className: '',
  keyProp: {},
};

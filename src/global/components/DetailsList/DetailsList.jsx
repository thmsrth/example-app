import React from 'react';

import PropTypes from 'prop-types';
import keyType from './types/key';

import { bemCls } from '../../utils/ClassNameHelpers';
import {
  getLastKeyValueFromObject,
  getPropertyFromDataItemById,
} from '../../utils/FormatHelpers';

import DetailsListItem from './DetailsListItem';

import './DetailsList.css';

const DetailsList = ({
  item, keys, className, propertyFromData,
}) => (
  <div className={`DetailsList ${bemCls(className, '__list')}`}>
    <table className={bemCls(`DetailsList ${className}`, '__table')}>
      <tbody className={bemCls(`DetailsList ${className}`, '__tbody')}>
        {keys.map((key) => {
          const { propertyFromDataKey } = key;
          const itemData = propertyFromDataKey
            ? getPropertyFromDataItemById(item, propertyFromData, propertyFromDataKey)
            : item;

          const [, lastKeyValue] = getLastKeyValueFromObject(key.name, itemData);
          const value = (lastKeyValue === undefined || lastKeyValue === null) ? '' : lastKeyValue;

          return (
            <DetailsListItem
              key={key.name}
              keyProp={key}
              className={`${bemCls(`DetailsListItem ${className}`, '__property')} ${
                bemCls(`DetailsListItem ${className}`, `__${key.name}`)}`}
              value={value}
            />
          );
        })}
      </tbody>
    </table>
  </div>
);

export default DetailsList;

DetailsList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object,
  keys: PropTypes.arrayOf(keyType),
  className: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  propertyFromData: PropTypes.object,
};

DetailsList.defaultProps = {
  item: {},
  keys: [],
  className: '',
  propertyFromData: null,
};

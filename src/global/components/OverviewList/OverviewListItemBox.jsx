import React from 'react';

import PropTypes from 'prop-types';
import keyType from './types/key';

import { bemCls } from '../../utils/ClassNameHelpers';
import {
  camelize,
  getLastKeyValueFromObject,
  getPropertyFromDataItemById,
} from '../../utils/FormatHelpers';

import OverviewListItemBoxValue from './OverviewListItemBoxValue';

import './OverviewListItemBox.css';

const OverviewListItemBox = ({
  item, keyProp, className, handlers, propertyFromData, secondary,
}) => {
  const passActionsHandlersToKey = (key) => {
    if (key && key.name) return { ...key, handler: handlers[key.name] };
    return key;
  };

  return (
    <div
      className={`OverviewListItemBox ${className} ${
        bemCls(`OverviewListItemBox ${className}`, `__${camelize(keyProp.name)}`)}`}
    >
      {keyProp.options.map((option) => {
        const {
          name, title, type, propertyFromDataKey,
        } = option;

        const itemData = propertyFromDataKey
          ? getPropertyFromDataItemById(item, propertyFromData, propertyFromDataKey)
          : item;

        const [, optionValue] = getLastKeyValueFromObject(name, itemData);

        if ((optionValue !== undefined && optionValue !== null) || type === 'action' || type === 'link') {
          return (
            <div
              className={bemCls(`OverviewListItemBox ${className}`, '_item')}
              key={`${item.id}-${camelize(name)}`}
            >
              <OverviewListItemBoxValue
                className={bemCls(className, 'Value')}
                item={itemData}
                title={title}
                keyProp={type === 'action' ? passActionsHandlersToKey(option) : option}
                secondary={secondary}
              />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default OverviewListItemBox;


OverviewListItemBox.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  propertyFromData: PropTypes.object,
  keyProp: keyType,
  className: PropTypes.string,
  secondary: PropTypes.bool,
  handlers: PropTypes.objectOf(PropTypes.func),
};

OverviewListItemBox.defaultProps = {
  item: {},
  propertyFromData: {},
  keyProp: [],
  className: '',
  secondary: false,
  handlers: null,
};

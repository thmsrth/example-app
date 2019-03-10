import React from 'react';

import PropTypes from 'prop-types';
import keyType from './types/key';

import { bemCls } from '../../utils/ClassNameHelpers';
import {
  camelize,
  getLastKeyValueFromObject,
  getPropertyFromDataItemById,
} from '../../utils/FormatHelpers';

import OverviewListItemBox from './OverviewListItemBox';
import OverviewListItemBoxValue from './OverviewListItemBoxValue';

import './OverviewListItem.css';

const OverviewListItem = ({
  item, keys, className, hideHeader, secondary, isActive, propertyFromData, ...otherProps
}) => {
  if (item) {
    return (
      <tr
        className={`OverviewListItem ${className} ${
          bemCls(`OverviewListItem ${className}`, '--active', isActive)}`}
      >
        {item.id === -1
          ? (
            <td className={bemCls(`OverviewListItem ${className}`, '__default')}>
              {item.defaultTitle || ''}
            </td>
          )

          : keys.map((key) => {
            const {
              propertyFromDataKey, property, name, type, title,
            } = key;

            const itemData = propertyFromDataKey
              ? getPropertyFromDataItemById(item, propertyFromData, propertyFromDataKey)
              : item;

            const [, keyValue] = getLastKeyValueFromObject(property || name, itemData);

            if (keyValue !== undefined || ['action', 'box'].some(t => t === type)) {
              return (
                <td
                  key={`${item.id}-${camelize(name)}`}
                  className={`${bemCls(`OverviewListItem ${className}`, '__property')} ${
                    bemCls(`OverviewListItem ${className}`, `__${camelize(name)}`)} ${
                    bemCls(`OverviewListItem ${className}`, '__property--secondary', secondary)}`}
                >
                  {
                    type === 'box'
                      ? (
                        <OverviewListItemBox
                          {...otherProps}
                          className={bemCls(className, 'Box')}
                          keyProp={key}
                          item={itemData}
                          propertyFromData={propertyFromData}
                          secondary={secondary}
                        />
                      )

                      : (
                        <OverviewListItemBoxValue
                          className={bemCls(className, 'BoxValue')}
                          keyProp={key}
                          item={itemData}
                          title={(hideHeader && title) || ''}
                          secondary={secondary}
                        />
                      )
                  }
                </td>
              );
            }

            return (
              <td
                key={name}
                className={`${bemCls(`OverviewListItem ${className}`, '__property')} ${
                  bemCls(`OverviewListItem ${className}`, `__${camelize(name)}`)} ${
                  bemCls(`OverviewListItem ${className}`, '__property--secondary', secondary)}`}
              />
            );
          })
        }
      </tr>
    );
  }
  return null;
};

export default OverviewListItem;


OverviewListItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  propertyFromData: PropTypes.object,
  keys: PropTypes.arrayOf(keyType),
  handlers: PropTypes.objectOf(PropTypes.func),
  className: PropTypes.string,
  isActive: PropTypes.bool,
  hideHeader: PropTypes.bool,
  secondary: PropTypes.bool,
};

OverviewListItem.defaultProps = {
  item: {},
  propertyFromData: {},
  keys: [],
  handlers: {},
  className: '',
  isActive: false,
  hideHeader: false,
  secondary: false,
};

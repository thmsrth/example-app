import React from 'react';

import PropTypes from 'prop-types';
import keyType from './types/key';

import { camelize, formatKeyValue, getLastKeyValueFromObject } from '../../utils/FormatHelpers';
import { bemCls } from '../../utils/ClassNameHelpers';

import Button from '../Button';
import Link from '../Link';

import './OverviewListItemBoxValue.css';

const OverviewListItemBoxValue = ({
  className, keyProp, title, item, secondary,
}) => {
  if (item) {
    const {
      type, property, name, icon, handler, condition,
      actionParams, path, linkParam, target, showCondition, tooltip,
    } = keyProp;
    const [, lastKeyValue] = getLastKeyValueFromObject(property || name, item);
    const value = (lastKeyValue === undefined || lastKeyValue === null) ? '' : lastKeyValue;

    if (type === 'action') {
      if (showCondition && !showCondition(item)) {
        return null;
      }
      const actionParamsObj = actionParams && actionParams.reduce((acc, key) => {
        const params = { ...acc };
        const [, paramValue] = getLastKeyValueFromObject(key, item);
        params[camelize(key)] = paramValue;
        return params;
      }, {});

      return (
        <div className={`OverviewListItemBoxValue ${className} ${
          bemCls(`OverviewListItemBoxValue ${className}`, `__${camelize(name)}`)}`}
        >
          <Button
            className={`${bemCls(`OverviewListItemBoxValue ${className}`, `__action${secondary ? 'Secondary' : ''}`)} ${
              bemCls(`OverviewListItemBoxValue ${className}`, `__${name}__action${secondary ? 'Secondary' : ''}`)}`}
            iconName={icon}
            text={title}
            params={actionParamsObj}
            onClick={handler}
            disabled={condition !== undefined && !condition}
            tooltip={tooltip || name}
          />
        </div>
      );
    } if (type === 'link') {
      const linkParamValue = getLastKeyValueFromObject(linkParam, item)[1];
      const linkValue = linkParamValue || item.id;

      return (
        <div className={`OverviewListItemBoxValue ${className} ${
          bemCls(`OverviewListItemBoxValue ${className}`, `__${camelize(name)}`)}`}
        >
          {title
            && (
            <div className={`${bemCls(`OverviewListItemBoxValue ${className}`, '__title')} ${
              bemCls(`OverviewListItemBoxValue ${className}`, `__${camelize(name)}__title`)}`}
            >
              {title}
            </div>
            )
          }
          <Link
            className={`${bemCls(`OverviewListItemBoxValue ${className}`, '__link')} ${
              bemCls(`OverviewListItemBoxValue ${className}`, `__${camelize(name)}__link`)}`}
            text={formatKeyValue(value.toString(), keyProp)}
            href={(path
            && path.replace('{{linkParam}}', linkParam ? linkValue : value)) || ''}
            target={target}
            disabled={!linkParamValue || (condition !== undefined && !condition)}
            iconName={icon}
            tooltip={tooltip || name}
          />
        </div>
      );
    }
    return (
      <div className={`OverviewListItemBoxValue ${className}`}>
        {title
          && (
          <div className={`${bemCls(`OverviewListItemBoxValue ${className}`, '__title')} ${
            bemCls(`OverviewListItemBoxValue ${className}`, `__${camelize(name)}__title`)}`}
          >
            {title}
          </div>
          )
        }
        {formatKeyValue(value, keyProp)}
      </div>
    );
  }
  return null;
};

export default OverviewListItemBoxValue;

OverviewListItemBoxValue.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  keyProp: keyType,
  // eslint-disable-next-line react/forbid-prop-types
  item: PropTypes.object,
  secondary: PropTypes.bool,
};

OverviewListItemBoxValue.defaultProps = {
  className: '',
  title: '',
  keyProp: {},
  item: null,
  secondary: false,
};

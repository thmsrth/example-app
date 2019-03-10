import React from 'react';
import PropTypes from 'prop-types';

import { bemCls } from '../../utils/ClassNameHelpers';
import Icon from '../Icon';
import './Link.css';

const Link = ({
  className, href, text, target, disabled, onClick, iconName, tooltip,
}) => {
  if (href) {
    if (disabled) {
      return (
        <div className={`Link ${className} ${
          bemCls(`Link ${className}`, '--disabled', disabled)}`}
        >
          {iconName
          && (
          <div className={`${bemCls(`Link ${className}`, '__icon')} ${
            bemCls(`Link ${className}`, '__icon--disabled', disabled)}`}
          >
            <Icon name={iconName} />
          </div>
          )
        }
          {text
          && (
          <div className={`${bemCls(`Link ${className}`, '__text')} ${
            bemCls(`Link ${className}`, '__text--disabled', disabled)}`}
          >
            {text}
          </div>
          )
        }
        </div>
      );
    }
    return (
      <a
        className={`Link ${className}`}
        href={href}
        onClick={onClick}
        target={target}
        title={tooltip}
      >
        {iconName
          && (
          <div className={`${bemCls(`Link ${className}`, '__icon')} ${
            bemCls(`Link ${className}`, '__icon')}`}
          >
            <Icon name={iconName} />
          </div>
          )
        }
        {text
          && (
          <div className={`${bemCls(`Link ${className}`, '__text')} ${
            bemCls(`Link ${className}`, '__text')}`}
          >
            {text}
          </div>
          )
        }
      </a>
    );
  }
  return null;
};

export default Link;

Link.propTypes = {
  // children: PropTypes.element,
  className: PropTypes.string,
  text: PropTypes.string,
  href: PropTypes.string,
  target: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  iconName: PropTypes.string,
  tooltip: PropTypes.string,
};

Link.defaultProps = {
  // children: null,
  className: '',
  iconName: '',
  text: '',
  href: undefined,
  target: '_self',
  disabled: false,
  onClick: () => {},
  tooltip: '',
};

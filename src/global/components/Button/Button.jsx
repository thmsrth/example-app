import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';

import { bemCls } from '../../utils/ClassNameHelpers';

import './Button.css';

const Button = ({
  className, text, type, iconName, disabled, onClick, loading, tooltip,
}) => {
  if ((onClick || type === 'submit') && (text || iconName)) {
    return (
      // eslint-disable-next-line react/button-has-type
      <button
        type={type}
        className={`Button ${className} ${
          bemCls(`Button ${className}`, '--disabled', disabled)}`}
        onClick={onClick}
        disabled={disabled || loading}
        title={tooltip}
      >
        {iconName
          && (
          <div className={`${bemCls(`Button ${className}`, '__icon')} ${
            bemCls(`Button ${className}`, '__icon--disabled', disabled)}`}
          >
            {loading ? <Icon name="spinner" className="fa-spin" /> : <Icon name={iconName} />}
          </div>
          )
        }
        {text
          && (
          <div className={`${bemCls(`Button ${className}`, '__text')} ${
            bemCls(`Button ${className}`, '__text--disabled', disabled)}`}
          >
            {text}
          </div>
          )
        }
      </button>
    );
  }
  return null;
};

export default Button;

Button.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  tooltip: PropTypes.string,
  type: PropTypes.string,
  iconName: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  className: '',
  text: '',
  tooltip: '',
  type: 'button',
  iconName: '',
  disabled: false,
  loading: false,
  onClick: undefined,
};

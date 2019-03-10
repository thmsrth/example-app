import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';

import { bemCls } from '../../utils/ClassNameHelpers';

import './Dropdown.css';

const Dropdown = (props) => {
  const {
    isActive, className, text, onClick, children,
  } = props;

  return (
    <div
      className={`Dropdown ${className} ${
        bemCls(`Dropdown ${className}`, '--active', isActive)}`}
    >
      <div className={bemCls(`Dropdown ${className}`, '__container')}>
        <div
          className={bemCls(`Dropdown ${className}`, '__button')}
          onClick={onClick}
          onKeyPress={onClick}
          role="button"
          tabIndex="0"
        >
          <div className={bemCls(`Dropdown ${className}`, '__text')}>{text}</div>
          <div className={bemCls(`Dropdown ${className}`, '__icon')}>
            <Icon name={`${isActive ? 'caret-up' : 'caret-down'}`} />
          </div>
        </div>
        <div
          className={bemCls(`Dropdown ${className}`, '__content')}
          onClick={onClick}
          onKeyPress={onClick}
          role="button"
          tabIndex="0"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

Dropdown.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

Dropdown.defaultProps = {
  className: '',
  text: '',
  isActive: false,
  onClick: () => {},
  children: <h3>Empty dropdown content</h3>,
};

export default Dropdown;

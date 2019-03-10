import React from 'react';

import PropTypes from 'prop-types';
import validationKeysType from '../../Form/types/validationKeys';
import validationKeysDefaults from '../../Form/defaults/validationKeys';

import { bemCls } from '../../../utils/ClassNameHelpers';
import InputCheckboxItemWrapper from './InputCheckboxItemWrapper';

import './InputCheckbox.css';

const InputCheckbox = ({
  label, name, options, value, onChange, className, validationKeys, disabled, ...otherProps
}) => {
  const {
    required,
    validationAlert,
    warningAlert,
  } = validationKeys || InputCheckbox.defaultProps.validationKeys;

  return (
    <ul className={`InputCheckbox ${className} ${
      bemCls(`InputCheckbox ${className}`, `__${name}`)} ${
      bemCls(`InputCheckbox ${className}`, '__required', required)} ${
      bemCls(`InputCheckbox ${className}`, '--alert', validationAlert)}`}
    >
      <div
        className={`${bemCls(`InputCheckbox ${className}`, '__label')} ${
          bemCls(`InputCheckbox ${className}`, '__label--disabled', disabled)}`}
      >
        {`${label}${required ? '*' : ''}`}
        <div className={`${bemCls(`InputCheckbox ${className}`, '__alertMsg')} ${
          bemCls(`InputCheckbox ${className}`, `__${name}__alertMsg`)}`}
        >
          {validationAlert}
        </div>
        <div className={bemCls(`InputCheckbox ${className}`, '__options')}>
          {options.map(option => (
            <li
              key={option.value}
              className={`InputCheckbox ${className} ${
                bemCls(`InputCheckbox ${className}`, '--active', value)}`}
            >
              <div className={bemCls(`InputCheckbox ${className}`, '__container')}>
                <InputCheckboxItemWrapper
                  {...otherProps}
                  type="checkbox"
                  className={bemCls(`InputCheckbox ${className}`, '__item')}
                  name={name}
                  label={option.label}
                  value={value}
                  onChange={onChange}
                  option={option.value}
                  validationKeys={validationKeys}
                  disabled={disabled}
                />
              </div>
            </li>
          ))}
        </div>
        <div className={`${bemCls(`InputCheckbox ${className}`, '__warningMsg')} ${
          bemCls(`InputCheckbox ${className}`, `__${name}__warningMsg`)}`}
        >
          {warningAlert}
        </div>
      </div>
    </ul>
  );
};

export default InputCheckbox;

InputCheckbox.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    label: PropTypes.string,
  })),
  value: PropTypes.objectOf(PropTypes.bool),
  onChange: PropTypes.func,
  className: PropTypes.string,
  validationKeys: validationKeysType,
  disabled: PropTypes.bool,
};

InputCheckbox.defaultProps = {
  name: '',
  label: '',
  options: [],
  value: null,
  onChange: () => {},
  className: '',
  validationKeys: validationKeysDefaults,
  disabled: false,
};

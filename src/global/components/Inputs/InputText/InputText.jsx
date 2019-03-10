import React from 'react';

import PropTypes from 'prop-types';
import validationKeysType from '../../Form/types/validationKeys';
import validationKeysDefaults from '../../Form/defaults/validationKeys';

import { bemCls } from '../../../utils/ClassNameHelpers';

const InputText = ({
  className, name, label, type, value, min, max, step, placeholder, htmlPattern,
  onChange, onBlur, rows, validationKeys, disabled,
}) => {
  const {
    required,
    validationAlert,
    warningAlert,
  } = validationKeys || InputText.defaultProps.validationKeys;

  switch (type) {
    case 'date':
    case 'text':
    case 'number':
    case 'password':
      return (
        <div className={`InputText ${className} ${
          bemCls(`InputText ${className}`, `__${name}`)} ${
          bemCls(`InputText ${className}`, '__required', required)} ${
          bemCls(`InputText ${className}`, '--alert', validationAlert)}`}
        >
          <label
            key={name}
            className={`${bemCls(`InputText ${className}`, '__label')} ${
              bemCls(`InputText ${className}`, `__${name}__label`)} ${
              bemCls(`InputText ${className}`, '__label--disabled', disabled)}`}
          >
            {`${label}${required ? '*' : ''}`}
            <div className={`${bemCls(`InputText ${className}`, '__alertMsg')} ${
              bemCls(`InputText ${className}`, `__${name}__alertMsg`)}`}
            >
              {validationAlert}
            </div>
            <input
              type={type}
              className={`${bemCls(`InputText ${className}`, '__input')} ${
                bemCls(`InputText ${className}`, `__${name}__input`)} ${
                bemCls(`InputText ${className}`, '__input--disabled', disabled)}`}
              name={name}
              value={!Number.isNaN(value) ? value : ''}
              min={type === 'text' ? undefined : min}
              max={type === 'text' ? undefined : max}
              step={type === 'number' ? step : undefined}
              pattern={htmlPattern || undefined}
              required={required}
              onChange={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              disabled={disabled}
            />
            <div className={`${bemCls(`InputText ${className}`, '__warningMsg')} ${
              bemCls(`InputText ${className}`, `__${name}__warningMsg`)}`}
            >
              {warningAlert}
            </div>
          </label>
        </div>
      );

    case 'textarea':
      return (
        <div className={`InputText ${className} ${
          bemCls(`InputText ${className}`, '__required', required)} ${
          bemCls(`InputText ${className}`, '--alert', validationAlert)}`}
        >
          <label
            key={name}
            className={`${bemCls(`InputText ${className}`, '__label')} ${
              bemCls(`InputText ${className}`, `__${name}__label`)} ${
              bemCls(`InputText ${className}`, '__label--disabled', disabled)}`}
          >
            {`${label}${required ? '*' : ''}`}
            <div className={`${bemCls(`InputText ${className}`, '__alertMsg')} ${
              bemCls(`InputText ${className}`, `__${name}__alertMsg`)}`}
            >
              {validationAlert}
            </div>
            <textarea
              className={`${bemCls(`InputText ${className}`, '__input')} ${
                bemCls(`InputText ${className}`, `__${name}__input`)} ${
                bemCls(`InputText ${className}`, '__input--disabled', disabled)}`}
              name={name}
              form={className}
              value={value}
              required={required}
              onChange={onChange}
              onBlur={onBlur}
              rows={rows}
              placeholder={placeholder}
            />
            <div className={`${bemCls(`InputText ${className}`, '__warningMsg')} ${
              bemCls(`InputText ${className}`, `__${name}__warningMsg`)}`}
            >
              {warningAlert}
            </div>
          </label>
        </div>
      );

    default:
      return null;
  }
};

export default InputText;

InputText.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  min: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  max: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  step: PropTypes.string,
  htmlPattern: PropTypes.string,
  rows: PropTypes.string,
  validationKeys: validationKeysType,
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

InputText.defaultProps = {
  className: '',
  label: '',
  type: 'text',
  value: '',
  min: undefined,
  max: undefined,
  step: undefined,
  htmlPattern: '',
  rows: '5',
  validationKeys: validationKeysDefaults,
  placeholder: '',
  disabled: false,
  onChange: () => {},
  onBlur: () => {},
};

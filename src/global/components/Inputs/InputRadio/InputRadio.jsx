import React from 'react';

import PropTypes from 'prop-types';
import validationKeysType from '../../Form/types/validationKeys';
import validationKeysDefaults from '../../Form/defaults/validationKeys';

import { bemCls } from '../../../utils/ClassNameHelpers';
import InputRadioItemWrapper from './InputRadioItemWrapper';

import './InputRadio.css';

const InputRadio = ({
  label, options, name, className, validationKeys, ...otherProps
}) => {
  const {
    required,
    validationAlert,
    warningAlert,
  } = validationKeys || InputRadio.defaultProps.validationKeys;

  return (
    <div className={`InputRadio ${className} ${
      bemCls(`InputRadio ${className}`, `__${name}`)} ${
      bemCls(`InputRadio ${className}`, '__required', required)} ${
      bemCls(`InputRadio ${className}`, '--alert', validationAlert)}`}
    >
      <div className={bemCls(`InputRadio ${className}`, '__label')}>
        {`${label}${required ? '*' : ''}`}
      </div>
      <div className={`${bemCls(`InputRadio ${className}`, '__alertMsg')} ${
        bemCls(`InputRadio ${className}`, `__${name}__alertMsg`)}`}
      >
        {validationAlert}
      </div>
      <div className={bemCls(`InputRadio ${className}`, '__container')}>
        {options.map(option => (
          <InputRadioItemWrapper
            {...otherProps}
            className={className}
            name={name}
            key={option.value}
            option={option}
            validationKeys={validationKeys}
          />
        ))}
      </div>
      <div className={`${bemCls(`InputRadio ${className}`, '__warningMsg')} ${
        bemCls(`InputRadio ${className}`, `__${name}__warningMsg`)}`}
      >
        {warningAlert}
      </div>
    </div>
  );
};

export default InputRadio;

InputRadio.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
    ]),
    label: PropTypes.string,
  })),
  className: PropTypes.string,
  validationKeys: validationKeysType,
  name: PropTypes.string,
};

InputRadio.defaultProps = {
  label: '',
  className: '',
  options: [],
  validationKeys: validationKeysDefaults,
  name: '',
};

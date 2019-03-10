import React from 'react';
import PropTypes from 'prop-types';

import { bemCls } from '../../../utils/ClassNameHelpers';

const InputRadioItem = ({
  className, name, label, value, checked, onChange, onBlur,
}) => (
  <div className={`InputRadioItem ${className}`}>
    <label
      className={`${bemCls(`InputRadioItem ${className}`, '__label')} ${
        bemCls(`InputRadioItem ${className}`, `__${name}__label`)}`}
    >
      <input
        type="radio"
        className={`${bemCls(`InputRadioItem ${className}`, '__input')} ${
          bemCls(`InputRadioItem ${className}`, `__${name}__input`)}`}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        onBlur={onBlur}
      />
      {label}
    </label>
  </div>
);

export default InputRadioItem;

InputRadioItem.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

InputRadioItem.defaultProps = {
  label: '',
  className: '',
  value: '',
  checked: false,
  onChange: () => {},
  onBlur: () => {},
};

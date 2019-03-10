import React from 'react';
import PropTypes from 'prop-types';

import { bemCls } from '../../../utils/ClassNameHelpers';

const InputCheckboxItem = ({
  className, name, label, value, onChange, onBlur, disabled,
}) => (
  <div className={`InputCheckboxItem ${className} ${
    bemCls(`InputCheckboxItem ${className}`, '--checked', value)}`}
  >
    <label
      key={name}
      className={`${bemCls(`InputCheckboxItem ${className}`, '__label')} ${
        bemCls(`InputCheckboxItem ${className}`, `__${name}__label`)}`}
    >
      <input
        type="checkbox"
        className={`${bemCls(`InputCheckboxItem ${className}`, '__input')} ${
          bemCls(`InputCheckboxItem ${className}`, `__${name}__input`)} ${
          bemCls(`InputCheckboxItem ${className}`, '__input--disabled', disabled)}`}
        name={name}
        value={value}
        checked={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {label}
    </label>
  </div>
);

export default InputCheckboxItem;

InputCheckboxItem.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

InputCheckboxItem.defaultProps = {
  label: '',
  className: '',
  value: false,
  disabled: false,
  onChange: () => {},
  onBlur: () => {},
};

import React from 'react';
import PropTypes from 'prop-types';
import HtmlEditor from '../../Html/HtmlEditor';

import { bemCls } from '../../../utils/ClassNameHelpers';

import './InputHtml.css';

const InputHtml = ({
  className, name, label, value, onChange, onBlur, validationKeys, disabled,
}) => {
  const {
    required,
    validationAlert,
    warningAlert,
    onValidate,
  } = validationKeys || InputHtml.defaultProps.validationKeys;

  return (
    <div className={`InputHtml ${className} ${
      bemCls(`InputHtml ${className}`, `__${name}`)} ${
      bemCls(`InputHtml ${className}`, '__required', required)} ${
      bemCls(`InputHtml ${className}`, '--alert', validationAlert)}`}
    >
      <label
        key={name}
        className={`${bemCls(`InputHtml ${className}`, '__label')} ${
          bemCls(`InputHtml ${className}`, `__${name}__label`)} ${
          bemCls(`InputHtml ${className}`, '__label--disabled', disabled)}`}
      >
        {`${label}${required ? '*' : ''}`}
        <div className={`${bemCls(`InputHtml ${className}`, '__alertMsg')} ${
          bemCls(`InputHtml ${className}`, `__${name}__alertMsg`)}`}
        >
          {validationAlert}
        </div>
        <HtmlEditor
          className={`${bemCls(`InputHtml ${className}`, '__input')} ${
            bemCls(`InputHtml ${className}`, `__${name}__input`)} ${
            bemCls(`InputHtml ${className}`, '__input--disabled', disabled)}`}
          name={name}
          value={value}
          required={required}
          disabled={disabled}
          onChange={onChange}
          onBlur={onBlur}
          onValidate={onValidate}
        />
      </label>
      <div className={`${bemCls(`InputHtml ${className}`, '__warningMsg')} ${
        bemCls(`InputHtml ${className}`, `__${name}__warningMsg`)}`}
      >
        {warningAlert}
      </div>
    </div>
  );
};

export default InputHtml;

InputHtml.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
  validationKeys: PropTypes.shape({
    required: PropTypes.bool,
    validationAlert: PropTypes.string,
    warningAlert: PropTypes.string,
    onValidate: PropTypes.func,
  }),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

InputHtml.defaultProps = {
  label: '',
  className: '',
  value: '',
  validationKeys: {
    required: false,
    validationAlert: '',
    warningAlert: '',
    onValidate: () => {},
  },
  disabled: false,
  onChange: () => {},
  onBlur: () => {},
};

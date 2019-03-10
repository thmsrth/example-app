import React from 'react';
import PropTypes from 'prop-types';
import RichTextEditor from '../../RichTextEditor';

import { bemCls } from '../../../utils/ClassNameHelpers';

import './InputRichText.css';

const InputRichText = ({
  className, name, label, value, placeholder, onChange, onBlur, validationKeys, disabled,
}) => {
  const {
    required,
    validationAlert,
    warningAlert,
    onValidate,
  } = validationKeys || InputRichText.defaultProps.validationKeys;

  return (
    <div className={`InputRichText ${className} ${
      bemCls(`InputRichText ${className}`, `__${name}`)} ${
      bemCls(`InputRichText ${className}`, '__required', required)} ${
      bemCls(`InputRichText ${className}`, '--alert', validationAlert)}`}
    >
      <div
        key={name}
        className={`${bemCls(`InputRichText ${className}`, '__label')} ${
          bemCls(`InputRichText ${className}`, `__${name}__label`)} ${
          bemCls(`InputRichText ${className}`, '__label--disabled', disabled)}`}
      >
        {`${label}${required ? '*' : ''}`}
        <div className={`${bemCls(`InputRichText ${className}`, '__alertMsg')} ${
          bemCls(`InputRichText ${className}`, `__${name}__alertMsg`)}`}
        >
          {validationAlert}
        </div>
        <RichTextEditor
          className={`${bemCls(`InputRichText ${className}`, '__input')} ${
            bemCls(`InputRichText ${className}`, `__${name}__input`)} ${
            bemCls(`InputRichText ${className}`, '__input--disabled', disabled)}`}
          name={name}
          value={value}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          onChange={onChange}
          onBlur={onBlur}
          onValidate={onValidate}
        />
      </div>
      <div className={`${bemCls(`InputRichText ${className}`, '__warningMsg')} ${
        bemCls(`InputRichText ${className}`, `__${name}__warningMsg`)}`}
      >
        {warningAlert}
      </div>
    </div>
  );
};

export default InputRichText;

InputRichText.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
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

InputRichText.defaultProps = {
  label: '',
  className: '',
  value: '',
  placeholder: '',
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

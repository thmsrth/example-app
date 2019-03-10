import React from 'react';

import PropTypes from 'prop-types';
import fieldType from './types/field';

import { bemCls } from '../../../utils/ClassNameHelpers';
import { getFormInputField } from '../../../utils/FormHelpers';

const InputCollectionField = ({
  value, field, className, onChange, onBlur, optionsFromData,
}) => {
  const { hidden } = field;

  if (hidden) return null;

  return (
    <div className={`${bemCls(`InputCollection ${className}`, 'Field')} ${
      bemCls(`InputCollection ${className}`, `Field__${field.name}`)}`}
    >
      {getFormInputField(
        field,
        value,
        className,
        onChange,
        onBlur,
        optionsFromData,
        field.disabled,
      )}
    </div>
  );
};

export default InputCollectionField;

InputCollectionField.propTypes = {
  field: fieldType,
  value: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ])),
  className: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  optionsFromData: PropTypes.object,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

InputCollectionField.defaultProps = {
  field: {
    hidden: false,
    disabled: false,
  },
  value: null,
  className: '',
  optionsFromData: null,
  onChange: () => {},
  onBlur: () => {},
};

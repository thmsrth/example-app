import React from 'react';

import PropTypes from 'prop-types';
import fieldType from './types/field';

import { bemCls } from '../../../utils/ClassNameHelpers';
import { getValidationKeys } from '../../../utils/FormHelpers';

import Button from '../../Button';

import InputCollectionFieldWrapper from './InputCollectionFieldWrapper';

import './InputCollectionItem.css';

const InputCollectionItem = ({
  className, name, value, index, disabled, fields, handleDeleteCollectionItem, ...otherProps
}) => {
  const validationAlert = fields.some(field => (
    getValidationKeys(field, value[index][field.name]).validationAlert
  ));

  return (
    <div className={`${bemCls(`InputCollection FormInput ${className}`, 'Item')} ${
      bemCls(`InputCollection FormInput ${className}`, 'Item--alert', validationAlert)}`}
    >
      <div className={bemCls(`InputCollection FormInput ${className}`, 'ItemFields')}>
        {fields.map(field => (
          <InputCollectionFieldWrapper
            {...otherProps}
            // eslint-disable-next-line react/no-array-index-key
            key={`${name}_${index}_${field.name}`}
            name={name}
            value={value}
            index={index}
            field={field}
            disabled={disabled}
            className={`InputCollectionItem ${className}`}
          />
        ))}
      </div>
      {!disabled
        && (
          <Button
            className={bemCls(`InputCollection FormInput ${className}`, 'Item__delete')}
            text=""
            iconName="remove"
            params={{ index }}
            onClick={handleDeleteCollectionItem}
          />
        )
      }
    </div>
  );
};

export default InputCollectionItem;

InputCollectionItem.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ])))),
  disabled: PropTypes.bool,
  index: PropTypes.number.isRequired,
  fields: PropTypes.arrayOf(fieldType),
  handleAddCollectionItem: PropTypes.func,
  handleDeleteCollectionItem: PropTypes.func,
};

InputCollectionItem.defaultProps = {
  className: '',
  value: [],
  fields: [],
  disabled: false,
  handleAddCollectionItem: () => {},
  handleDeleteCollectionItem: () => {},
};

import React from 'react';

import PropTypes from 'prop-types';
import fieldType from './types/field';
import validationKeysType from '../../Form/types/validationKeys';
import validationKeysDefaults from '../../Form/defaults/validationKeys';

import { bemCls } from '../../../utils/ClassNameHelpers';
import Button from '../../Button';

import InputCollectionItem from './InputCollectionItem';

import './InputCollection.css';

const InputCollection = ({
  className, name, label, value, fields, validationKeys, disabled,
  handleAddCollectionItem, ...otherProps
}) => {
  const {
    required,
    validationAlert,
    warningAlert,
  } = validationKeys || InputCollection.defaultProps.validationKeys;

  return (
    <div className={`InputCollection FormInput ${className} ${
      bemCls(`InputCollection FormInput ${className}`, `__${name}`)} ${
      bemCls(`InputCollection FormInput ${className}`, '__required', required)} ${
      bemCls(`InputCollection FormInput ${className}`, '--alert', validationAlert)} ${
      bemCls(`InputCollection FormInput ${className}`, '--empty', !(value && value.length))}`}
    >
      <div className="InputCollection__header">
        <label
          key={name}
          className={`${bemCls(`InputCollection FormInput ${className}`, '__label')} ${
            bemCls(`InputCollection FormInput ${className}`, `__${name}__label`)} ${
            bemCls(`InputCollection FormInput ${className}`, '__label--disabled', disabled)}`}
        >
          {`${label}${required ? '*' : ''}`}
        </label>
        <Button
          className="InputCollection__add"
          text=""
          iconName="plus"
          onClick={handleAddCollectionItem}
          disabled={disabled}
        />
      </div>
      <div className={`${bemCls(`InputCollection FormInput ${className}`, '__alertMsg')} ${
        bemCls(`InputCollection FormInput ${className}`, `__${name}__alertMsg`)}`}
      >
        {validationAlert}
      </div>
      <div className={bemCls(`InputCollection FormInput ${className}`, '__fields')}>
        {value.map((itemValue, index) => (
          <InputCollectionItem
            {...otherProps}
            // eslint-disable-next-line react/no-array-index-key
            key={`${name}_${index}`}
            className={className}
            index={index}
            name={name}
            value={value}
            disabled={disabled}
            fields={fields}
          />
        ))}
      </div>
      <div className={`${bemCls(`InputCollection FormInput ${className}`, '__warningMsg')} ${
        bemCls(`InputCollection FormInput ${className}`, `__${name}__warningMsg`)}`}
      >
        {warningAlert}
      </div>
    </div>
  );
};

export default InputCollection;

InputCollection.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ])))),
  fields: PropTypes.arrayOf(fieldType),
  validationKeys: validationKeysType,
  disabled: PropTypes.bool,
  handleAddCollectionItem: PropTypes.func,
  handleDeleteCollectionItem: PropTypes.func,
};

InputCollection.defaultProps = {
  className: '',
  label: '',
  value: [],
  fields: [],
  validationKeys: validationKeysDefaults,
  disabled: false,
  handleAddCollectionItem: () => {},
  handleDeleteCollectionItem: () => {},
};

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import fieldType from './types/field';

import InputCollectionField from './InputCollectionField';

class InputCollectionFieldWrapper extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleChange(fieldName, fieldValue) {
    const {
      name, index, value, onChange,
    } = this.props;

    const newValue = Object.assign(
      [...value],
      {
        [index]: {
          ...value[index],
          [fieldName]: {
            ...value[index][fieldName],
            value: fieldValue,
          },
        },
      },
    );

    onChange(name, newValue);
  }

  handleBlur(fieldName, validationKeys) {
    const {
      name, index, field, onBlur,
    } = this.props;
    const options = { fields: [field], index, type: 'collection' };

    onBlur(name, validationKeys, options);
  }

  render() {
    const {
      value, index, field, ...otherProps
    } = this.props;

    return (
      <InputCollectionField
        {...otherProps}
        value={value[index][field.name]}
        field={field}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
      />
    );
  }
}

export default InputCollectionFieldWrapper;

InputCollectionFieldWrapper.propTypes = {
  value: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ])))),
  name: PropTypes.string.isRequired,
  hidden: PropTypes.bool,
  index: PropTypes.number.isRequired,
  field: fieldType,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};

InputCollectionFieldWrapper.defaultProps = {
  value: [],
  hidden: false,
  field: null,
  onChange: () => {},
  onBlur: () => {},
};

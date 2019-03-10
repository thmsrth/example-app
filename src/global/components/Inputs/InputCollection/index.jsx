import React, { Component } from 'react';

import PropTypes from 'prop-types';
import fieldType from './types/field';
import validationKeysType from '../../Form/types/validationKeys';
import validationKeysDefaults from '../../Form/defaults/validationKeys';

import { getFormInputData } from '../../../utils/FormHelpers';

import InputCollection from './InputCollection';

class InputCollectionWrapper extends Component {
  constructor() {
    super();
    this.handleAddCollectionItem = this.handleAddCollectionItem.bind(this);
    this.handleDeleteCollectionItem = this.handleDeleteCollectionItem.bind(this);
  }

  handleAddCollectionItem() {
    const {
      name, value, fields, onChange,
    } = this.props;
    const newValue = [...value];
    newValue.push(fields.reduce((fieldsData, field) => ({
      ...fieldsData,
      [field.name]: getFormInputData(null, field),
    }), {}));

    onChange(name, newValue);
  }

  handleDeleteCollectionItem(params) {
    const {
      name, value, fields, validationKeys, onChange, onBlur,
    } = this.props;

    const newValue = [...value.filter((item, index) => index !== params.index)];

    onChange(name, newValue);
    onBlur(name, validationKeys, { type: 'collection', fields, value: newValue });
  }

  render() {
    const { hidden } = this.props;

    if (hidden) return null;

    return (
      <InputCollection
        {...this.props}
        handleAddCollectionItem={this.handleAddCollectionItem}
        handleDeleteCollectionItem={this.handleDeleteCollectionItem}
      />
    );
  }
}

export default InputCollectionWrapper;

InputCollectionWrapper.propTypes = {
  value: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ])))),
  fields: PropTypes.arrayOf(fieldType),
  name: PropTypes.string,
  validationKeys: validationKeysType,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  hidden: PropTypes.bool,
};

InputCollectionWrapper.defaultProps = {
  value: [],
  fields: [],
  name: '',
  validationKeys: validationKeysDefaults,
  onChange: () => {},
  onBlur: () => {},
  hidden: false,
};

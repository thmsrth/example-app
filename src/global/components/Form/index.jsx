import React, { Component } from 'react';

import PropTypes from 'prop-types';
import keysType from './types/keys';

import {
  getFormData,
  getValidationKeys,
  getValidatedKeyData,
  isEveryKeyDataValid,
  getSubmitDataValues,
} from '../../utils/FormHelpers';

import Form from './Form';

class FormWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: getFormData(props.keys, props.data),
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.updateKeysDataValidation = this.updateKeysDataValidation.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  handleChange(keyName, value) {
    const data = this.updateKeyDataFromState(keyName, value);

    const { keys } = this.props;
    const currentKey = keys.find(k => k.name === keyName);

    this.updateData(data);

    if (currentKey && currentKey.onChange) {
      currentKey.onChange(value, data, this.updateData);
    }
  }

  handleBlur(keyName, validationKeys, options = {}) {
    const { value } = options;
    const { data } = this.state;
    const newData = value
      ? this.updateKeyDataFromState(keyName, value)
      : data;

    const validatedData = getValidatedKeyData(keyName, newData, validationKeys, options);

    this.setState({ data: validatedData });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { data } = this.state;
    const { keys } = this.props;
    const isFormValid = this.validateForm();

    if (isFormValid) {
      const { submitParams, handleSubmit, formatData } = this.props;
      const dataValues = getSubmitDataValues(keys, data);

      handleSubmit({ ...submitParams, data: formatData(dataValues) });
    }
  }

  updateData(data) {
    this.setState({ data });
  }

  updateKeyDataFromState(keyName, value) {
    const { data } = this.state;

    return {
      ...data,
      [keyName]: {
        ...data[keyName],
        value,
      },
    };
  }

  validateForm() {
    const data = this.updateKeysDataValidation();
    return isEveryKeyDataValid(data);
  }

  updateKeysDataValidation() {
    const { keys } = this.props;
    const { data } = this.state;

    const validatedData = keys.reduce((d, key) => {
      const valData = getValidatedKeyData(
        key.name,
        data,
        getValidationKeys(key, data),
        { fields: key.fields },
      );

      return {
        ...d,
        [key.name]: valData[key.name],
      };
    }, {});

    this.setState({ data: validatedData });

    return Object.values(validatedData);
  }

  render() {
    const { data } = this.state;
    return (
      <Form
        {...this.props}
        data={data}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleBlur={this.handleBlur}
      />
    );
  }
}

export default FormWrapper;

FormWrapper.propTypes = {
  action: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  submitParams: PropTypes.object,
  keys: keysType,
  handleSubmit: PropTypes.func,
  formatData: PropTypes.func,
};

FormWrapper.defaultProps = {
  action: '',
  data: null,
  submitParams: null,
  keys: [],
  formatData: data => data,
  handleSubmit: () => {},
};

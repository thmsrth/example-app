import React, { Component } from 'react';

import PropTypes from 'prop-types';
import validationKeysType from '../../Form/types/validationKeys';
import validationKeysDefaults from '../../Form/defaults/validationKeys';

import InputCheckboxItem from './InputCheckboxItem';

class InputCheckboxItemWrapper extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleChange(event) {
    const {
      name, value, option, onChange,
    } = this.props;

    const newValue = {
      ...value,
      [option]: event.target.checked,
    };
    onChange(name, newValue);
  }

  handleBlur() {
    const {
      name, validationKeys, onBlur,
    } = this.props;
    const options = { type: 'checkbox' };

    onBlur(name, validationKeys, options);
  }

  render() {
    const { value, option, ...otherProps } = this.props;
    return (
      <InputCheckboxItem
        {...otherProps}
        value={value[option]}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
      />
    );
  }
}

export default InputCheckboxItemWrapper;

InputCheckboxItemWrapper.propTypes = {
  value: PropTypes.objectOf(PropTypes.bool),
  name: PropTypes.string,
  validationKeys: validationKeysType,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  option: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
    PropTypes.string,
  ]),
};

InputCheckboxItemWrapper.defaultProps = {
  value: null,
  name: '',
  validationKeys: validationKeysDefaults,
  option: '',
  onChange: () => {},
  onBlur: () => {},
};

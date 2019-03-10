import React, { Component } from 'react';

import PropTypes from 'prop-types';
import validationKeysType from '../../Form/types/validationKeys';
import validationKeysDefaults from '../../Form/defaults/validationKeys';

import InputText from './InputText';

class InputTextWrapper extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleChange(event) {
    const { name, onChange } = this.props;
    onChange(name, event.target.value);
  }

  handleBlur() {
    const {
      name, validationKeys, onBlur, type,
    } = this.props;
    const options = { type };

    onBlur(name, validationKeys, options);
  }

  render() {
    const { value, hidden, ...otherProps } = this.props;

    if (hidden) return null;

    return (
      <InputText
        {...otherProps}
        value={value}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
      />
    );
  }
}

export default InputTextWrapper;

InputTextWrapper.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  validationKeys: validationKeysType,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  hidden: PropTypes.bool,
};

InputTextWrapper.defaultProps = {
  name: '',
  type: 'text',
  value: '',
  validationKeys: validationKeysDefaults,
  onChange: () => {},
  onBlur: () => {},
  hidden: false,
};

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import InputRichText from './InputRichText';

class InputRichTextWrapper extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleChange(value) {
    const { name, onChange } = this.props;
    onChange(name, value);
  }

  handleBlur() {
    const {
      name, validationKeys, onBlur,
    } = this.props;
    const options = { type: 'richtext' };

    onBlur(name, validationKeys, options);
  }

  render() {
    const { value, hidden, ...otherProps } = this.props;

    if (hidden) return null;

    return (
      <InputRichText
        {...otherProps}
        value={value}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
      />
    );
  }
}

export default InputRichTextWrapper;

InputRichTextWrapper.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  validationKeys: PropTypes.shape({
    required: PropTypes.bool,
    pattern: PropTypes.instanceOf(RegExp),
    validationAlert: PropTypes.string,
    warningAlert: PropTypes.string,
    onValidate: PropTypes.func,
    onWarning: PropTypes.func,
  }),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  hidden: PropTypes.bool,
};

InputRichTextWrapper.defaultProps = {
  value: '',
  name: '',
  validationKeys: null,
  onChange: () => {},
  onBlur: () => {},
  hidden: false,
};

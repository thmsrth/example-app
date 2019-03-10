import React, { Component } from 'react';
import PropTypes from 'prop-types';

import InputHtml from './InputHtml';

class InputHtmlWrapper extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleChange(html) {
    const { name, onChange } = this.props;
    onChange(name, html);
  }

  handleBlur() {
    const {
      name, validationKeys, onBlur,
    } = this.props;
    const options = { type: 'html' };

    onBlur(name, validationKeys, options);
  }

  render() {
    const { value, hidden, ...otherProps } = this.props;

    if (hidden) return null;

    return (
      <InputHtml
        {...otherProps}
        value={value}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
      />
    );
  }
}

export default InputHtmlWrapper;

InputHtmlWrapper.propTypes = {
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

InputHtmlWrapper.defaultProps = {
  value: '',
  name: '',
  validationKeys: null,
  onChange: () => {},
  onBlur: () => {},
  hidden: false,
};

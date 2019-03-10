import React, { Component } from 'react';

import PropTypes from 'prop-types';
import validationKeysType from '../../Form/types/validationKeys';
import validationKeysDefaults from '../../Form/defaults/validationKeys';

import InputSelect from './InputSelect';

class InputSelectWrapper extends Component {
  constructor() {
    super();
    this.state = {
      focused: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleChange(event) {
    const { name, value, onChange } = this.props;
    const eventValue = event ? event.value : '';
    onChange(name, typeof value === 'number'
      ? parseInt(eventValue, 10)
      : eventValue);
  }

  handleFocus(event) {
    const { onFocus } = this.props;

    this.setState({ focused: true });
    if (onFocus) onFocus(event);
  }

  handleBlur() {
    const {
      name, validationKeys, onBlur,
    } = this.props;
    const options = { type: 'select' };

    this.setState({ focused: false });
    onBlur(name, validationKeys, options);
  }

  render() {
    const {
      value,
      optionsFromDataKey,
      optionsFromData,
      hidden,
      ...otherProps
    } = this.props;
    const { focused } = this.state;

    if (hidden) return null;

    if (optionsFromDataKey) {
      return (
        <InputSelect
          {...otherProps}
          options={optionsFromData[optionsFromDataKey].data}
          loading={optionsFromData[optionsFromDataKey].loading}
          error={optionsFromData[optionsFromDataKey].error}
          value={value}
          focused={focused}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
      );
    }

    return (
      <InputSelect
        {...otherProps}
        value={value}
        focused={focused}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      />
    );
  }
}

export default InputSelectWrapper;

InputSelectWrapper.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  name: PropTypes.string,
  optionsFromDataKey: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  optionsFromData: PropTypes.object,
  validationKeys: validationKeysType,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  hidden: PropTypes.bool,
};

InputSelectWrapper.defaultProps = {
  value: '',
  name: '',
  optionsFromDataKey: '',
  optionsFromData: null,
  validationKeys: validationKeysDefaults,
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  hidden: false,
};

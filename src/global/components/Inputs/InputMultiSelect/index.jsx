import React, { Component } from 'react';

import PropTypes from 'prop-types';
import validationKeysType from '../../Form/types/validationKeys';
import validationKeysDefaults from '../../Form/defaults/validationKeys';

import InputMultiSelect from './InputMultiSelect';

class InputMultiSelectWrapper extends Component {
  constructor() {
    super();
    this.state = {
      focused: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSelectAll = this.handleSelectAll.bind(this);
  }

  handleChange(event) {
    const { name, onChange } = this.props;
    const eventValue = event.map(option => option.value) || [];
    onChange(name, eventValue);
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
    const options = { type: 'multiselect' };

    this.setState({ focused: false });

    onBlur(name, validationKeys, options);
  }

  handleSelectAll() {
    const {
      optionsFromData, optionsFromDataKey, options, name, onChange,
    } = this.props;
    const selectedOptions = optionsFromDataKey
      ? optionsFromData[optionsFromDataKey].data
      : options;
    const selectedOptionsValues = selectedOptions.map(opt => opt.value);

    onChange(name, selectedOptionsValues);
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
        <InputMultiSelect
          {...otherProps}
          options={optionsFromData[optionsFromDataKey].data}
          loading={optionsFromData[optionsFromDataKey].loading}
          error={optionsFromData[optionsFromDataKey].error}
          value={value}
          focused={focused}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onSelectAll={this.handleSelectAll}
        />
      );
    }

    return (
      <InputMultiSelect
        {...otherProps}
        value={value}
        focused={focused}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onSelectAll={this.handleSelectAll}
      />
    );
  }
}

export default InputMultiSelectWrapper;

InputMultiSelectWrapper.propTypes = {
  value: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ])),
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

InputMultiSelectWrapper.defaultProps = {
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

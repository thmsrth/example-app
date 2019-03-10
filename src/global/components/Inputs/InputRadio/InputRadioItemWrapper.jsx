import React from 'react';

import PropTypes from 'prop-types';
import validationKeysType from '../../Form/types/validationKeys';
import validationKeysDefaults from '../../Form/defaults/validationKeys';

import InputRadioItem from './InputRadioItem';

class InputRadioItemWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleChange(event) {
    const { name, option, onChange } = this.props;
    if (event.target.checked) onChange(name, option.value);
  }

  handleBlur() {
    const {
      name, validationKeys, onBlur,
    } = this.props;
    const options = { type: 'radio' };

    onBlur(name, validationKeys, options);
  }

  render() {
    const { value, option } = this.props;
    return (
      <InputRadioItem
        {...this.props}
        value={option.value}
        checked={value === option.value}
        label={option.label}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
      />
    );
  }
}

export default InputRadioItemWrapper;

InputRadioItemWrapper.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.bool,
  ]),
  name: PropTypes.string,
  validationKeys: validationKeysType,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  option: PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.bool,
    ]),
    label: PropTypes.string,
  }),
};

InputRadioItemWrapper.defaultProps = {
  value: null,
  name: '',
  validationKeys: validationKeysDefaults,
  option: null,
  onChange: () => {},
  onBlur: () => {},
};

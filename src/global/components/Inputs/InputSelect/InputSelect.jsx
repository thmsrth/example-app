import React from 'react';
import Select from 'react-select';

import PropTypes from 'prop-types';
import validationKeysType from '../../Form/types/validationKeys';
import validationKeysDefaults from '../../Form/defaults/validationKeys';

import I18nGlobal from '../../../utils/I18nGlobal';
import { bemCls } from '../../../utils/ClassNameHelpers';

import './InputSelect.css';

const InputSelect = ({
  className, name, label, options, value, disabled, focused, noResultsText, noResultsComponent,
  onChange, onFocus, onBlur, validationKeys, error, loading, big, clearable, searchable,
}) => {
  const {
    required,
    validationAlert,
    warningAlert,
  } = validationKeys || InputSelect.defaultProps.validationKeys;

  const selected = options.find(option => (value && option.value !== undefined
    && option.value !== null && option.value.toString() === value.toString()));

  const placeholderHelper = selected === undefined && (value === '' || Number.isNaN(value))
    ? I18nGlobal.t('en.inputSelect.nothingSelected')
    : I18nGlobal.t('en.inputSelect.valueNotInOptions');

  const placeholder = loading || placeholderHelper;

  return (
    <div className={`InputSelect ${className} ${
      bemCls(`InputSelect ${className}`, `__${name}`)} ${
      bemCls(`InputSelect ${className}`, '--big', big)}${
      bemCls(`InputSelect ${className}`, '__required', required)} ${
      bemCls(`InputSelect ${className}`, '--alert', error || validationAlert)}`}
    >
      <label
        key={name}
        className={`${bemCls(`InputSelect ${className} ${className}__${name}`, '__label')} ${
          bemCls(`InputSelect ${className} ${className}__${name}`, '__label--disabled', disabled)}`}
      >
        {`${label}${required ? '*' : ''}`}
        <div className={`${bemCls(`InputSelect ${className}`, '__alertMsg')} ${
          bemCls(`InputSelect ${className}`, `__${name}__alertMsg`)}`}
        >
          {error || validationAlert}
        </div>
        <div
          className={`${bemCls(`InputSelect ${className}`, '__input')} ${
            bemCls(bemCls(`InputSelect ${className}`, '__input'), '--focused', focused)} ${
            bemCls(bemCls(`InputSelect ${className}`, '__input'), '--disabled', disabled)}`}
        >
          <Select
            className={`${bemCls(`InputSelect ${className}`, '__select')} ${
              bemCls(bemCls(`InputSelect ${
                className}`, '__select'), '--alert', error || validationAlert)}`}
            name={name}
            value={(selected && selected.value) || ''}
            disabled={disabled}
            required={required}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            options={options}
            placeholder={placeholder}
            isLoading={loading !== ''}
            clearable={clearable}
            searchable={searchable}
            noResultsText={noResultsComponent || noResultsText}
          />
        </div>
        <div className={`${bemCls(`InputSelect ${className}`, '__warningMsg')} ${
          bemCls(`InputSelect ${className}`, `__${name}__warningMsg`)}`}
        >
          {warningAlert}
        </div>
      </label>
    </div>
  );
};

export default InputSelect;

InputSelect.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  label: PropTypes.string,
  className: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    label: PropTypes.string,
  })),
  disabled: PropTypes.bool,
  validationKeys: validationKeysType,
  error: PropTypes.string,
  loading: PropTypes.string,
  focused: PropTypes.bool,
  big: PropTypes.bool,
  clearable: PropTypes.bool,
  searchable: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  noResultsText: PropTypes.string,
  noResultsComponent: PropTypes.node,
};

InputSelect.defaultProps = {
  label: '',
  value: '',
  className: '',
  options: [],
  disabled: false,
  validationKeys: validationKeysDefaults,
  error: '',
  loading: '',
  focused: false,
  big: false,
  clearable: false,
  searchable: false,
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  noResultsText: 'No results found',
  noResultsComponent: null,
};

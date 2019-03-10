import React from 'react';
import Select from 'react-select';

import PropTypes from 'prop-types';
import validationKeysType from '../../Form/types/validationKeys';
import validationKeysDefaults from '../../Form/defaults/validationKeys';

import Button from '../../Button';
import I18nGlobal from '../../../utils/I18nGlobal';
import { bemCls } from '../../../utils/ClassNameHelpers';

import './InputMultiSelect.css';

const InputMultiSelect = ({
  className, name, label, options, value, disabled, focused,
  onChange, onFocus, onBlur, validationKeys, error, loading,
  big, clearable, selectAll, searchable, closeOnSelect, onSelectAll, onSelectResetsInput,
  noResultsText, noResultsComponent,
}) => {
  const {
    required,
    validationAlert,
    warningAlert,
  } = validationKeys || InputMultiSelect.defaultProps.validationKeys;

  const placeholder = loading || I18nGlobal.t('en.inputSelect.nothingSelected');

  return (
    <div className={`InputMultiSelect ${className} ${
      bemCls(`InputMultiSelect ${className}`, `__${name}`)} ${
      bemCls(`InputMultiSelect ${className}`, '--big', big)}${
      bemCls(`InputMultiSelect ${className}`, '__required', required)} ${
      bemCls(`InputMultiSelect ${className}`, '--alert', error || validationAlert)}`}
    >
      <label
        key={name}
        className={`${bemCls(`InputMultiSelect ${className} ${className}__${name}`, '__label')} ${
          bemCls(`InputMultiSelect ${className} ${className}__${name}`, '__label--disabled', disabled)}`}
      >
        {`${label}${required ? '*' : ''}`}
        <div className={`${bemCls(`InputMultiSelect ${className}`, '__alertMsg')} ${
          bemCls(`InputMultiSelect ${className}`, `__${name}__alertMsg`)}`}
        >
          {error || validationAlert}
        </div>
        <div
          className={`${bemCls(`InputMultiSelect ${className}`, '__input')} ${
            bemCls(bemCls(`InputMultiSelect ${className}`, '__input'), '--focused', focused)} ${
            bemCls(bemCls(`InputMultiSelect ${className}`, '__input'), '--disabled', disabled)}`}
        >
          <Select
            className={`${bemCls(`InputMultiSelect ${className}`, '__select')} ${
              bemCls(bemCls(`InputMultiSelect ${
                className}`, '__select'), '--alert', error || validationAlert)}`}
            name={name}
            value={value || []}
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
            multi
            closeOnSelect={closeOnSelect}
            onSelectResetsInput={onSelectResetsInput}
            noResultsText={noResultsComponent || noResultsText}
          />
          {selectAll
            && (
              <Button
                className="InputMultiSelect__selectAll"
                iconName="list"
                text={I18nGlobal.t('en.actions.selectAll')}
                onClick={onSelectAll}
                disabled={disabled}
              />
            )
          }
        </div>
        <div className={`${bemCls(`InputMultiSelect ${className}`, '__warningMsg')} ${
          bemCls(`InputMultiSelect ${className}`, `__${name}__warningMsg`)}`}
        >
          {warningAlert}
        </div>
      </label>
    </div>
  );
};

export default InputMultiSelect;

InputMultiSelect.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ])),
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
  selectAll: PropTypes.bool,
  searchable: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  closeOnSelect: PropTypes.bool,
  onSelectAll: PropTypes.func,
  onSelectResetsInput: PropTypes.bool,
  noResultsText: PropTypes.string,
  noResultsComponent: PropTypes.node,
};

InputMultiSelect.defaultProps = {
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
  selectAll: false,
  searchable: false,
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  closeOnSelect: true,
  onSelectAll: () => {},
  onSelectResetsInput: true,
  noResultsText: 'No results found',
  noResultsComponent: null,
};

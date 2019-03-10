import React from 'react';
import PropTypes from 'prop-types';

import { bemCls } from '../../../utils/ClassNameHelpers';
import I18nGlobal from '../../../utils/I18nGlobal';

import DataStateNotifier from '../../DataStateNotifier/index';
import Button from '../../Button/index';

import './InputImage.css';

const InputImage = ({
  className, name, label, value, onBlur, onChange, validationKeys,
  uploadImage, uploading, uploadError, resetImageUploadError, deleteImage,
  imageFile, format, accept, loading,
}) => {
  const {
    required,
    validationAlert,
    warningAlert,
  } = validationKeys || InputImage.defaultProps.validationKeys;

  return (
    <DataStateNotifier
      dataLoading={loading}
      dataError={uploadError}
      resetDataError={resetImageUploadError}
    >
      <div className={`InputImage ${className} ${
        bemCls(`InputImage ${className}`, `__${name}`)} ${
        bemCls(`InputImage ${className}`, '__required', required)} ${
        bemCls(`InputImage ${className}`, '--alert', validationAlert)}`}
      >
        <label
          className={`${bemCls(`InputImage ${className}`, '__label')} ${
            bemCls(`InputImage ${className}`, '__label__top')} ${
            bemCls(`InputImage ${className}`, `__${name}__label`)}`}
        >
          {`${label}${required ? '*' : ''}`}
        </label>
        <div className={`${bemCls(`InputImage ${className}`, '__alertMsg')} ${
          bemCls(`InputImage ${className}`, `__${name}__alertMsg`)}`}
        >
          {validationAlert}
        </div>
        {value
        && (
        <div className={bemCls(`InputImage ${className}`, '__image')}>
          <img
            className={`InputImage__preview Main__image--${format}`}
            alt={value}
            title={value}
            src={value}
          />
          <Button
            className={bemCls(`InputImage ${className}`, '__delete')}
            iconName="remove"
            onClick={deleteImage}
          />
        </div>
        )
        }
        <label
          className={`${bemCls(`InputImage ${className}`, '__label')} ${
            bemCls(`InputImage ${className}`, '__label__bottom')} ${
            bemCls(`InputImage ${className}`, `__${name}__label`)}`}
        >
          <input
            type="file"
            className={`${bemCls(`InputImage ${className}`, '__input')} ${
              bemCls(`InputImage ${className}`, `__${name}__input`)}`}
            name={name}
            accept={accept}
            required={required}
            onBlur={onBlur}
            onChange={onChange}
          />
          <Button
            className={`${bemCls(`InputImage ${className}`, '__upload')} ${
              bemCls(`InputImage ${className}`, '__upload--uploaded', !!value)}`}
            iconName={value ? 'check' : 'upload'}
            text={value
              ? I18nGlobal.t('en.image.states.uploaded')
              : (uploading || I18nGlobal.t('en.actions.upload'))}
            onClick={uploadImage}
            loading={!!uploading}
            disabled={!imageFile}
          />
        </label>
        <div className={`${bemCls(`InputImage ${className}`, '__warningMsg')} ${
          bemCls(`InputImage ${className}`, `__${name}__warningMsg`)}`}
        >
          {warningAlert}
        </div>
      </div>
    </DataStateNotifier>
  );
};

export default InputImage;

InputImage.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
  ]),
  validationKeys: PropTypes.shape({
    required: PropTypes.bool,
    validationAlert: PropTypes.string,
    warningAlert: PropTypes.string,
  }),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  loading: PropTypes.string,
  uploading: PropTypes.string,
  uploadError: PropTypes.string,
  imageFile: PropTypes.instanceOf(File),
  format: PropTypes.string,
  accept: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  uploadImage: PropTypes.func,
  deleteImage: PropTypes.func,
  resetImageUploadError: PropTypes.func,
};

InputImage.defaultProps = {
  className: '',
  label: '',
  value: '',
  validationKeys: {
    required: false,
    validationAlert: '',
    warningAlert: '',
  },
  onChange: () => {},
  onBlur: () => {},
  loading: '',
  uploading: '',
  uploadError: '',
  imageFile: null,
  format: 'xs',
  accept: false,
  uploadImage: () => {},
  deleteImage: () => {},
  resetImageUploadError: () => {},
};

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getImagePathByFormat, getImageUrlFromPath } from '../../../utils/ImageHelpers';
import SecurityUtil from '../../../security/utils/SecurityUtil';

import imageType from '../types/image';

import InputImage from './InputImage';

class InputImageWrapper extends Component {
  constructor() {
    super();
    this.handleUpload = this.handleUpload.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      imageFile: null,
    };
  }

  componentDidMount() {
    const {
      image, value, fetchImageById,
    } = this.props;
    if (!image && value) {
      fetchImageById({ id: value });
    }
  }

  handleUpload() {
    const {
      uploadImage, folderPath, renderer, name,
    } = this.props;
    const { imageFile } = this.state;

    if (imageFile) {
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.set('folderPath', folderPath);
      formData.set('createdBy', SecurityUtil.getCurrentUserName());

      const uploadParams = {
        data: formData,
        onSuccess: this.handleChange,
        renderer,
        name,
      };

      uploadImage(uploadParams);
    }
  }

  handleChange(imageId) {
    const { name, onChange } = this.props;

    onChange(name, imageId);
    this.setState({ imageFile: null });
  }

  handleFileChange(event) {
    const { name, onChange } = this.props;
    const imageFile = event.target.files[0];
    this.setState({ imageFile });

    onChange(name, null);
  }

  handleDelete() {
    const { name, onChange } = this.props;
    onChange(name, null);
  }

  handleBlur() {
    const {
      name, validationKeys, onBlur,
    } = this.props;
    const options = { type: 'file' };

    onBlur(name, validationKeys, options);
  }

  render() {
    const { imageFile } = this.state;
    const {
      image, format,
    } = this.props;
    const imagePath = image ? getImageUrlFromPath(getImagePathByFormat(image, format)) : '';

    return (
      <InputImage
        {...this.props}
        value={imagePath}
        uploadImage={this.handleUpload}
        deleteImage={this.handleDelete}
        imageFile={imageFile}
        onBlur={this.handleBlur}
        onChange={this.handleFileChange}
      />
    );
  }
}

export default InputImageWrapper;

InputImageWrapper.propTypes = {
  name: PropTypes.string,
  value: PropTypes.number,
  validationKeys: PropTypes.shape({
    required: PropTypes.bool,
    pattern: PropTypes.instanceOf(RegExp),
    validationAlert: PropTypes.string,
    warningAlert: PropTypes.string,
    onValidate: PropTypes.func,
    onWarning: PropTypes.func,
  }),
  format: PropTypes.string,
  folder: PropTypes.string,
  folderPath: PropTypes.string,
  renderer: PropTypes.string,
  image: imageType,
  uploadImage: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  fetchImageById: PropTypes.func,
};

InputImageWrapper.defaultProps = {
  name: '',
  value: null,
  validationKeys: null,
  format: '',
  folder: '',
  folderPath: '/',
  renderer: '',
  image: null,
  uploadImage: () => {},
  onBlur: () => {},
  onChange: () => {},
  fetchImageById: () => {},
};

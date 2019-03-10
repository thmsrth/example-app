import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getImagePathByFormat, getImageUrlFromPath } from '../../../utils/ImageHelpers';

import imageType from '../types/image';

import Image from '../Image';

class ImageByIdWrapper extends Component {
  componentDidMount() {
    const {
      image, value, fetchImageById,
    } = this.props;
    if (!image && value) {
      fetchImageById({ id: value });
    }
  }

  render() {
    const {
      image, format, className,
    } = this.props;
    const imagePath = image ? getImageUrlFromPath(getImagePathByFormat(image, format)) : '';

    if (image) {
      return (
        <Image key={image.name} image={{ path: imagePath, name: 'image' }} className={className} />
      );
    }
    return null;
  }
}

export default ImageByIdWrapper;

ImageByIdWrapper.propTypes = {
  className: PropTypes.string,
  value: PropTypes.number,
  format: PropTypes.string,
  image: imageType,
  fetchImageById: PropTypes.func,
};

ImageByIdWrapper.defaultProps = {
  className: '',
  value: null,
  format: '',
  image: null,
  fetchImageById: () => {},
};

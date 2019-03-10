import React from 'react';
import PropTypes from 'prop-types';

import { bemCls } from '../../../utils/ClassNameHelpers';

import Image from '../Image';

const ImageList = ({ images, className }) => (
  <div className={`ImageList ${bemCls(className, '__list')}`}>
    {images.map(image => <Image key={image.name} image={image} className={className} />)}
  </div>
);

export default ImageList;

ImageList.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
  })),
  className: PropTypes.string,
};

ImageList.defaultProps = {
  images: [],
  className: '',
};

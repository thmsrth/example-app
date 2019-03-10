import React from 'react';
import PropTypes from 'prop-types';

import { getImagePathByFormat, getImageUrlFromPath } from '../../../utils/ImageHelpers';

import DataStateNotifier from '../../DataStateNotifier';

import imageType from '../types/image';

import ImageList from './ImageList';

class ImageListWrapper extends React.Component {
  componentDidMount() {
    const {
      imageKeys, fetchImagesByIds, uploadedImages,
    } = this.props;

    const imagesToFetch = imageKeys.filter(key => key.id
      && !Object.prototype.hasOwnProperty.call(uploadedImages, key.id));
    const idsToFetch = imagesToFetch.map(key => key.id);
    if (idsToFetch.length) fetchImagesByIds({ ids: idsToFetch });
  }

  render() {
    const {
      uploadedImages,
      imageKeys,
      loading,
      error,
      resetImageUploadError,
      ...otherProps
    } = this.props;
    return (
      <DataStateNotifier
        dataLoading={loading}
        dataError={error}
        resetDataError={resetImageUploadError}
      >
        <ImageList
          images={imageKeys.map(key => ({
            name: key.name,
            label: key.label,
            path: Object.prototype.hasOwnProperty.call(uploadedImages, key.id)
              ? getImageUrlFromPath(getImagePathByFormat(uploadedImages[key.id], key.format))
              : '',
            deleteOptions: key.deleteOptions,
          }))}
          {...otherProps}
        />
      </DataStateNotifier>
    );
  }
}

export default ImageListWrapper;

ImageListWrapper.propTypes = {
  imageKeys: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    label: PropTypes.string,
    format: PropTypes.string,
  })),
  uploadedImages: PropTypes.objectOf(imageType),
  loading: PropTypes.string,
  error: PropTypes.string,
  resetImageUploadError: PropTypes.func,
  fetchImagesByIds: PropTypes.func,
};

ImageListWrapper.defaultProps = {
  imageKeys: [],
  uploadedImages: {},
  loading: '',
  error: '',
  resetImageUploadError: () => {},
  fetchImagesByIds: () => {},
};

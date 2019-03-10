import * as types from '../actionTypes/imageUpload';

const initialState = {
  data: {},
  uploading: '',
  error: '',
  currentUploadingName: '',
};

function addNewImage(state, imageData) {
  const stateImages = { ...state.data };
  if (imageData && imageData.id) {
    stateImages[imageData.id] = imageData;
  }
  return stateImages;
}

function addNewImages(state, imageData) {
  const stateImages = { ...state.data };
  return imageData.reduce((acc, image) => {
    if (image && image.id) {
      acc[image.id] = image;
    }
    return acc;
  }, stateImages);
}

function getContent(data) {
  return data && data.content;
}

const imageUpload = (state = initialState, action) => {
  switch (action.type) {
    case types.IMAGE_UPLOAD:
      return {
        ...state,
        uploading: action.uploading,
        currentUploadingName: action.currentUploadingName,
      };
    case types.IMAGE_UPLOAD_SUCCESS:
      return {
        ...state,
        data: addNewImage(state, action.data),
        error: action.error,
        uploading: action.uploading,
        currentUploadingName: action.currentUploadingName,
      };
    case types.IMAGE_UPLOAD_ERROR:
      return {
        ...state,
        error: action.error,
        uploading: action.uploading,
        currentUploadingName: action.currentUploadingName,
      };
    case types.IMAGE_UPLOAD_RESET_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case types.IMAGES_GET:
      return {
        ...state,
        loading: action.loading,
      };
    case types.IMAGES_GET_SUCCESS:
      return {
        ...state,
        data: addNewImages(state, getContent(action.data)),
        error: action.error,
        loading: action.loading,
      };
    case types.IMAGES_GET_ERROR:
      return {
        ...state,
        error: action.error,
        loading: action.loading,
      };
    default:
      return state;
  }
};

export default imageUpload;

export function getUploadedImages(state) {
  return state.imageUpload && state.imageUpload.data;
}

export function getImageUploading(state, name) {
  if (state.imageUpload && state.imageUpload.uploading !== ''
    && name === state.imageUpload.currentUploadingName) {
    return state.imageUpload.uploading;
  }
  return '';
}

export function getImageLoading(state) {
  return state.imageUpload && state.imageUpload.loading;
}

export function getImageUploadError(state) {
  return state.imageUpload && state.imageUpload.error;
}

export function getImage(state, imageId) {
  const uploadedImages = getUploadedImages(state);
  return uploadedImages[imageId];
}

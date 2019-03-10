const { REACT_APP_STORAGE_BASE_URL } = process.env;

function getImageFilesFromData(imageData) {
  return imageData && imageData.data && imageData.data.files;
}

function getImageFormatFile(imageFiles, format) {
  return imageFiles && format && imageFiles[format];
}

function getImageFilePath(imageFile) {
  return imageFile && imageFile.path;
}

export function getImagePathByFormat(imageData, format) {
  const imageFiles = getImageFilesFromData(imageData);
  const imageFormatFile = getImageFormatFile(imageFiles, format);
  return getImageFilePath(imageFormatFile) || '';
}

export function getImageUrlFromPath(imagePath) {
  const imageBaseUrl = `${REACT_APP_STORAGE_BASE_URL}/images`;
  return `${imageBaseUrl}/${imagePath}`;
}

const ImageHelpers = {
  getImagePathByFormat,
};

export default ImageHelpers;

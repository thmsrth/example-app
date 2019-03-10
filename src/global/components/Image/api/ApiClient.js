import axios from 'axios';
import SecurityUtil from '../../../security/utils/SecurityUtil';

const {
  REACT_APP_SERVICE_PROXY_URL,
} = process.env;

const host = '';
const axiosClient = axios.create({
  baseURL: `${host}/`,
});

const postConfig = () => ({
  headers: { 'Content-Type': 'multipart/form-data', Authorization: SecurityUtil.getAuthToken() },
});
const getConfig = () => ({ headers: { Authorization: SecurityUtil.getAuthToken() } });

const ApiClient = {
  uploadImage: params => (
    axiosClient.post(
      `${REACT_APP_SERVICE_PROXY_URL}/image/images/${params.renderer}`,
      params.data,
      postConfig(),
    )
  ),
  fetchImageById: params => (
    axiosClient.get(
      `${REACT_APP_SERVICE_PROXY_URL}/image/images?id=${params.id}`,
      getConfig(),
    )
  ),
  fetchImagesByIds: params => (
    axiosClient.get(
      `${REACT_APP_SERVICE_PROXY_URL}/image/images?id=${params.ids}`,
      getConfig(),
    )
  ),
};

export default ApiClient;

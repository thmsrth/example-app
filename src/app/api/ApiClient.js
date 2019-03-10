import axios from 'axios';
import { serializeQueryParams } from '../../global/utils/UrlHelpers';

// import SecurityUtil from '../../global/security/utils/SecurityUtil';

import staticData from '../static/data.json';

// const {
//   REACT_APP_SERVICE_PROXY_URL,
//   REACT_APP_AGGREGATOR_URL,
// } = process.env;
//
// const host = '';
//
// const axiosClient = axios.create({
//   baseURL: `${host}/`,
// });
//
// const getConfig = () => {
//   const authToken = SecurityUtil.getAuthToken();
//
//   return { headers: { Authorization: authToken } };
// };

const fakeServerRequest = (params = { latency: 500 }) => {
  const { latency } = params;
  return new Promise((resolve, reject) => {
    if (staticData) {
      setTimeout(() => resolve({ data: staticData }), latency);
    } else {
      reject(Error('error'));
    }
  });
};

const getDataParams = params => (
  params
    ? serializeQueryParams(params)
    : ''
);

const ApiClient = {
  fetchData: () => fakeServerRequest(), // return data

  createData: () => fakeServerRequest(), // return data
  updateData: () => fakeServerRequest(), // return data
  deleteData: () => fakeServerRequest(), // return data

  // fetchData: params => axiosClient.get(
  //   `${REACT_APP_SERVICE_PROXY_URL}/example/examples?${getDataParams(params)}`,
  //   getConfig(),
  // ),
  // createData: params => axiosClient.post(
  //   `${REACT_APP_SERVICE_PROXY_URL}/example/examples`,
  //   params.data,
  //   getConfig(),
  // ),
  // updateData: params => axiosClient.patch(
  //   `${REACT_APP_SERVICE_PROXY_URL}/example/examples/${params.id}`,
  //   params.data,
  //   getConfig(),
  // ),
  // deleteData: params => axiosClient.delete(
  //   `${REACT_APP_SERVICE_PROXY_URL}/example/examples/${params.id}`,
  //   { headers: { Authorization: SecurityUtil.getAuthToken() } },
  // ),

  fetchBeers: params => axios.get(
    `https://api.punkapi.com/v2/beers?${getDataParams(params)}`,
  ),

  fetchLanguageDetection: params => axios.get(`
    http://apilayer.net/api/detect?access_key=66528108a7f7221f97f3a9d10622220b&query=${params.text}
  `),
};

export default ApiClient;

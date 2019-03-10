// import axios from 'axios';

import SecurityUtil from '../utils/SecurityUtil';

import staticAuthenticationData from '../static/authentication.json';
import staticAuthorizationData from '../static/authorization.json';

// const {
//   REACT_APP_IDENTITY_URL,
//   REACT_APP_IDENTITY_CLIENT_ID,
//   REACT_APP_IDENTITY_CLIENT_SECRET,
// } = process.env;

// const axiosAuthenticationClient = axios.create({
//   baseURL: REACT_APP_IDENTITY_URL,
//   withCredentials: true,
//   auth: {
//     username: `${REACT_APP_IDENTITY_CLIENT_ID}`,
//     password: `${REACT_APP_IDENTITY_CLIENT_SECRET}`,
//   },
// });
//
// const getAuthenticationFormData = (data) => {
//   const formData = new FormData();
//   formData.set('grant_type', 'password');
//   formData.set('username', data.username);
//   formData.set('password', data.password);
//
//   return formData;
// };

const fakeAuthenticationServerRequest = (params = { latency: 2000 }) => {
  const { latency } = params;
  return new Promise((resolve, reject) => {
    if (staticAuthenticationData) {
      setTimeout(() => resolve({ data: staticAuthenticationData }), latency);
    } else {
      reject(Error('error'));
    }
  });
};

// const axiosAuthorizeClient = axios.create({
//   baseURL: REACT_APP_IDENTITY_URL,
//   withCredentials: true,
//   auth: {
//     username: `${REACT_APP_IDENTITY_CLIENT_ID}`,
//     password: `${REACT_APP_IDENTITY_CLIENT_SECRET}`,
//   },
// });

// const getAuthToken = params => (
//   SecurityUtil.getAuthTokenValue(params && params.authenticationData)
// );

const fakeAuthorizeServerRequest = (params = { latency: 2000 }) => {
  const { latency } = params;
  return new Promise((resolve, reject) => {
    if (staticAuthorizationData) {
      setTimeout(() => resolve({ data: staticAuthorizationData }), latency);
    } else {
      reject(Error('error'));
    }
  });
};

const ApiClientSecurity = {
  authenticate: () => fakeAuthenticationServerRequest(), // return authorization token
  authorize: () => fakeAuthorizeServerRequest(), // return permissions and some global variables
  saveToken: authenticationData => SecurityUtil.saveToken(authenticationData),

  // authenticate: params => (
  //   axiosAuthenticationClient.post('/oauth/token', getAuthenticationFormData(params.data))
  // ),
  // authorize: params => (
  //   axiosAuthorizeClient.get(`/oauth/check_token?token=${getAuthToken(params)}`)
  // ),
};

export default ApiClientSecurity;

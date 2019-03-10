import axios from 'axios';

const { APP_NAME } = require('../../../../config/constants');

const { REACT_APP_DISCOVERY_CONSUL_URL } = process.env;

const axiosDiscoveryClient = axios.create({
  baseURL: REACT_APP_DISCOVERY_CONSUL_URL,
});

const getDiscoveryService = (host, port) => ({
  ID: `${APP_NAME}-app`,
  Name: `${APP_NAME}-app`,
  Tags: ['app'],
  Address: host,
  Port: port,
  Meta: {},
  EnableTagOverride: false,
  Weights: {
    Passing: 10,
    Warning: 1,
  },
});

const ApiClientDiscovery = {
  register: (host, port) => axiosDiscoveryClient.put('/v1/agent/service/register', getDiscoveryService(host, port)),
  deregister: () => axiosDiscoveryClient.put(`/v1/agent/service/deregister/${APP_NAME}-app`),
};

export default ApiClientDiscovery;

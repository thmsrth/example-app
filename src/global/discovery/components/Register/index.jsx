import React, { Component } from 'react';

import ApiClientDiscovery from '../../api/ApiClientDiscovery';
import I18nDiscovery, { getErrorMessage } from '../../utils/I18nDiscovery';

import Notification from '../../../components/Notification';

const { REACT_APP_DISCOVERY_CONSUL_ENABLED } = process.env;

class Register extends Component {
  constructor() {
    super();
    this.state = {
      loading: '',
      error: '',
      message: '',
    };
    this.resetError = this.resetError.bind(this);
  }

  componentDidMount() {
    if (REACT_APP_DISCOVERY_CONSUL_ENABLED
      && window
      && window.location) {
      const { hostname, port } = window.location;

      this.setState({ loading: I18nDiscovery.t('en.discovery.actions.registering') });

      ApiClientDiscovery.register(hostname, port)
        .then(() => {
          this.setState({
            error: '',
            loading: '',
            message: I18nDiscovery.t('en.discovery.states.registered'),
          });
        })
        .catch((e) => {
          this.setState({
            error: `${
              I18nDiscovery.t('en.discovery.states.error.register')}: ${
              getErrorMessage(e, 'en.discovery.states.error')
            }`,
            loading: '',
            message: '',
          });
        });
    }
  }

  resetError() {
    this.setState({ error: '' });
  }

  render() {
    const { loading, error, message } = this.state;

    return (
      <Notification
        message={message}
        loading={loading}
        error={error}
        resetError={this.resetError}
      />
    );
  }
}

export default Register;

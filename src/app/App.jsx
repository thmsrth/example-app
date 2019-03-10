import React, { Component } from 'react';
import { Router, withRouter } from 'react-router-dom';

import Notification from '../global/components/Notification';
import I18nGlobal from '../global/utils/I18nGlobal';
import history from '../config/route/history';

import Main from './components/Main';

import './App.css';

const AppWithContainer = props => (
  <div className="App">
    <div className="App__container">
      <Main
        {...props}
      />
    </div>
  </div>
);

const AppWithRouter = withRouter(AppWithContainer);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    const {
      hasError,
    } = this.state;

    return (
      hasError
        ? <Notification message={I18nGlobal.t('en.app.error')} />
        : (
          <Router history={history}>
            <AppWithRouter />
          </Router>
        )
    );
  }
}

export default App;

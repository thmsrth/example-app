import React from 'react';
import ReactDOM, { render } from 'react-dom';
import singleSpaReact from 'single-spa-react';

import { APP_NAME } from '../config/constants';

import App from './app/App';

import './config/css/variables.css';
import './config/css/fonts.css';
import './config/css/defaults.css';
import './config/css/layout.css';

// eslint-disable-next-line react/jsx-filename-extension
render(<App />, document.getElementById(`${APP_NAME}-app`));

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: App,
  domElementGetter: () => document.getElementById(`${APP_NAME}-app`),
});

export const bootstrap = [
  reactLifecycles.bootstrap,
];

export const mount = [
  reactLifecycles.mount,
];

export const unmount = [
  reactLifecycles.unmount,
];

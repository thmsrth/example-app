import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import security from '../reducers/security';

const middleware = process.env.NODE_ENV === 'development' ? [thunk, createLogger({
  collapsed: (getState, action, logEntry) => !logEntry.error,
})] : [thunk];

const rootReducer = combineReducers({
  security,
});

const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;

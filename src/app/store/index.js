import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import beers from '../reducers/beers';
import data from '../reducers/data';
import languages from '../reducers/languages';

const middleware = process.env.NODE_ENV === 'development' ? [thunk, createLogger({
  collapsed: (getState, action, logEntry) => !logEntry.error,
})] : [thunk];

const rootReducer = combineReducers({
  beers,
  data,
  languages,
});

const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;

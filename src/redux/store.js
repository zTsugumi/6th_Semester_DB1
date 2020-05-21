import { applyMiddleware, createStore } from '@reduxjs/toolkit';
import rootReducers from './reducers/rootReducers';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const store = createStore(
  rootReducers,
  applyMiddleware(thunk, logger)
);

export default store;
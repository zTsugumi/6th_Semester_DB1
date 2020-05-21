import { combineReducers, applyMiddleware, createStore } from '@reduxjs/toolkit';
import { Auth } from './reducers/auth';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const configureStore = () => {
  const store = createStore(
    combineReducers({
      auth: Auth,
    }),
    applyMiddleware(thunk, logger)
  );
  return store;
};

/* eslint-disable no-process-env */
import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';

import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import axios from 'axios';

import reducers from './reducers';

import { logoutUser, refreshToken } from './actions/authentication';
import { startRehydrate, actionRehydrate } from './actions/rehydrate';

import schedule from 'node-schedule';

export default (initialState) => {

  const middleware = [thunk];

  if (process.env.NODE_ENV !== 'production') {

    middleware.push(createLogger());

  }

  axios.defaults.baseURL = process.env.REACT_APP_API_URL;

  const store = createStore(
    reducers,
    initialState,
    applyMiddleware(...middleware),
  );

  store.dispatch(startRehydrate());

  const persistor = persistStore(store, null, () => {

    axios.defaults.headers.common['x-api-key'] = process.env.REACT_APP_API_KEY;
    axios.defaults.headers.common.authorization = store.getState().authentication.token;

    if (store.getState().authentication.token) {

      axios('/auth/token/verify', {
        'method': 'get',
      }).then(() => {

        if (Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 6 > store.getState().authentication.expiry) {

          store.dispatch(refreshToken());

        }

      }).catch(() => {

        store.dispatch(logoutUser());

      }).then(() => {

        store.dispatch(actionRehydrate());

      });

    } else {

      store.dispatch(actionRehydrate());

    }

  });


  let verifySchedule = '* * * * *';

  if (process.env.NODE_ENV !== 'production') {

    verifySchedule = '0 * * * *';

  }

  schedule.scheduleJob(verifySchedule, () => {

    if (store.getState().authentication.token) {

      axios('/auth/token/verify', {
        'method': 'get',
      }).catch(() => {

        store.dispatch(logoutUser());

      });

    }

  });

  return { store, persistor };

};

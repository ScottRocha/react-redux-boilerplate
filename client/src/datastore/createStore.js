import { compose, createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";

import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

import Axios from "axios";

import reducers from "./reducers";

import { logoutUser, refreshToken } from "./actions/authentication";
import { startRehydrate, finishRehydrate } from "./actions/rehydrate";

export default (initialState) => {

  const middleware = [thunk];

  // eslint-disable-next-line no-process-env
  if (process.env.NODE_ENV !== "production") {

    middleware.push(createLogger());

  }

  const store = createStore(
    reducers,
    initialState,
    compose(applyMiddleware(...middleware))
  );

  store.dispatch(startRehydrate());

  const persistor = persistStore(store, null, () => {

    Axios.defaults.headers.common.Authorization = store.getState().authentication.token;

    if (store.getState().authentication.token) {

      Axios("/token/verify", {
        "method": "get",
      }).then(() => {

        if (new Date().getTime() <= store.getState().authentication.expiry + 1000 * 60 * 60 * 12) {

          store.dispatch(refreshToken());

        }

      }).catch(() => {

        store.dispatch(logoutUser());

      }).then(() => {

        store.dispatch(finishRehydrate());

      });

    } else {

      store.dispatch(finishRehydrate());

    }

  });

  return { store, persistor };

};

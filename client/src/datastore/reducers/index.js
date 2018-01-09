import localForage from "localforage";

import { persistCombineReducers } from "redux-persist";
import { routerReducer } from "react-router-redux";

import authentication from "./authentication";
import rehydrate from "./rehydrate";

const rootReducer = persistCombineReducers({
  "transforms": [

    // createExpirationTransform({
    //   expireKey: "expiry"
    // })
  ],
  "key": "react-redux-boilerplate",
  "storage": localForage,
}, {
  authentication,
  rehydrate,
  "routing": routerReducer,
});

export default rootReducer;

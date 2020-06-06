import localForage from 'localforage';

import { firebaseReducer } from 'react-redux-firebase';
import { persistCombineReducers } from 'redux-persist';
import { routerReducer } from 'react-router-redux';

import authenticationReducer from './authentication';
import rehydrateReducer from './rehydrate';

const rootReducer = persistCombineReducers(
  {
    'transforms': [

      // createExpirationTransform({
      //   expireKey: "expiry"
      // })
    ],
    'blacklist': [ 'timesheet', 'company', 'project', 'favourite', 'rehydrate' ],

    'key': 'react-redux-boilerplate',
    'storage': localForage,
  },
  {
    'authentication': authenticationReducer,
    'firebase': firebaseReducer,
    'rehydrate': rehydrateReducer,
    'routing': routerReducer,
  },
);

export default rootReducer;

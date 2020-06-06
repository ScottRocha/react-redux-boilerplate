/* eslint-disable no-undefined */

import {
  REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS,
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS,
  REFRESH_TOKEN_REQUEST, REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_FAILURE,
} from '../actions/authentication';

const initialState = {
  'isFetching': false,
  'isAuthenticated': false,
  'userName': undefined,
  'password': undefined,
  'user': {},
  'token': undefined,
  'message': undefined,
  'error': undefined,
};

export default function authentication(state = initialState, action) {

  switch (action.type) {

    case REGISTER_REQUEST:
      return Object.assign({}, state, {
        'isFetching': true,
        'isAuthenticated': false,
        'userName': action.userName,
        'password': action.password,
      });
    case REGISTER_SUCCESS:
      return Object.assign({}, state, {
        'isFetching': false,
        'isAuthenticated': true,
        'password': undefined,
        'user': action.user,
        'token': action.token,
        'expiry': action.expiry,
        'message': action.message,
        'error': undefined,
      });
    case REGISTER_FAILURE:
      return Object.assign({}, state, {
        'isFetching': false,
        'isAuthenticated': false,
        'password': undefined,
        'user': {},
        'token': undefined,
        'expiry': undefined,
        'message': undefined,
        'error': action.error,
      });
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        'isFetching': true,
        'isAuthenticated': false,
        'userName': action.userName,
        'password': action.password,
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        'isFetching': false,
        'isAuthenticated': true,
        'password': undefined,
        'user': action.user,
        'token': action.token,
        'expiry': action.expiry,
        'message': action.message,
        'error': undefined,
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        'isFetching': false,
        'isAuthenticated': false,
        'password': undefined,
        'user': {},
        'token': undefined,
        'expiry': undefined,
        'message': undefined,
        'error': action.error,
      });
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        'isFetching': false,
        'isAuthenticated': false,
        'userName': undefined,
        'password': undefined,
        'user': {},
        'token': undefined,
        'expiry': undefined,
        'message': undefined,
        'error': undefined,
      });
    case REFRESH_TOKEN_REQUEST:
      return Object.assign({}, state, {
        'isFetching': true,
      });
    case REFRESH_TOKEN_SUCCESS:
      return Object.assign({}, state, {
        'isFetching': false,
        'isAuthenticated': true,
        'user': action.user,
        'token': action.token,
        'expiry': action.expiry,
        'error': undefined,
      });
    case REFRESH_TOKEN_FAILURE:
      return Object.assign({}, state, {
        'isFetching': false,
        'isAuthenticated': false,
        'password': undefined,
        'user': {},
        'token': undefined,
        'expiry': undefined,
        'message': undefined,
        'error': action.error,
      });
    default:
      return state;

  }

}

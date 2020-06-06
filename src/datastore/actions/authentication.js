import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

// Register Section
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

const requestRegister = (username, password) => {

  return {
    'type': REGISTER_REQUEST,
    'isFetching': true,
    'isAuthenticated': false,
    username,
    password,
  };

};

const receiveRegister = (user, token, expiry, message) => {

  return {
    'type': REGISTER_SUCCESS,
    'isFetching': false,
    'isAuthenticated': true,
    user,
    token,
    expiry,
    message,
  };

};

const registerError = (error) => {

  return {
    'type': REGISTER_FAILURE,
    'isFetching': false,
    'isAuthenticated': false,
    error,
  };

};

// Calls the API to get a token and
// dispatches actions along the way
export const registerUser = (userName, password, firstName, lastName) => {

  return (dispatch) => {

    dispatch(requestRegister(userName, password));

    const postRegistrationDetails = () => new Promise((resolve, reject) => {

      axios('/auth/register', {
        'method': 'post',
        'data': {
          userName,
          password,
          firstName,
          lastName,
        },
      }).then((token) => {

        token = token.data.result;

        axios.defaults.headers.common.Authorization = token;

        return resolve(token);

      }).catch((err) => reject(err));

    });

    const getUserDetails = (token) => new Promise((resolve, reject) => {

      axios('/auth/user', {
        'method': 'get',
      }).then((response) => resolve([ token, response.data.result ])).catch((err) => reject(err));

    });

    const getTokenVerification = ([ token, user ]) => new Promise((resolve, reject) => {

      axios('/token/verify', {
        'method': 'get',
      }).then((decoded) => resolve([ token, user, decoded.data.exp ])).catch((err) => reject(err));

    });

    postRegistrationDetails()
      .then(getUserDetails)
      .then(getTokenVerification)
      .then(([ token, user, expiry ]) => dispatch(receiveRegister(user, token, expiry, 'Successful Registration!')))
      .catch((err) => {

        const error = new Error(err.response.data.message);
        error.name = err.response.data.code;

        return dispatch(registerError(error));

      });

  };

};

// Login Section
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

const requestLogin = () => {

  return {
    'type': LOGIN_REQUEST,
    'isFetching': true,
    'isAuthenticated': false,
  };

};

const receiveLogin = (user, token, expiry, message) => {

  const connectState = uuidv4();

  return {
    'type': LOGIN_SUCCESS,
    'isFetching': false,
    'isAuthenticated': true,
    user,
    connectState,
    token,
    expiry,
    message,
  };

};

const loginError = (error) => {

  return {
    'type': LOGIN_FAILURE,
    'isFetching': false,
    'isAuthenticated': false,
    error,
  };

};

// Calls the API to get a token and
// dispatches actions along the way
export const loginUser = (userName, password) => {

  return (dispatch) => {

    dispatch(requestLogin(userName, password));

    const postLoginDetails = () => new Promise((resolve, reject) => {

      axios('/auth/login', {
        'method': 'post',
        'data': {
          userName,
          password,
        },
      }).then((token) => {

        token = token.data.result;

        axios.defaults.headers.common.Authorization = token;

        return resolve(token);

      }).catch((err) => reject(err));

    });

    const getUserDetails = (token) => new Promise((resolve, reject) => {

      axios('/auth/user', {
        'method': 'get',
      }).then((response) => {

        return resolve([ token, response.data.result ]);

      }).catch((err) => reject(err));

    });

    const getTokenVerification = ([ token, user ]) => new Promise((resolve, reject) => {

      axios('/auth/token/verify', {
        'method': 'get',
      }).then((decoded) => resolve([ token, user, decoded.data.exp ])).catch((err) => reject(err));

    });

    postLoginDetails()
      .then(getUserDetails)
      .then(getTokenVerification)
      .then(([ token, user, expiry ]) => {

        return dispatch(receiveLogin(user, token, expiry, 'Successful Login!'));

      }).catch((err) => {

        const error = new Error(err.response.data.message);
        error.name = err.response.data.code;

        return dispatch(loginError(error));

      });

  };

};

// Logout Section
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

const receiveLogout = () => {

  return {
    'type': LOGOUT_SUCCESS,
    'isFetching': false,
    'isAuthenticated': false,
  };

};

// Logs the user out
export const logoutUser = () => {

  return (dispatch) => {

    delete axios.defaults.headers.common.authorization;

    dispatch(receiveLogout());

  };

};

// Token Refresh Section
export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILURE = 'REFRESH_TOKEN_FAILURE';

const requestRefreshToken = () => {

  return {
    'type': REFRESH_TOKEN_REQUEST,
    'isFetching': true,
  };

};

const receiveRefreshToken = (token, user, expiry) => {

  return {
    'type': REFRESH_TOKEN_SUCCESS,
    'isFetching': false,
    'isAuthenticated': true,
    token,
    user,
    expiry,
  };

};

const tokenRefreshError = (error) => {

  return {
    'type': REFRESH_TOKEN_FAILURE,
    'isFetching': false,
    'isAuthenticated': false,
    error,
  };

};

// Calls the API to refresh a token and
// dispatches actions along the way
export const refreshToken = () => {

  return (dispatch) => {

    dispatch(requestRefreshToken());

    const getRefreshToken = () => new Promise((resolve, reject) => {

      axios('/auth/token/refresh', {
        'method': 'get',
      }).then((token) => {

        token = token.data.result;

        axios.defaults.headers.common.authorization = token;

        return resolve(token);

      }).catch((err) => reject(err));

    });

    const getUserDetails = (token) => new Promise((resolve, reject) => {

      axios('/auth/user', {
        'method': 'get',
      }).then((response) => resolve([ token, response.data.result ]))
        .catch((err) => reject(err.response.data.message));

    });

    const getTokenVerification = ([ token, user ]) => new Promise((resolve, reject) => {

      axios('/auth/token/verify', {
        'method': 'get',
      }).then((response) => resolve([ token, user, response.data.result.exp ])).catch((err) => reject(err));

    });

    return getRefreshToken()
      .then(getUserDetails)
      .then(getTokenVerification)
      .then(([ token, user, expiry ]) => dispatch(receiveRefreshToken(token, user, expiry))).catch((err) => {

        const error = new Error(err.response.data.message);
        error.name = err.response.data.code;

        return dispatch(tokenRefreshError(error));

      });

  };

};

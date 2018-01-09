import Axios from "axios";

// Register Section
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

const requestRegister = (username, password) => {

  return {
    "type": REGISTER_REQUEST,
    "isFetching": true,
    "isAuthenticated": false,
    username,
    password,
  };

};

const receiveRegister = (user, token, expiry, message) => {

  return {
    "type": REGISTER_SUCCESS,
    "isFetching": false,
    "isAuthenticated": true,
    user,
    token,
    expiry,
    message,
  };

};

const registerError = (error) => {

  return {
    "type": REGISTER_FAILURE,
    "isFetching": false,
    "isAuthenticated": false,
    error,
  };

};

// Calls the API to get a token and
// dispatches actions along the way
export const registerUser = (userName, password, firstName, lastName) => {

  const data = {
    userName,
    password,
    firstName,
    lastName,
  };

  return (dispatch) => {

    dispatch(requestRegister(userName, password));

    const postRegistrationDetails = () => {

      return new Promise((resolve, reject) => {

        Axios("/api/register", {
          "method": "post",
          data,
        }).then((token) => {

          token = token.data.result;

          Axios.defaults.headers.common.Authorization = token;

          return resolve(token);

        }).catch((err) => {

          return reject(err);

        });

      });

    };

    const getUserDetails = (token) => {

      return new Promise((resolve, reject) => {

        Axios("/api/user", {
          "method": "get",
        }).then((response) => {

          return resolve([ token, response.data.result ]);

        }).catch((err) => {

          return reject(err);

        });

      });

    };

    const getTokenVerification = ([ token, user ]) => {

      return new Promise((resolve, reject) => {

        Axios("/token/verify", {
          "method": "get",
        }).then((decoded) => {

          return resolve([ token, user, decoded.data.exp ]);

        }).catch((err) => {

          return reject(err);

        });

      });

    };

    postRegistrationDetails()
      .then(getUserDetails)
      .then(getTokenVerification)
      .then(([ token, user, expiry ]) => {

        return dispatch(receiveRegister(user, token, expiry, "Successful Registration!"));

      }).catch((err) => {

        const error = new Error(err.response.data.message);
        error.name = err.response.data.code;

        return dispatch(registerError(error));

      });

  };

};

// Login Section
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

const requestLogin = (userName, password) => {

  return {
    "type": LOGIN_REQUEST,
    "isFetching": true,
    "isAuthenticated": false,
    userName,
    password,
  };

};

const receiveLogin = (user, token, expiry, message) => {

  return {
    "type": LOGIN_SUCCESS,
    "isFetching": false,
    "isAuthenticated": true,
    user,
    token,
    expiry,
    message,
  };

};

const loginError = (error) => {

  return {
    "type": LOGIN_FAILURE,
    "isFetching": false,
    "isAuthenticated": false,
    error,
  };

};

// Calls the API to get a token and
// dispatches actions along the way
export const loginUser = (userName, password) => {

  const data = {
    userName,
    password,
  };

  return (dispatch) => {

    dispatch(requestLogin(userName, password));

    const postLoginDetails = () => {

      return new Promise((resolve, reject) => {

        Axios("/api/login", {
          "method": "post",
          data,
        }).then((token) => {

          token = token.data.result;

          Axios.defaults.headers.common.Authorization = token;

          return resolve(token);

        }).catch((err) => {

          return reject(err);

        });

      });

    };

    const getUserDetails = (token) => {

      return new Promise((resolve, reject) => {

        Axios("/api/user", {
          "method": "get",
        }).then((response) => {

          return resolve([ token, response.data.result ]);

        }).catch((err) => {

          return reject(err);

        });

      });

    };

    const getTokenVerification = ([ token, user ]) => {

      return new Promise((resolve, reject) => {

        Axios("/token/verify", {
          "method": "get",
        }).then((decoded) => {

          return resolve([ token, user, decoded.data.exp ]);

        }).catch((err) => {

          return reject(err);

        });

      });

    };

    postLoginDetails()
      .then(getUserDetails)
      .then(getTokenVerification)
      .then(([ token, user, expiry ]) => {

        return dispatch(receiveLogin(user, token, expiry, "Successful Login!"));

      }).catch((err) => {

        const error = new Error(err.response.data.message);
        error.name = err.response.data.code;

        return dispatch(loginError(error));

      });

  };

};

// Logout Section
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

const receiveLogout = () => {

  return {
    "type": LOGOUT_SUCCESS,
    "isFetching": false,
    "isAuthenticated": false,
  };

};

// Logs the user out
export const logoutUser = () => {

  return (dispatch) => {

    delete Axios.defaults.headers.common.Authorization;

    dispatch(receiveLogout());

  };

};

// Token Refresh Section
export const REFRESH_TOKEN_REQUEST = "REFRESH_TOKEN_REQUEST";
export const REFRESH_TOKEN_SUCCESS = "REFRESH_TOKEN_SUCCESS";
export const REFRESH_TOKEN_FAILURE = "REFRESH_TOKEN_FAILURE";

const requestRefreshToken = () => {

  return {
    "type": REFRESH_TOKEN_REQUEST,
    "isFetching": true,
  };

};

const receiveRefreshToken = (token, expiry) => {

  return {
    "type": REFRESH_TOKEN_SUCCESS,
    "isFetching": false,
    "isAuthenticated": true,
    token,
    expiry,
  };

};

const tokenRefreshError = (error) => {

  return {
    "type": REFRESH_TOKEN_FAILURE,
    "isFetching": false,
    "isAuthenticated": false,
    error,
  };

};

// Calls the API to refresh a token and
// dispatches actions along the way
export const refreshToken = () => {

  return (dispatch) => {

    dispatch(requestRefreshToken());

    const getRefreshToken = () => {

      return new Promise((resolve, reject) => {

        Axios("/api/token/refresh", {
          "method": "get",
        }).then((token) => {

          token = token.data.result;

          Axios.defaults.headers.common.Authorization = token;

          return resolve(token);

        }).catch((err) => {

          return reject(err);

        });

      });

    };

    const getTokenVerification = (token) => {

      return new Promise((resolve, reject) => {

        Axios("/token/verify", {
          "method": "get",
        }).then((decoded) => {

          return resolve([ token, decoded.data.exp ]);

        }).catch((err) => {

          return reject(err);

        });

      });

    };

    return getRefreshToken()
      .then(getTokenVerification)
      .then(([ token, expiry ]) => {

        return dispatch(receiveRefreshToken(token, expiry));

      })
      .catch((err) => {

        const error = new Error(err.response.data.message);
        error.name = err.response.data.code;

        return dispatch(tokenRefreshError(error));

      });

  };

};

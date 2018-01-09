import { refreshToken } from "../datastore/actions/authentication";

export const checkAuth = (props) => {

  if (!props.isAuthenticated) {

    props.history.push("/login");

  }

};

export const checkRefresh = (props) => {

  if (new Date().getTime() <= props.expiry + 1000 * 60 * 60 * 12) {

    props.dispatch(refreshToken());

  }

};

export const isUserValid = (userType, validTypes = []) => {

  return !(userType !== "admin" && !validTypes.find((type) => userType === type));


};

export const checkUnAuth = (props) => {

  if (props.isAuthenticated) {

    props.history.push("/");

  }

};

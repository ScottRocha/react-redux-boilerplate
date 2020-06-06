import React, { useEffect } from 'react';

import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { checkAuth } from '../../../helpers/auth';

import {
  logoutUser,
} from '../../../datastore/actions/authentication';

const LogoutPage = () => {

  const history = useHistory();
  const dispatch = useDispatch();

  const isRehydrated = useSelector((state) => state.rehydrate.isRehydrated);
  const isAuthenticated = useSelector((state) => state.authentication.isAuthenticated);


  useEffect(() => {

    if (isRehydrated) {

      checkAuth(history, isAuthenticated);
      dispatch(logoutUser());

    }

  }, [ isRehydrated, history, isAuthenticated, dispatch ]);

  return (
    <React.Fragment>
      <Helmet>
        <title>Logout - React + Redux Boilerplate</title>
      </Helmet>
      <div />
    </React.Fragment>
  );

};

export default LogoutPage;

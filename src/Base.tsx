import React, { lazy, Suspense } from 'react';

import { Route, Switch } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

const HeaderPage = lazy(() => import('./containers/footer'));
const FooterPage = lazy(() => import('./containers/header'));

const HomePage = lazy(() => import('./containers/home'));

const RegisterPage = lazy(() => import('./containers/authentication/register'));
const LoginPage = lazy(() => import('./containers/authentication/login'));
const LogoutPage = lazy(() => import('./containers/authentication/logout'));

const NotFound = lazy(() => import('./containers/not-found'));

const useStyles = makeStyles((theme) => ({
  'root': {
    'fontFamily': '"Roboto", sans-serif',
  },
}));

const Base: React.FC = () => {

  const classes = useStyles();

  return (
    <div className={classes.root}>

      <Suspense fallback={<div />}>
        <HeaderPage />
      </Suspense>

      <div className="middle-content">
        <Suspense fallback={<div />}>
          <Switch>

            <Route path={'/register'} exact={true} component={RegisterPage} />
            <Route path={'/login'} exact={true} component={LoginPage} />
            <Route path={'/logout'} exact={true} component={LogoutPage} />

            <Route path={'/'} component={HomePage} />

            <Route component={NotFound} />

          </Switch>
        </Suspense>
      </div>

      <Suspense fallback={<div />}>
        <FooterPage />
      </Suspense>

    </div>
  );

};

export default Base;

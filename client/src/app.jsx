import '@babel/polyfill';

import React from 'react';
import { render } from 'react-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import { PersistGate } from 'redux-persist/lib/integration/react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import BasePage from './containers/common/BasePage';

import HomePage from 'bundle-loader?lazy&name=homepage!./containers/home/HomePage';

import RegisterPage from 'bundle-loader?lazy&name=registerpage!./containers/authentication/RegisterPage';
import LoginPage from 'bundle-loader?lazy&name=loginpage!./containers/authentication/LoginPage';
import LogoutPage from 'bundle-loader?lazy&name=logoutpage!./containers/authentication/LogoutPage';

import NotFound from 'bundle-loader?lazy&name=notfound!./components/common/NotFound';

import createStore from './datastore/createStore';

import config from './config';

import ReactGA from 'react-ga';
ReactGA.initialize(config.tracking.host[window.location.host]);

const { store, persistor } = createStore(ReactGA);

render(
  <ThemeProvider theme={createMuiTheme()}>
    <CssBaseline />
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Route
            render={(props) => {

              props.ReactGA = ReactGA;

              return (
                <BasePage {...props}>
                  <Route exact path="/" bundle={HomePage} />

                  <Route path="/register" bundle={RegisterPage} />
                  <Route path="/login" bundle={LoginPage} />
                  <Route path="/logout" bundle={LogoutPage} />

                  <Route bundle={NotFound} />
                </BasePage>
              );

            }}
          />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </ThemeProvider>, document.getElementById('react-app'));

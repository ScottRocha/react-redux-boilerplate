import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, Theme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import { PersistGate } from 'redux-persist/lib/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Base from './Base';

import createStore from './datastore/createStore';

const { store, persistor } = createStore();

const theme: Theme = createMuiTheme({});

const App: React.FC = () => (
  <React.Fragment>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <Base />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </React.Fragment>
);

export default App;

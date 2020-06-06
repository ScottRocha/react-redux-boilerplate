import React from 'react';

import { Helmet } from 'react-helmet';

import Grid from '@material-ui/core/Grid';

const HomePage = () => {

  return (
    <React.Fragment>
      <Helmet>
        <title>Home - React + Redux Boilerplate</title>
      </Helmet>
      <div>
        <Grid container spacing={8} justify="center">
          <Grid item sm={6} className={'centered'}>
            Welcome to my rendition of a React + Redux Boilerplate Template.
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );

};

export default HomePage;

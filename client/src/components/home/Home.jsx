import React from "react";

import DocumentTitle from "react-document-title";

import Grid from "material-ui/Grid";


const Home = () => (
  <DocumentTitle title={"Home - React + Redux Boilerplate"}>
    <div>
      <Grid container spacing={8} justify="center">
        <Grid item sm={6} className={"centered"}>
          Welcome to my rendition of a React + Redux Boilerplate Template.
        </Grid>
      </Grid>
    </div>
  </DocumentTitle>
);

export default Home;

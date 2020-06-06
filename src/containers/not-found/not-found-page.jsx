import React from 'react';

import { Helmet } from 'react-helmet';


const NotFoundPage = () => (
  <React.Fragment>
    <Helmet>
      <title>Not Found - React + Redux Boilerplate</title>
    </Helmet>
    <h1>
      Page Does Not Exist
    </h1>
  </React.Fragment>
);

export default NotFoundPage;

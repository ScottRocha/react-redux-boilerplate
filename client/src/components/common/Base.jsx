import React from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";

import HeaderPage from "../../containers/common/HeaderPage";
import Footer from "./Footer";


const Base = ({ childrenWithProps, history, isAuthenticated, user }) => (
  <div className="root">
    <HeaderPage isAuthenticated={isAuthenticated} user={user} history={history} />

    <div className="middle-content">
      <Switch>
        {childrenWithProps}
      </Switch>
    </div>

    <Footer />
  </div>
);

Base.propTypes = {
  "childrenWithProps": PropTypes.array.isRequired,
  "history": PropTypes.object.isRequired,
  "isAuthenticated": PropTypes.bool.isRequired,
  "user": PropTypes.object.isRequired,
};

export default Base;

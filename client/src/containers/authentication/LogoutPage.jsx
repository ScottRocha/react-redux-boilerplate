import React from "react";

import { logoutUser } from "../../datastore/actions/authentication";


class LogoutPage extends React.Component {

  constructor(props) {

    super(props);

  }

  componentWillMount() {

    this.props.dispatch(logoutUser());
    this.props.history.push("/");

  }

  render() {

    return <div />;

  }

}

export default LogoutPage;

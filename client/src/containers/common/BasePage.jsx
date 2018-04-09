import React from "react";
import { matchPath } from "react-router-dom";
import { connect } from "react-redux";

import Bundle from "../../containers/common/Bundle";
import Base from "../../components/common/Base";
import Loading from "../../components/common/Loading";


class BasePage extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      "path": this.props.location.pathname,
    };

  }

  render() {

    const { dispatch, isAuthenticated, user, expiry, message, token, error, isRehydrated } = this.props;

    if (isRehydrated) {

      // Global props
      let globalProps = {
        "history": this.props.history,
        dispatch,
        isAuthenticated,
        user,
        expiry,
        message,
        token,
        error,
        "ReactGA": this.props.ReactGA,
      };

      const childrenWithProps = React.Children.map(this.props.children, (child) => {

        return React.cloneElement(child, {
          "render": () =>
            <Bundle ReactGA={this.props.ReactGA} load={child.props.bundle}>{(Component) => <Component {...{
              "path": child.props.path,
              "match": matchPath(this.props.history.location.pathname, {
                "path": child.props.path,
                "exact": true,
                "strict": false,
              }),
              ...globalProps,
            }} />}</Bundle>,
        });

      });

      return (
        <Base
          childrenWithProps={childrenWithProps}
          isAuthenticated={this.props.isAuthenticated}
          user={this.props.user}
          history={this.props.history} />
      );

    }

    return (
      <Loading history={this.props.history} />
    );


  }

}

const mapStateToProps = (state) => {

  const { authentication, rehydrate } = state;

  const { isAuthenticated, user, expiry, message, token, error } = authentication;
  const { isRehydrated } = rehydrate;

  return {
    isAuthenticated,
    user,
    token,
    expiry,
    message,
    error,
    isRehydrated,
  };

};

export default connect(mapStateToProps)(BasePage);

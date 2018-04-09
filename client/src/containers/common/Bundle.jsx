import React from "react";
import PropTypes from "prop-types";

class Bundle extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      "component": null,
    };

  }

  componentWillMount() {

    this.load(this.props);

  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.load !== this.props.load) {

      this.load(nextProps);

    }

  }

  load(props) {

    let self = this;

    self.setState({
      "component": null,
    });

    props.load((component) => {

      self.setState({
        "component": component.default ? component.default : component,
      }, () => {

        self.props.ReactGA.pageview(window.location.pathname + window.location.search + window.location.hash);

      });

    });

  }

  render() {

    return this.state.component ? this.props.children(this.state.component) : null;

  }

}

Bundle.propTypes = {
  "load": PropTypes.func.isRequired,
  "ReactGA": PropTypes.object.isRequired,
};

export default Bundle;

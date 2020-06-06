import React from 'react';
import PropTypes from 'prop-types';

import Header from '../../components/common/Header';

class HeaderPage extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      'isDrawerOpen': false,
    };

  }

  onToggleDrawer() {

    this.setState({
      'isDrawerOpen': !this.state.isDrawerOpen,
    });

  }

  onCloseDrawer() {

    this.setState({
      'isDrawerOpen': false,
    });

  }

  onSetDrawerState(state) {

    this.setState({
      'isDrawerOpen': state,
    });

  }

  render() {

    return (
      <Header
        isAuthenticated={this.props.isAuthenticated}
        isDrawerOpen={this.state.isDrawerOpen}
        onToggleDrawer={this.onToggleDrawer.bind(this)}
        onCloseDrawer={this.onCloseDrawer.bind(this)}
        onSetDrawerState={this.onSetDrawerState.bind(this)}
        history={this.props.history}
      />
    );

  }

}

HeaderPage.propTypes = {
  'isAuthenticated': PropTypes.bool.isRequired,
  'history': PropTypes.object.isRequired,
};

export default HeaderPage;

import React from 'react';

import { loginUser } from '../../datastore/actions/authentication';
import { checkUnAuth } from '../../helpers/auth';

import LoginForm from '../../components/authentication/LoginForm';


export default class LoginPage extends React.Component {

  constructor(props) {

    super(props);

    this.processForm = this.processForm.bind(this);

    this.state = {
      'username': '',
      'password': '',
      'submitted': false,
    };

  }

  componentWillMount() {

    checkUnAuth(this.props);

  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.user && nextProps.user.accountId) {

      this.props.history.push('/');

    } else {

      this.setState({ 'error': nextProps.error });

    }

  }

  processForm(event) {

    event.preventDefault();

    this.setState({
      'submitted': true,
    });

    if (this.state.username && this.state.password) {

      this.props.dispatch(loginUser(this.state.username, this.state.password));

    }

  }

  handleInputChange(event) {

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });

  }

  render() {

    return (
      <LoginForm
        onSubmit={this.processForm.bind(this)}
        onInputChange={this.handleInputChange.bind(this)}
        username={this.state.username}
        password={this.state.password}
        submitted={this.state.submitted}
        error={this.state.error}
      />
    );

  }

}

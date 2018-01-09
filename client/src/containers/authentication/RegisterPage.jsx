import React from "react";

import { registerUser } from "../../datastore/actions/authentication";
import { checkUnAuth } from "../../helpers/auth";

import RegisterForm from "../../components/authentication/RegisterForm";


class RegisterPage extends React.Component {

  constructor(props) {

    super(props);

    if (props.user && props.user.userid) {

      this.props.history.push("/");

    }

    this.processForm = this.processForm.bind(this);

    this.state = {
      "username": "",
      "password": "",
      "passwordConf": "",
      "firstName": "",
      "lastName": "",
      "submitted": false,
    };

  }

  componentWillMount() {

    checkUnAuth(this.props);

  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.user && nextProps.user.accountId) {

      this.props.history.push("/");

    } else {

      this.setState({ "error": nextProps.error });

    }

  }

  processForm(event) {

    event.preventDefault();

    this.setState({
      "submitted": true,
    });

    if (this.state.username && this.state.password) {

      this.props.dispatch(registerUser(this.state.username, this.state.password, this.state.firstName, this.state.lastName));

    }

  }

  handleInputChange(event) {

    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });

  }

  render() {

    return (
      <RegisterForm
        onSubmit={this.processForm.bind(this)}
        onInputChange={this.handleInputChange.bind(this)}
        username={this.state.username}
        password={this.state.password}
        passwordConf={this.state.passwordConf}
        firstName={this.state.firstName}
        lastName={this.state.lastName}
        submitted={this.state.submitted}
        error={this.state.error}
      />
    );

  }

}

export default RegisterPage;

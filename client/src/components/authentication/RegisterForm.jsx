import React from 'react';
import PropTypes from 'prop-types';

import DocumentTitle from 'react-document-title';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';


const RegisterForm = ({ onSubmit, onInputChange, username, password, passwordConf, firstName, lastName, submitted, error }) => (
  <DocumentTitle title={'Register - React + Redux Boilerplate'}>
    <Grid container spacing={8} justify="center">
      <Grid item md={6} className={'centered'}>
        <Card className="centered-card">
          <CardHeader
            title="Registration Page"
            subtitle="Please enter your information to register for our service"
          />
          <CardContent>
            <div style={{ 'color': 'red', 'fontWeight': 'bold' }}>
              {!error || error.message}
            </div>
            <div>
              <TextField
                name="username"
                label="Username"
                value={username}
                onChange={onInputChange}
                error={!username && submitted}
                helperText={!username && submitted && 'This field is required'}
              />
            </div>
            <div>
              <TextField
                name="password"
                label="Password"
                type="password"
                value={password}
                onChange={onInputChange}
                error={!password && submitted}
                helperText={!password && submitted && 'This field is required'}
              />
            </div>
            <div>
              <TextField
                name="passwordConf"
                label="Password Confirmation"
                type="password"
                value={passwordConf}
                onChange={onInputChange}
                error={!passwordConf && submitted || passwordConf !== password}
                helperText={!passwordConf && submitted && 'This field is required' || passwordConf !== password && "These passwords don't match. Try again?"}
              />
            </div>
            <div>
              <TextField
                name="firstName"
                label="First Name"
                value={firstName}
                onChange={onInputChange}
                error={!firstName && submitted}
                helperText={!firstName && submitted && 'This field is required'}
              />
            </div>
            <div>
              <TextField
                name="lastName"
                label="Last Name"
                value={lastName}
                onChange={onInputChange}
                error={!lastName && submitted}
                helperText={!lastName && submitted && 'This field is required'}
              />
            </div>
          </CardContent>
          <CardActions>
            <Button variant="raised" color="secondary" onClick={onSubmit}>
              Submit
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  </DocumentTitle>
);

RegisterForm.propTypes = {
  'onSubmit': PropTypes.func.isRequired,
  'onInputChange': PropTypes.func.isRequired,
  'username': PropTypes.string.isRequired,
  'password': PropTypes.string.isRequired,
  'passwordConf': PropTypes.string.isRequired,
  'firstName': PropTypes.string.isRequired,
  'lastName': PropTypes.string.isRequired,
  'submitted': PropTypes.bool.isRequired,
  'error': PropTypes.object,
};

export default RegisterForm;

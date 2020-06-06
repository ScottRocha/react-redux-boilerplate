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


const LoginForm = ({ onSubmit, onInputChange, username, password, submitted, error }) => (
  <DocumentTitle title={'Login - React + Redux Boilerplate'}>
    <Grid container spacing={8} justify="center">
      <Grid item md={6} className={'centered'}>
        <form onSubmit={onSubmit}>
          <Card className="centered-card">
            <CardHeader
              title="Login Page"
              subtitle="Please enter your information to login to our service"
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
            </CardContent>
            <CardActions>
              <Button type="submit" variant="raised" color="secondary">
              Submit
              </Button>
            </CardActions>
          </Card>
        </form>
      </Grid>
    </Grid>
  </DocumentTitle>
);

LoginForm.propTypes = {
  'onSubmit': PropTypes.func.isRequired,
  'onInputChange': PropTypes.func.isRequired,
  'username': PropTypes.string.isRequired,
  'password': PropTypes.string.isRequired,
  'submitted': PropTypes.bool.isRequired,
  'error': PropTypes.object,
};

export default LoginForm;

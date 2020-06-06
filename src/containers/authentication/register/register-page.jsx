import React, { useEffect, useState } from 'react';

import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { useDispatch, useSelector } from 'react-redux';

import { checkUnAuth } from '../../../helpers/auth';

import {
  registerUser,
} from '../../../datastore/actions/authentication';

const RegisterPage = () => {

  const history = useHistory();
  const dispatch = useDispatch();

  const isRehydrated = useSelector((state) => state.rehydrate.isRehydrated);
  const isAuthenticated = useSelector((state) => state.authentication.isAuthenticated);
  const error = useSelector((state) => state.authentication.error);

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ passwordConf, setPasswordConf ] = useState('');
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ submitted, setSubmitted ] = useState(false);

  useEffect(() => {

    if (isRehydrated) {

      checkUnAuth(history, isAuthenticated);

    }

  }, [ isRehydrated, history, isAuthenticated ]);

  const onSubmit = (event) => {

    event.preventDefault();

    setSubmitted(true);

    if (username && password) {

      dispatch(registerUser(username, password, firstName, lastName));

    }

  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Register - React + Redux Boilerplate</title>
      </Helmet>
      <Grid container spacing={8} justify="center">
        <Grid item md={6} className={'centered'}>
          <form onSubmit={(event) => onSubmit(event)}>
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
                    onChange={(event) => setUsername(event.target.value)}
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
                    onChange={(event) => setPassword(event.target.value)}
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
                    onChange={(event) => setPasswordConf(event.target.value)}
                    error={!passwordConf && submitted ? true : passwordConf !== password}
                    helperText={!passwordConf && submitted ? 'This field is required' : passwordConf !== password ? "These passwords don't match. Try again?" : null}
                  />
                </div>
                <div>
                  <TextField
                    name="firstName"
                    label="First Name"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    error={!firstName && submitted}
                    helperText={!firstName && submitted && 'This field is required'}
                  />
                </div>
                <div>
                  <TextField
                    name="lastName"
                    label="Last Name"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    error={!lastName && submitted}
                    helperText={!lastName && submitted && 'This field is required'}
                  />
                </div>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="secondary" type="submit">
                  Submit
                </Button>
              </CardActions>
            </Card>
          </form>
        </Grid>
      </Grid>
    </React.Fragment>
  );

};

export default RegisterPage;

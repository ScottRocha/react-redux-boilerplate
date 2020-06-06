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
  loginUser,
} from '../../../datastore/actions/authentication';

const LoginPage = () => {

  const history = useHistory();
  const dispatch = useDispatch();

  const isRehydrated = useSelector((state) => state.rehydrate.isRehydrated);
  const isAuthenticated = useSelector((state) => state.authentication.isAuthenticated);
  const error = useSelector((state) => state.authentication.error);

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
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

      dispatch(loginUser(username, password));

    }

  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Login - React + Redux Boilerplate</title>
      </Helmet>
      <Grid container spacing={8} justify="center">
        <Grid item md={6} className={'centered'}>
          <form onSubmit={(event) => onSubmit(event)}>
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
              </CardContent>
              <CardActions>
                <Button type="submit" variant="contained" color="secondary">
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

export default LoginPage;

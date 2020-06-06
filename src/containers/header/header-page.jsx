import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import MenuIcon from '@material-ui/icons/Menu';

import { useSelector } from 'react-redux';


const HeaderPage = () => {

  const history = useHistory();

  const isAuthenticated = useSelector((state) => state.authentication.isAuthenticated);

  const [ isDrawerOpen, setIsDrawerOpen ] = useState(false);

  return (
    <React.Fragment>
      <Paper style={{ 'position': 'fixed', 'left': 0, 'top': 0, 'right': 0, 'zIndex': 9000 }}>
        <AppBar>
          <Toolbar>
            <IconButton color="secondary" onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
              <MenuIcon />
            </IconButton>
            <Typography type="title" color="inherit" style={{ 'cursor': 'pointer' }} onClick={() => history.push('/')}>
              React + Redux Boilerplate
            </Typography>
          </Toolbar>
        </AppBar>
      </Paper>
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        style={{ 'zIndex': !isDrawerOpen || 9001 }}
      >
        {!isAuthenticated ? (
          <div style={{ 'width': '250px' }}>
            <List>
              <ListSubheader>Account</ListSubheader>
              <ListItem button onClick={() => setIsDrawerOpen(false) || history.push('/login')}>
                <ListItemText primary="Login" />
              </ListItem>
              <ListItem button onClick={() => setIsDrawerOpen(false) || history.push('/register')}>
                <ListItemText primary="Register" />
              </ListItem>
            </List>
          </div>
        ) : (
          <div style={{ 'width': '250px' }}>
            <List>
              <ListSubheader>Account</ListSubheader>
              <ListItem button onClick={() => setIsDrawerOpen(false) || history.push('/logout')}>
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          </div>
        )}
      </Drawer>
    </React.Fragment>
  );

};

export default HeaderPage;

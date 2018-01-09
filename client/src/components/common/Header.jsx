import React from "react";
import PropTypes from "prop-types";

import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";
import List, { ListItem, ListItemText, ListSubheader } from "material-ui/List";
import IconButton from "material-ui/IconButton";
import Paper from "material-ui/Paper";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";

import MenuIcon from "material-ui-icons/Menu";


const Header = ({ isAuthenticated, isDrawerOpen, onToggleDrawer, onCloseDrawer, history }) => (
  <div>
    <Paper style={{ "position": "fixed", "left": 0, "top": 0, "right": 0, "zIndex": 9000 }}>
      <AppBar>
        <Toolbar>
          <IconButton color="contrast" onClick={onToggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography type="title" color="inherit" style={{ "cursor": "pointer" }} onClick={() => history.push("/")}>
            React + Redux Boilerplate
          </Typography>
        </Toolbar>
      </AppBar>
    </Paper>
    <Drawer
      anchor="left"
      open={isDrawerOpen}
      onClose={onCloseDrawer}
      style={{ "zIndex": !isDrawerOpen || 9001 }}
    >
      {!isAuthenticated ? (
        <div style={{ "width": "250px" }}>
          <List>
            <ListSubheader>Account</ListSubheader>
            <ListItem button onClick={() => onCloseDrawer && history.push("/login")}>
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem button onClick={() => onCloseDrawer && history.push("/register")}>
              <ListItemText primary="Register" />
            </ListItem>
          </List>
        </div>
      ) : (
        <div style={{ "width": "250px" }}>
          <List>
            <ListSubheader>Account</ListSubheader>
            <ListItem button onClick={() => onCloseDrawer && history.push("/logout")}>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </div>
      )}
    </Drawer>
  </div>
);

Header.propTypes = {
  "isAuthenticated": PropTypes.bool.isRequired,
  "isDrawerOpen": PropTypes.bool.isRequired,
  "onToggleDrawer": PropTypes.func.isRequired,
  "onCloseDrawer": PropTypes.func.isRequired,
  "history": PropTypes.object.isRequired,
};

export default Header;
